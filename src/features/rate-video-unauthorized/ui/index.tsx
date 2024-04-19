import { FC, ReactNode, lazy } from 'react';

import { usePopup } from 'src/shared/lib/hooks';
import { LikeCounter } from 'src/shared/ui/like-counter';

const Popup = lazy(async () => {
   const { Popup } = await import('src/shared/ui/popup');
   return { default: Popup };
});

import styles from './styles.module.scss';

interface Props {
   likeCount: string;
   authButton: ReactNode;
}

export const RateVideoUnauthorized: FC<Props> = ({ likeCount, authButton }) => {
   const { isPopupVisible, showPopup, hidePopup } = usePopup();

   return (
      <div className={styles.counter}>
         <LikeCounter
            likeCount={likeCount}
            rate="none"
            onLikeClick={showPopup}
            onDislikeClick={showPopup}
         />
         {isPopupVisible && (
            <Popup
               title="Хотите оценить это видео?"
               text="Тогда войдите в аккаунт."
               hidePopup={hidePopup}
               button={authButton}
            />
         )}
      </div>
   );
};
