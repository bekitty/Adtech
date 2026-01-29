import React from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Volume2 } from 'lucide-react';
import Button from './Button';
import { MOCK_STREAMS, formatViewerCount } from '../constants/mockData';

const HeroSection: React.FC = () => {
  const featuredStream = MOCK_STREAMS[0];

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <img
        src={featuredStream.thumbnail}
        alt={featuredStream.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-jaco-dark via-jaco-dark/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-jaco-dark via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-12">
        {/* Live Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </span>
          <span className="text-sm text-gray-300">
            {formatViewerCount(featuredStream.viewers)} viewers
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl line-clamp-2">
          {featuredStream.title}
        </h1>

        {/* Streamer Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={featuredStream.userAvatar}
            alt={featuredStream.username}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-jaco-primary"
          />
          <div>
            <p className="font-semibold text-white">{featuredStream.username}</p>
            <p className="text-sm text-gray-400">{featuredStream.category}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {featuredStream.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-jaco-card/80 text-xs text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to={`/stream/${featuredStream.id}`}>
            <Button variant="primary" size="lg" className="gap-2">
              <Play className="w-5 h-5" fill="currentColor" />
              Watch Now
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="gap-2">
            <User className="w-5 h-5" />
            Profile
          </Button>
        </div>
      </div>

      {/* Volume Control - Desktop */}
      <button className="hidden lg:flex absolute bottom-6 right-6 items-center justify-center w-10 h-10 bg-jaco-card/80 hover:bg-jaco-hover rounded-full transition-colors">
        <Volume2 className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default HeroSection;
