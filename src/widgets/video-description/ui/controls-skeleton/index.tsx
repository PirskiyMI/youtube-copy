import { FC } from 'react';

import { Skeleton } from 'src/shared/ui/skeleton';

import styles from './styles.module.scss';

export const ControlsSkeleton: FC = () => {
   return <Skeleton className={styles.skeleton} />;
};
