import { Skeleton } from '@cadence-support/components';
import styles from './Placeholder.module.scss';

export const Placeholder = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Skeleton className={styles.heading} />
      </div>
      <div className={styles.container}>
        {' '}
        <Skeleton className={styles.task} />
        <Skeleton className={styles.task} />
        <Skeleton className={styles.task} />
        <Skeleton className={styles.task} />
        <Skeleton className={styles.task} />
      </div>
    </div>
  );
};
