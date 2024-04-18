import { ChangeEvent, useEffect, useState } from 'react';
import { Button, useAppDispatch } from 'src/shared';
import styles from './styles.module.scss';
import { addComment } from '../api/add-comment';

export const CommentForm = ({ videoId }: { videoId: string }) => {
   const [isFetch, setIsFetch] = useState(false);
   const [text, setText] = useState('');
   const dispatch = useAppDispatch();

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
   };

   useEffect(() => {
      if (isFetch) {
         dispatch(addComment({ videoId, text }));
         setText('');
         setIsFetch(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, isFetch]);

   const handleAddCommit = () => {
      setIsFetch(true);
   };

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleAddCommit();
         }}
         className={styles.form}>
         <input
            value={text}
            onChange={onChange}
            placeholder="Введите комментарий"
            className={styles.form__field}
         />
         <Button className={styles.form__button} disabled={text.length < 1}>
            Оставить комментарий
         </Button>
      </form>
   );
};
