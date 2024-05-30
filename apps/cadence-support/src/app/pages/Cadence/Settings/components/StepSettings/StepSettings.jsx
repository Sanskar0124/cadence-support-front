import { StepSetup } from '@cadence-support/icons';
import React, { useContext, useEffect, useState } from 'react';
import { CadenceContext } from '../../Settings';
import { stepSetupMap } from './constants';
import styles from './StepSettings.module.scss';

import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const StepSettings = ({ cadence }) => {
  const { activeStep } = useContext(CadenceContext);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(
    cadence?.nodes?.find((s) => s.step_number === activeStep)
  );

  const user = useRecoilValue(userInfo);
  useEffect(() => {
    activeStep &&
      setStep(cadence?.nodes?.find((s) => s.step_number === activeStep));
  }, [cadence, activeStep]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [activeStep]);

  return (
    <div className={styles.settings}>
      {activeStep && !loading ? (
        stepSetupMap({
          type:
            step?.type === 'linkedin'
              ? `linkedin_${step?.data?.type}`
              : step?.type,
          step,
        })
      ) : (
        <>
          <h2 className={styles.title}>Step set-up</h2>
          <div className={styles.container}>
            <StepSetup />
            <span>Select step to configure</span>
          </div>
        </>
      )}
    </div>
  );
};

export default StepSettings;
