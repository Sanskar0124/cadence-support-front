import styles from './SingleSkipSettings.module.scss';

import { LEVEL_TO_NAME } from './constants';
import { useEffect, useState } from 'react';
import { Title } from '@cadence-support/components';
import { Select, TaskStack } from '@cadence-support/widgets';
import { SETTING_PRIORITY } from '@cadence-support/constants';

const SingleSkipSettings = ({
  data,
  setData,
  exception,
  users,
  subDepartments,
}) => {
  const [value, setValue] = useState(data);

  useEffect(() => {
    let reasons = data.skip_reasons;
    if (exception) setData({ ...value, skip_reasons: reasons });
    else
      setData((prev) => ({
        ...prev,
        ...value,
        exceptions: prev.exceptions,
        skip_reasons: reasons,
      }));
  }, [value]);

  return (
    <div
      className={`${styles.singleBounceSetting} ${
        exception ? styles.exception : ''
      }`}
    >
      {exception && (
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            Selected {LEVEL_TO_NAME[value?.priority]}
          </Title>
          <div className={styles.description}></div>
          <div>
            <Select
              width={'40%'}
              value={value ?? 'Deleted Group'}
              setValue={setValue}
              name={
                value.priority === SETTING_PRIORITY.USER ? 'user_id' : 'sd_id'
              }
              options={
                value.priority === SETTING_PRIORITY.USER
                  ? users
                  : subDepartments
              }
              isSearchable
              disabled
            />
          </div>
        </div>
      )}
      <div className={styles.setting}>
        {data?.skip_reasons?.map((reason, index) => (
          <div
            className={`${styles.inputDisplay} ${styles.maxTasks}`}
            key={index}
          >
            {reason}
          </div>
        ))}
        <div className={styles.taskOptions}>
          <TaskStack
            value={value}
            name={['skip_allowed_tasks']}
            className={exception ? styles.exceptionStack : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleSkipSettings;
