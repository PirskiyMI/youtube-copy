import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { getCount, getNoun } from 'src/shared/lib/helpers';
import { Avatar } from 'src/shared/ui/avatar';

import styles from './styles.module.scss';
import { getChannelData } from '../model/selectors';
import { fetchChannelDetails } from '../api/fetch-channel-details';

interface IProps {
   channelId: string;
}

export const Channel: FC<IProps> = ({ channelId }) => {
   const { title, subscriberCount } = useAppSelector(getChannelData);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchChannelDetails(channelId));
   }, [channelId]);

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
