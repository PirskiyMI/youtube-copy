import { FC } from 'react';

import { getCount, getNoun } from 'src/shared/lib/helpers';
import { Avatar } from 'src/shared/ui/avatar';

import styles from './styles.module.scss';

interface Props {
   title: string;
   subscriberCount: string;
}

export const Channel: FC<Props> = ({ title, subscriberCount }) => {
   const formattedSubscriberCount = getCount(subscriberCount);
   const subscriberCountNoun = getNoun(
      Number(subscriberCount),
      'подписчик',
      'подписчика',
      'подписчиков',
   );

   return (
      <div className={styles.channel}>
         <Avatar />
         <div className={styles.channel__info}>
            <h4 className={styles.channel__title}>{title}</h4>
            <span>
               {formattedSubscriberCount} {subscriberCountNoun}
            </span>
         </div>
      </div>
   );
};
