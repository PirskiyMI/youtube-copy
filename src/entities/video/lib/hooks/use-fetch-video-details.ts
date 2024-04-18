import { useEffect, useState } from 'react';
import { getVideoDetails } from '../../api/get-video-details';
import { IStatistics } from '../types/video-statistics';
import { ContentDetails } from '../types';

export const useFetchVideoDetails = (initial: {
   isFetching: boolean;
   id: string;
   publishedAt: string;
   statistics?: IStatistics;
   contentDetails?: ContentDetails;
}) => {
   const [isFetching, setIsFetching] = useState<boolean>(initial.isFetching);
   const [data, setData] = useState<{
      duration: string;
      viewCount: string;
      publishedAt: string;
   }>();

   useEffect(() => {
      if (!initial.statistics && !initial.contentDetails) {
         const fetchVideo = async () => {
            setIsFetching(true);
            try {
               const { duration, viewCount } = await getVideoDetails(initial.id);
               if (duration && viewCount)
                  setData({ duration, viewCount, publishedAt: initial.publishedAt });
            } catch (error) {
               console.log(error);
            } finally {
               setIsFetching(false);
            }
         };

         fetchVideo();
      } else if (initial.statistics && initial.contentDetails) {
         setData({
            duration: initial.contentDetails.duration,
            viewCount: initial.statistics.viewCount,
            publishedAt: initial.publishedAt,
         });
         setIsFetching(false);
      }
   }, []);

   return { isFetching, data };
};
