import { IStatistics } from './video-statistics';
import { Localized, Thumbnails } from 'src/shared';

interface Snippet {
   publishedAt: string;
   channelId: string;
   title: string;
   description: string;
   thumbnails: VideoThumbnails;
   channelTitle: string;
   tags: string[];
   categoryId: string;
   liveBroadcastContent: string;
   localized: Localized;
   defaultAudioLanguage: string;
}
interface VideoThumbnails extends Thumbnails {
   standard: Standard;
   maxres: Maxres;
}
interface Standard {
   url: string;
   width: number;
   height: number;
}
interface Maxres {
   url: string;
   width: number;
   height: number;
}
interface ContentRating {}
export interface ContentDetails {
   duration: string;
   dimension: string;
   definition: string;
   caption: string;
   licensedContent: boolean;
   contentRating: ContentRating;
   projection: string;
}
interface IVideoID {
   kind: string;
   videoId: string;
}
export interface IVideo {
   kind: string;
   etag: string;
   id: string | IVideoID;
   snippet: Snippet;
   statistics?: IStatistics;
   contentDetails?: ContentDetails;
}
