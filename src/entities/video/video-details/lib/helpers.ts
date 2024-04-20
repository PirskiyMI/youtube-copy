import moment from 'moment';
import { getCount, getFromNow, getNoun } from 'src/shared/lib/helpers';

interface Arguments {
   viewCount: string;
   duration: string;
   publishedAt: string;
}

export const formatVideoDetails = (args: Arguments) => {
   const publishedAt = getFromNow(args.publishedAt);
   const viewCount = getCount(args.viewCount);
   const viewNoun = getNoun(Number(args.viewCount), 'просмотр', 'просмотра', 'просмотров');

   const seconds = moment.duration(args.duration).asSeconds();
   const duration = moment.utc(seconds * 1000).format('mm:ss');

   return { viewCount, duration, publishedAt, viewNoun };
};
