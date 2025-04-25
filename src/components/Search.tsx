import { useState, useEffect, useRef } from 'react';

interface SearchProps {
  posts: {
    slug: string;
    data: {
      title: string;
      categories?: string[];
    };
  }[];
}

export default function Search({ posts }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(posts);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.data.title.toLowerCase().includes(query.toLowerCase()) ||
      post.data.categories?.some(cat => 
        cat.toLowerCase().includes(query.toLowerCase())
      )
    );
    setResults(filtered);
  }, [query, posts]);

  const handleSelect = (slug: string) => {
    window.location.href = `/blog/${slug}`;
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-xl border border-gray-700">
        <div className="p-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts... (Ctrl/Cmd + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-terminal-cyan"
          />
        </div>
        {results.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto">
            {results.map(post => (
              <li key={post.slug}>
                <button
                  onClick={() => handleSelect(post.slug)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                >
                  <span className="text-terminal-cyan">{post.data.title}</span>
                  {post.data.categories && (
                    <div className="flex gap-2 mt-1">
                      {post.data.categories.map(category => (
                        <span key={category} className="text-xs text-terminal-green">
                          #{category}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-400">
            No posts found
          </div>
        )}
      </div>
    </div>
  );
}