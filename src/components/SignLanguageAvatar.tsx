'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SignLanguageAvatarProps {
  isPlaying: boolean;
  isFullscreen: boolean;
  className?: string;
}

export default function SignLanguageAvatar({ 
  isPlaying, 
  isFullscreen, 
  className = '' 
}: SignLanguageAvatarProps) {
  const [currentGesture, setCurrentGesture] = useState(0);

  // Define realistic sign language gesture animations
  const gestures = [
    {
      name: 'hello',
      duration: 2.0,
      rightArm: { 
        initial: { rotate: -90, y: -20, x: 8 },
        animate: { 
          rotate: [-90, -80, -90], 
          y: [-20, -18, -20],
          x: [8, 10, 8]
        }
      },
      rightHand: {
        initial: { rotate: 0, scaleX: 1.2, scaleY: 0.8 },
        animate: { 
          rotate: [0, -15, 0],
          scaleX: [1.2, 0.9, 1.2],
          scaleY: [0.8, 1.1, 0.8]
        }
      },
      leftArm: { 
        initial: { rotate: 20, y: -5, x: -3 },
        animate: { rotate: [20, 25, 20], y: [-5, -7, -5], x: [-3, -4, -3] }
      },
      leftHand: {
        initial: { rotate: 0, scaleX: 1 },
        animate: { rotate: [0, 5, 0], scaleX: [1, 0.9, 1] }
      },
      head: {
        initial: { rotate: 0, x: 0 },
        animate: { rotate: [0, 2, 0], x: [0, 1, 0] }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.03, 1] }
      }
    },
    {
      name: 'thank_you',
      duration: 2.5,
      rightArm: { 
        initial: { rotate: -45, y: -12, x: 6 },
        animate: { 
          rotate: [-45, -30, -45], 
          y: [-12, -8, -12],
          x: [6, 8, 6]
        }
      },
      rightHand: {
        initial: { rotate: -10, scaleX: 1.1, scaleY: 0.9 },
        animate: { 
          rotate: [-10, 10, -10],
          scaleX: [1.1, 1.3, 1.1],
          scaleY: [0.9, 0.7, 0.9]
        }
      },
      leftArm: { 
        initial: { rotate: 45, y: -12, x: -6 },
        animate: { 
          rotate: [45, 30, 45], 
          y: [-12, -8, -12],
          x: [-6, -8, -6]
        }
      },
      leftHand: {
        initial: { rotate: 10, scaleX: 1.1, scaleY: 0.9 },
        animate: { 
          rotate: [10, -10, 10],
          scaleX: [1.1, 1.3, 1.1],
          scaleY: [0.9, 0.7, 0.9]
        }
      },
      head: {
        initial: { rotate: 0, y: 0 },
        animate: { rotate: [0, -2, 0], y: [0, -1, 0] }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.05, 1] }
      }
    },
    {
      name: 'please',
      duration: 2.2,
      rightArm: { 
        initial: { rotate: -40, y: -8, x: 4 },
        animate: { 
          rotate: [-40, -35, -45, -40], 
          y: [-8, -6, -10, -8],
          x: [4, 5, 3, 4]
        }
      },
      rightHand: {
        initial: { rotate: 0, scaleX: 1.2, scaleY: 0.8 },
        animate: {
          rotate: [0, 5, -5, 0],
          scaleX: [1.2, 1.1, 1.3, 1.2],
          scaleY: [0.8, 0.9, 0.7, 0.8]
        }
      },
      leftArm: { 
        initial: { rotate: 15, y: -3, x: -2 },
        animate: { rotate: [15, 18, 12, 15], y: [-3, -4, -2, -3], x: [-2, -3, -1, -2] }
      },
      leftHand: {
        initial: { rotate: 0, scaleX: 1 },
        animate: { rotate: [0, 2, -2, 0], scaleX: [1, 0.95, 1.05, 1] }
      },
      head: {
        initial: { rotate: 0, y: 0 },
        animate: { rotate: [0, 1, -1, 0], y: [0, -0.5, 0.5, 0] }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.02, 0.98, 1] }
      }
    },
    {
      name: 'numbers',
      duration: 5,
      rightArm: { 
        initial: { rotate: -60, y: -15, x: 6 },
        animate: { 
          rotate: [-60, -50, -60, -55, -60], 
          y: [-15, -12, -15, -13, -15],
          x: [6, 7, 6, 6.5, 6]
        }
      },
      rightHand: {
        initial: { rotate: 0, scaleX: 0.6, scaleY: 1.4 },
        animate: {
          rotate: [0, 10, -5, 15, 0],
          scaleX: [0.6, 0.4, 0.8, 0.5, 0.6],
          scaleY: [1.4, 1.6, 1.2, 1.5, 1.4]
        }
      },
      leftArm: { 
        initial: { rotate: 60, y: -15, x: -6 },
        animate: { 
          rotate: [60, 50, 60, 55, 60], 
          y: [-15, -12, -15, -13, -15],
          x: [-6, -7, -6, -6.5, -6]
        }
      },
      leftHand: {
        initial: { rotate: 0, scaleX: 0.6, scaleY: 1.4 },
        animate: {
          rotate: [0, -10, 5, -15, 0],
          scaleX: [0.6, 0.4, 0.8, 0.5, 0.6],
          scaleY: [1.4, 1.6, 1.2, 1.5, 1.4]
        }
      },
      head: {
        initial: { rotate: 0, x: 0 },
        animate: { rotate: [0, -2, 2, -1, 0], x: [0, -0.5, 0.5, -0.25, 0] }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.01, 0.99, 1.005, 1] }
      }
    },
    {
      name: 'questions',
      duration: 3.2,
      rightArm: { 
        initial: { rotate: -20, y: -8, x: 4 },
        animate: { 
          rotate: [-20, -35, -5, -25, -20], 
          y: [-8, -12, -4, -10, -8],
          x: [4, 7, 1, 5, 4]
        }
      },
      rightHand: {
        initial: { rotate: 30, scaleX: 0.9, scaleY: 1.1 },
        animate: {
          rotate: [30, 50, 10, 40, 30],
          scaleX: [0.9, 0.7, 1.1, 0.8, 0.9],
          scaleY: [1.1, 1.3, 0.9, 1.2, 1.1]
        }
      },
      leftArm: { 
        initial: { rotate: 35, y: -12, x: -5 },
        animate: { 
          rotate: [35, 20, 50, 30, 35], 
          y: [-12, -16, -8, -14, -12],
          x: [-5, -8, -2, -6, -5]
        }
      },
      leftHand: {
        initial: { rotate: -25, scaleX: 1.1, scaleY: 0.9 },
        animate: {
          rotate: [-25, -40, -10, -30, -25],
          scaleX: [1.1, 0.8, 1.3, 1, 1.1],
          scaleY: [0.9, 1.1, 0.7, 1, 0.9]
        }
      },
      head: {
        initial: { rotate: 0, y: 0 },
        animate: { rotate: [0, 4, -4, 2, 0], y: [0, -2, 2, -1, 0] }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.06, 0.96, 1.03, 1] }
      }
    },
    {
      name: 'emotions',
      duration: 3.5,
      rightArm: { 
        initial: { rotate: -50, y: -16, x: 7 },
        animate: { 
          rotate: [-50, -30, -65, -40, -50], 
          y: [-16, -20, -12, -18, -16],
          x: [7, 10, 4, 8, 7]
        }
      },
      rightHand: {
        initial: { rotate: -15, scaleX: 1.2, scaleY: 0.8 },
        animate: {
          rotate: [-15, 5, -35, -10, -15],
          scaleX: [1.2, 0.8, 1.4, 1, 1.2],
          scaleY: [0.8, 1.2, 0.6, 1, 0.8]
        }
      },
      leftArm: { 
        initial: { rotate: 10, y: -2, x: -1 },
        animate: { 
          rotate: [10, 25, -5, 15, 10], 
          y: [-2, -6, 2, -4, -2],
          x: [-1, -3, 1, -2, -1]
        }
      },
      leftHand: {
        initial: { rotate: 5, scaleX: 0.8, scaleY: 1.1 },
        animate: {
          rotate: [5, -10, 20, 0, 5],
          scaleX: [0.8, 1, 0.6, 0.9, 0.8],
          scaleY: [1.1, 0.9, 1.3, 1, 1.1]
        }
      },
      head: {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: { 
          rotate: [0, -4, 6, -2, 0], 
          x: [0, -2, 3, -1, 0],
          y: [0, 1, -2, 0.5, 0]
        }
      },
      face: {
        initial: { scale: 1 },
        animate: { scale: [1, 0.95, 1.08, 0.98, 1] }
      }
    }
  ];

  // Cycle through gestures when playing
  useEffect(() => {
    if (!isPlaying) return;

    const currentGestureData = gestures[currentGesture];
    const timer = setTimeout(() => {
      setCurrentGesture((prev) => (prev + 1) % gestures.length);
    }, currentGestureData.duration * 1000);

    return () => clearTimeout(timer);
  }, [currentGesture, isPlaying, gestures]);

  const currentGestureData = gestures[currentGesture];

  return (
    <div className={`${className} ${isFullscreen ? 'fixed bottom-4 right-4 z-50' : ''}`}>
      <div className={`relative ${isFullscreen ? 'w-32 h-40' : 'w-40 h-48'} bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl shadow-lg border-2 border-white overflow-hidden`}>
        {/* Avatar Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Head */}
          <motion.div
            initial={currentGestureData.head.initial}
            animate={isPlaying ? currentGestureData.head.animate : currentGestureData.head.initial}
            transition={{ 
              duration: currentGestureData.duration, 
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="relative mb-2"
          >
            {/* Face */}
            <motion.div 
              initial={currentGestureData.face?.initial || { scale: 1 }}
              animate={isPlaying ? (currentGestureData.face?.animate || { scale: 1 }) : (currentGestureData.face?.initial || { scale: 1 })}
              transition={{ 
                duration: currentGestureData.duration, 
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
              className={`${isFullscreen ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border-2 border-amber-300 relative`}
            >
              {/* Eyes with expressions */}
              <motion.div 
                animate={isPlaying ? { 
                  scaleY: [1, 0.8, 1.2, 1],
                  y: [0, 1, -1, 0]
                } : {}}
                transition={{ 
                  duration: currentGestureData.duration * 0.7, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute top-3 left-2 w-2 h-2 bg-gray-800 rounded-full"
              />
              <motion.div 
                animate={isPlaying ? { 
                  scaleY: [1, 0.8, 1.2, 1],
                  y: [0, 1, -1, 0]
                } : {}}
                transition={{ 
                  duration: currentGestureData.duration * 0.7, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute top-3 right-2 w-2 h-2 bg-gray-800 rounded-full"
              />
              
              {/* Eyebrows */}
              <motion.div 
                animate={isPlaying ? { 
                  rotate: [0, -5, 5, 0],
                  y: [0, -0.5, 0.5, 0]
                } : {}}
                transition={{ 
                  duration: currentGestureData.duration * 0.8, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute top-1.5 left-1.5 w-3 h-0.5 bg-gray-700 rounded-full"
              />
              <motion.div 
                animate={isPlaying ? { 
                  rotate: [0, 5, -5, 0],
                  y: [0, -0.5, 0.5, 0]
                } : {}}
                transition={{ 
                  duration: currentGestureData.duration * 0.8, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute top-1.5 right-1.5 w-3 h-0.5 bg-gray-700 rounded-full"
              />
              
              {/* Mouth with expressions */}
              <motion.div
                animate={isPlaying ? { 
                  scaleY: [1, 1.3, 0.7, 1.1, 1],
                  scaleX: [1, 0.9, 1.2, 0.95, 1],
                  y: [0, -1, 1, -0.5, 0]
                } : {}}
                transition={{ 
                  duration: currentGestureData.duration * 0.9, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-pink-400 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Body */}
          <div className={`${isFullscreen ? 'w-8 h-12' : 'w-10 h-16'} bg-gradient-to-b from-blue-300 to-blue-400 rounded-lg relative mb-1`}>
            {/* Left Arm */}
            <motion.div
              initial={currentGestureData.leftArm.initial}
              animate={isPlaying ? currentGestureData.leftArm.animate : currentGestureData.leftArm.initial}
              transition={{ 
                duration: currentGestureData.duration, 
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
              className={`absolute -left-2 top-1 ${isFullscreen ? 'w-1.5 h-6' : 'w-2 h-8'} bg-gradient-to-b from-amber-100 to-amber-200 rounded-full origin-top`}
            >
              {/* Left Hand with detailed fingers */}
              <motion.div
                initial={currentGestureData.leftHand?.initial || { rotate: 0, scaleX: 1, scaleY: 1 }}
                animate={isPlaying ? (currentGestureData.leftHand?.animate || { rotate: [0, 10, -10, 0], scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 0.9, 1.1, 1] }) : (currentGestureData.leftHand?.initial || { rotate: 0, scaleX: 1, scaleY: 1 })}
                transition={{ 
                  duration: currentGestureData.duration, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className={`absolute -bottom-1 -left-0.5 ${isFullscreen ? 'w-2 h-2' : 'w-3 h-3'} bg-amber-200 rounded-lg border border-amber-300 relative`}
              >
                {/* Finger details - arranged like real fingers */}
                <motion.div 
                  animate={isPlaying ? { rotate: [0, -5, 5, 0], scaleX: [1, 0.8, 1.2, 1] } : {}}
                  className="absolute -top-0.5 left-0 w-0.5 h-1 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, 2, -2, 0], scaleY: [1, 1.3, 0.7, 1] } : {}}
                  className="absolute -top-0.5 left-0.5 w-0.5 h-1.5 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, -2, 2, 0], scaleY: [1, 1.2, 0.8, 1] } : {}}
                  className="absolute -top-0.5 right-0.5 w-0.5 h-1.5 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, 5, -5, 0], scaleX: [1, 0.9, 1.1, 1] } : {}}
                  className="absolute -top-0.5 right-0 w-0.5 h-1 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, 10, -10, 0], scaleY: [1, 0.8, 1.2, 1] } : {}}
                  className="absolute -left-0.5 top-0.5 w-1 h-0.5 bg-amber-300 rounded-full"
                />
              </motion.div>
            </motion.div>

            {/* Right Arm */}
            <motion.div
              initial={currentGestureData.rightArm.initial}
              animate={isPlaying ? currentGestureData.rightArm.animate : currentGestureData.rightArm.initial}
              transition={{ 
                duration: currentGestureData.duration, 
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
              className={`absolute -right-2 top-1 ${isFullscreen ? 'w-1.5 h-6' : 'w-2 h-8'} bg-gradient-to-b from-amber-100 to-amber-200 rounded-full origin-top`}
            >
              {/* Right Hand with detailed fingers */}
              <motion.div
                initial={currentGestureData.rightHand?.initial || { rotate: 0, scaleX: 1, scaleY: 1 }}
                animate={isPlaying ? (currentGestureData.rightHand?.animate || { rotate: [0, -10, 10, 0], scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 0.9, 1.1, 1] }) : (currentGestureData.rightHand?.initial || { rotate: 0, scaleX: 1, scaleY: 1 })}
                transition={{ 
                  duration: currentGestureData.duration, 
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                  delay: 0.1
                }}
                className={`absolute -bottom-1 -right-0.5 ${isFullscreen ? 'w-2 h-2' : 'w-3 h-3'} bg-amber-200 rounded-lg border border-amber-300 relative`}
              >
                {/* Finger details - arranged like real fingers */}
                <motion.div 
                  animate={isPlaying ? { rotate: [0, 5, -5, 0], scaleX: [1, 1.2, 0.8, 1] } : {}}
                  className="absolute -top-0.5 left-0 w-0.5 h-1 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, -2, 2, 0], scaleY: [1, 1.3, 0.7, 1] } : {}}
                  className="absolute -top-0.5 left-0.5 w-0.5 h-1.5 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, 2, -2, 0], scaleY: [1, 1.2, 0.8, 1] } : {}}
                  className="absolute -top-0.5 right-0.5 w-0.5 h-1.5 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, -5, 5, 0], scaleX: [1, 0.9, 1.1, 1] } : {}}
                  className="absolute -top-0.5 right-0 w-0.5 h-1 bg-amber-300 rounded-full"
                />
                <motion.div 
                  animate={isPlaying ? { rotate: [0, -10, 10, 0], scaleY: [1, 0.8, 1.2, 1] } : {}}
                  className="absolute -right-0.5 top-0.5 w-1 h-0.5 bg-amber-300 rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Legs */}
          <div className="flex space-x-1">
            <div className={`${isFullscreen ? 'w-1.5 h-6' : 'w-2 h-8'} bg-gradient-to-b from-blue-400 to-blue-500 rounded-full`}></div>
            <div className={`${isFullscreen ? 'w-1.5 h-6' : 'w-2 h-8'} bg-gradient-to-b from-blue-400 to-blue-500 rounded-full`}></div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-2 right-2">
          <motion.div
            animate={isPlaying ? { 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            } : { scale: 1, opacity: 0.3 }}
            transition={{ 
              duration: 1, 
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
            className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-gray-400'}`}
          />
        </div>

        {/* Gesture Name Label (only in non-fullscreen mode) */}
        {!isFullscreen && isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm border"
          >
            {currentGestureData.name}
          </motion.div>
        )}

        {/* Paused Overlay */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center"
          >
            <div className="text-gray-600 text-xs font-medium">Paused</div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Mode Label */}
      {isFullscreen && (
        <div className="absolute -top-6 left-0 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          Sign Language Avatar
        </div>
      )}
    </div>
  );
}