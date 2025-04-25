import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      }));
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    elements.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="toc fixed right-4 top-32 w-64 hidden xl:block">
      <h4 className="text-terminal-green text-sm font-bold mb-4">Table of Contents</h4>
      <ul className="space-y-2">
        {headings.map(heading => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm hover:text-terminal-cyan block py-1 ${
                activeId === heading.id ? 'text-terminal-cyan' : 'text-gray-400'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}