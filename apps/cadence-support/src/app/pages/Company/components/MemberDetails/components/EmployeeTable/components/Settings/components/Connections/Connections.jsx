import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import styles from './Connections.module.scss';
import { Google, Outlook } from '@cadence-support/icons';
import { TABS } from '../../constants';

const Connections = ({ setRef, user }) => {
  return (
    <div
      ref={setRef}
      id={TABS.CONNECT_SOURCE}
      className={styles.connectionsContainer}
    >
      <div className={styles.cHeading}>Connect from another source</div>
      <div className={styles.settings}>
        <div
          className={`${
            user?.User_Token?.is_google_token_expired ? '' : styles.active
          }`}
          onClick={() => null}
        >
          <Google />{' '}
          {user?.User_Token?.is_google_token_expired
            ? 'Not connected with Google'
            : 'User is connected with Google'}
        </div>
        <div
          className={`${
            user?.User_Token?.is_outlook_token_expired ? '' : styles.active
          }`}
          onClick={() => null}
        >
          <Outlook size="2.4rem" />{' '}
          {user?.User_Token?.is_outlook_token_expired
            ? 'Not connected with Outlook'
            : 'User is connected with Outlook'}
        </div>
      </div>
    </div>
  );
};

export default Connections;
