import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  upvotes: number;
  commentsCount: number;  // Renamed for clarity
}

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-200 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              post.author.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
            <p className="text-gray-500 text-xs mt-2">{post.timestamp}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1 group-hover:text-red-500 transition-colors">
              <HeartIcon className="w-4 h-4" />
              <span>{post.upvotes}</span>
            </div>
            <div className="flex items-center space-x-1 group-hover:text-blue-500 transition-colors">
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>{post.commentsCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span>By {post.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}