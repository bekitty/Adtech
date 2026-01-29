import React from 'react';
import { Trophy, ChevronRight, Clock } from 'lucide-react';
import Button from './Button';

const CampaignBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-900 via-fuchsia-900 to-jaco-dark p-6 sm:p-8">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-jaco-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-jaco-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Trophy Icon */}
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-jaco-accent to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-jaco-dark" />
          </div>

          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-jaco-primary text-white text-xs font-bold rounded">
                EVENT
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 bg-jaco-accent/20 text-jaco-accent text-xs font-bold rounded">
                <Clock className="w-3 h-3" />
                LIMITED TIME
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Jaco All-Star Tournament 2024
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base">
              $50,000 Prize Pool • Live Daily at 8 PM EST
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="lg" className="bg-white text-jaco-dark hover:bg-gray-100">
            Watch Event
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-jaco-dark gap-1">
            Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignBanner;
