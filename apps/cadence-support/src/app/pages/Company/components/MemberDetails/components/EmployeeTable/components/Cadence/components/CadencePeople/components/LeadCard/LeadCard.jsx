import { Div } from '@cadence-support/components';
import { CADENCE_STATUS } from '@cadence-support/constants';
import { Paused } from '@cadence-support/icons';
import { getLabelFromEnum } from '@cadence-support/utils';
import React from 'react';
import { STATUS_LABELS_CL_NAMES } from '../../../../constants';
import { STEP_ICONS, STEP_NAME_MAP } from '../../../CadenceSteps/constants';

import styles from './LeadCard.module.scss';

const LeadCard = ({ lead, loading }, ref) => {
  return loading ? (
    <Div className={`${styles.card} ${styles.loading}`} loading={true}></Div>
  ) : (
    <div className={styles.card} ref={ref}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {STEP_ICONS[lead?.LeadToCadences[0]?.Tasks[0]?.Node?.type]}
        </div>

        <div className={styles.info}>
          <div>
            <span>
              Step {lead?.lead_step_number}&nbsp;/&nbsp;
              {lead?.LeadToCadences[0]?.Cadences[0]?.Nodes.length}
              <i>•</i>
              {STEP_NAME_MAP[lead?.LeadToCadences[0]?.Tasks[0]?.Node?.type]}
            </span>
          </div>
          <h3>Lead {lead?.lead_id}</h3>
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.status}`}>
          <span
            className={`${
              styles[STATUS_LABELS_CL_NAMES[lead?.lead_cadence_status]]
            }`}
          >
            {getLabelFromEnum(lead?.lead_cadence_status)}
            {lead?.lead_cadence_status === CADENCE_STATUS.PAUSED && (
              <span className={styles.pausedIcon}>
                <Paused />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(LeadCard);
