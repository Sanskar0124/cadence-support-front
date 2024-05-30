import { Skeleton } from '@cadence-support/components';
import styles from './Placeholder.module.scss';

const Placeholder = ({ rows = 10 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <div key={i}>
          <Skeleton className={styles.placeholder} />
        </div>
      ))}
    </>
  );
};

export default Placeholder;
