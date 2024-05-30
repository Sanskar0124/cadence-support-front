import styles from './StepViewCadence.module.scss';
import {
  TimerGradient,
  LeadsGradient,
  NoStep,
  AutomatedThunderIcon,
} from '@cadence-support/icons';
import { convertFromMinutes } from '../../../../../MemberDetails/components/EmployeeTable/components/Cadence/components/CadenceSteps/utils';
import {
  ALPHABETS,
  getMailStats,
  getStepStats,
  STEP_ICONS,
  STEP_NAME_MAP,
} from '../../../../../MemberDetails/components/EmployeeTable/components/Cadence/components/CadenceSteps/constants';
import { CADENCE_NODE_TYPES } from '@cadence-support/constants';
import { Div, Skeleton, Tooltip } from '@cadence-support/components';
import Placeholder from '../Placeholder/Placeholder';
import { useCadencesSteps } from '@cadence-support/data-access';
import { Colors } from '@cadence-support/utils';
import TaskIdModal from './TaskIdModal/TaskIdModal';
import StepInfo from '../StepInfo/StepInfo';
import { useState, useEffect } from 'react';

function StepViewCadence({ memberID, selectedCadenceID, integrationType }) {
  const {
    stepsData,
    stepsLoading,
    stepsStats,
    stepsStatsLoading,
    stepsRefetching,
  } = useCadencesSteps({
    memberID,
    cadenceID: selectedCadenceID,
    integrationType,
  });
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [movedLeads, setMovedLeads] = useState(null);

  const handleStepClick = (step) => {
    setActiveStep(step?.node_id);
    setMovedLeads(
      step?.type === CADENCE_NODE_TYPES.END
        ? stepsStats?.[step?.step_number - 1]?.movedLeads
        : null
    );
  };
  const onClose = () => {
    setActiveStep(null);
    setMovedLeads(null);
  };

  useEffect(() => {
    if (stepsData) {
      const currTimeout = setTimeout(() => {
        if (stepsData.sequence?.[0]) {
          handleStepClick(stepsData?.sequence[0]);
        }
      }, 400);
      return () => clearTimeout(currTimeout);
    }
  }, [stepsData]);

  const [modal, setModal] = useState(false);
  const [nodeId, setNodeId] = useState(null);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.steps}>
          {stepsLoading || stepsRefetching || stepsStatsLoading ? (
            <div className={styles.placeholder}>
              <Placeholder rows={5} />
            </div>
          ) : stepsData?.sequence?.length > 0 ? (
            stepsData?.sequence?.map((step, index) => {
              const isNodeMailType = [
                CADENCE_NODE_TYPES.MAIL,
                CADENCE_NODE_TYPES.AUTOMATED_MAIL,
                CADENCE_NODE_TYPES.REPLY_TO,
                CADENCE_NODE_TYPES.AUTOMATED_REPLY_TO,
              ].includes(step?.type)
                ? true
                : false;
              const isNodeSMSType = [
                CADENCE_NODE_TYPES.MESSAGE,
                CADENCE_NODE_TYPES.AUTOMATED_MESSAGE,
              ].includes(step?.type);

              return (
                <>
                  {index !== 0 && (
                    <div className={styles.waitTime}>
                      <TimerGradient size="15px" />{' '}
                      {convertFromMinutes(step.wait_time).time}{' '}
                      {convertFromMinutes(step.wait_time).duration}
                    </div>
                  )}

                  <div
                    key={step.node_id}
                    className={`${styles.step} ${
                      activeStep === step.node_id && styles.activeStep
                    }`}
                    onClick={() => handleStepClick(step)}
                  >
                    {(step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL &&
                      step?.data?.aBTestEnabled) ||
                    ((step?.type === CADENCE_NODE_TYPES.MAIL ||
                      step?.type === CADENCE_NODE_TYPES.REPLY_TO) &&
                      step?.data?.aBTestEnabled) ? (
                      <div className={styles.box}>
                        <div className={styles.left}>
                          <div className={styles.stepName}>
                            <div
                              className={styles.stepIcon}
                              onClick={() => {
                                setModal(true);
                                setNodeId(step?.node_id);
                              }}
                            >
                              {STEP_ICONS[step.type]}
                            </div>

                            <h3>
                              <span>Step {index + 1}:</span>
                              {step.name || STEP_NAME_MAP[step.type]}
                              {step?.type ===
                              CADENCE_NODE_TYPES.AUTOMATED_MAIL ? (
                                <Tooltip text="Automated mail">
                                  <AutomatedThunderIcon
                                    color={Colors.mainPurple}
                                  />
                                </Tooltip>
                              ) : step?.type ===
                                  CADENCE_NODE_TYPES.AUTOMATED_MESSAGE ||
                                step?.type ===
                                  CADENCE_NODE_TYPES.AUTOMATED_REPLY_TO ? (
                                <AutomatedThunderIcon
                                  color={Colors.mainPurple}
                                />
                              ) : null}
                              {step.is_urgent && (
                                <div className={styles.urgentTag}>Urgent</div>
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className={styles.right}>
                          <div className={styles.toggleBox}>
                            {step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL
                              ? step?.data?.templates?.map((item, i) => {
                                  return (
                                    <div className={styles.toggle}>
                                      <div>{`Mail ${ALPHABETS[i]} (${item.percentage}%)`}</div>
                                    </div>
                                  );
                                })
                              : step?.data?.templates?.map((item, i) => {
                                  return (
                                    <div className={styles.toggle}>
                                      <div>{`Mail ${ALPHABETS[i]} (${item.percentage}%)`}</div>
                                    </div>
                                  );
                                })}
                          </div>

                          <div className={styles.body}>
                            <div className={styles.mailHead}>
                              <Div
                                className={`${styles.statistics} ${styles.stepStats}`}
                              >
                                {stepsStatsLoading
                                  ? [...Array(3).keys()].map((_) => (
                                      <Skeleton
                                        className={styles.statsLoading}
                                      />
                                    ))
                                  : step?.type !== CADENCE_NODE_TYPES.END
                                  ? getStepStats(stepsStats?.[index])?.map(
                                      (item) =>
                                        item?.count > 0 && (
                                          <Tooltip text={item?.label}>
                                            <div
                                              className={
                                                styles[item?.className] ?? ''
                                              }
                                            >
                                              {item?.icon}
                                              <span>{item?.count}</span>
                                            </div>
                                          </Tooltip>
                                        )
                                    )
                                  : ''}
                              </Div>

                              {(isNodeMailType || isNodeSMSType) && (
                                <div className={styles.mailBox}>
                                  <div className={styles.body}>
                                    {step?.data?.templates.map((item, i) => {
                                      return (
                                        <Div className={styles.statistics}>
                                          {!stepsStatsLoading &&
                                            stepsStats[index]?.data &&
                                            getMailStats(
                                              stepsStats[index]?.data?.[
                                                item?.ab_template_id
                                              ]
                                            )?.map((stats) => {
                                              return (
                                                stats.count > 0 && (
                                                  <Tooltip
                                                    text={`${stats.label}: ${stats.count}`}
                                                  >
                                                    <div
                                                      className={
                                                        (stats.value ===
                                                          'BOUNCED' ||
                                                          stats.value ===
                                                            'UNSUBSCRIBED') &&
                                                        styles.red
                                                      }
                                                    >
                                                      {stats.icon}
                                                      <span
                                                        className={
                                                          styles.peopleStats
                                                        }
                                                      >
                                                        {stats.percentage + '%'}
                                                      </span>
                                                    </div>
                                                  </Tooltip>
                                                )
                                              );
                                            })}
                                        </Div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.box}>
                        <div className={styles.left}>
                          <div
                            className={styles.icon}
                            onClick={() => {
                              setModal(true);
                              setNodeId(step?.node_id);
                            }}
                          >
                            {STEP_ICONS[step.type]}
                          </div>
                          <div className={styles.info}>
                            <h3>
                              <span>Step {index + 1}:</span>
                              {step.name || STEP_NAME_MAP[step.type]}
                              {step.is_urgent && (
                                <div className={styles.urgentTag}>Urgent</div>
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className={styles.mailHead}>
                          <Div className={styles.statistics}>
                            {stepsStatsLoading
                              ? [...Array(3).keys()].map((_) => (
                                  <Skeleton className={styles.statsLoading} />
                                ))
                              : step?.type !== CADENCE_NODE_TYPES.END
                              ? getStepStats(stepsStats?.[index])?.map(
                                  (item) =>
                                    item?.count > 0 && (
                                      <Tooltip text={item?.label}>
                                        <div
                                          className={
                                            styles[item?.className] ?? ''
                                          }
                                        >
                                          {item?.icon}
                                          <span>{item?.count}</span>
                                        </div>
                                      </Tooltip>
                                    )
                                )
                              : ''}
                          </Div>

                          {((isNodeMailType || isNodeSMSType) &&
                            isNodeMailType) ||
                          isNodeSMSType ? (
                            <div className={styles.mailBox}>
                              <div className={styles.body}>
                                <Div className={styles.statistics}>
                                  {!stepsStatsLoading &&
                                    stepsStats?.[index]?.data &&
                                    getMailStats(stepsStats[index]?.data)?.map(
                                      (item) => {
                                        return (
                                          item.count > 0 && (
                                            <Tooltip
                                              text={`${item.label}: ${item.count}`}
                                            >
                                              <div
                                                className={
                                                  (item.value === 'BOUNCED' ||
                                                    item.value ===
                                                      'UNSUBSCRIBED') &&
                                                  styles.red
                                                }
                                              >
                                                {item.icon}
                                                <span
                                                  className={styles.peopleStats}
                                                >
                                                  {item.percentage + '%'}
                                                </span>
                                              </div>
                                            </Tooltip>
                                          )
                                        );
                                      }
                                    )}
                                </Div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })
          ) : (
            <div className={styles.noSteps}>
              <NoStep />
              <h4>No steps added</h4>
            </div>
          )}
        </div>
      </div>
      <div className={styles.sidebar}>
        {isDraweropen && (
          <StepInfo
            onClose={onClose}
            stepId={activeStep}
            stepsData={stepsData}
          />
        )}
      </div>
      {modal && (
        <TaskIdModal
          modal={modal}
          setModal={setModal}
          stepsStats={stepsStats}
          stepId={nodeId}
        />
      )}
    </>
  );
}

export default StepViewCadence;
