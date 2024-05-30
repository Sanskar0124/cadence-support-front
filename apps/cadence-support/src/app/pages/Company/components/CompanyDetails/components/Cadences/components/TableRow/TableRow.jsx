import React from 'react';
import styles from './Tablerow.module.scss';
import {
  CadencesGradient,
  LeadsGradient,
  Paused,
} from '@cadence-support/icons';
import { ProgressiveImg } from '@cadence-support/components';
import moment from 'moment';
import Placeholder from '../Placeholder/Placeholder';
import { STATUS_LABELS_CL_NAMES } from '../../../../../MemberDetails/components/EmployeeTable/components/Cadence/constants';
import { getLabelFromEnum } from '@cadence-support/utils';
import { CADENCE_STATUS } from '@cadence-support/constants';
import cadenceTypes from 'libs/constants/src/lib/cadenceTypes';

const TableRow = ({ data, handler, loading }, ref) => {
  return loading ? (
    <Placeholder rows={1} />
  ) : (
    <div
      className={`${styles.row} ${styles.cadenceCard}`}
      ref={ref}
      onClick={() => handler(data)}
    >
      <div className={styles.col}>
        <div>
          <CadencesGradient />
        </div>
        <div className={styles.cadenceInfo}>
          <div className={styles.top}>
            <span>{data?.type}</span>
            <i>•</i>
            <span>{data?.Nodes?.length ?? '0'} steps</span>
            <i>•</i>
            <span>{moment(data?.created_at).fromNow(true)}</span>
          </div>
          <div className={styles.bottom}>{data?.name}</div>
        </div>
      </div>
      <div className={`${styles.col} ${styles.templateCardCreatedBy}`}>
        <div>
          <span className={styles.profile}>
            <ProgressiveImg
              className={styles.userProfilePicture}
              src={
                data?.User?.is_profile_picture_present
                  ? data?.User?.profile_picture
                  : 'https://cdn.ringover.com/img/users/default.jpg'
              }
            />
          </span>
          <div className={styles.createdByDetails}>
            <span>
              {data?.User?.first_name} {data?.User?.last_name}{' '}
            </span>
          </div>
        </div>
        <div>
          <span className={styles.profile}>
            <ProgressiveImg
              className={styles.userProfilePicture}
              src={
                data?.User?.Sub_Department?.is_profile_picture_present
                  ? data?.User?.Sub_Department?.profile_picture
                  : 'https://cdn.ringover.com/img/users/default.jpg'
              }
            />
          </span>
          <div className={styles.createdByDetails}>
            <span>
              {data.type === cadenceTypes.TEAM
                ? data.Sub_Department?.name
                : data.User?.Sub_Department?.name}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.col}>
        {moment(data.created_at).format('DD/MM/YY')}
      </div>

      <div className={`${styles.col} ${styles.leads}`}>
        <span className={styles.capsule}>
          {' '}
          <LeadsGradient size="16px" />
          <span>{data.LeadToCadences?.length}</span>
        </span>
      </div>
      <div className={`${styles.status} ${styles.col}`}>
        <span className={`${styles[STATUS_LABELS_CL_NAMES[data.status]]}`}>
          {getLabelFromEnum(data.status)}
          {data?.status === CADENCE_STATUS.PAUSED && (
            <span
              className={styles.pausedIcon}
              tooltip={`Until ${moment(data.unix_resume_at).format('LLL')}`}
            >
              <Paused height="12" />
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default React.forwardRef(TableRow);
