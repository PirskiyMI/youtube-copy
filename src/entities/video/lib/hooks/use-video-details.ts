import moment from 'moment';

import { getFromNow, getCount, getNoun } from 'src/shared/lib/helpers';

interface IProps {
   details: { viewCount: string; duration: string; publishedAt: string } | undefined;
}

export const useVideoDetails = ({ details }: IProps) => {
   if (typeof details === 'undefined') return;
   const formattedPublishedAt = getFromNow(details.publishedAt);
   const formattedViewCount = getCount(details.viewCount);
   const viewNoun = getNoun(Number(details.viewCount), 'просмотр', 'просмотра', 'просмотров');

   const seconds = moment.duration(details.duration).asSeconds();
   const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');

   return { formattedViewCount, formattedDuration, formattedPublishedAt, viewNoun };
};
