import moment from 'moment';

export const formatVideoDuration = (duration: string): string => {
   const seconds = moment.duration(duration).asSeconds();
   const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');

   return formattedDuration;
};
