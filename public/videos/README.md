# Videos Directory

This directory contains video files used in the Project Exodus UI Library documentation.

## Adding Videos

1. Place your video files in this directory
2. Use MP4 format (H.264) for best browser compatibility
3. Optimize videos for web before adding:
   - Compress to reasonable file sizes
   - Recommended: max 1080p resolution
   - Keep file sizes under 50MB when possible

## Usage in Components

Reference videos in this directory using the path `/videos/filename.mp4`:

```tsx
<VideoPlayerContent
  src="/videos/project-exodus-demo.mp4"
  slot="media"
  muted
  preload="auto"
/>
```

## Current Videos

### project-exodus-demo.mp4
**Purpose:** HTML5 video player examples in documentation
**Status:** To be added
**Instructions:** Upload your Project Exodus demo video with this filename

## Optimization Tips

### Compress Videos
Use tools like HandBrake or FFmpeg to optimize videos:

```bash
# Using FFmpeg to compress and optimize
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

### Recommended Settings
- **Format:** MP4 (H.264)
- **Resolution:** 1920x1080 or lower
- **Frame rate:** 30fps or lower
- **Bitrate:** 2-5 Mbps for HD video
- **Audio:** AAC, 128kbps

## Alternative Hosting

For production, consider using dedicated video hosting:
- **Cloudflare R2** - Free tier available
- **AWS S3 + CloudFront** - Scalable CDN
- **Bunny.net** - Affordable video CDN
- **Mux** - Video API platform

These services provide:
- Global CDN distribution
- Automatic quality adaptation
- Better streaming performance
- Lower bandwidth costs at scale
