import { Skeleton } from '@cadence-support/components';

import styles from './Placeholder.module.scss';

export const Placeholder = ({ rows = 10 }) => {
  return (
    <div className={styles.liveFeedsPlaceholder}>
      {new Array(rows).fill(0).map(() => (
        <Skeleton className={styles.sk} />
      ))}
    </div>
  );
};
