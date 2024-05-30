import React from 'react';
import styles from './PhoneSettings.module.scss';
import moment from 'moment';
import { useActivityLogs, usePhoneSystem } from '@cadence-support/data-access';
import { Toggle } from '@cadence-support/widgets';
import { RingoverLogo } from '@cadence-support/icons';
import { activityStatus } from '../ActivityLogs/ActivityLogs';

function PhoneSettings({ companyID }) {
  const { phoneSystem } = usePhoneSystem(companyID);
  const { activityLogs } = useActivityLogs(companyID);
  const updatedOn = `Last updated on ${moment(phoneSystem?.updated_at).format(
    'DD MMM YYYY'
  )}`;
  return (
    <div className={styles.phoneSettings}>
      <div className={styles.rowTitle}>
        <h1>Curent phone system</h1>
      </div>

      <div className={styles.rowValue}>
        <div className={styles.logo}>
          <RingoverLogo height={30} /> <h1>Ringover</h1>
        </div>
        <h3>{updatedOn}</h3>
      </div>

      <div className={styles.rowTitle}>
        <h1>Sync your SMS activities with Excel</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.activity}>
          <Toggle
            checked={activityLogs?.activity_to_log?.SMS?.enabled}
            theme="PURPLE"
            disabled
          />
          <h2>{activityStatus(activityLogs?.activity_to_log?.SMS?.enabled)}</h2>
        </div>
        <h3>{updatedOn}</h3>
      </div>
    </div>
  );
}

export default PhoneSettings;
