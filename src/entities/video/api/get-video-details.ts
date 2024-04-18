import { request } from 'src/shared';
import { VideoResponse } from '../lib/types/response-type';

export const getVideoDetails = async (id: string) => {
   return await request
      .get<VideoResponse>('/videos', {
         params: {
            part: 'contentDetails, statistics',
            id,
         },
      })
      .then((res) => ({
         duration: res.data.items[0].contentDetails?.duration,
         viewCount: res.data.items[0].statistics?.viewCount,
      }));
};
