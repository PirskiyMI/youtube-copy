import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from 'src/shared';
import { categoryActions } from '../model/reducers';

const chipList = ['Все', 'Видеоигры', 'Музыка', 'Джемы', 'Анимация', 'Просмотрено'];

export const Chips: FC = () => {
   const [selected, setSelected] = useState('Все');
   const { setSearchCategory } = categoryActions;
   const dispatch = useAppDispatch();

   return (
      <div className={styles.chips}>
         <ul className={styles.chips__list}>
            {chipList.map((el) => (
               <li
                  key={el}
                  onClick={() => {
                     setSelected(el);
                     dispatch(setSearchCategory(el));
                  }}
                  className={
                     selected === el
                        ? `${styles.chips__item} ${styles.chips__item_selected}`
                        : styles.chips__item
                  }>
                  {el}
               </li>
            ))}
         </ul>
      </div>
   );
};
