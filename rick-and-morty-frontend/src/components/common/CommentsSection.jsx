import { useState } from 'react';
import { useComments } from '../../hooks/useComments'

export const CommentsSection = ({ characterId }) => {
  const { comments, loading, addComment } = useComments(characterId);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(text, author);
    setText('');
    setAuthor('');
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add Comment</button>
      </form>

      <div className="space-y-2">
        {comments.map(c => (
          <div key={c.id} className="border-b pb-2">
            <p className="text-sm text-gray-700">{c.text}</p>
            <p className="text-xs text-gray-400">{c.author || 'Anonymous'} • {new Date(Number(c.createdAt)).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};