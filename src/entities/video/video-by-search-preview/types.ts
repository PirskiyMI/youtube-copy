import { Thumbnail } from 'src/shared/lib/types';

export interface VideoBySearchPreviewProps extends VideoBySearchPreviewDetails {
   viewNoun: string;
}

export interface VideoBySearchPreviewDetails {
   channelTitle: string;
   title: string;
   description: string;
   publishedAt: string;
   duration: string;
   viewCount: string;
   thumbnail: Thumbnail;
}
