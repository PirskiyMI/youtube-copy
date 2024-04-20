import { Thumbnail } from 'src/shared/lib/types';

export interface VideoPreviewProps extends VideoPreviewDetails {
   viewNoun: string;
}

export interface VideoPreviewDetails {
   channelTitle: string;
   title: string;
   publishedAt: string;
   thumbnail: Thumbnail;
   duration: string;
   viewCount: string;
}
