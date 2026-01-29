import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Signal } from 'lucide-react';
import { Stream } from '../types';
import { formatViewerCount } from '../constants/mockData';

interface VideoPlayerProps {
  stream: Stream;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="relative aspect-video bg-jaco-dark rounded-xl overflow-hidden group">
      {/* Video/Thumbnail */}
      <img
        src={stream.thumbnail}
        alt={stream.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Live Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg">
          <Signal className="w-4 h-4 animate-pulse" />
          LIVE
        </span>
        <span className="px-3 py-1.5 bg-black/70 text-white text-sm rounded-lg">
          {formatViewerCount(stream.viewers)} viewers
        </span>
      </div>

      {/* Controls - Show on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer">
          <div className="w-full h-full bg-red-500 rounded-full" />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="currentColor" />
              )}
            </button>

            {/* Volume */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Volume Slider */}
              {showVolumeSlider && (
                <div className="absolute left-12 flex items-center w-24 h-10 px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (Number(e.target.value) > 0) setIsMuted(false);
                    }}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              )}
            </div>

            {/* Time */}
            <span className="text-white text-sm">LIVE</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings */}
            <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>

            {/* Fullscreen */}
            <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
