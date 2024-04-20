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
   console.log(args.publishedAt);

   const publishedAt = getFromNow(args.publishedAt);
   const viewCount = getCount(args.viewCount);
   const viewNoun = getNoun(Number(args.viewCount), 'просмотр', 'просмотра', 'просмотров');

   if (args.duration) {
      const seconds = moment.duration(args.duration).asSeconds();
      const duration = moment.utc(seconds * 1000).format('mm:ss');

      return { viewCount, viewNoun, duration, publishedAt };
   }

   return { viewCount, viewNoun, publishedAt };
};
