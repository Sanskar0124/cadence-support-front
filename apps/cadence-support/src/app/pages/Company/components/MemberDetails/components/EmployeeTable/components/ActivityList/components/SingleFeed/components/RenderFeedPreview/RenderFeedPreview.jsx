import moment from 'moment';
//components
import { AudioPlayer } from '@cadence-support/widgets';
import { NotePen } from '@cadence-support/icons';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { Colors, getLabelFromEnum } from '@cadence-support/utils';
import { Tooltip, Button, Skeleton } from '@cadence-support/components';

import { CADENCE_STATUS } from '@cadence-support/constants';
//constants
import { Pause, Stop } from '@cadence-support/icons';
import styles from './RenderFeedPreview.module.scss';

const RenderFeedPreview = ({ activity, handleActivityActions, cadence }) => {
  const stripHtml = (html) => {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  const renderComponent = ({ activity, handleActivityActions, cadence }) => {
    switch (activity?.type) {
      case 'mail':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'call':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>
              <span>{activity?.name}</span>
              {activity?.comment && (
                <div className={styles.note} tooltip={activity.comment}>
                  <NotePen size="14px" />
                </div>
              )}
            </div>
          </div>
        );
      case 'message':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'linkedin_connection':
      case 'linkedin_message':
      case 'linkedin_profile':
      case 'linkedin_interact':
        return (
          <div
            className={`${styles.activityPreview} ${styles[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'voicemail':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'note':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );

      case 'meeting':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'move_cadence':
      case 'stop_cadence':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'pause_cadence':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'resume_cadence':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'lead_converted':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'lead_disqualified':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'contact_disqualified':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'launch_cadence':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'unsubscribe':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'task_skipped':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      case 'out_of_office':
        return (
          <div
            className={`${styles.activityPreview} ${styles?.[activity?.type]}`}
          >
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
      default:
        return (
          <div className={styles.activityPreview}>
            <div className={styles.title}>{activity?.name}</div>
          </div>
        );
    }
  };
  return renderComponent({ activity, handleActivityActions, cadence });
};

export default RenderFeedPreview;
