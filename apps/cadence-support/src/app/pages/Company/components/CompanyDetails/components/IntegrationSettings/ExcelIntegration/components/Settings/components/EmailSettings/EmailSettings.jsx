import { useIntegrations } from '@cadence-support/data-access';
import styles from './EmailSettings.module.scss';
import moment from 'moment';
import {
  AtrManualEmail,
  Linkedin,
  Message,
  Call,
  AutoSms,
  AtrAutoEmail,
  TickGradient,
  CloseGradient,
} from '@cadence-support/icons';
import { Toggle } from '@cadence-support/widgets';
import { getNonWorkingDays } from '../WorkingDaysSettings/WorkingDaysSettings';

function EmailSettings({ companyID }) {
  const { emailSettings } = useIntegrations(companyID);
  const {
    Automated_Task_Settings,
    Unsubscribe_Mail_Settings,
    Bounced_Mail_Settings,
    Custom_Domain_Settings,
  } = emailSettings;

  const SKIPPED_ITEMS_LIST = [
    {
      title: 'Manual Emails',
      icon: <AtrManualEmail height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data?.mail,
      bounced: Bounced_Mail_Settings?.semi_automatic_unsubscribed_data?.mail,
    },
    {
      title: 'Automatic Emails',
      icon: <AtrAutoEmail height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data
          ?.automated_mail,
      bounced:
        Bounced_Mail_Settings?.semi_automatic_bounced_data?.automated_mail,
    },
    {
      title: 'Call',
      icon: <Call height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data?.call,
      bounced: Bounced_Mail_Settings?.semi_automatic_unsubscribed_data?.call,
    },
    {
      title: 'Linkedin',
      icon: <Linkedin height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data
          ?.linkedin_message,
      bounced:
        Bounced_Mail_Settings?.semi_automatic_unsubscribed_data
          ?.linkedin_message,
    },
    {
      title: 'Automatic SMS',
      icon: <AutoSms height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data
          ?.automated_message,
      bounced:
        Bounced_Mail_Settings?.semi_automatic_unsubscribed_data
          ?.automated_message,
    },
    {
      title: 'Manual SMS',
      icon: <Message height={18} />,
      unsubscribed:
        Unsubscribe_Mail_Settings?.semi_automatic_unsubscribed_data?.message,
      bounced: Bounced_Mail_Settings?.semi_automatic_unsubscribed_data?.message,
    },
  ];

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
  return (
    <div className={styles.EmailSettings}>
      {/* SENDING CALENDAR */}
      <div className={styles.calendar}>
        <h1>Sending Calendar</h1>
        <div className={`${styles.grid} `}>
          <div className="">
            <h2>Days</h2>
            <h3>Set a schedule for your outgoing mails</h3>
            <div className={styles.sendingCalendar}>
              <div className={`${styles.inputDisplay} `}>
                {getNonWorkingDays(Automated_Task_Settings?.working_days).map(
                  (item, index) => (
                    <span>{(index ? ' - ' : ' ') + item}</span>
                  )
                )}
              </div>
              <div className={`${styles.inputDisplay} `}>
                {getEmailTime(Automated_Task_Settings)}
              </div>
            </div>
          </div>
          <div className="">
            <h2>Maximum emails per day</h2>
            <h3>Set a maximum value for emails sent out in a day</h3>
            <div className={`${styles.inputDisplay} ${styles.maxEmails}`}>
              {Automated_Task_Settings?.max_emails_per_day || '00'}
            </div>
          </div>
          <div className="">
            <h2>Time between emails</h2>
            <h3>Set a delay time between your outgoing mails.</h3>
            <div className={styles.timeBetween}>
              <div className={`${styles.inputDisplay} `}>
                {Automated_Task_Settings?.is_wait_time_random
                  ? 'Random'
                  : 'Not Random'}
              </div>
              <div className={`${styles.inputDisplay} `}>
                {getMinutes(Automated_Task_Settings?.delay)}
              </div>
            </div>
          </div>
        </div>

        {/* TEAM EXCEPTION */}
        {Automated_Task_Settings?.exception?.length && (
          <div className={styles.teamException}>
            <h1>
              Team Exception <span>| Inside sales FR</span>{' '}
            </h1>
            <div className={`${styles.grid} `}>
              <div className="">
                <h2>Days</h2>
                <h3>Set a schedule for your outgoing mails</h3>
                <div className={styles.sendingCalendar}>
                  <div className={`${styles.inputDisplay} `}>
                    {' '}
                    {getNonWorkingDays(
                      Automated_Task_Settings?.exception[0]?.working_days
                    ).map((item, index) => (
                      <span>{(index ? ' - ' : ' ') + item}</span>
                    ))}
                  </div>
                  <div className={`${styles.inputDisplay} `}>
                    {getEmailTime(Automated_Task_Settings?.exceptions[0])}
                  </div>
                </div>
              </div>
              <div className="">
                <h2>Maximum emails per day</h2>
                <h3>Set a maximum value for emails sent out in a day</h3>
                <div className={`${styles.inputDisplay} ${styles.maxEmails}`}>
                  {Automated_Task_Settings?.exceptions[0]?.max_emails_per_day ||
                    '00'}
                </div>
              </div>
              <div className="">
                <h2>Time between emails</h2>
                <h3>Set a delay time between your outgoing mails.</h3>
                <div className={styles.timeBetween}>
                  <div className={`${styles.inputDisplay} `}>
                    {' '}
                    {Automated_Task_Settings?.exceptions[0]?.is_wait_time_random
                      ? 'Random'
                      : 'Not Random'}
                  </div>
                  <div className={`${styles.inputDisplay} `}>
                    {' '}
                    {getMinutes(Automated_Task_Settings?.exceptions[0]?.delay)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* UNSUBSCRIBED RULES */}
      <div className={styles.unsubscribed}>
        <h1>Unsubscribed rules</h1>
        <h2>Task to be skipped if unsubscribed</h2>
        <h3>
          Please select task that will be skipped from the cadence if people
          unsubscribes
        </h3>
        <div className={styles.ruleTags}>
          {SKIPPED_ITEMS_LIST.map((item) => (
            <div className={!item.unsubscribed && styles.disable}>
              {item.icon} <h2>{item.title}</h2>
            </div>
          ))}
        </div>
        <span className="">
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
      </div>

      {/* BOUNCED RULES */}
      <div className={styles.bounced}>
        <h1>Bounced rules</h1>
        <h2>Task to be skipped if email bounced</h2>
        <h3>
          Please select task that will be skipped from the cadence if people
          email bounces
        </h3>
        <div className={styles.ruleTags}>
          {SKIPPED_ITEMS_LIST.map((item) => (
            <div className={!item.bounced && styles.disable}>
              {item.icon} <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
      {/* DOMAIN VERIFICATION */}
      {Object.keys(Custom_Domain_Settings).length !== 0 && (
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
      )}
    </div>
  );
}

export default EmailSettings;
