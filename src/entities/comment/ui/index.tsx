import { FC, ReactNode, useState } from 'react';

import { Avatar, getFromNow, getNoun, useShowMore } from 'src/shared';

import styles from './styles.module.scss';
import { IComment } from '..';
import { ReplyComment } from './reply-comment';

interface IProps extends IComment {
   like?: { count: string; button: ReactNode };
   dislike?: { count: string; button: ReactNode };
}

export const Comment: FC<IProps> = ({
   snippet: { topLevelComment, totalReplyCount },
   replies,
   like,
   dislike,
}) => {
   const [isCommentsShow, setIsCommentsShow] = useState(false);
   const {
      snippet: { publishedAt, textDisplay, authorDisplayName },
   } = topLevelComment;
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
               }
               dangerouslySetInnerHTML={{ __html: textDisplay }}></div>

            {isButtonShow ? (
               <button onClick={toggleIsTextShow} className={styles.comment__open}>
                  {!isTextShow ? 'Читать дальше' : 'Свернуть'}
               </button>
            ) : null}

            {like && dislike && (
               <div className={styles.comment__controls}>
                  <div className={styles.comment__control}>
                     {like.button} <span>{like.count}</span>
                  </div>
                  <div className={styles.comment__control}>
                     {dislike.button} <span>{dislike.count}</span>
                  </div>
               </div>
            )}

            {totalReplyCount ? (
               <>
                  <button
                     className={styles.comment__button}
                     onClick={() => setIsCommentsShow(!isCommentsShow)}>
                     {totalReplyCount} {totalReplyCountNoun}
                  </button>
                  {isCommentsShow ? (
                     <ul className={styles.comment__list}>
                        {replies?.comments.map((el) => (
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
