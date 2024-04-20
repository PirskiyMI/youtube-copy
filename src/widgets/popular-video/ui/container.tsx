import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';

import { PopularVideoList } from './ui';
import { fetchPopularVideo } from '../model/thunks';
import { getPopularVideoListSelector, getPopularVideoLoading } from '../model/selectors';

export const PopularVideoListContainer: FC = () => {
   const videoList = useAppSelector(getPopularVideoListSelector);
   const loading = useAppSelector(getPopularVideoLoading);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchPopularVideo({ maxResults: 20 }));
   }, []);

   if (!videoList.length) return <Preloader />;

   return <PopularVideoList videoList={videoList} loading={loading} />;
};
