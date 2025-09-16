
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
