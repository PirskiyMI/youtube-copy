import { request } from 'src/shared/api';
import { VideoWithDetailsResponse } from '../lib/types/response';

export const fetchVideoDetails = async (id: string) => {
   return await request
      .get<VideoWithDetailsResponse>('/videos', {
         params: {
            part: 'contentDetails, statistics',
            id,
         },
      })
      .then((res) => ({
         duration: res.data.items[0].contentDetails.duration,
         viewCount: res.data.items[0].statistics.viewCount,
      }));
};
