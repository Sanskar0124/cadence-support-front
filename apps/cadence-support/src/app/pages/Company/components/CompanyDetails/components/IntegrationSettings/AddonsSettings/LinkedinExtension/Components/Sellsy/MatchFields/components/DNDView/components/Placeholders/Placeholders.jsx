import { Skeleton } from '@cadence-support/components';
import styles from './Placeholders.module.scss';

export const SingleSkeleton = ({ className = '' }) => (
  <Skeleton className={`${styles.singleSkeleton} ${className}`} />
);

export const SFFieldsPlaceholder = () => {
  return (
    <div className={styles.sfPlaceholder}>
      {Array.from(Array(10).keys()).map((j, i) => (
        <SingleSkeleton />
      ))}
    </div>
  );
};

export const RFFieldPlaceholder = () => {
  return (
    <div className={styles.rfPlaceholder}>
      <SingleSkeleton />
    </div>
  );
};
