'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoUpload from '@/components/VideoUpload';
import VideoPlayer from '@/components/VideoPlayer';
import ASLVideoPlayer from '@/components/ASLVideoPlayer';

export default function Home() {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [videoType, setVideoType] = useState<'file' | 'url'>('file');
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aslPlaybackSpeed, setAslPlaybackSpeed] = useState(1.0);

  const handleVideoLoad = useCallback((src: string, type: 'file' | 'url') => {
    setIsVideoLoading(true);
    setVideoSrc(src);
    setVideoType(type);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsVideoLoading(false);
    }, 500);
  }, []);

  const handlePlayStateChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleFullscreenChange = useCallback((fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
  }, []);

  const resetVideo = useCallback(() => {
    setVideoSrc('');
    setIsPlaying(false);
    setIsVideoLoading(false);
    setAslPlaybackSpeed(1.0);
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setAslPlaybackSpeed(speed);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">👋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SignLanguage AI</h1>
                <p className="text-sm text-gray-500">Real ASL Video Interpreter</p>
              </div>
            </div>
            
            {videoSrc && (
              <button
                onClick={resetVideo}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                Reset Demo
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!videoSrc ? (
            /* Upload Screen */
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <div className="text-center space-y-4 max-w-2xl">
                <h2 className="text-4xl font-bold text-gray-900">
                  Experience Sign Language Translation
                </h2>
                <p className="text-xl text-gray-600">
                  Upload a video or enter a URL to see our AI-powered sign language avatar in action.
                  Watch as the avatar performs expressive gestures synchronized with your video content.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Real-time Animation</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Fullscreen Support</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Multiple Gestures</span>
                </div>
              </div>
              
              <VideoUpload 
                onVideoLoad={handleVideoLoad} 
                isLoading={isVideoLoading}
              />
            </motion.div>
          ) : (
            /* Video Player Screen */
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8 min-h-[60vh]"
            >
              {/* Left Side - Video Player */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Player</h3>
                    <p className="text-sm text-gray-500">
                      {videoType === 'file' ? 'Uploaded video file' : 'External video URL'}
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <VideoPlayer
                      src={videoSrc}
                      onPlayStateChange={handlePlayStateChange}
                      onFullscreenChange={handleFullscreenChange}
                      className="w-full aspect-video"
                    />
                  </div>
                </div>

                {/* Video Controls Info */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-gray-400'}`} />
                        <span className="text-gray-600">
                          {isPlaying ? 'Playing' : 'Paused'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isFullscreen ? 'bg-blue-400' : 'bg-gray-400'}`} />
                        <span className="text-gray-600">
                          {isFullscreen ? 'Fullscreen' : 'Normal'}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500">
                      Keyboard: Space (play/pause) • M (mute) • F (fullscreen) • ←/→ (seek)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Avatar */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">ASL Video Interpreter</h3>
                    <p className="text-sm text-gray-500">
                      Real ASL videos demonstrating authentic sign language
                    </p>
                  </div>
                  
                  <div className="p-6 flex justify-center">
                    <ASLVideoPlayer
                      isPlaying={isPlaying}
                      isFullscreen={false}
                      playbackSpeed={aslPlaybackSpeed}
                    />
                  </div>
                </div>




              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fullscreen Avatar Overlay */}
      {isFullscreen && (
        <div className="fixed top-6 right-6 z-50 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border-2 border-white/40 shadow-2xl">
            <ASLVideoPlayer
              isPlaying={isPlaying}
              isFullscreen={true}
              playbackSpeed={aslPlaybackSpeed}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
            <p className="mt-1">A demo of AI-powered sign language translation technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
