import { MouseEvent, FC, useState } from 'react';

import styles from './styles.module.scss';

interface IProps {
   publishedAt: string;
   description: string;
   viewCount: string;
   viewNoun: string;
}

export const VideoInfo: FC<IProps> = ({ viewCount, viewNoun, publishedAt, description }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

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
            <span>
               {viewCount} {viewNoun}
            </span>
            <span>{publishedAt}</span>
         </div>
         <div
            className={
               isOpen
                  ? `${styles.info__content} ${styles.info__content_active}`
                  : styles.info__content
            }
            dangerouslySetInnerHTML={{ __html: description }}
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
