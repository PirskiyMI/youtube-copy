import { Localized, Thumbnails } from "src/shared/lib/types";

export interface ChannelResponse extends Response {
   items: Item[];
}
interface Item {
   kind: string;
   etag: string;
   id: string;
   snippet: Snippet;
   contentDetails: ContentDetails;
   statistics: Statistics;
}
interface Snippet {
   title: string;
   description: string;
   customUrl: string;
   publishedAt: string;
   thumbnails: Thumbnails;
   localized: Localized;
   country: string;
}
interface ContentDetails {
   relatedPlaylists: RelatedPlaylists;
}
interface RelatedPlaylists {
   likes: string;
   uploads: string;
}
interface Statistics {
   viewCount: string;
   subscriberCount: string;
   hiddenSubscriberCount: boolean;
   videoCount: string;
}
