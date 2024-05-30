import styles from './Placeholder.module.scss';
import { Skeleton } from '@cadence-support/components';

const Placeholder = ({ rows = 10 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <Skeleton className={styles.placeholder} />
      ))}
    </>
  );
};

export default Placeholder;
