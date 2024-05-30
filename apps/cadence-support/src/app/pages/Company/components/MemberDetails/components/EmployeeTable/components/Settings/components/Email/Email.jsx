import styles from './Email.module.scss';
import { InputRadio } from '@cadence-support/widgets';
import Placeholder from '../Placeholder/Placeholder';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { MAIL_INTEGRATION_TYPES } from '@cadence-support/constants';
import { TABS } from '../../constants';

const Email = ({ setRef, user, loading }) => {
  return (
    <div ref={setRef} id={TABS.EMAIL} className={styles.connectionsContainer}>
      <div className={styles.cHeading}>Emails</div>
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

                      <span className={styles.name}>{user?.primary_email}</span>
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
  );
};

export default Email;
