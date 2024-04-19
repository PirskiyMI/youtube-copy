import { Response } from 'src/shared/lib/types';

import { IVideo } from './video-type';

export interface VideoResponse extends Response {
   items: IVideo[];
   nextPageToken: string;
}
