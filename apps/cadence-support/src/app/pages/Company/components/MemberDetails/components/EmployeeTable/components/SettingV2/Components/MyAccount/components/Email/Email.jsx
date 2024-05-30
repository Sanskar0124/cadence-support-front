import styles from './Email.module.scss';
import { InputRadio } from '@cadence-support/widgets';
import Placeholder from '../Placeholder/Placeholder';
import { MAIL_INTEGRATION_TYPES } from '@cadence-support/constants';
import { Google, GoogleBox } from '@cadence-support/icons';
import moment from 'moment';

const Email = ({ setRef, user, loading }) => {
  const trackingDateforGoogle = user?.tracking?.find(
    (obj) => obj?.activity === 'google_signin'
  );

  return (
    <>
      <div className={styles.connectionsContainer} ref={setRef}>
        <div className={styles.cHeading}>Emails</div>
        {loading ? (
          <Placeholder rows={2} />
        ) : (
          <div
            className={
              user?.is_google_token_expired
                ? styles.connectedwith
                : `${styles.connectedwith} ${styles.active}`
            }
          >
            <div className={styles.icon}>
              <Google />
            </div>
            <div className={styles.details}>
              <p className={styles.title}>
                {!user?.is_google_token_expired
                  ? 'Connected with Google'
                  : 'Not Connected with Google'}
              </p>
              {trackingDateforGoogle?.created_at !== null && (
                <p className={styles.subtitle}>
                  Last connected on{' '}
                  {moment(trackingDateforGoogle?.created_at).format(
                    'DD MMMM, YYYY'
                  )}
                </p>
              )}
            </div>
          </div>
        )}
        <div className={styles.cTitle}>Your email address</div>
        {user?.mail_integration_type === MAIL_INTEGRATION_TYPES.GOOGLE &&
          user?.is_google_token_expired &&
          'Please connect with Google to get emails'}
        {user?.mail_integration_type === MAIL_INTEGRATION_TYPES.OUTLOOK &&
          user?.is_outlook_token_expired &&
          'Please connect with Outlook to get emails'}

        <div className={styles.options}>
          {loading ? (
            <Placeholder rows={3} />
          ) : (
            <>
              {user?.primary_email &&
                user?.email &&
                user?.primary_email === user?.email && (
                  <div className={styles.active}>
                    <div className={styles.input}>
                      <InputRadio
                        size={40}
                        checked={user?.primary_email}
                        value={user?.primary_email}
                        onChange={() => null}
                      />

                      <span className={styles.name}>{user?.primary_email}</span>
                    </div>
                  </div>
                )}

              {user?.primary_email &&
                user?.email &&
                user?.primary_email !== user?.email && (
                  <>
                    <div
                      className={`${user?.primary_email ? styles.active : ''}`}
                    >
                      <div className={styles.input}>
                        {user?.primary_email && (
                          <InputRadio
                            size={40}
                            checked={user?.primary_email}
                            value={user?.primary_email}
                            onChange={() => null}
                          />
                        )}

                        <span className={styles.name}>
                          {user?.primary_email}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className={styles.input}>
                        {user?.email && (
                          <InputRadio
                            size={40}
                            // checked={user?.email}
                            // value={user?.email}
                            onChange={() => null}
                            disabled
                          />
                        )}
                        <span className={styles.name}>{user?.email}</span>
                      </div>
                    </div>
                  </>
                )}

              {user?.email && user?.primary_email == null && (
                <div>
                  <div className={styles.input}>
                    {user?.email && (
                      <InputRadio
                        size={40}
                        // checked={user?.email}
                        // value={user?.email}
                        onChange={() => null}
                        disabled
                      />
                    )}
                    <span className={styles.name}>{user?.email}</span>
                  </div>
                </div>
              )}

              {user?.primary_email && user?.email === null && (
                <div className={`${user?.primary_email ? styles.active : ''}`}>
                  <div className={styles.input}>
                    {user?.primary_email && (
                      <InputRadio
                        size={40}
                        checked={user?.primary_email}
                        value={user?.primary_email}
                        onChange={() => null}
                      />
                    )}

                    <span className={styles.name}>{user?.primary_email}</span>
                  </div>
                </div>
              )}

              {user?.primary_email === null && user?.email === null && (
                <div>
                  <div className={styles.input}>
                    <span className={styles.name}>{'Not Available'}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Email;
