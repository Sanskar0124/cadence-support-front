import React, { useContext, useEffect, useState } from 'react';
import styles from './Analytics.module.scss';
import { SocketContext } from '@cadence-support/context';
import { SOCKET_ON_EVENTS } from '@cadence-support/constants';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { Tasks as TASKS_TRANSLATION } from '@cadence-support/languages';

const Analytics = ({ taskActivity, user }) => {
  const [active, setActive] = useState('task');
  const [analytics, setAnalytics] = useState();
  const { addSocketHandler } = useContext(SocketContext);

  useEffect(() => {
    addSocketHandler({
      event_name: SOCKET_ON_EVENTS.TASK_SUMMARY,
      key: 'task_summary',
      handler: (summary) => {
        setAnalytics(summary);
      },
    });
  }, []);

  useEffect(() => {
    setAnalytics(taskActivity);
  }, [taskActivity]);

  return (
    <div className={styles.analytics}>
      <div
        onClick={() => setActive((prev) => (prev === 'task' ? '' : 'task'))}
        className={`${styles.task} ${active === 'task' ? styles.active : ''}`}
      >
        <span className={styles.text}>
          {TASKS_TRANSLATION.TODAY_YOU_FINISHED[user?.language?.toUpperCase()]}
        </span>
        <span>
          {analytics?.tasks ?? 0}{' '}
          {COMMON_TRANSLATION.TASKS[user?.language?.toUpperCase()]}
        </span>
      </div>
      <div
        onClick={() => setActive((prev) => (prev === 'call' ? '' : 'call'))}
        className={`${styles.call} ${active === 'call' ? styles.active : ''}`}
      >
        <span className={styles.text}>
          {TASKS_TRANSLATION.TODAY_YOU_HAD[user?.language?.toUpperCase()]}
        </span>
        <span>
          {analytics?.activities?.filter((t) => t.type === 'call')[0]?.count ??
            0}{' '}
          {TASKS_TRANSLATION.CALLS[user?.language?.toUpperCase()]}
        </span>
      </div>
      <div
        onClick={() =>
          setActive((prev) => (prev === 'message' ? '' : 'message'))
        }
        className={`${styles.message} ${
          active === 'message' ? styles.active : ''
        }`}
      >
        <span className={styles.text}>
          {TASKS_TRANSLATION.TODAY_YOU_SENT[user?.language?.toUpperCase()]}
        </span>
        <span>
          {analytics?.activities?.filter((t) => t.type === 'message')[0]
            ?.count ?? 0}{' '}
          {TASKS_TRANSLATION.SMS[user?.language?.toUpperCase()]}
        </span>
      </div>
      <div
        onClick={() => setActive((prev) => (prev === 'mail' ? '' : 'mail'))}
        className={`${styles.mail} ${active === 'mail' ? styles.active : ''}`}
      >
        <span className={styles.text}>
          {TASKS_TRANSLATION.TODAY_YOU_SENT[user?.language?.toUpperCase()]}
        </span>
        <span>
          {analytics?.activities?.filter((t) => t.type === 'mail')[0]?.count ??
            0}{' '}
          {TASKS_TRANSLATION.MAILS[user?.language?.toUpperCase()]}
        </span>
      </div>
    </div>
  );
};

export default Analytics;
