import { getCount, getFromNow, getNoun } from 'src/shared/lib/helpers';

interface Arguments {
   viewCount: string;
   publishedAt: string;
}

export const formatVideoDetails = (
   args: Arguments,
): { viewCount: string; viewNoun: string; publishedAt: string } => {
   const publishedAt = getFromNow(args.publishedAt);
   const viewCount = getCount(args.viewCount);
   const viewNoun = getNoun(Number(args.viewCount), 'просмотр', 'просмотра', 'просмотров');

   return { viewCount, viewNoun, publishedAt };
};
