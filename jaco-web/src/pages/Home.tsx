import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { HeroSection, CampaignBanner, StreamCard, CategoryCard } from '../components';
import { MOCK_STREAMS, MOCK_CATEGORIES } from '../constants/mockData';

const Home: React.FC = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Campaign Banner */}
      <CampaignBanner />

      {/* Live Channels Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            <span className="text-jaco-primary">Live</span> Channels We Think You'll Like
          </h2>
          <Link
            to="/browse"
            className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 font-medium transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {MOCK_STREAMS.slice(0, 5).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            <span className="text-jaco-accent">Top</span> Categories
          </h2>
          <Link
            to="/browse"
            className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 font-medium transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Clips Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            <span className="text-jaco-pink">Trending</span> Clips
          </h2>
          <Link
            to="/browse"
            className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 font-medium transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_STREAMS.slice(0, 4).map((stream, index) => (
            <div
              key={stream.id}
              className="group relative aspect-video rounded-xl overflow-hidden bg-jaco-card border border-jaco-muted hover:border-jaco-primary/50 transition-all cursor-pointer"
            >
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Duration Badge */}
              <span className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                0:{30 + index * 15}
              </span>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="text-sm font-medium text-white line-clamp-1 mb-1">
                  {stream.title}
                </h4>
                <p className="text-xs text-gray-400">{stream.username}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More Live Channels */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            More <span className="text-jaco-primary">Live</span> Channels
          </h2>
          <Link
            to="/browse"
            className="flex items-center gap-1 text-sm text-jaco-primary hover:text-jaco-primary/80 font-medium transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {MOCK_STREAMS.slice(5, 10).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
