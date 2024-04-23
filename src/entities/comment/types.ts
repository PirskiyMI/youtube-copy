import { Response } from 'src/shared/lib/types';

export interface TopLevelCommentProps extends CommentProps {
   totalReplyCount?: number;
   replies?: CommentProps[];
}

export interface CommentProps {
   id: string;
   publishedAt: string;
   textDisplay: string;
   authorDisplayName: string;
}

export interface CommentResponse extends Response {
   nextPageToken: string;
   items: Comment[];
}

interface Comment {
   kind: string;
   etag: string;
   id: string;
   snippet: Snippet;
   replies?: {
      comments: IReplyComment[];
   };
}

export interface Snippet {
   channelId: string;
   videoId: string;
   topLevelComment: TopLevelComment;
   canReply: boolean;
   totalReplyCount: number;
   isPublic: boolean;
}

interface TopLevelComment {
   kind: string;
   etag: string;
   id: string;
   snippet: CommentSnippet;
}

interface CommentSnippet {
   channelId: string;
   videoId: string;
   textDisplay: string;
   textOriginal: string;
   authorDisplayName: string;
   authorProfileImageUrl: string;
   authorChannelUrl: string;
   authorChannelId: AuthorChannelId;
   canRate: boolean;
   viewerRating: string;
   likeCount: number;
   publishedAt: string;
   updatedAt: string;
}

interface AuthorChannelId {
   value: string;
}

interface IReplyComment {
   kind: string;
   etag: string;
   id: string;
   snippet: ReplyCommentSnippet;
}

interface ReplyCommentSnippet extends CommentSnippet {
   parentId: string;
}
