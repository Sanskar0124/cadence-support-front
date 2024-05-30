/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { ICONS_MAP } from './constants';
import styles from './TaskCard.module.scss';
import {
  CustomTask,
  CustomTaskGradient,
  Star,
  Timezone,
} from '@cadence-support/icons';
import { CUSTOM_TASK_NODE_IDS, ENUMS } from '@cadence-support/constants';
import { Colors } from '@cadence-support/utils';
import { Div, Tooltip } from '@cadence-support/components';
import moment from 'moment';
import 'moment-timezone';
import { getTaskEnum } from '../utils';
import { VIEW_MODES } from '../../constants';

import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { TooltipThemes } from '@cadence-support/themes';

const TaskCard = (
  {
    userTimeZone,
    task,
    onClick,
    active,
    cardInfoWidth,
    viewMode,
    loading = false,
    disabled,
  },
  ref
) => {
  const user = useRecoilValue(userInfo);
  const [timeString, setTimeString] = useState('');

  const [taskEnum, setTaskEnum] = useState({});

  useEffect(() => {
    setTaskEnum(ENUMS[task?.Node?.type ?? task?.name]);
  }, [task?.Node?.type, task?.name]);

  useEffect(() => {
    if (task?.Lead && task?.Lead.Lead_phone_numbers) {
      let ph =
        task?.Lead.Lead_phone_numbers.filter((phone) => phone.is_primary)[0] ||
        task?.Lead.Lead_phone_numbers[0];
      if (ph?.timezone) {
        setTimeString(
          new Date()
            .toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: `${ph?.timezone}`,
            })
            .toUpperCase() + `, ${ph?.timezone}`
        );
      } else setTimeString(null);
    }
  }, [task?.Lead?.Lead_phone_numbers, task?.Lead]);

  return (
    <Div
      loading={loading}
      className={`${styles.card} ${active ? styles.active : ''} ${
        loading ? styles.loading : ''
      } ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      ref={ref}
    >
      <div className={styles.left}>
        <div className={styles.icon}>
          {taskEnum?.icon?.gradient ??
            (ENUMS['linkedin']?.type[getTaskEnum(task)] ? (
              ENUMS['linkedin'].icon?.gradient
            ) : (
              <CustomTaskGradient />
            ))}
        </div>
        <div className={styles.taskInfo}>
          <div>
            {task?.Task?.Cadence && (
              <>
                <span>
                  Step {task?.Node?.step_number}/
                  {task?.Task?.Cadence?.Nodes.length}
                </span>
                <i>•</i>
              </>
            )}
            <span>{taskEnum?.name}</span>
            {taskEnum?.name && <i>•</i>}
            <span>
              {moment(
                task?.Task?.completed
                  ? task?.Task?.complete_time
                  : CUSTOM_TASK_NODE_IDS.includes(task?.Node?.node_id)
                  ? task?.Task?.start_time
                  : task?.Task?.shown_time
              ).fromNow()}
            </span>
          </div>
          <div>
            <p>{task?.Task?.Cadence?.name ?? 'Custom Task'}</p>
          </div>
        </div>
        {viewMode !== VIEW_MODES.TASK && (
          <div className={styles.leadInfo}>
            <div>
              <span>{task?.Lead?.Account?.name ?? ''}</span>

              {task?.Lead?.Account?.size && (
                <>
                  <i>•</i>
                  <span>{task?.Lead?.Account?.size ?? ''}</span>
                </>
              )}
            </div>
            <div>
              {timeString && (
                <Tooltip
                  theme={TooltipThemes.RIGHT}
                  text={timeString}
                  className={styles.timezone}
                >
                  <Timezone
                    color={
                      moment.tz(userTimeZone).format('z') ===
                      moment
                        .tz(
                          task?.Lead.Lead_phone_numbers.filter(
                            (phone) => phone.is_primary
                          )[0]?.timezone ||
                            task?.Lead.Lead_phone_numbers[0]?.timezone
                        )
                        .format('z')
                        ? Colors.lightBlue
                        : Colors.orange
                    }
                    size="1.2rem"
                  />
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.idLabels}>
          <p>
            Lead ID: <span> {task?.Task?.Lead?.lead_id}</span>
          </p>
          <p>
            Task ID: <span> {task?.Task?.task_id}</span>
          </p>
        </div>
        <div className={styles.tags}>
          {!!task?.completed && <div className={styles.done}>Done</div>}
          {!!task?.Node?.isLate && <div className={styles.late}>Late</div>}
          {!!task?.Node?.is_urgent && (
            <div className={styles.urgent}>Urgent</div>
          )}
          {CUSTOM_TASK_NODE_IDS.includes(task?.Node?.node_id) && (
            <div className={styles.custom}>Custom</div>
          )}
          {!!task?.Lead?.duplicate && (
            <div className={styles.duplicate}>Duplicate</div>
          )}
        </div>
      </div>
    </Div>
  );
};

export default React.forwardRef(TaskCard);
