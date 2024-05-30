import { Company } from '@cadence-support/icons';
import moment from 'moment';
import Placeholder from '../../../OngoingServices/components/Placeholder/Placeholder';
import styles from './CompanyActivities.module.scss';
import React from 'react';

const CompanyActivities = ({ activity, loading }, ref) => {
  return loading ? (
    <Placeholder rows={1} />
  ) : (
    <div className={styles.left} ref={ref}>
      <div className={styles.icon}>
        <Company />
        {/* <span className={styles.pausedIcon}>
            <SettingsBadge className={styles.pause} />
          </span> */}
      </div>

      <div className={styles.companyDetails}>
        <p>{activity?.name}</p>
        <p>{activity?.comment}</p>
      </div>

      <div className={styles.right}>
        <p className={styles.time}>
          {moment(activity?.created_at).format('HH:mm a, MMMM')}
        </p>
      </div>
    </div>
  );
};

export default React.forwardRef(CompanyActivities);
