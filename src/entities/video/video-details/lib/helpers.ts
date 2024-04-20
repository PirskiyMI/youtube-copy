import moment from 'moment';
import { getCount, getFromNow, getNoun } from 'src/shared/lib/helpers';

interface Arguments {
   viewCount: string;
   publishedAt: string;
   duration?: string;
}

export const formatVideoDetails = (
   args: Arguments,
): { viewCount: string; viewNoun: string; publishedAt: string; duration?: string } => {
   const publishedAt = getFromNow(args.publishedAt);
   const viewCount = getCount(args.viewCount);
   const viewNoun = getNoun(Number(args.viewCount), 'просмотр', 'просмотра', 'просмотров');

   return { viewCount, viewNoun, publishedAt };
};

export const formatVideoDuration = (duration: string): string => {
   const seconds = moment.duration(duration).asSeconds();
   const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');

   return formattedDuration;
};
