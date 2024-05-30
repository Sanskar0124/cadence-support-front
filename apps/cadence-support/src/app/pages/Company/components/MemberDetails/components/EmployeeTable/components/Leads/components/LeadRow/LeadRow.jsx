import { CADENCE_STATUS } from '@cadence-support/constants';
import { Pause, UserGradient } from '@cadence-support/icons';

import { LEAD_TYPES } from '@cadence-support/constants';

import React from 'react';
import { STEP_ICONS } from '../../../Cadence/components/CadenceSteps/constants';
import styles from './LeadRow.module.scss';
import { getLabelFromEnum } from '@cadence-support/utils';
import { Placeholder } from '../Placeholder/Placeholder';

const steps = [
  {
    name: 'UK Prospect',
    total: 4,
    step_number: 1,
    type: 'call',
    status: 'paused',
  },
  { name: 'Cadence SDR', total: 4, step_number: 2, type: 'call' },
  { name: 'UK Prospect', total: 4, step_number: 1, type: 'call' },
  { name: 'UK Prospect', total: 4, step_number: 1, type: 'call' },
  { name: 'UK Prospect', total: 4, step_number: 3, type: 'call' },
  { name: 'UK Prospect', total: 4, step_number: 2, type: 'call' },
];

const LeadRow = ({ lead, loading }, ref) => {
  return loading ? (
    <Placeholder rows={2} />
  ) : (
    <div className={styles.row} ref={ref}>
      <div className={styles.col}>
        <div>
          <UserGradient />
        </div>
      </div>
      <div className={[styles.col, styles.leadID].join(' ')}>
        Lead #{lead?.lead_id}
      </div>
      <div className={`${styles.col} ${styles.stepsOverview}`}>
        {steps.slice(0, 2).map((step, index) => {
          return <StepItem step={step} key={index} />;
        })}
        {steps.length > 2 && (
          <div className={styles.extraItemCount}>
            + <span>{steps.length - 2}</span>
          </div>
        )}
      </div>
      <div className={`${styles.col} ${styles.leadType}`}>
        <span className={`${styles[LEAD_TYPES[lead?.status.toUpperCase()]]}`}>
          {getLabelFromEnum(lead?.status)}
        </span>
      </div>
    </div>
  );
};

const StepItem = ({ step }) => {
  return (
    <div className={styles.stepItem}>
      <div className={styles.left}>
        <div className={styles.icon}>
          {STEP_ICONS[step?.type]}
          {step?.status === CADENCE_STATUS.PAUSED && (
            <span className={styles.pausedIcon}>
              <Pause className={styles.pause} />
            </span>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div>
          Step {step?.step_number} / {step?.total}
        </div>
        <div>{step?.name}</div>
      </div>
    </div>
  );
};

export default React.forwardRef(LeadRow);
