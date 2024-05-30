/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import styles from './StepSetup.module.scss';
import { BackButton } from '@cadence-support/widgets';
import { Button } from '@cadence-support/components';
import {
  ADD_STEP_TYPES,
  ADD_LINKEDIN_STEP_TYPES,
  STEP_ICONS,
  STEP_NAME_MAP,
  PHONE_INTEGRATIONS,
} from '@cadence-support/constants';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';

const StepSetup = ({ addStep, checkLinkedin }) => {
  const [isLinkedin, setIsLinkedin] = useState(false);
  const user = useRecoilValue(userInfo);
  const callAndSmsSteps = ['call', 'callback', 'message', 'automated_message'];

  // const isCallAndSmsDisabled = (step) =>
  //   user?.phone_system === PHONE_INTEGRATIONS.NONE &&
  //   callAndSmsSteps.includes(step);

  // const isPhoneSystemRingover =
  //   user?.phone_system === PHONE_INTEGRATIONS.RINGOVER;

  return (
    <>
      <div>
        <div className={styles.heading}>
          {isLinkedin ? (
            <BackButton
              text="Back to main steps"
              onClick={() => setIsLinkedin(false)}
            />
          ) : (
            'Add your first step'
          )}
        </div>
        <div className={styles.stepBtnsGrid}>
          {isLinkedin ? (
            <>
              {ADD_LINKEDIN_STEP_TYPES.map((step) => (
                <Button
                  key={step}
                  className={styles.stepBtn}
                  onClick={() => addStep(step, -1)}
                >
                  <span>{STEP_ICONS[step]}</span>
                  <p>{STEP_NAME_MAP[step]}</p>
                </Button>
              ))}
            </>
          ) : (
            ADD_STEP_TYPES.map((step) => {
              // if (isCallAndSmsDisabled(step)) return '';
              // if (!isPhoneSystemRingover && step === 'callback') return '';
              return (
                !(step === 'reply_to' || step === 'end') && (
                  <Button
                    key={step}
                    className={styles.stepBtn}
                    onClick={
                      checkLinkedin(step)
                        ? () => setIsLinkedin(true)
                        : () => addStep(step, -1)
                    }
                  >
                    <span>{STEP_ICONS[step]}</span>
                    <p>{STEP_NAME_MAP[step]}</p>
                  </Button>
                )
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default StepSetup;
