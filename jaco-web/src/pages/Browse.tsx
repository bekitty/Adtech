import React, { useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { StreamCard, CategoryCard } from '../components';
import { MOCK_STREAMS, MOCK_CATEGORIES } from '../constants/mockData';

const Browse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'live'>('categories');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'Gaming', 'Music', 'Esports', 'Just Chatting', 'Art', 'IRL'];

  // Duplicate data for demo
  const allStreams = [...MOCK_STREAMS, ...MOCK_STREAMS];
  const allCategories = [...MOCK_CATEGORIES, ...MOCK_CATEGORIES];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-4 bg-jaco-dark/95 backdrop-blur-sm border-b border-jaco-muted">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-jaco-card rounded-lg">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'categories'
                  ? 'bg-jaco-dark text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'live'
                  ? 'bg-jaco-dark text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Channels
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <div className="hidden sm:flex items-center bg-jaco-card border border-jaco-muted rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-40"
              />
            </div>

            {/* Filter Button - Mobile */}
            <button className="flex sm:hidden items-center gap-2 px-4 py-2 bg-jaco-card border border-jaco-muted rounded-lg text-sm text-gray-400">
              <SlidersHorizontal className="w-4 h-4" />
              Sort & Filter
            </button>
          </div>
        </div>

        {/* Tags Filter - Desktop */}
        <div className="hidden sm:flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTag === tag
                  ? 'bg-jaco-primary text-white'
                  : 'bg-jaco-card text-gray-400 hover:text-white hover:bg-jaco-hover'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'categories' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {allCategories.map((category, index) => (
            <CategoryCard key={`${category.id}-${index}`} category={category} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allStreams.map((stream, index) => (
            <StreamCard key={`${stream.id}-${index}`} stream={stream} />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      <div className="flex justify-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-jaco-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-jaco-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-jaco-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default Browse;
