import { Response } from 'src/shared';
import { IVideo } from './video-type';

export interface VideoResponse extends Response {
   items: IVideo[];
   nextPageToken: string;
}
