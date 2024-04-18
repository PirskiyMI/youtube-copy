import { IVideo } from 'src/entities/video';

interface PageInfo {
   totalResults: number;
   resultsPerPage: number;
}
export interface Response {
   kind: string;
   etag: string;
   items: IVideo[];
   nextPageToken: string;
   pageInfo: PageInfo;
}
