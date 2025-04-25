import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';

interface TerminalProps {
  initialText: string;
  commands?: string[];
}

export default function Terminal({ initialText, commands = [] }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm>();
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#1a1a1a',
        foreground: '#00ff00',
        cursor: '#00ff00',
        cursorAccent: '#1a1a1a',
        selection: 'rgba(255, 255, 255, 0.3)',
      },
      cursorBlink: true,
      fontFamily: 'JetBrains Mono, monospace',
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;

    // Write initial text with typewriter effect
    let i = 0;
    const typewriterInterval = setInterval(() => {
      if (i < initialText.length) {
        term.write(initialText[i]);
        i++;
      } else {
        clearInterval(typewriterInterval);
        term.write('\r\n$ ');
      }
    }, 50);

    // Handle input
    let currentLine = '';
    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.keyCode === 13) { // Enter
        handleCommand(currentLine);
        currentLine = '';
      } else if (domEvent.keyCode === 8) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else if (printable) {
        currentLine += key;
        term.write(key);
      }
    });

    const handleCommand = (cmd: string) => {
      term.write('\r\n');
      
      const trimmedCmd = cmd.trim();
      if (!trimmedCmd) {
        term.write('$ ');
        return;
      }

      setCommandHistory(prev => [...prev, trimmedCmd]);

      switch (trimmedCmd) {
        case 'help':
          term.writeln('Available commands:');
          term.writeln('  help     - Show this help message');
          term.writeln('  clear    - Clear the terminal');
          term.writeln('  ls       - List all posts');
          term.writeln('  cat      - Show post content');
          term.writeln('  read     - Read a post (e.g., read post-slug)');
          break;

        case 'clear':
          term.clear();
          break;

        case 'ls':
          commands.forEach(cmd => {
            if (cmd.startsWith('read ')) {
              term.writeln(`📄 ${cmd.slice(5)}`);
            }
          });
          break;

        default:
          if (trimmedCmd.startsWith('read ')) {
            const slug = trimmedCmd.slice(5);
            if (commands.includes(`read ${slug}`)) {
              window.location.href = `/blog/${slug}`;
              return;
            }
            term.writeln(`Post not found: ${slug}`);
          } else {
            term.writeln(`Command not found: ${trimmedCmd}`);
          }
      }

      term.write('$ ');
    };

    // Handle window resize
    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      term.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [initialText, commands]);

  return (
    <div 
      ref={terminalRef} 
      className="terminal-container bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      style={{ height: '400px' }}
    />
  );
}