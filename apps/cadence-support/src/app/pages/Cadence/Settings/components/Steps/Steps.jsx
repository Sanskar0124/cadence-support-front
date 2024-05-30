/* eslint-disable react/jsx-no-useless-fragment */
import {
  ArrowLeft,
  Close,
  Plus,
  TimerGradient,
  Trash,
  TrashGradient,
} from '@cadence-support/icons';
import { useContext, useEffect, useState, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { Button, DeleteModal, Div } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import StepSetup from './components/StepSetup/StepSetup';
import StepName from './components/StepName/StepName';
import WaitTime from './components/WaitTime/WaitTime';
import {
  ADD_STEP_TYPES,
  STEP_DATA,
  STEP_ICONS,
  STEP_NAME_MAP,
  PHONE_INTEGRATIONS,
  INTEGRATION_TYPE,
} from '@cadence-support/constants';
import { CadenceContext } from '../../Settings';
import styles from './Steps.module.scss';
import Urgent from './components/Urgent/Urgent';

import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import {
  ADD_LINKEDIN_STEP_TYPES,
  ELONGATED_STEP_NAME_MAP,
  STEP_ICONS_GRADIENT,
} from '@cadence-support/constants';
import { capitalize, Colors } from '@cadence-support/utils';
import { v4 as uuid } from 'uuid';
import { useCadencesTemplates } from '@cadence-support/data-access';

const Steps = ({ cadence, isStepsUpdated }) => {
  const { id: cadence_id } = useParams();
  const queryClient = useQueryClient();
  const { addError, addConfirmMessage, stepChangeable } =
    useContext(MessageContext);
  const {
    activeStep,
    setActiveStep,
    templateData,
    steps,
    setSteps,
    cadenceTemplate,
    setCadenceTemplate,
    waitTime,
    setWaitTime,
    isUpdated,
    setIsUpdated,
  } = useContext(CadenceContext);
  const { templateLoading } = useCadencesTemplates({ enabled: true });

  //states
  const [isAdd, setIsAdd] = useState(false);
  const [cadenceLoading, setCadenceLoading] = useState(true);
  const [updatedLoading, setUpdatedLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [names, setNames] = useState({});
  const [urgent, setUrgent] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const user = useRecoilValue(userInfo);

  const checkLinkedin = (type) => type === 'linkedin';

  const addStep = (step, nodeIndex = null) => {
    setLoading(nodeIndex);

    let stepToAdd = {
      previous_step_number: cadence?.nodes[nodeIndex]?.step_number ?? null,
      name: STEP_NAME_MAP[step],
      type: step,
      wait_time: 1440,
      step_number: uuid(),
      cadence_template_id: parseInt(cadence_id),
      data: STEP_DATA[step],
    };
    if (nodeIndex !== null) {
      setSteps((prev) => {
        const updatedSteps = [...prev];
        updatedSteps.splice(nodeIndex + 1, 0, stepToAdd);
        return updatedSteps;
      });
      setCadenceLoading(false);
    } else {
      // If nodeIndex is not provided, simply append the step object to the end
      setSteps((prev) => [...prev, stepToAdd]);
      setCadenceLoading(false);
    }
    setIsAdd(false);
    setActiveStep(stepToAdd?.step_number);
  };

  const deleteStep = (step_number) => {
    setSteps((prev) => prev.filter((step) => step.step_number !== step_number));
  };

  useEffect(() => {
    if (isUpdated.wait_time || isUpdated.urgent) {
      setSteps((prev) =>
        prev.map((step) => ({
          ...step,
          wait_time: waitTime[step.step_number]
            ? waitTime[step.step_number]
            : 0,
          is_urgent: urgent[step.step_number],
        }))
      );
      setIsUpdated({ wait_time: false, urgent: false });
    }
  }, [waitTime, urgent]);

  useEffect(() => {
    if (steps?.length > 0) {
      setTimeout(() => {
        setCadenceLoading(false);
      }, 700);
    }
  }, [steps]);

  return (
    <div className={styles.steps}>
      {cadenceLoading ? (
        [...Array(3).keys()].map((d) => (
          <div className={styles.placeholder}>
            <Div loading />
            <Div loading />
          </div>
        ))
      ) : (
        <div id="stepsContainer">
          <AddStepButton
            loading={loading}
            // addLoading={addLoading}
            isAdd={isAdd}
            setIsAdd={setIsAdd}
            steps={cadence?.nodes}
            index={cadence?.nodes?.length > 0 ? -1 : null}
            checkLinkedin={checkLinkedin}
            addStep={addStep}
            theme="beforeFirst"
            disabled={cadence?.nodes?.length < 1}
            onClick={() => {
              (stepChangeable === true
                ? true
                : (() => {
                    if (stepChangeable.type === 'unsubscribeError') {
                      addConfirmMessage({
                        msg: 'unsubscribe link is mandatory for Automated mails.',
                        fun: stepChangeable.fun,
                        type: stepChangeable.type,
                      });
                    } else if (stepChangeable.type === 'replyMailError') {
                      addConfirmMessage({
                        type: stepChangeable.type,
                        msg: 'Please, select mail step',
                      });
                    }
                    return false;
                  })()) && setIsAdd(-1);
            }}
          />
          {steps?.map((step, index) => (
            <>
              {index !== 0 && (
                <div className={styles.waitTime}>
                  <TimerGradient />
                  <span>Wait for</span>
                  <WaitTime
                    key={step?.step_number}
                    mins={step?.wait_time}
                    name={step?.step_number}
                    setValue={setWaitTime}
                    value={waitTime}
                  />
                </div>
              )}
              <div
                key={step.step_number}
                onClick={() =>
                  !updatedLoading &&
                  (stepChangeable === true
                    ? true
                    : (() => {
                        if (stepChangeable.type === 'unsubscribeError') {
                          addConfirmMessage({
                            msg: 'unsubscribe link is mandatory for Automated mails.',
                            fun: stepChangeable.fun,
                            type: stepChangeable.type,
                          });
                        } else if (stepChangeable.type === 'lowPercent') {
                          addConfirmMessage({
                            msg: stepChangeable.errorText,
                            fun: stepChangeable.fun,
                            type: stepChangeable.type,
                          });
                        } else if (stepChangeable.type === 'highPercent') {
                          addError(stepChangeable.errorText);
                        } else if (stepChangeable.type === 'replyMailError') {
                          addConfirmMessage({
                            type: stepChangeable.type,
                            msg: 'Please, select mail step',
                          });
                        }
                        return false;
                      })()) &&
                  setActiveStep(step?.step_number)
                }
                className={`${styles.step} ${
                  activeStep === step.step_number && step?.type === 'end'
                    ? styles.activeEnd
                    : activeStep === step.step_number
                    ? styles.active
                    : ''
                }`}
              >
                <div className={styles.header}>
                  <div>
                    {activeStep === step.step_number
                      ? STEP_ICONS[step.type]
                      : STEP_ICONS_GRADIENT[step.type]}

                    <span>{`${capitalize('step')} ${index + 1} : ${capitalize(
                      ELONGATED_STEP_NAME_MAP[step.type]
                    )}`}</span>
                  </div>
                  <div>
                    {step.type !== 'end' && (
                      <Urgent
                        setValue={setUrgent}
                        activeStep={activeStep}
                        step={step}
                      />
                    )}
                    <Button
                      btnwidth="fit-content"
                      onClick={(e) => {
                        e.stopPropagation();

                        if (stepChangeable?.type === 'unsubscribeError') {
                          (stepChangeable === true
                            ? true
                            : (() => {
                                if (
                                  stepChangeable.type === 'unsubscribeError'
                                ) {
                                  addConfirmMessage({
                                    msg: 'unsubscribe link is mandatory for Automated mails.',
                                    fun: stepChangeable.fun,
                                    type: stepChangeable.type,
                                  });
                                } else if (
                                  stepChangeable.type === 'replyMailError'
                                ) {
                                  addConfirmMessage({
                                    type: stepChangeable.type,
                                    msg: 'Please, select mail step',
                                  });
                                }
                                return false;
                              })()) && setIsAdd(-1);
                        } else {
                          if (activeStep === step.step_number)
                            setActiveStep(false);
                          setDeleteModal({
                            step_number: step.step_number,
                            name: ELONGATED_STEP_NAME_MAP[step.type],
                          });
                        }
                      }}
                    >
                      {activeStep === step.step_number ? (
                        <Trash color={Colors.white} />
                      ) : (
                        <TrashGradient />
                      )}
                    </Button>
                  </div>
                </div>
                {step?.type !== 'end' && (
                  <div className={styles.input}>
                    <StepName
                      step={step}
                      cadence={cadence}
                      // name={step.step_number}
                      // setValue={setNames}
                      // disabled={
                      //   step.type === 'end' ||
                      //   activeStep.step_number !== step.step_number
                      // }
                    />
                  </div>
                )}
              </div>
              {index !== cadence?.nodes?.length - 1 && (
                <AddStepButton
                  loading={loading}
                  // addLoading={addLoading}
                  isAdd={isAdd}
                  setIsAdd={setIsAdd}
                  steps={cadence?.nodes}
                  index={index}
                  checkLinkedin={checkLinkedin}
                  addStep={addStep}
                  theme="middle"
                  onClick={() => {
                    (stepChangeable === true
                      ? true
                      : (() => {
                          if (stepChangeable.type === 'unsubscribeError') {
                            addConfirmMessage({
                              msg: 'unsubscribe link is mandatory for Automated mails.',
                              fun: stepChangeable.fun,
                              type: stepChangeable.type,
                            });
                          } else if (stepChangeable.type === 'replyMailError') {
                            addConfirmMessage({
                              type: stepChangeable.type,
                              msg: 'Please, select mail step',
                            });
                          }
                          return false;
                        })()) && setIsAdd(index);
                  }}
                />
              )}
            </>
          ))}
          {!cadence?.nodes?.find((node) => node.type === 'end') && (
            <AddStepButton
              loading={loading}
              // addLoading={addLoading}
              isAdd={isAdd}
              setIsAdd={setIsAdd}
              steps={cadence?.nodes}
              index={cadence?.nodes?.length - 1}
              checkLinkedin={checkLinkedin}
              addStep={addStep}
              theme={'last'}
              onClick={() => {
                (stepChangeable === true
                  ? true
                  : (() => {
                      if (stepChangeable.type === 'unsubscribeError') {
                        addConfirmMessage({
                          msg: 'unsubscribe link is mandatory for Automated mails.',
                          fun: stepChangeable.fun,
                          type: stepChangeable.type,
                        });
                      } else if (stepChangeable.type === 'replyMailError') {
                        addConfirmMessage({
                          type: stepChangeable.type,
                          msg: 'Please, select mail step',
                        });
                      }
                      return false;
                    })()) && setIsAdd(cadence?.nodes?.length - 1);
              }}
            />
          )}
        </div>
      )}
      <DeleteModal
        modal={deleteModal}
        setModal={setDeleteModal}
        itemType="step"
        item={deleteModal.name}
        onDelete={() => deleteStep(deleteModal.step_number)}
      />
    </div>
  );
};

export default Steps;

const AddStepButton = ({
  loading,
  addLoading,
  isAdd,
  setIsAdd,
  steps,
  index,
  checkLinkedin,
  addStep,
  theme,
  onClick,
  disabled = false,
}) => {
  const user = useRecoilValue(userInfo);

  const [isLinkedin, setIsLinkedin] = useState(false);

  const checkEndCadenceStep = (stepToAdd, node_index) => {
    if (stepToAdd !== 'end') return true;
    if (steps.length < 1) return false;
    if (steps.find((node) => node.type === 'end') !== undefined) return false;
    if (node_index !== steps.length - 1) return false;
    return true;
  };

  const callAndSmsSteps = ['call', 'callback', 'message', 'automated_message'];

  // const isCallAndSmsDisabled = (step) =>
  //   user?.phone_system === PHONE_INTEGRATIONS.NONE &&
  //   callAndSmsSteps.includes(step);
  // const isPhoneSystemRingover =
  //   user?.phone_system === PHONE_INTEGRATIONS.RINGOVER;

  return (
    <div className={styles.addStep}>
      {loading === index && addLoading && (
        <>
          <div className={styles.stepPlaceholder}>
            {index !== -1 && <Div loading />}
            <Div loading />
          </div>
        </>
      )}
      <Button
        btnwidth=""
        onClick={
          isLinkedin
            ? () => setIsLinkedin(false)
            : isAdd === index
            ? () => setIsAdd(false)
            : onClick
        }
        className={`${styles.addStepBtn} ${styles[theme]} ${
          isAdd === index ? styles.active : ''
        }`}
        disabled={disabled}
      >
        <span>
          {isAdd === index ? (
            <>{isLinkedin ? <ArrowLeft /> : <Close />}</>
          ) : (
            <>
              <i>
                <Plus />
              </i>
              <span>{steps?.length > 0 ? 'Add step' : 'Add first step'}</span>
            </>
          )}
        </span>
      </Button>

      {isAdd === index && (
        <div className={styles.stepToAddBtns}>
          {isLinkedin ? (
            <>
              {ADD_LINKEDIN_STEP_TYPES.map((step) => (
                <Button
                  btnwidth="30px"
                  tooltip={STEP_NAME_MAP[step]}
                  key={step}
                  onClick={() => addStep(step, index)}
                >
                  {STEP_ICONS[step]}
                </Button>
              ))}
            </>
          ) : (
            <>
              {ADD_STEP_TYPES.map((step) => {
                // if (isCallAndSmsDisabled(step)) return '';
                // if (!isPhoneSystemRingover && step === 'callback') return '';
                // if (
                //   user?.integration_type === INTEGRATION_TYPE.GOOGLE_SHEETS &&
                //   step === 'end'
                // )
                //   return '';
                return (
                  <>
                    {!(step === 'reply_to' && isAdd === -1) &&
                      checkEndCadenceStep(step, index) && (
                        <Button
                          btnwidth="30px"
                          tooltip={STEP_NAME_MAP[step]}
                          key={step}
                          onClick={
                            checkLinkedin(step)
                              ? () => setIsLinkedin(true)
                              : () => {
                                  addStep(step, index);
                                }
                          }
                          disabled={
                            step === 'reply_to' &&
                            !steps?.some(
                              (step) =>
                                step.type === 'mail' ||
                                step.type === 'automated_mail'
                            )
                          }
                        >
                          {STEP_ICONS[step]}
                        </Button>
                      )}
                  </>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};
