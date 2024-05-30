import { ENUMS } from '@cadence-support/constants';
import Checkbox from '../Checkbox/Checkbox';

import styles from './TaskStack.module.scss';

const TaskStack = ({ value, setValue, className, name, ...rest }) => {
  return (
    <div className={`${styles.taskStack} ${className ?? ''}`} {...rest}>
      {Object.keys(ENUMS)
        ?.filter(
          (item) => item !== 'automated_mail' && item !== 'automated_message'
        )
        ?.map((enu, index) => {
          const { name: taskName, icon, is_task } = ENUMS[enu];

          return is_task ? (
            <div className={styles.task} key={index}>
              <div className={styles.taskCheckBox}>
                <Checkbox
                  disabled
                  checked={value?.[name[0]]?.[enu]}
                  onChange={(value) => {
                    setValue((prev) => ({
                      ...prev,
                      [name[0]]: {
                        ...prev?.[name[0]],
                        [enu]: value,
                      },
                      [name[1]]: {
                        ...prev?.[name[1]],
                        [enu]: value,
                      },
                    }));
                  }}
                />
              </div>
              <div className={styles.taskIcon}>{icon.default}</div>
              <div className={styles.taskName}>{taskName}</div>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default TaskStack;

//takes in an object and updates its name properties
