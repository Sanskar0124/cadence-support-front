import { Title } from '@cadence-support/components';
import { CollapseContainer } from '@cadence-support/widgets';
import { useEffect, useState } from 'react';
import { ACTIONS, TRIGGERS } from './constants';
import styles from './Triggers.module.scss';

const Triggers = ({ workflow, index }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (Object.keys(workflow?.actions)?.length > 0) {
      setActions(
        Object.keys(workflow.actions)?.map((actionName) => {
          const action = {};
          action.name = actionName;
          action.data = workflow.actions[actionName];
          if (typeof action.data === 'string') return action;
          action.data = {};
          Object.keys(workflow.actions[actionName]).forEach((key) => {
            if (key !== 'unix_time') {
              action.data[key] = workflow.actions[actionName][key];
            } else if (key === 'unix_time') {
              if (workflow.actions[actionName][key] < 24 * 60 * 60) {
                action.data.unix_time = workflow.actions[actionName][key] / 60;
                action.data.unix_mode = 'min';
              } else {
                action.data.unix_time =
                  workflow.actions[actionName][key] / (24 * 60 * 60);
                action.data.unix_mode = 'days';
              }
            }
          });
          return action;
        })
      );
    }
  }, [workflow]);

  return (
    <CollapseContainer
      openByDefault={false}
      className={styles.collapsibleContainer}
      title={
        <div className={styles.header}>
          <Title className={styles.title} size="14px">
            Standard Workflow {index + 1}
          </Title>
        </div>
      }
    >
      <div className={`${styles.TriggerSetting}`}>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            When
          </Title>
          <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
            {TRIGGERS[workflow?.trigger]}
          </div>
        </div>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            Then
          </Title>
          <div className={styles.then}>
            {Object.keys(workflow?.actions)?.map((key) => {
              return (
                <div
                  className={`${styles.inputDisplay} ${styles.triggerStatus}`}
                >
                  {ACTIONS[key]}
                </div>
              );
            })}
          </div>

          {actions?.map(
            (actionData, index) =>
              actionData?.name === 'pause_cadence' && (
                <div className={styles.pauseTime} key={index}>
                  <div
                    className={`${styles.inputDisplay} ${styles.pauseTimer}`}
                  >
                    {actionData?.data?.unix_time ?? ''}
                  </div>
                  <div className={`${styles.inputDisplay} ${styles.timer}`}>
                    {actionData?.data?.unix_mode ?? ''}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </CollapseContainer>
  );
};

export default Triggers;
