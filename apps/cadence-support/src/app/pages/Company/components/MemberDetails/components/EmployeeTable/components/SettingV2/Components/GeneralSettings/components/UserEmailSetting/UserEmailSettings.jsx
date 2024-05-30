import styles from './EmailSettings.module.scss';
import moment from 'moment';
import { TickGradient, CloseGradient } from '@cadence-support/icons';
import {
  Checkbox,
  CollapseContainer,
  Input,
  Select,
  Toggle,
} from '@cadence-support/widgets';

import { useEffect, useRef } from 'react';
import { Div, Title } from '@cadence-support/components';
import { getunsuscribeList } from './constant';
import { SETTING_PRIORITY } from '@cadence-support/constants';
import { getUserName, getTeamName } from '../TaskSettings/utils';
import { LEVEL_TO_NAME } from '../TaskSettings/components/SingleSkipSettings/constants';
import { WEEK_DAYS } from '../../../../constants';

function UserEmailSettings({
  userSettings,
  userSettingsLoading,
  users,
  subDepartments,
  sendingCalenderRef,
  unbouncedRuleRef,
  BouncedMailRules,
  selectedInnerTab,
}) {
  const {
    Automated_Task_Settings,
    Unsubscribe_Mail_Settings,
    Bounced_Mail_Settings,
  } = userSettings || {};

  const getEmailTime = (data) => {
    const start = moment(data?.start_hour, ['HH']).format('hh A');
    const end = moment(data?.end_hour, ['HH']).format('hh A');
    return `${start || '00'} - ${end || '00'}`;
  };
  const getMinutes = (seconds) => {
    const m = Math.floor((seconds % 3600) / 60);
    const mDisplay =
      m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '00 minutes';
    return mDisplay;
  };
  //  USEEFFECT FOR SCROLLING TO THE TARGET DIV

  useEffect(() => {
    if (selectedInnerTab.name === 'Unsubscribe rules') {
      unbouncedRuleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedInnerTab.name === 'Sending calendar') {
      sendingCalenderRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedInnerTab.name === 'Bounced rules') {
      BouncedMailRules.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedInnerTab]);

  return (
    <div className={styles.EmailSettings}>
      {/* SENDING CALENDAR */}
      <div className={styles.calendar} ref={sendingCalenderRef}>
        <h1>Sending Calendar</h1>
        <div className={`${styles.grid} `}>
          <div className="">
            <h2>Days</h2>
            <h3>Set a schedule for your outgoing mails</h3>
            <Div loading={userSettingsLoading}>
              <div className={styles.sendingCalendar}>
                <div className={styles.days}>
                  {Automated_Task_Settings?.working_days?.length > 0 &&
                    Object.keys(WEEK_DAYS)?.map((item, index) =>
                      Automated_Task_Settings?.working_days?.includes(item) ? (
                        <div className={styles.enabled}>{WEEK_DAYS[item]}</div>
                      ) : (
                        <div className={`${styles.disabled} ${styles.enabled}`}>
                          {WEEK_DAYS[item]}
                        </div>
                      )
                    )}
                </div>
                <div className={`${styles.inputDisplay} `}>
                  {getEmailTime(Automated_Task_Settings)}
                </div>
              </div>
            </Div>
          </div>
          <div className="">
            <h2>Maximum emails per day</h2>
            <h3>Set a maximum value for emails sent out in a day</h3>
            <Div loading={userSettingsLoading}>
              <div className={`${styles.inputDisplay} ${styles.maxEmails}`}>
                {Automated_Task_Settings?.max_emails_per_day || '00'}
              </div>
            </Div>
          </div>
          <div className="">
            <h2>Maximum emails per day</h2>
            <h3>Set a maximum value for emails sent out in a day</h3>
            <Div loading={userSettingsLoading}>
              <div className={`${styles.inputDisplay} ${styles.maxEmails}`}>
                {Automated_Task_Settings?.max_sms_per_day || '00'}
              </div>
            </Div>
          </div>
          <div className="">
            <h2>Time between emails</h2>
            <h3>Set a delay time between your outgoing mails.</h3>
            <Div loading={userSettingsLoading}>
              <div className={styles.timeBetween}>
                <div className={`${styles.inputDisplay} `}>
                  {Automated_Task_Settings?.is_wait_time_random
                    ? 'Random'
                    : 'Fixed'}
                </div>
                <div className={`${styles.inputDisplay} `}>
                  {getMinutes(Automated_Task_Settings?.delay)}
                </div>
              </div>
            </Div>
          </div>
        </div>

        {/* USER AND GROUP EXCEPTIONS  WITH COLLAPSABLE CONTAINER*/}
        {userSettingsLoading && (
          <Div loading={userSettingsLoading} className={styles.loader}>
            {' '}
          </Div>
        )}
        {Automated_Task_Settings?.exceptions?.length > 0 &&
          Automated_Task_Settings?.exceptions?.map((exception, index) => (
            <CollapseContainer
              openByDefault={false}
              className={styles.collapsibleContainer}
              title={
                <div className={styles.header}>
                  <Title className={styles.title} size="1.1rem">
                    {exception.priority === SETTING_PRIORITY.USER
                      ? `User
                    Exception (${getUserName(users, exception.user_id)})`
                      : `Group Exception (${getTeamName(
                          subDepartments,
                          exception.sd_id
                        )})`}
                  </Title>
                </div>
              }
              key={exception?.at_settings_id ?? index}
            >
              <div>
                {exception && (
                  <div className={styles.setting}>
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
                  </div>
                )}
                <div className={`${styles.teamException} ${styles.grid}`}>
                  <div className="">
                    <h2>Days</h2>
                    <h3>Set a schedule for your outgoing mails</h3>
                    <Div loading={userSettingsLoading}>
                      <div className={styles.sendingCalendar}>
                        <div className={styles.days}>
                          {Automated_Task_Settings?.working_days?.length > 0 &&
                            Object.keys(WEEK_DAYS)?.map((item, index) =>
                              Automated_Task_Settings?.working_days?.includes(
                                item
                              ) ? (
                                <div className={` ${styles.enabled}`}>
                                  {WEEK_DAYS[item]}
                                </div>
                              ) : (
                                <div
                                  className={`${styles.disabled} ${styles.enabled}`}
                                >
                                  {WEEK_DAYS[item]}
                                </div>
                              )
                            )}
                        </div>
                        <div className={`${styles.inputDisplay} `}>
                          {getEmailTime(exception)}
                        </div>
                      </div>
                    </Div>
                  </div>
                  <div className="">
                    <h2>Maximum emails per day</h2>
                    <h3>Set a maximum value for emails sent out in a day</h3>
                    <Div loading={userSettingsLoading}>
                      <div
                        className={`${styles.inputDisplay} ${styles.maxEmails}`}
                      >
                        {exception?.max_emails_per_day || '00'}
                      </div>
                    </Div>
                  </div>
                  <div className="">
                    <h2>Maximum SMS per day</h2>
                    <h3>Set a maximum value for sms sent out in a day</h3>
                    <Div loading={userSettingsLoading}>
                      <div
                        className={`${styles.inputDisplay} ${styles.maxEmails}`}
                      >
                        {exception?.max_emails_per_day || '00'}
                      </div>
                    </Div>
                  </div>
                  <div className="">
                    <h2>Time between emails</h2>
                    <h3>Set a delay time between your outgoing mails.</h3>
                    <Div loading={userSettingsLoading}>
                      <div className={styles.timeBetween}>
                        <div className={`${styles.inputDisplay} `}>
                          {' '}
                          {exception?.is_wait_time_random ? 'Random' : 'Fixed'}
                        </div>
                        <div className={`${styles.inputDisplay} `}>
                          {' '}
                          {getMinutes(exception)}
                        </div>
                      </div>
                    </Div>
                  </div>
                </div>
              </div>
            </CollapseContainer>
          ))}
      </div>
      {/*  SENDING CALENDER ENDS HERE */}

      {/* UNSUBSCRIBED RULES */}
      <div ref={unbouncedRuleRef}>
        <div className={styles.unsubscribed}>
          <h1>Unsubscribed rules</h1>
          <h2>Task to be skipped if unsubscribed</h2>
          <h3>
            Please select task that will be skipped from the cadence if people
            unsubscribes
          </h3>
          <div className={`${styles.ruleTags} ${styles.margin}`}>
            {getunsuscribeList(Unsubscribe_Mail_Settings)?.map((item) => (
              <div className={!item.unsubscribed && styles.disable}>
                <Checkbox
                  checked={item?.unsubscribed}
                  className={styles.disable}
                />
                <div>
                  {item.icon} <h2>{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <span className={styles.mandatoryLink}>
            <h2>Unsubscribe link mandatory for emails</h2>
            <Toggle
              theme="PURPLE"
              disabled
              checked={
                Unsubscribe_Mail_Settings?.unsubscribe_link_madatory_for_semi_automated_mails
              }
            />
          </span>
          <div className="">
            <h2>Set default unsubscribe text</h2>
            <h3>
              Use “&#123; &#125;” to mark the part of the text which will be
              clickable
            </h3>
            <div className={`${styles.inputDisplay} ${styles.click}`}>
              {Unsubscribe_Mail_Settings?.default_unsubscribe_link_text}
            </div>
          </div>
          {/* USER AND GROUP EXCEPTIONS PART WITH COLLAPSABLE CONTAINER */}
          {userSettingsLoading && (
            <Div loading={userSettingsLoading} className={styles.loader}>
              {' '}
            </Div>
          )}
          {typeof Unsubscribe_Mail_Settings === 'object' &&
            Unsubscribe_Mail_Settings?.exceptions.length > 0 &&
            Unsubscribe_Mail_Settings?.exceptions?.map((exception, index) => (
              <CollapseContainer
                openByDefault={false}
                className={`${styles.collapsibleContainer} ${styles.setwidth}`}
                title={
                  <div className={styles.header}>
                    <Title className={styles.title} size="1.1rem">
                      {exception.priority === SETTING_PRIORITY.USER
                        ? `User
                  Exception (${getUserName(users, exception.user_id)})`
                        : `Group Exception (${getTeamName(
                            subDepartments,
                            exception.sd_id
                          )})`}
                    </Title>
                  </div>
                }
                key={exception?.unsubscribe_settings_id ?? index}
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
                    </div>
                  )}
                  <div className={styles.ruleTags}>
                    {getunsuscribeList(exception)?.map((item) => (
                      <div className={!item.unsubscribed && styles.disable}>
                        <Checkbox
                          checked={item?.unsubscribed}
                          className={!item.unsubscribed && styles.disable}
                        />
                        <div>
                          {item.icon} <h2>{item.title}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapseContainer>
            ))}
        </div>
      </div>
      {/*  UNSUSCRIBE RULES ENDS HERE */}

      {/* BOUNCED RULES */}
      <div className={styles.bounced} ref={BouncedMailRules}>
        <h1>Bounced rules</h1>
        <h2>Task to be skipped if email bounced</h2>
        <h3>
          Please select task that will be skipped from the cadence if people
          email bounces
        </h3>
        <div className={`${styles.ruleTags}  ${styles.margin}`}>
          {getunsuscribeList(Bounced_Mail_Settings)?.map((item) => (
            <div className={!item.bounced && styles.disable}>
              <Checkbox checked={item?.bounced} className={styles.disable} />
              <div>
                {item.icon} <h2>{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
        {/*  USER AND GROUP EXCEPTIONS WITH COLLAPSE CONTAINER */}
        {userSettingsLoading && (
          <Div loading={userSettingsLoading} className={styles.loader}>
            {' '}
          </Div>
        )}
        {typeof Bounced_Mail_Settings === 'object' &&
          Bounced_Mail_Settings?.exceptions.length > 0 &&
          Bounced_Mail_Settings?.exceptions?.map((exception, index) => (
            <CollapseContainer
              openByDefault={false}
              className={`${styles.collapsibleContainer} ${styles.setwidth}`}
              title={
                <div className={styles.header}>
                  <Title className={styles.title} size="1.1rem">
                    {exception.priority === SETTING_PRIORITY.USER
                      ? `User
                  Exception (${getUserName(users, exception.user_id)})`
                      : `Group Exception (${getTeamName(
                          subDepartments,
                          exception.sd_id
                        )})`}
                  </Title>
                </div>
              }
              key={exception?.unsubscribe_settings_id ?? index}
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
                  </div>
                )}
                <div className={`${styles.ruleTags}  ${styles.margin}`}>
                  {getunsuscribeList(exception)?.map((item) => (
                    <div className={!item.unsubscribed && styles.disable}>
                      <Checkbox
                        checked={item?.unsubscribed}
                        className={styles.disable}
                      />
                      <div>
                        {item.icon} <h2>{item.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapseContainer>
          ))}
      </div>

      {/* DOMAIN VERIFICATION */}
      {/* <div>
        {typeof Custom_Domain_Settings === 'object' &&
        Object.keys(Custom_Domain_Settings)?.length !== 0 ? (
          <div className={styles.domain}>
            <h1>Domain Verification</h1>
            <h2>Set up custom domain link</h2>
            <h3>
              Add the following details as a CNAME record with your DNS provider
            </h3>
            <div className={styles.form}>
              <div className="">
                <h2>Domain name</h2>
                <div className={`${styles.inputDisplay} ${styles.input}`}>
                  {Custom_Domain_Settings?.domain_name || '--'}
                </div>
              </div>
              <div className="">
                <h2>Hostname record type</h2>
                <div className={`${styles.inputDisplay} ${styles.input}`}>
                  {Custom_Domain_Settings?.cd_id || '--'}
                </div>
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.head}>
                <h2>TYPE</h2>
                <h2>HOST</h2>
                <h2>VALUE</h2>
                <h2>STATUS</h2>
              </div>
              <div className={styles.row}>
                <h2> {Custom_Domain_Settings?.cd_id || '--'}</h2>
                <h2>{Custom_Domain_Settings?.domain_name || '--'}</h2>
                <h2> {Custom_Domain_Settings?.domain_name || '--'}</h2>
                <span className={styles.validated}>
                  {Custom_Domain_Settings?.domain_status ? (
                    <>
                      <TickGradient /> Validated
                    </>
                  ) : (
                    <>
                      <CloseGradient /> Not Validated
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h1>No data Available for Domain</h1>
        )}
      </div> */}
    </div>
  );
}

export default UserEmailSettings;
