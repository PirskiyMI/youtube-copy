import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';

import { VideoListBySearch } from './ui';
import { fetchVideoBySearch } from '../model/thunks';

interface Props {
   searchValue: string;
}

export const VideoListBySearchContainer: FC<Props> = ({ searchValue }) => {
   const videoList = useAppSelector((state) => state.videoBySearch.videoList);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchVideoBySearch(searchValue));
   }, [searchValue, dispatch]);

   if (!videoList.length)
      return (
         <div className="preloader">
            <Preloader />
         </div>
      );

   return <VideoListBySearch videoList={videoList} />;
};
