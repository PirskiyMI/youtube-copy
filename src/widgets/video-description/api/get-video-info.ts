import { request } from 'src/shared';
import { VideoResponse } from 'src/entities/video';

export const getVideoInfo = async (id: string) => {
   return await request
      .get<VideoResponse>('/videos', {
         params: {
            part: 'snippet,statistics',
            id: id,
         },
      })
      .then((res) => {
         const { description, title, channelId, publishedAt } = res.data.items[0].snippet;
         const { likeCount, viewCount } = res.data.items[0].statistics!;
         return {
            snippet: { description, title, channelId, publishedAt },
            statistics: { likeCount, viewCount },
         };
      });
};
