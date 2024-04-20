export interface Response {
   kind: string;
   etag: string;
   pageInfo: PageInfo;
}
export interface Localized {
   title: string;
   description: string;
}
export interface PageInfo {
   totalResults: number;
   resultsPerPage: number;
}
export interface Thumbnails {
   default: Thumbnail;
   medium: Thumbnail;
   high: Thumbnail;
}
export interface Thumbnail {
   url: string;
   width: number;
   height: number;
}
