import { Title } from '@cadence-support/components';
import { SETTING_PRIORITY } from '@cadence-support/constants';
import {
  useIntegrations,
  useWorkFlowSettings,
} from '@cadence-support/data-access';
import {
  AtrManualEmail,
  Linkedin,
  Message,
  Call,
  DataCheck,
  Whatsapp,
  Wrench,
  Minus,
} from '@cadence-support/icons';
import { CollapseContainer, TaskStack } from '@cadence-support/widgets';
import SingleSkipSettings from './components/SingleSkipSettings/SingleSkipSettings';

import styles from './TaskSettings.module.scss';
import { getTeamName, getUserName } from './utils';
import { useState } from 'react';

const getDuration = (seconds) => {
  seconds = seconds / 1000;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days') : '00 days';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '00 hours';
  const mDisplay =
    m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '00 minutes';

  return `${dDisplay}: ${hDisplay}: ${mDisplay} `;
};

function TaskSettings({ companyID, subDepartments, users }) {
  const { emailSettings } = useIntegrations(companyID);
  const late_settings = emailSettings?.Task_Settings?.late_settings;
  const [skipTaskSettings, setSkipTaskSettings] = useState(
    emailSettings?.Skip_Settings
  );
  const { workflowSettings, isWorkflowSettingsLoading } =
    useWorkFlowSettings(companyID);

  const LATE_TASK_DURATIONS = [
    {
      title: 'Manual Emails',
      value: getDuration(late_settings?.mail),
      icon: <AtrManualEmail height={20} />,
    },
    {
      title: 'Manual SMS',
      value: getDuration(late_settings?.message),
      icon: <Message height={20} />,
    },
    {
      title: 'Linkedin',
      value: getDuration(late_settings?.linkedin_message),
      icon: <Linkedin height={20} />,
    },
    {
      title: 'Call',
      value: getDuration(late_settings?.call),
      icon: <Call height={20} />,
    },
    {
      title: 'Custom',
      value: getDuration(late_settings?.cadence_custom),
      icon: <Wrench height={20} />,
    },
    {
      title: 'Data check',
      value: getDuration(late_settings?.data_check),
      icon: <DataCheck height={20} />,
    },
    {
      title: 'Whatsapp',
      value: getDuration(late_settings?.whatsapp),
      icon: <Whatsapp height={20} />,
    },
  ];
  return (
    <div className={styles.TaskSettings}>
      <h1>Task settings</h1>
      <h2>Maximum taks per day</h2>
      <h3>Set the maximum number of tasks that a user can do per day</h3>
      <div className={`${styles.inputDisplay} ${styles.maxTasks}`}>
        {emailSettings?.Task_Settings?.max_tasks}
      </div>
      <h2>Late task duration</h2>
      <h3>Set duration after which tasks get tagged as late</h3>
      <div className={styles.lateTasks}>
        {LATE_TASK_DURATIONS.map((task) => (
          <div className={styles.lateTask}>
            <div className="">
              {task.icon}
              <h2>{task.title}</h2>
            </div>
            <div className={`${styles.inputDisplay} ${styles.lateTaskTime}`}>
              {task.value}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.skipTask}>
        <h1>Skip task settings</h1>
        <div className={styles.reasons}>
          <h2>Reasons</h2>
          <h3>Reasons for skipping a task</h3>
        </div>
        {skipTaskSettings?.skip_reasons?.length > 0 ? (
          skipTaskSettings?.skip_reasons?.map((reason, index) => (
            <div className={`${styles.displayReasons}`} key={index}>
              {reason}
            </div>
          ))
        ) : (
          <div className={`${styles.inputDisplay} ${styles.maxTasks}`}>
            {'No reason specified'}
          </div>
        )}

        <h2>Tasks</h2>
        <h3>Tasks which require a reason to be skipped</h3>
        <div className={styles.skipTasks}>
          <TaskStack value={skipTaskSettings} name={['skip_allowed_tasks']} />
        </div>

        <div className={styles.exceptions}>
          {skipTaskSettings?.exceptions?.length > 0 &&
            skipTaskSettings.exceptions.map((exception, index) => {
              return (
                <CollapseContainer
                  openByDefault={false}
                  className={styles.collapsibleContainer}
                  key={exception.skip_settings_id ?? index}
                  title={
                    <div className={styles.header}>
                      <Title className={styles.title} size="14px">
                        {exception.priority === SETTING_PRIORITY.USER
                          ? `${'User Exception'} (${getUserName(
                              users,
                              exception?.user_id
                            )})`
                          : `${'Group Exception'} (${getTeamName(
                              subDepartments,
                              exception?.sd_id
                            )})`}
                      </Title>
                    </div>
                  }
                >
                  <SingleSkipSettings
                    exception={true}
                    users={users}
                    subDepartments={subDepartments}
                    data={exception}
                    setData={(val) =>
                      setSkipTaskSettings({
                        ...skipTaskSettings,
                        exceptions: skipTaskSettings.exceptions.map(
                          (ex, jindex) => {
                            if (jindex === index) return val;
                            return ex;
                          }
                        ),
                      })
                    }
                  />
                </CollapseContainer>
              );
            })}
        </div>

        <div className={styles.exceptions}>
          {skipTaskSettings?.exceptions?.length > 0 &&
            skipTaskSettings?.exceptions?.forEach((exception, index) => {
              return (
                <CollapseContainer
                  openByDefault={false}
                  className={styles.collapsibleContainer}
                  key={exception.skip_settings_id ?? index}
                  title={
                    <div className={styles.header}>
                      <Title className={styles.title} size="1.1rem">
                        {exception.priority === SETTING_PRIORITY.USER
                          ? `${'User Exception'} (${getUserName(
                              users,
                              exception.user_id
                            )})`
                          : `${'Group Exception'} (${getTeamName(
                              subDepartments,
                              exception?.sd_id
                            )})`}
                      </Title>
                    </div>
                  }
                >
                  <SingleSkipSettings
                    exception={true}
                    users={users}
                    subDepartments={subDepartments}
                    data={exception}
                    setData={(val) =>
                      setSkipTaskSettings({
                        ...skipTaskSettings,
                        exceptions: skipTaskSettings.exceptions.map(
                          (ex, jindex) => {
                            if (jindex === index) return val;
                            return ex;
                          }
                        ),
                      })
                    }
                  />
                </CollapseContainer>
              );
            })}
        </div>
      </div>

      {/* <div className={styles.workflow}>
        <h1>Workflow</h1>
        <h2>Set trigger and action</h2>
        <h3>
          Add a new trigger and assign one or multiple actions for a trigger.
        </h3>
        <div className={styles.triggers}>
          <div className={styles.trigger}>
            <div className={styles.header}>
              <div>
                <h2>Trigger 1 </h2>
                <h3> | When a cadence is paused (for a specific lead)</h3>
              </div>
              <div className="">
                <h3>Allow others to edit </h3>
                <Toggle checked={true} theme="PURPLE" disabled />
                <SmallArrowUp height={20} />
              </div>
            </div>
          </div>

          <div className={styles.trigger}>
            <div className={styles.header}>
              <div>
                <h2>Trigger 2</h2>
                <h3> | When a cadence is stopped (for a specific lead)</h3>
              </div>
              <div className="">
                <h3>Allow others to edit</h3>
                <Toggle checked={false} theme="PURPLE" disabled />
                <SmallArrowUp height={20} />
              </div>
            </div>
            <div className={styles.statuses}>
              <div className={styles.when}>
                <h2>When</h2>
                <div
                  className={`${styles.inputDisplay} ${styles.triggerStatus}`}
                >
                  Cadence stopped
                </div>
              </div>
              <h2>Then</h2>
              <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
                Change owner
              </div>
              <h2>To</h2>
              <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
                Admin
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TaskSettings;
