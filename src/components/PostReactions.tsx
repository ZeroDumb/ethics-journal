import { useState, useEffect } from 'react';

interface PostReactionsProps {
  postId: string;
}

export default function PostReactions({ postId }: PostReactionsProps) {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);

  useEffect(() => {
    // Load user's previous reaction from localStorage
    const storedUserReaction = localStorage.getItem(`post-${postId}-user-reaction`);
    if (storedUserReaction) {
      setUserReaction(storedUserReaction as 'like' | 'dislike');
    }
  }, [postId]);

  const handleReaction = async (type: 'like' | 'dislike') => {
    const newUserReaction = userReaction === type ? null : type;
    
    try {
      // Store reaction in GitHub
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          reaction: newUserReaction,
          previousReaction: userReaction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store reaction');
      }

      setUserReaction(newUserReaction);
      localStorage.setItem(`post-${postId}-user-reaction`, newUserReaction || '');
    } catch (error) {
      console.error('Error storing reaction:', error);
      // Fallback to localStorage only if GitHub storage fails
      setUserReaction(newUserReaction);
      localStorage.setItem(`post-${postId}-user-reaction`, newUserReaction || '');
    }
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <button
        onClick={() => handleReaction('like')}
        className={`flex items-center gap-2 px-3 py-1 rounded ${
          userReaction === 'like'
            ? 'bg-terminal-green text-black'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        title="Like"
      >
        <span>🖒</span>
      </button>
      <button
        onClick={() => handleReaction('dislike')}
        className={`flex items-center gap-2 px-3 py-1 rounded ${
          userReaction === 'dislike'
            ? 'bg-red-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        title="Dislike"
      >
        <span>🖓</span>
      </button>
    </div>
  );
} 