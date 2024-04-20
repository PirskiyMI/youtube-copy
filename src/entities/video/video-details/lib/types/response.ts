import { Response } from 'src/shared/lib/types';

import { VideoWithDetails, Video } from './video';

export interface VideoResponse extends Response {
   items: Video[];
   nextPageToken: string;
}

export interface VideoWithDetailsResponse extends Response {
   items: VideoWithDetails[];
   nextPageToken: string;
}
