import { Thumbnail } from 'src/shared/lib/types';

export interface VideoPreviewRelatedProps {
   channelTitle: string;
   title: string;
   publishedAt: string;
   thumbnail: Thumbnail;
   duration: string;
   viewCount: string;
}
