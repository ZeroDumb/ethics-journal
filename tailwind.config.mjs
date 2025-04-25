/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: 'var(--terminal-green)',
          cyan: 'var(--terminal-cyan)',
          orange: 'var(--terminal-orange)',
          yellow: 'var(--terminal-yellow)',
          red: 'var(--terminal-red)'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e0e0e0',
            h1: {
              color: 'var(--terminal-green)',
            },
            h2: {
              color: 'var(--terminal-green)',
            },
            h3: {
              color: 'var(--terminal-green)',
            },
            h4: {
              color: 'var(--terminal-green)',
            },
            a: {
              color: 'var(--terminal-cyan)',
              '&:hover': {
                color: 'var(--terminal-green)',
              },
            },
            code: {
              color: 'var(--terminal-yellow)',
            },
            pre: {
              backgroundColor: '#1a1a1a',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};