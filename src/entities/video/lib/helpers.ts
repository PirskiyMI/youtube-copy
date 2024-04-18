import { IVideo } from '..';

export const isVideoIdString = (id: IVideo['id']): id is string => {
   if (typeof id === 'string') return true;
   return false;
};
