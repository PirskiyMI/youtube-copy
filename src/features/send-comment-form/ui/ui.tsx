import { ChangeEvent, FC, FormEvent, Dispatch, SetStateAction } from 'react';

import { Button } from 'src/shared/ui/button';

import styles from './styles.module.scss';

interface Props {
   commentText: string;
   setIsFetching: Dispatch<SetStateAction<boolean>>;
   setCommentText: Dispatch<SetStateAction<string>>;
}

export const SendCommentForm: FC<Props> = ({ commentText, setCommentText, setIsFetching }) => {
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCommentText(e.target.value);
   };

   const handleAddCommit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsFetching(true);
   };

   return (
      <form onSubmit={handleAddCommit} className={styles.form}>
         <input
            value={commentText}
            onChange={onChange}
            placeholder="Введите комментарий"
            className={styles.form__field}
         />
         <Button className={styles.form__button} disabled={commentText.length < 1}>
            Оставить комментарий
         </Button>
      </form>
   );
};
