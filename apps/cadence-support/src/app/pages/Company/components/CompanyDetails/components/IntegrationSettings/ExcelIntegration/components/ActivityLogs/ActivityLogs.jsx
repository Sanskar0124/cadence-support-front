import styles from './ActivityLogs.module.scss';
import moment from 'moment';
import { useActivityLogs } from '@cadence-support/data-access';
import { Toggle } from '@cadence-support/widgets';

export const activityStatus = (enabled) => {
  if (enabled) {
    return 'Activity synced';
  } else {
    return 'Activity not synced';
  }
};

function ActivityLogs({ companyID }) {
  const { activityLogs } = useActivityLogs(companyID);
  const data = activityLogs?.activity_to_log;

  const updatedOn = `Last updated on ${moment(activityLogs?.updated_at).format(
    'DD MMM YYYY'
  )}`;

  return (
    <div className={styles.activityLogs}>
      <div className={styles.rowTitle}>
        <h1>Sync your calendar activities with Excel</h1>
      </div>

      <div className={styles.rowValue}>
        <div className={styles.activity}>
          {' '}
          <Toggle checked={data?.CALENDAR?.enabled} theme="PURPLE" disabled />
          <h2>{activityStatus(data?.CALENDAR?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>

      <div className={styles.rowTitle}>
        <h1>Sync your email activities with Excel</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.activity}>
          {' '}
          <Toggle checked={data?.MAIL?.enabled} theme="PURPLE" disabled />
          <h2>{activityStatus(data?.MAIL?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>
      <div className={styles.rowTitle}>
        <h1>Sync your note activities with Excel</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.activity}>
          {' '}
          <Toggle checked={data?.NOTE?.enabled} theme="PURPLE" disabled />
          <h2>{activityStatus(data?.NOTE?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>

      <div className={styles.rowTitle}>
        <h1>Sync your sms activities with Excel</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.activity}>
          {' '}
          <Toggle checked={data?.SMS?.enabled} theme="PURPLE" disabled />
          <h2>{activityStatus(data?.SMS?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>

      <div className={styles.rowTitle}>
        <h1>Sync your call activities with Excel</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.activity}>
          {' '}
          <Toggle checked={data?.CALL?.enabled} theme="PURPLE" disabled />
          <h2>{activityStatus(data?.CALL?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>
    </div>
  );
}

export default ActivityLogs;
