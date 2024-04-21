import { useParams } from 'react-router-dom';

import { VideoListBySearch } from 'src/widgets/video-by-search';

import styles from './styles.module.scss';

export const SearchPage = () => {
   const { searchValue } = useParams();

   return (
      <div className={styles.search}>
         <VideoListBySearch searchValue={searchValue!} />
      </div>
   );
};
