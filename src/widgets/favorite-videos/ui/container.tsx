import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';

import {
   getFavoriteVideoError,
   getFavoriteVideoListSelector,
   getFavoriteVideoLoading,
} from '../model/selectors';
import { favoriteVideosActions } from '../model/slice';
import { fetchFavoriteVideo } from '../model/thunks';
import { FavoriteVideoList } from './ui';

export const FavoriteVideosContainer: FC = () => {
   const videoList = useAppSelector(getFavoriteVideoListSelector);
   const error = useAppSelector(getFavoriteVideoError);
   const loading = useAppSelector(getFavoriteVideoLoading);
   const { resetState } = favoriteVideosActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchFavoriteVideo());
      return () => {
         dispatch(resetState());
      };
   }, []);

   if (error) {
      return <div>Не удается загрузить список понравившихся видео</div>;
   }
   if (!videoList) {
      return <Preloader />;
   }

   return <FavoriteVideoList loading={loading} videoList={videoList} />;
};
