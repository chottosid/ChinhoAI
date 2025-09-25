'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * ASL Video Player Component
 * 
 * ASL video assets are licensed under MIT License
 * Original repository: https://github.com/GanjiSaiDeekshith/ISL-Converter-From-Voice-and-Text-to-Sign-Language
 * Copyright (c) 2023 GanjiSaiDeekshith
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

// List of available ASL video clips
// Video assets courtesy of GanjiSaiDeekshith - https://github.com/GanjiSaiDeekshith/ISL-Converter-From-Voice-and-Text-to-Sign-Language
const ASL_CLIPS = [
  '0.mp4', '1.mp4', '2.mp4', '3.mp4', '4.mp4', '5.mp4', '6.mp4', '7.mp4', '8.mp4', '9.mp4',
  'A.mp4', 'After.mp4', 'Again.mp4', 'Against.mp4', 'Age.mp4', 'All.mp4', 'Alone.mp4', 'Also.mp4', 'And.mp4', 'Ask.mp4', 'At.mp4',
  'B.mp4', 'Be.mp4', 'Beautiful.mp4', 'Before.mp4', 'Best.mp4', 'Better.mp4', 'Busy.mp4', 'But.mp4', 'Bye.mp4',
  'C.mp4', 'Can.mp4', 'Cannot.mp4', 'Change.mp4', 'College.mp4', 'Come.mp4', 'Computer.mp4',
  'D.mp4', 'Day.mp4', 'Distance.mp4', 'Do Not.mp4', 'Do.mp4', 'Does Not.mp4',
  'E.mp4', 'Eat.mp4', 'Engineer.mp4',
  'F.mp4', 'Fight.mp4', 'Finish.mp4', 'From.mp4',
  'G.mp4', 'Glitter.mp4', 'Go.mp4', 'God.mp4', 'Gold.mp4', 'Good.mp4', 'Great.mp4',
  'H.mp4', 'Hand.mp4', 'Hands.mp4', 'Happy.mp4', 'Hello.mp4', 'Help.mp4', 'Her.mp4', 'Here.mp4', 'His.mp4', 'Home.mp4', 'Homepage.mp4', 'How.mp4',
  'I.mp4', 'Invent.mp4', 'It.mp4',
  'J.mp4', 'K.mp4', 'Keep.mp4',
  'L.mp4', 'Language.mp4', 'Laugh.mp4', 'Learn.mp4',
  'M.mp4', 'ME.mp4', 'More.mp4', 'My.mp4',
  'N.mp4', 'Name.mp4', 'Next.mp4', 'Not.mp4', 'Now.mp4',
  'O.mp4', 'Of.mp4', 'On.mp4', 'Our.mp4', 'Out.mp4',
  'P.mp4', 'Pretty.mp4',
  'Q.mp4',
  'R.mp4', 'Right.mp4',
  'S.mp4', 'Sad.mp4', 'Safe.mp4', 'See.mp4', 'Self.mp4', 'Sign.mp4', 'Sing.mp4', 'So.mp4', 'Sound.mp4', 'Stay.mp4', 'Study.mp4',
  'T.mp4', 'Talk.mp4', 'Television.mp4', 'Thank You.mp4', 'Thank.mp4', 'That.mp4', 'They.mp4', 'This.mp4', 'Those.mp4', 'Time.mp4', 'To.mp4', 'Type.mp4',
  'U.mp4', 'Us.mp4',
  'V.mp4',
  'W.mp4', 'Walk.mp4', 'Wash.mp4', 'Way.mp4', 'We.mp4', 'Welcome.mp4', 'What.mp4', 'When.mp4', 'Where.mp4', 'Which.mp4', 'Who.mp4', 'Whole.mp4', 'Whose.mp4', 'Why.mp4', 'Will.mp4', 'With.mp4', 'Without.mp4', 'Words.mp4', 'Work.mp4', 'World.mp4', 'Wrong.mp4',
  'X.mp4',
  'Y.mp4', 'You.mp4', 'Your.mp4', 'Yourself.mp4',
  'Z.mp4'
];

interface ASLVideoPlayerProps {
  isPlaying: boolean;
  isFullscreen: boolean;
  playbackSpeed?: number; // 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0
  className?: string;
}

export default function ASLVideoPlayer({
  isPlaying,
  isFullscreen,
  playbackSpeed = 1.0,
  className = ''
}: ASLVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentClip, setCurrentClip] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Load new ASL video
  const loadNewASLVideo = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ASL_CLIPS.length);
    const selectedClip = ASL_CLIPS[randomIndex];
    const videoUrl = `/videos/${selectedClip}`;
    
    setCurrentClip(videoUrl);
    setIsVideoLoaded(false);
  }, []);

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      }
    }
  }, [isPlaying, playbackSpeed]);

  // Handle video ended - load next clip (consolidated logic)
  const handleVideoEnded = useCallback(() => {
    if (isPlaying) {
      loadNewASLVideo();
    }
  }, [isPlaying, loadNewASLVideo]);

  // Sync with main video playback
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      if (!currentClip) {
        loadNewASLVideo();
      } else {
        videoRef.current.play().catch(console.error);
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentClip, loadNewASLVideo]);

  // Load initial video on mount
  useEffect(() => {
    loadNewASLVideo();
  }, [loadNewASLVideo]);

  // Update playback rate when speed changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <div className={`relative ${className}`}>
      {/* ASL Video Container */}
      <div className={`relative ${isFullscreen ? 'w-32 h-32' : 'w-48 h-48'} mx-auto`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: isPlaying ? [1, 1.02, 1] : 1,
          }}
          transition={{ 
            duration: 0.3,
            scale: { repeat: isPlaying ? Infinity : 0, duration: 2 }
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-blue-400 bg-black"
        >
          {currentClip && (
            <video
              ref={videoRef}
              src={currentClip}
              className="w-full h-full object-cover"
              muted
              playsInline
              onLoadedData={handleVideoLoaded}
              onEnded={handleVideoEnded}
              onError={() => {
                console.error('Error loading ASL video:', currentClip);
                // Try loading a different video on error
                setTimeout(loadNewASLVideo, 1000);
              }}
            />
          )}

          {/* Loading indicator */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {/* Play/Pause indicator */}
          <div className="absolute top-2 right-2">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>

          {/* ASL indicator */}
          <div className="absolute top-2 left-2">
            <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              ASL
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status indicator */}
      {!isFullscreen && (
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            {isPlaying ? 'Interpreting...' : 'Paused'}
          </div>
        </div>
      )}
    </div>
  );
}