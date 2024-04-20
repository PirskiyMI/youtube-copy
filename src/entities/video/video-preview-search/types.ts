import { Thumbnail } from 'src/shared/lib/types';

export interface VideoPreviewSearchProps {
   channelTitle: string;
   title: string;
   description: string;
   publishedAt: string;
   duration: string;
   viewCount: string;
   viewNoun: string;
   thumbnail: Thumbnail;
}
