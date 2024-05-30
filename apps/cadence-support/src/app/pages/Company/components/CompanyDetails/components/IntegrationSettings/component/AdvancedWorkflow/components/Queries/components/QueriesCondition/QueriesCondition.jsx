import styles from './QueriesCondition.module.scss';
import { Input } from '@cadence-support/widgets';

const QueriesCondition = ({ originalFilter, level }) => {
  const datevalue = new Date(
    originalFilter?.condition?.value
  ).toLocaleDateString();

  return (
    <div>
      <div className={styles.criteriaSubWrapper}>
        <div className={styles.outsideNode}>
          <div className={`${styles.firstNode}`}>
            <div className={styles.criteria}>
              <Input
                value={originalFilter?.condition?.integration_label}
                disabled
              />

              {originalFilter?.condition?.integration_field && (
                <div className={styles.typeTwo}>
                  <Input value={originalFilter?.condition?.equator} disabled />

                  {originalFilter?.condition?.integration_data_type ===
                  'date' ? (
                    <Input
                      value={datevalue}
                      left
                      className={styles.inputDate}
                      width={'100%'}
                      disabled
                    />
                  ) : (
                    <Input value={originalFilter?.condition?.value} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueriesCondition;
