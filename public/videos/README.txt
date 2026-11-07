# Video Folder for Anuradha's Birthday Album 🎥

You can drop any video files (.mp4, .webm, .mov) into this folder: `public/videos/`

### Example:
1. Save your video here as `anu_video_1.mp4`.
2. In `src/data/defaultContent.ts`, you can add a memory with:
```ts
{
  id: 'mem-video-1',
  url: '',
  mediaType: 'video',
  videoUrl: './videos/anu_video_1.mp4',
  caption: 'Moments of laughter & magic ✨',
  date: 'Precious Memories',
  location: 'Special Keepsake',
  note: 'A video that always brings back the sweetest smiles.',
  rotation: 1.2,
  tapeColor: 'gold',
  tags: ['All', 'Anu Special'],
}
```
The album will automatically display an interactive video player with play/pause, loop, and full-screen view!
