import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_USERS } from '../constants/mockData';
import { formatViewerCount } from '../constants/mockData';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-jaco-dark border-r border-jaco-muted transition-all duration-300 z-40 ${
        isOpen ? 'w-60' : 'w-0 lg:w-16'
      } overflow-hidden`}
    >
      <div className="flex flex-col h-full py-4">
        {/* Recommended Section */}
        <div className="px-2">
          <div
            className={`flex items-center justify-between px-2 mb-2 ${
              !isOpen && 'lg:justify-center'
            }`}
          >
            {isOpen ? (
              <>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Recommended
                </span>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 hover:bg-jaco-hover rounded"
                >
                  {expanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </>
            ) : (
              <Heart className="w-5 h-5 text-gray-400 hidden lg:block" />
            )}
          </div>

          {expanded && (
            <div className="space-y-1">
              {MOCK_USERS.filter((u) => u.isLive)
                .slice(0, 5)
                .map((user) => (
                  <Link
                    key={user.id}
                    to={`/stream/${user.id}`}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-jaco-hover transition-colors group ${
                      !isOpen && 'lg:justify-center'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-jaco-dark"></span>
                    </div>

                    {isOpen && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-jaco-primary transition-colors">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.category}
                        </p>
                      </div>
                    )}

                    {isOpen && user.viewers && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-gray-400">
                          {formatViewerCount(user.viewers)}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Following Section - Only when expanded */}
        {isOpen && (
          <div className="px-2 mt-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Following
              </span>
            </div>
            <div className="px-2 py-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Sign in to see your followed channels
              </p>
              <button className="text-sm text-jaco-primary hover:text-jaco-primary/80 font-medium">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
