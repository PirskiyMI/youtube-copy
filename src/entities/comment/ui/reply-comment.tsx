import { FC } from 'react';
import moment from 'moment';

import { useShowMore } from 'src/shared/lib/hooks';
import { Avatar } from 'src/shared/ui/avatar';

import { IReplyComment } from '../lib/types';
import styles from './styles.module.scss';

export const ReplyComment: FC<IReplyComment> = ({
   snippet: { authorDisplayName, textDisplay, publishedAt },
}) => {
   const { ref, isTextShow, isButtonShow, toggleIsTextShow } = useShowMore();

   return (
      <div className={styles.comment}>
         <Avatar />
         <div className={styles.comment__content}>
            <div className={styles.comment__header}>
               <h3 className={styles.comment__author}>{authorDisplayName}</h3>
               <span>{moment(publishedAt).fromNow()}</span>
            </div>
            <p
               ref={ref}
               className={
                  isTextShow
                     ? styles.comment__text
                     : `${styles.comment__text} ${styles.comment__text_hidden}`
               }>
               {textDisplay}
            </p>

            {isButtonShow ? (
               <button onClick={toggleIsTextShow} className={styles.comment__open}>
                  {!isTextShow ? 'Читать дальше' : 'Свернуть'}
               </button>
            ) : null}
         </div>
      </div>
   );
};
