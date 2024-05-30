import { Div, Skeleton, Tooltip } from '@cadence-support/components';

import {
  TimerGradient,
  NoStep,
  AutomatedThunderIcon,
} from '@cadence-support/icons';

import { CADENCE_NODE_TYPES } from '@cadence-support/constants';

import {
  STEP_ICONS,
  ALPHABETS,
  STEP_NAME_MAP,
  getStepStats,
  getMailStats,
} from './constants';

import { convertFromMinutes } from './utils';

import styles from './CadenceSteps.module.scss';
import Placeholder from '../Placeholder/Placeholder';
import { Colors } from '@cadence-support/utils';

const Steps = ({
  cadence,
  stepsLoading,
  stepsRefetching,
  stepsStats,
  stepsStatsLoading,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {stepsLoading || stepsRefetching || stepsStatsLoading ? (
          <div className={styles.placeholder}>
            <Placeholder rows={5} />
          </div>
        ) : cadence?.sequence?.length > 0 ? (
          cadence?.sequence?.map((step, index) => {
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

                <div key={step.node_id} className={`${styles.step} `}>
                  {(step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL &&
                    step?.data?.aBTestEnabled) ||
                  ((step?.type === CADENCE_NODE_TYPES.MAIL ||
                    step?.type === CADENCE_NODE_TYPES.REPLY_TO) &&
                    step?.data?.aBTestEnabled) ? (
                    <div className={styles.box}>
                      <div className={styles.left}>
                        <div className={styles.stepName}>
                          <div className={styles.stepIcon}>
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
                              <AutomatedThunderIcon color={Colors.mainPurple} />
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
                        <div className={styles.icon}>
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
                                  getMailStats(stepsStats[index].data)?.map(
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
  );
};

export default Steps;
