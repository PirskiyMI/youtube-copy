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
   default: Default;
   medium: Medium;
   high: High;
}
interface Default {
   url: string;
   width: number;
   height: number;
}
interface Medium {
   url: string;
   width: number;
   height: number;
}
interface High {
   url: string;
   width: number;
   height: number;
}
