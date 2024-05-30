import { Div, Skeleton } from '@cadence-support/components';
import styles from './placeholder.module.scss';

export const Placeholder = () => {
  return (
    <>
      {[...Array(6)].map((_, j) => (
        <div className={styles.card}>
          <div className={styles.left}>
            <div className={styles.round}>
              <Skeleton className={styles.skeleton} />
            </div>
            <div className={styles.info}>
              <Div className={styles.name} loading></Div>
              <Div className={styles.name} loading></Div>
            </div>
          </div>
          <div className={styles.right}>
            <Div className={styles.btn} loading></Div>
          </div>
        </div>
      ))}
    </>
  );
};
