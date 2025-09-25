# Sign Language Avatar Prototype

A prototype featuring a sign language avatar that displays ASL videos synchronized with content playback.

## Features

✨ **Interactive Video Upload**
- Drag & drop video files
- Support for video URLs (YouTube, Vimeo, direct links)
- Multiple format support (MP4, WebM, AVI, MOV)
- Clean tabbed interface

🎭 **Animated Sign Language Avatar**
- Multiple gesture patterns (wave, point, expressiveHands, counting, explanation)
- Smooth CSS animations using Framer Motion
- Synchronizes with video playback state
- Fullscreen-aware positioning

📺 **Advanced Video Player**
- Custom controls with play/pause, volume, fullscreen
- Progress bar with seek functionality
- Keyboard shortcuts (spacebar for play/pause)
- Loading states and error handling

🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Smooth transitions and hover effects
- Glass morphism effects
- Status indicators and loading states

## How to Use

1. **Upload a Video**: Either drag & drop a video file or paste a video URL
2. **Watch the Avatar**: The animated avatar will start performing sign language gestures when the video plays
3. **Fullscreen Mode**: Enter fullscreen and the avatar will stick to the bottom-right corner
4. **Controls**: Use the video controls or keyboard shortcuts to control playback

## Technical Implementation

### Components

- **VideoUpload**: Handles file upload and URL input with drag & drop support
- **VideoPlayer**: Custom video player with fullscreen support and state management
- **SignLanguageAvatar**: Animated avatar with multiple gesture patterns

### Technologies

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Lucide React** for icons

### State Management

The application uses React hooks to manage:
- Video source and loading states
- Play/pause state synchronization
- Fullscreen state handling
- Avatar animation coordination

## Demo Mode

This is a frontend-only prototype demonstrating the concept of AI-powered sign language translation. The avatar performs placeholder gestures and doesn't interpret actual sign language content from videos.

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

The application will be available at `http://localhost:3000`.

## Future Enhancements

- Real sign language interpretation using AI/ML
- Multiple avatar styles and appearances
- Gesture customization and configuration
- Video analytics and playbook statistics
- Accessibility improvements for hearing-impaired users

## Acknowledgments

- ASL video assets provided by [Original Author Name] under MIT License
- Original repository: https://github.com/[USERNAME]/[REPOSITORY-NAME]
- Special thanks to the open source community for making educational ASL content available

## License Compliance

This project includes third-party assets. See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for detailed attribution information and license compliance details.
