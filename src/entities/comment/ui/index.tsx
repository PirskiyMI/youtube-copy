import { FC, useState } from 'react';

import { useShowMore } from 'src/shared/lib/hooks';
import { getFromNow, getNoun } from 'src/shared/lib/helpers';
import { Avatar } from 'src/shared/ui/avatar';

import styles from './styles.module.scss';
import { TopLevelCommentProps } from '../types';
import { ReplyComment } from './reply-comment';

export const Comment: FC<TopLevelCommentProps> = ({
   authorDisplayName,
   publishedAt,
   textDisplay,
   replies,
   totalReplyCount,
}) => {
   const [isCommentsShow, setIsCommentsShow] = useState(false);
   const { ref, isTextShow, isButtonShow, toggleIsTextShow } = useShowMore();

   const formattedPublishAt = getFromNow(publishedAt);
   const totalReplyCountNoun = totalReplyCount
      ? getNoun(Number(totalReplyCount), 'ответ', 'ответа', 'ответов')
      : null;

   return (
      <div className={styles.comment}>
         <Avatar />
         <div className={styles.comment__content}>
            <div className={styles.comment__header}>
               <h3 className={styles.comment__author}>{authorDisplayName}</h3>
               <span>{formattedPublishAt}</span>
            </div>
            <div
               ref={ref}
               className={
                  isTextShow
                     ? styles.comment__text
                     : `${styles.comment__text} ${styles.comment__text_hidden}`
               }>
               {textDisplay}
            </div>

            {isButtonShow ? (
               <button onClick={toggleIsTextShow} className={styles.comment__open}>
                  {!isTextShow ? 'Читать дальше' : 'Свернуть'}
               </button>
            ) : null}
            {totalReplyCount ? (
               <>
                  <button
                     className={styles.comment__button}
                     onClick={() => setIsCommentsShow(!isCommentsShow)}>
                     {totalReplyCount} {totalReplyCountNoun}
                  </button>
                  {isCommentsShow && replies ? (
                     <ul className={styles.comment__list}>
                        {replies.map((el) => (
                           <li key={el.id}>
                              <ReplyComment {...el} />
                           </li>
                        ))}
                     </ul>
                  ) : null}
               </>
            ) : null}
         </div>
      </div>
   );
};
