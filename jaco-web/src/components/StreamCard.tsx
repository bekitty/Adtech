import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Signal } from 'lucide-react';
import { Stream } from '../types';
import { formatViewerCount } from '../constants/mockData';

interface StreamCardProps {
  stream: Stream;
  large?: boolean;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream, large = false }) => {
  return (
    <Link
      to={`/stream/${stream.id}`}
      className="group block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-jaco-card border border-jaco-muted group-hover:border-jaco-primary/50 transition-all duration-300">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Live Badge */}
        {stream.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            <Signal className="w-3 h-3 animate-pulse" />
            LIVE
          </div>
        )}

        {/* Viewer Count */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          {formatViewerCount(stream.viewers)} viewers
        </div>

        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-jaco-primary/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Stream Info */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={stream.userAvatar}
              alt={stream.username}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-jaco-primary transition-all"
            />
            {stream.isLive && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-jaco-dark"></span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-white group-hover:text-jaco-primary transition-colors line-clamp-2 ${
              large ? 'text-base' : 'text-sm'
            }`}
          >
            {stream.title}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5 truncate">
            {stream.username}
          </p>
          <p className="text-sm text-gray-500 truncate">{stream.category}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {stream.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-jaco-card text-xs text-gray-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StreamCard;
