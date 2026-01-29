import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MoreHorizontal, Users, Calendar, ExternalLink } from 'lucide-react';
import { VideoPlayer, ChatBox, Button, StreamCard } from '../components';
import { MOCK_STREAMS, formatViewerCount } from '../constants/mockData';

const StreamRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const stream = MOCK_STREAMS.find((s) => s.id === id) || MOCK_STREAMS[0];
  const recommendations = MOCK_STREAMS.filter((s) => s.id !== stream.id).slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-3.5rem)]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video Player */}
        <VideoPlayer stream={stream} />

        {/* Stream Info */}
        <div className="p-4 space-y-4">
          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white line-clamp-2">
                {stream.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                <span>{stream.category}</span>
                <span>•</span>
                <span>{formatViewerCount(stream.viewers)} viewers</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {stream.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-jaco-card text-sm text-gray-300 rounded-full hover:bg-jaco-hover cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Channel Profile */}
          <div className="flex items-start gap-4 p-4 bg-jaco-card rounded-xl border border-jaco-muted">
            <div className="relative flex-shrink-0">
              <img
                src={stream.userAvatar}
                alt={stream.username}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-jaco-primary"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                LIVE
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white">{stream.username}</h3>
              <p className="text-sm text-gray-400 mt-0.5">
                245K followers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                Follow
              </Button>
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="p-4 bg-jaco-card rounded-xl border border-jaco-muted">
            <h3 className="font-semibold text-white mb-3">About {stream.username}</h3>
            <p className="text-sm text-gray-400 mb-4">
              Welcome to my channel! I stream daily and love interacting with chat.
              Make sure to follow and join the community!
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>245K followers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Mon-Fri: 6PM EST, Sat: 12PM EST</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-jaco-muted">
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Discord
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                YouTube
              </a>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold text-white mb-3">Recommended Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <StreamCard key={rec.id} stream={rec} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0 h-full">
        <ChatBox />
      </div>
    </div>
  );
};

export default StreamRoom;
