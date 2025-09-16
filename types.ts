export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  YOUTUBE = 'YOUTUBE',
  POWERBI = 'POWERBI',
  BLANK = 'BLANK',
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  src: string;
}

// --- New Types for Real-time Communication ---

export interface PresentationState {
  activeContent: ContentItem | null;
}

export interface ServerToClientEvents {
  'display-update': (state: PresentationState) => void;
}

export interface ClientToServerEvents {
  'content-change': (content: ContentItem | null) => void;
  'navigate': (direction: 'next' | 'previous') => void;
  'sync-request': () => void;
}
