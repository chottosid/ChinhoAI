'use client';

import React, { useCallback, useState } from 'react';
import { Upload, Link2, FileVideo, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoUploadProps {
  onVideoLoad: (src: string, type: 'file' | 'url') => void;
  isLoading: boolean;
}

export default function VideoUpload({ onVideoLoad, isLoading }: VideoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      // Check file size (limit to 100MB for demo)
      if (videoFile.size > 100 * 1024 * 1024) {
        alert('File size too large. Please choose a video under 100MB.');
        return;
      }
      
      const url = URL.createObjectURL(videoFile);
      onVideoLoad(url, 'file');
    } else {
      alert('Please drop a valid video file.');
    }
  }, [onVideoLoad]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
      }
      
      // Check file size (limit to 100MB for demo)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size too large. Please choose a video under 100MB.');
        return;
      }
      
      const url = URL.createObjectURL(file);
      onVideoLoad(url, 'file');
    }
  }, [onVideoLoad]);

  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const url = videoUrl.trim();
    if (url) {
      // Basic URL validation
      try {
        const urlObj = new URL(url);
        
        // Check if it's a common video hosting platform or has video extension
        const isVideoUrl = 
          urlObj.hostname.includes('youtube.com') ||
          urlObj.hostname.includes('youtu.be') ||
          urlObj.hostname.includes('vimeo.com') ||
          urlObj.hostname.includes('dailymotion.com') ||
          /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i.test(urlObj.pathname) ||
          urlObj.hostname.includes('googleapis.com'); // For sample videos
        
        if (isVideoUrl) {
          onVideoLoad(url, 'url');
        } else {
          alert('Please enter a valid video URL (MP4, WebM, YouTube, Vimeo, etc.)');
        }
      } catch (error) {
        console.error('Invalid URL:', error);
        alert('Please enter a valid URL');
      }
    }
  }, [videoUrl, onVideoLoad]);

  const clearUrl = useCallback(() => {
    setVideoUrl('');
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'url'
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Link2 className="w-4 h-4 inline-block mr-2" />
            Video URL
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragOver
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isLoading}
                  />
                  
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileVideo className={`w-8 h-8 text-blue-600 ${isLoading ? 'animate-pulse' : ''}`} />
                    </div>
                    
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {isLoading ? 'Loading video...' : 'Drop your video here'}
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse files
                      </p>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      Supports MP4, WebM, AVI, MOV
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'url' && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <div className="relative">
                      <input
                        id="video-url"
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        disabled={isLoading}
                      />
                      {videoUrl && (
                        <button
                          type="button"
                          onClick={clearUrl}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!videoUrl.trim() || isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Loading...' : 'Load Video'}
                  </button>
                </form>
                
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-gray-500">
                    <p className="mb-1">Supported formats:</p>
                    <p>• Direct video links (MP4, WebM, etc.)</p>
                    <p>• YouTube URLs (demo purposes)</p>
                    <p>• Vimeo URLs (demo purposes)</p>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Try this sample video:</p>
                    <button
                      type="button"
                      onClick={() => {
                        const sampleUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                        setVideoUrl(sampleUrl);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Load Sample Video (Big Buck Bunny)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}