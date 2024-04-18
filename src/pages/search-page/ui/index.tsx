import { VideoBySearch } from 'src/widgets/video-by-search';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';

export const SearchPage = () => {
   const { searchValue } = useParams();

   return (
      <div className={styles.search}>
         <VideoBySearch searchValue={searchValue!} />
      </div>
   );
};
