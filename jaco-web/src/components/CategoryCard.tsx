import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { formatViewerCount } from '../constants/mockData';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/browse?category=${category.name}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-jaco-card border border-jaco-muted group-hover:border-jaco-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-jaco-primary/20">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-xs text-gray-200">
              {formatViewerCount(category.viewers)} viewers
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-2">
        <h3 className="font-semibold text-white group-hover:text-jaco-primary transition-colors truncate">
          {category.name}
        </h3>
        {category.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {category.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-jaco-card text-xs text-gray-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
