
import { ContentItem, ContentType } from './types';

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'pbi-1',
    type: ContentType.POWERBI,
    title: 'Sales Dashboard',
    description: 'Quarterly sales performance report.',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiYjllMWE4YjctNDdlYy00NDc3LWI2ZDItY2IzYWM2Y2M2Nzk5IiwidCI6ImZhMTU5N2Y2LWI3ZDYtNDc5Yy05YmMzLTg4MWI2NTVhYjliZiIsImMiOjEwfQ%3D%3D',
  },
  {
    id: 'img-1',
    type: ContentType.IMAGE,
    title: 'Mountain Landscape',
    description: 'A serene view of mountains at dusk.',
    src: 'https://picsum.photos/1920/1080?random=1',
  },
  {
    id: 'vid-1',
    type: ContentType.VIDEO,
    title: 'Ocean Waves',
    description: 'Calm ocean waves on a beach.',
    src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  },
  {
    id: 'yt-1',
    type: ContentType.YOUTUBE,
    title: 'Tech Talk',
    description: 'A presentation on future technology.',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
  },
    {
    id: 'img-2',
    type: ContentType.IMAGE,
    title: 'City Skyline',
    description: 'A vibrant city skyline at night.',
    src: 'https://picsum.photos/1920/1080?random=2',
  },
];
