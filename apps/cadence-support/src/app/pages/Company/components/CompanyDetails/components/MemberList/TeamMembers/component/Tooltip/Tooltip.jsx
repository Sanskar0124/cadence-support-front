import { useState } from 'react';
import styles from './Tooltip.module.scss';
import { GoogleBox } from '@cadence-support/icons';
import moment from 'moment';

const THEMES = {
  BOTTOM: 'bottom',
};

const Tooltip = ({
  children,
  icon,
  date,
  token,
  tooltipFor,
  theme = 'BOTTOM',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const googleTrackingDate = date?.find(
    (item) => item?.activity === 'google_signin'
  );
  return (
    <div
      className={styles.tooltip_container}
      onMouseEnter={
        tooltipFor === 'google' && token
          ? () => setIsVisible(true)
          : () => setIsVisible(false)
      }
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltipcard} ${styles[THEMES[theme]]}`}>
          <div className={styles.tooltipcard_title}>{icon}</div>
          <div className={styles.tooltipcard_content}>
            Last connected on{' '}
            {tooltipFor === 'google' &&
              moment(googleTrackingDate?.created_at).format('DD MMMM, YYYY')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
