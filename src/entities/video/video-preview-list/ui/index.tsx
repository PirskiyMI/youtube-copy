import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
   children: ReactNode;
}

export const VideoPreviewList: FC<Props> = ({ children }) => {
   return <ul className={styles.list}>{children}</ul>;
};
