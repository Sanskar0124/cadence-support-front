import styles from './PeopleCard.module.scss';
import { NoLeads, Paused } from '@cadence-support/icons';
import {
  STEP_ICONS,
  STEP_NAME_MAP,
  CADENCE_STATUS,
  CADENCE_STATUS_MAP,
} from '../../../../../MemberDetails/components/EmployeeTable/components/Cadence/components/CadenceSteps/constants';
import Placeholder from '../Placeholder/Placeholder';
import { STATUS_LABELS_CL_NAMES } from '../../../../../MemberDetails/components/EmployeeTable/components/Cadence/constants';
import React from 'react';
import { getLabelFromEnum } from '@cadence-support/utils';

function PeopleCard({ lead, loading }, ref) {
  return loading ? (
    <Placeholder rows={1} />
  ) : (
    <div className={styles.card} ref={ref}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {STEP_ICONS[lead?.LeadToCadences[0]?.Tasks[0]?.Node?.type]}
        </div>

        <div className={styles.info}>
          <div>
            <span>
              {lead?.LeadToCadences[0]?.Cadences[0]?.name}
              <i>•</i>
            </span>
            <span>
              Step {lead?.LeadToCadences[0]?.Tasks[0]?.Node?.step_number}
              <i>•</i>
              {STEP_NAME_MAP[lead?.LeadToCadences[0]?.Tasks[0]?.Node?.type]}
            </span>
          </div>
          <h3>Lead #{lead?.lead_id}</h3>
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.status}`}>
          <span
            className={`${
              styles[STATUS_LABELS_CL_NAMES[lead?.LeadToCadences[0]?.status]]
            }`}
          >
            {getLabelFromEnum(lead?.LeadToCadences[0]?.status)}
            {lead?.LeadToCadences[0]?.status === CADENCE_STATUS.PAUSED && (
              <span className={styles.pausedIcon}>
                <Paused />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(PeopleCard);
