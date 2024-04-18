import { MouseEvent, FC, useState } from 'react';
import styles from './styles.module.scss';
import { getFromNow, getCount } from 'src/shared';

interface IProps {
   publishedAt: string;
   viewCount: string;
   text: string;
}

export const VideoInfo: FC<IProps> = ({ viewCount, publishedAt, text }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const formattedPublishedAt = getFromNow(publishedAt);
   const formattedViewCount = getCount(viewCount);

   const handleOpen = () => setIsOpen(true);
   const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen(false);
   };

   return (
      <div
         className={isOpen ? `${styles.info} ${styles.info_active}` : styles.info}
         onClick={handleOpen}>
         <div className={styles.info__statistics}>
            <span>{formattedViewCount} просмотров</span> <span>{formattedPublishedAt}</span>
         </div>
         <div
            className={
               isOpen
                  ? `${styles.info__content} ${styles.info__content_active}`
                  : styles.info__content
            }
            dangerouslySetInnerHTML={{ __html: text }}
         />
         {isOpen ? (
            <button className={styles.info__button} onClick={handleClose}>
               Свернуть
            </button>
         ) : (
            <button className={styles.info__button}>ещё...</button>
         )}
      </div>
   );
};
