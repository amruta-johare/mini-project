import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Comment {
  id: number;
  text: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  replies?: Comment[];
}

interface FullPostProps {
  postId: number;
  onClose: () => void;
}

// Enhanced mock data with string keys to avoid TS key coercion issues
const mockFullPosts = {
  '1': {
    id: 1,
    title: 'Managing Diabetes Effectively',
    content: '<p>Full content here... Tips on diet and exercise for better control of diabetes. Incorporating low-glycemic foods can make a big difference. Remember to consult your doctor before major changes.</p><ul><li>Monitor blood sugar daily</li><li>Stay hydrated</li><li>Exercise 30 mins/day</li></ul>',
    author: 'Jane Smith',
    authorAvatar: 'https://i.pravatar.cc/40?img=1',
    timestamp: '2 hours ago',
    upvotes: 15,
    commentsCount: 3,  // Number for display
    commentsList: [     // Array for iteration
      { 
        id: 1, 
        text: 'Great tips! I\'ve been struggling with this.', 
        author: 'User1', 
        authorAvatar: 'https://i.pravatar.cc/40?img=2',
        timestamp: '1 hour ago',
        replies: [
          { id: 11, text: 'Try adding cinnamon to your meals.', author: 'Jane Smith', authorAvatar: 'https://i.pravatar.cc/40?img=1', timestamp: '30 mins ago' }
        ]
      },
      { 
        id: 2, 
        text: 'Thanks for sharing. This helped me a lot.', 
        author: 'User2', 
        authorAvatar: 'https://i.pravatar.cc/40?img=3',
        timestamp: '45 mins ago'
      },
    ] as Comment[],
  },
  '2': {
    id: 2,
    title: 'Side Effects of New Meds',
    content: '<p>Full content here... Has anyone experienced nausea with this new medication? Sharing my experience. It started mild but consult your doc if persistent.</p><p><strong>Pro tip:</strong> Take with food to reduce it.</p>',
    author: 'Mike Johnson',
    authorAvatar: 'https://i.pravatar.cc/40?img=4',
    timestamp: '5 hours ago',
    upvotes: 8,
    commentsCount: 5,
    commentsList: [
      { 
        id: 3, 
        text: 'Yes, I did. Talk to your doctor.', 
        author: 'User3', 
        authorAvatar: 'https://i.pravatar.cc/40?img=5',
        timestamp: '4 hours ago'
      },
      { 
        id: 4, 
        text: 'It went away after a week.', 
        author: 'User4', 
        authorAvatar: 'https://i.pravatar.cc/40?img=6',
        timestamp: '3 hours ago',
        replies: [
          { id: 41, text: 'Glad to hear that!', author: 'Mike Johnson', authorAvatar: 'https://i.pravatar.cc/40?img=4', timestamp: '2 hours ago' }
        ]
      },
      { 
        id: 5, 
        text: 'Monitor it closely. Hydrate well.', 
        author: 'User5', 
        authorAvatar: 'https://i.pravatar.cc/40?img=7',
        timestamp: '1 hour ago'
      },
    ] as Comment[],
  },
};

export default function FullPost({ postId, onClose }: FullPostProps) {
  const postKey = postId.toString() as keyof typeof mockFullPosts;
  const post = mockFullPosts[postKey];
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [upvotes, setUpvotes] = useState<number>(post?.upvotes ?? 0);  // Explicit number type

  const handleLike = () => {
    setLiked(!liked);
    setUpvotes(liked ? upvotes - 1 : upvotes + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Mock add comment (in real app, POST to API)
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  // Type guard: Ensure commentsList is array before iterating
  if (!post || !Array.isArray(post.commentsList)) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 text-center">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">{post.title}</h2>
          </div>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <button className="flex items-center space-x-1 hover:opacity-80 transition">
              <ShareIcon className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button onClick={handleLike} className="flex items-center space-x-1 hover:opacity-80 transition">
              {liked ? <HeartIconSolid className="w-4 h-4 text-red-400 fill-red-400" /> : <HeartIcon className="w-4 h-4" />}
              <span>{upvotes}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-gray-500 text-sm">{post.timestamp}</p>
              </div>
            </div>
            <div 
              className="prose prose-sm max-w-none text-gray-800" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
              <span>Comments ({post.commentsList.length})</span>  {/* Safe: array.length */}
            </h3>
            <div className="space-y-4">
              {post.commentsList.map((comment) => (  // Safe: map on array
                <div key={comment.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <img src={comment.authorAvatar} alt={comment.author} className="w-8 h-8 rounded-full flex-shrink-0 mt-1 object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 text-sm">{comment.author}</p>
                        <p className="text-gray-500 text-xs">{comment.timestamp}</p>
                      </div>
                      <p className="text-gray-800 text-sm mt-1">{comment.text}</p>
                      <button className="text-blue-500 text-xs hover:underline mt-1">Reply</button>
                    </div>
                  </div>
                  {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (  // Type guard for replies
                    <div className="ml-11 space-y-2 mt-3 border-l border-gray-200 pl-3">
                      {comment.replies.map((reply) => (  // Safe: map on array
                        <div key={reply.id} className="bg-white rounded-lg p-3 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900">{reply.author}</p>
                            <p className="text-gray-500">{reply.timestamp}</p>
                          </div>
                          <p className="text-gray-700">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitComment} className="p-6 border-t bg-gray-50">
          <div className="flex items-end space-x-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
              rows={1}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}