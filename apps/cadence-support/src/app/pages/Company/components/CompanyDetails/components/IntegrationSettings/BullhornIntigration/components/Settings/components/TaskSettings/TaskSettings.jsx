import { Div, Title } from '@cadence-support/components';
import { SETTING_PRIORITY } from '@cadence-support/constants';
import {
  useIntegrations,
  useWorkFlowSettings,
} from '@cadence-support/data-access';
import { CollapseContainer, Input, TaskStack } from '@cadence-support/widgets';
import SingleSkipSettings from './components/SingleSkipSettings/SingleSkipSettings';
import Triggers from './components/Triggers/Triggers';
import Webhook from './components/Webhook/Webhook';
import styles from './TaskSettings.module.scss';
import { getTeamName, getUserName } from './utils';
import { useState } from 'react';
import {
  STATUS_UPDATE,
  getLateTaskDetails,
  getLeadScoreData,
  getStatusUpdate,
} from './constant';
import { LEVEL_TO_NAME } from './components/SingleSkipSettings/constants';
import { useEffect } from 'react';
import AddRuleModal from '../../../../../component/AdvancedWorkflow/AdvancedWorkflow';

function TaskSettings({
  companyID,
  subDepartments,
  users,
  tasksettingRef,
  advancewflowRef,
  standardwflowRef,
  webhookRef,
  skiptaskRef,
  leadscoreRef,
  selectedInnerTab,
}) {
  const { emailSettings, isEmailSettingsLoading } =
    useIntegrations(companyID) || {};
  const { Task_Settings, Lead_Score_Settings } = emailSettings || {};
  const late_settings = Task_Settings?.late_settings;
  const [skipTaskSettings, setSkipTaskSettings] = useState(
    emailSettings?.Skip_Settings
  );
  const {
    workflowSettings,
    isWorkflowSettingsLoading,
    automatedWorkflowSettings,
    automatedWorkflowSettingsLoading,
  } = useWorkFlowSettings(companyID);

  const [modal, setModal] = useState(false);
  const [workflowdata, setWorkflowdata] = useState({
    data: null,
    modalIndex: '',
  });

  //  USEEFFECT FOR SCROLLING TO THE TARGET DIV

  useEffect(() => {
    if (selectedInnerTab === 'Task settings') {
      tasksettingRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    if (selectedInnerTab === 'Skip task settings') {
      skiptaskRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    if (selectedInnerTab === 'Lead Scroing') {
      leadscoreRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    if (selectedInnerTab === 'Standard Workflow') {
      standardwflowRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    if (selectedInnerTab === 'Advanced Workflow') {
      advancewflowRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [selectedInnerTab]);

  return (
    <div className={styles.TaskSettings}>
      <div ref={tasksettingRef}>
        <h1>Task settings</h1>
        <h2>Maximum taks per day</h2>
        <h3>Set the maximum number of tasks that a user can do per day</h3>
        <Div loading={isEmailSettingsLoading}>
          <div className={`${styles.inputDisplay} ${styles.maxTasks}`}>
            {emailSettings?.Task_Settings?.max_tasks}
          </div>
        </Div>
        <h2>Late task duration</h2>
        <h3>Set duration after which tasks get tagged as late</h3>

        <div className={styles.lateTasks}>
          {getLateTaskDetails(late_settings).map((task) => (
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
        {/* EXCEPTIONS  */}
        <div className={`${styles.exceptions} `}>
          {typeof Task_Settings === 'object' &&
            Task_Settings.exceptions?.length > 0 &&
            Task_Settings?.exceptions?.map((exception, index) => (
              <CollapseContainer
                openByDefault={false}
                className={styles.collapsibleContainer}
                key={exception.task_settings_id ?? index}
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
                <div>
                  {exception && (
                    <div className={`${styles.setting}`}>
                      <Title className={styles.title} size="14px">
                        Selected {LEVEL_TO_NAME[exception?.priority]}
                      </Title>
                      <div>
                        <Input
                          width={'40%'}
                          value={
                            exception
                              ? exception.priority === SETTING_PRIORITY.USER
                                ? `${getUserName(users, exception.user_id)}`
                                : `${getTeamName(
                                    subDepartments,
                                    exception.sd_id
                                  )}`
                              : 'Deleted Group'
                          }
                          disabled
                        />
                      </div>
                      <h2>Maximum takss </h2>
                      <h3>
                        Set the maximum number of tasks that a user can do per
                        day
                      </h3>
                      <div
                        className={`${styles.inputDisplay} ${styles.maxTasks}`}
                      >
                        {exception?.max_tasks}
                      </div>
                      <h2>Late task duration</h2>
                      <h3 className={styles.message}>
                        Set duration after which tasks get tagged as late
                      </h3>
                    </div>
                  )}
                  <div className={`${styles.lateTasks} ${styles.marginzero}`}>
                    {getLateTaskDetails(exception).map((task) => (
                      <div className={styles.lateTask}>
                        <div className="">
                          {task.icon}
                          <h2>{task.title}</h2>
                        </div>
                        <div
                          className={`${styles.inputDisplay} ${styles.lateTaskTime}`}
                        >
                          {task.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapseContainer>
            ))}
        </div>
      </div>
      <hr />
      {/* TASK SETTINGS PART ENDS HERE */}

      <div className={styles.skipTask} ref={skiptaskRef}>
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

        {isEmailSettingsLoading ? (
          <Div className={styles.loader} loading={isEmailSettingsLoading}></Div>
        ) : (
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
        )}
      </div>
      {/*  Skipped Task settings ended here */}

      {/* LEAD SCROING PART STARTS FROM HERE */}
      {/*  LEAD SCORING */}
      <div className={styles.leadscoring} ref={leadscoreRef}>
        <h1>Lead Scoring</h1>
        <h2>Score</h2>
        <h3>
          Configure your lead scoring system to help agents visualize their hot
          leads
        </h3>
        <div className={styles.leadTags}>
          {typeof Lead_Score_Settings === 'object' &&
            getLeadScoreData(Lead_Score_Settings)?.map((item) => {
              return (
                <div className={item?.icon !== '' ? styles.yellowdiv : ''}>
                  {item.icon !== '' ? (
                    <div>
                      {' '}
                      <span>{item.icon}</span> {item.title}{' '}
                    </div>
                  ) : item.hasOwnProperty('duration') ? (
                    <div className={styles.duration}>
                      {' '}
                      <span>{item.title}</span>
                      <span className={styles.minutes}>
                        <span>
                          {item.duration > 60
                            ? item?.duration / 60
                            : item.duration}{' '}
                        </span>
                        {item?.duration > 60 ? 'Minutes' : 'Seconds'}
                      </span>
                    </div>
                  ) : (
                    item?.title
                  )}
                  <div className={styles.inputnumber}>
                    <div>
                      <span>{item.value}</span>
                    </div>
                    {item?.title === 'Lead Score Reset Period'
                      ? 'Days'
                      : 'points'}
                  </div>
                </div>
              );
            })}
        </div>

        {/*  USER AND GROUP EXCEPTIONS HERE */}

        <div className={styles.exceptionscontainer}>
          {typeof Lead_Score_Settings === 'object' &&
            Lead_Score_Settings?.exceptions.length > 0 &&
            Lead_Score_Settings?.exceptions?.map((exception, index) => (
              <CollapseContainer
                openByDefault={false}
                className={`${styles.collapsibleContainerexception}`}
                title={
                  <div className={styles.header}>
                    <Title className={styles.title} size="1.1rem">
                      {exception.priority === SETTING_PRIORITY.USER
                        ? `User Exception (${getUserName(
                            users,
                            exception.user_id
                          )})`
                        : `Group Exception (${getTeamName(
                            subDepartments,
                            exception.sd_id
                          )})`}
                    </Title>
                  </div>
                }
                key={exception?.unsubscribe_settings_id ?? index}
              >
                <SingleLeadScoreException
                  exception={exception}
                  users={users}
                  subDepartments={subDepartments}
                />
              </CollapseContainer>
            ))}
        </div>
      </div>
      <hr />

      <div className={styles.advanceWorkflow} ref={standardwflowRef}>
        <h1>Standard Workflow</h1>
        <h2>Set Trigger And Action</h2>
        <div className={styles.customWebhook}>
          <h3>Add a new trigger and assign one or multiple</h3>
          {isWorkflowSettingsLoading ? (
            <Div
              loading={isWorkflowSettingsLoading}
              className={styles.loader}
            ></Div>
          ) : (
            <div className={`${styles.webhookDisplay}`}>
              {!isWorkflowSettingsLoading
                ? workflowSettings?.map((wflow, index) => {
                    return <Triggers workflow={wflow} index={index} />;
                  })
                : null}
            </div>
          )}
        </div>
      </div>

      <div className={styles.advanceWorkflow} ref={advancewflowRef}>
        <h1>Advanced Workflow</h1>
        <h2>Set Trigger And Action</h2>
        <div className={styles.customWebhook}>
          <h3>Add a new trigger and assign one or multiple</h3>

          <div className={`${styles.webhookDisplay}`}>
            {!automatedWorkflowSettingsLoading ? (
              automatedWorkflowSettings?.map((wflow, index) => {
                return (
                  <div
                    className={styles.advanceworkflowbg}
                    onClick={() => {
                      setModal(true);
                      setWorkflowdata((prev) => ({
                        ...prev,
                        data: wflow,
                        modalIndex: index,
                      }));
                    }}
                  >
                    {' '}
                    Advance Workflow {index + 1}
                  </div>
                );
              })
            ) : (
              <Div
                loading={automatedWorkflowSettingsLoading}
                className={styles.loader}
              ></Div>
            )}
          </div>
        </div>
      </div>

      {modal && (
        <AddRuleModal
          modal={modal}
          setModal={setModal}
          workflow={workflowdata}
          setWorkflowdata={setWorkflowdata}
        />
      )}
    </div>
  );
}

export default TaskSettings;

export const Status = ({ item }) => {
  return (
    <CollapseContainer
      openByDefault={false}
      theme={'PRIMARY'}
      className={styles.container}
      key={item?.title}
      title={
        <div className={styles.header}>
          <Title className={styles.title} size="14px">
            {item.title}
          </Title>
        </div>
      }
    >
      <div className={styles.statusdetails}>
        {Object.entries(item?.value)?.map((status) => {
          return (
            <div className={styles.statusdata}>
              <div className={styles.title}>{status[0]}</div>
              <div className={styles.points}>
                <span>{status[1]} </span>points
              </div>
            </div>
          );
        })}
      </div>
    </CollapseContainer>
  );
};

export const SingleLeadScoreException = ({
  exception,
  users,
  subDepartments,
}) => {
  return (
    <div className={styles.singleexception}>
      {exception && (
        <div className={`${styles.setting}`}>
          <Title className={styles.title} size="14px">
            Selected {LEVEL_TO_NAME[exception?.priority]}
          </Title>
          <div>
            <Input
              width={'40%'}
              value={
                exception
                  ? exception.priority === SETTING_PRIORITY.USER
                    ? `${getUserName(users, exception.user_id)}`
                    : `${getTeamName(subDepartments, exception.sd_id)}`
                  : 'Deleted Group'
              }
              disabled
            />
          </div>
        </div>
      )}
      <div className={styles.leadTags}>
        {typeof exception === 'object' &&
          getLeadScoreData(exception)?.map((item) => {
            return (
              <div
                className={item?.icon !== '' ? styles.yellowdiv : ''}
                style={{ background: item?.icon === '' && 'transparent' }}
              >
                {item.icon !== '' ? (
                  <div>
                    {' '}
                    <span>{item.icon}</span> {item.title}{' '}
                  </div>
                ) : item.hasOwnProperty('duration') ? (
                  <div className={styles.duration}>
                    {' '}
                    <span>{item.title}</span>
                    <span className={styles.minutes}>
                      <span>
                        {item.duration > 60
                          ? item?.duration / 60
                          : item.duration}{' '}
                      </span>
                      {item?.duration > 60 ? 'Minutes' : 'Seconds'}
                    </span>
                  </div>
                ) : (
                  item?.title
                )}
                <div className={styles.inputnumber}>
                  <div>
                    <span>{item.value}</span>
                  </div>
                  {item?.title === 'Lead Score Reset Period'
                    ? 'Days'
                    : 'points'}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
