'use client';
import { useState } from 'react';
import PostCard from '@/components/patient/PostCard';
import FullPost from '@/components/patient/FullPost';

// Mock data updated for consistency (commentsCount: number)
const mockPosts = [
  {
    id: 1,
    title: 'Managing Diabetes Effectively',
    description: 'Tips on diet and exercise for better control.',
    author: 'Jane Smith',
    authorAvatar: 'https://i.pravatar.cc/40?img=1',
    timestamp: '2 hours ago',
    upvotes: 15,
    commentsCount: 3,  // Number only
  },
  {
    id: 2,
    title: 'Side Effects of New Meds',
    description: 'Has anyone experienced nausea with this?',
    author: 'Mike Johnson',
    authorAvatar: 'https://i.pravatar.cc/40?img=4',
    timestamp: '5 hours ago',
    upvotes: 8,
    commentsCount: 5,
  },
];

export default function CommunityPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Create New Post
        </button>
      </div>
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post.id)}
          />
        ))}
      </div>

      {/* Create Post Modal (unchanged for brevity) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <textarea
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded-lg mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPost && (
        <FullPost
          postId={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}