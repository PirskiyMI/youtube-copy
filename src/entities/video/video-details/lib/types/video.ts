import { Localized, Thumbnail, Thumbnails } from 'src/shared/lib/types';

interface Snippet<T> {
   publishedAt: string;
   channelId: string;
   title: string;
   description: string;
   thumbnails: T;
   channelTitle: string;
   tags: string[];
   categoryId: string;
   liveBroadcastContent: string;
   localized: Localized;
   defaultAudioLanguage: string;
}

interface VideoThumbnails extends Thumbnails {
   standard: Thumbnail;
   maxres: Thumbnail;
}

export interface Statistics {
   viewCount: string;
   likeCount: string;
   favoriteCount: string;
   commentCount: string;
}

export interface ContentDetails {
   duration: string;
   dimension: string;
   definition: string;
   caption: string;
   licensedContent: boolean;
   contentRating: unknown;
   projection: string;
}

export interface VideoWithDetails {
   kind: string;
   etag: string;
   id: string;
   snippet: Snippet<VideoThumbnails>;
   statistics: Statistics;
   contentDetails: ContentDetails;
}

interface VideoID {
   kind: string;
   videoId: string;
}

export interface Video {
   kind: string;
   etag: string;
   id: VideoID;
   snippet: Snippet<VideoThumbnails>;
}
