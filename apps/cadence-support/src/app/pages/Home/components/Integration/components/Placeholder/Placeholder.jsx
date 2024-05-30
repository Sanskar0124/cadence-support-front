import { Skeleton } from '@cadence-support/components';
import styles from './Placeholder.module.scss';

export const Placeholder = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.task} />
      <Skeleton className={styles.task} />
      <Skeleton className={styles.task} />
      <Skeleton className={styles.task} />
    </div>
  );
};
