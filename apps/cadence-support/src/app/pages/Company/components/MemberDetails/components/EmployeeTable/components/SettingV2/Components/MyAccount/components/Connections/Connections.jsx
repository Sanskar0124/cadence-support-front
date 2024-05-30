import styles from './Connections.module.scss';
import { Google, Outlook } from '@cadence-support/icons';

const Connections = ({ setRef, user, loading }) => {
  return (
    <div ref={setRef} className={styles.connectionsContainer}>
      <div className={styles.cHeading}>Connect from another source</div>
      <div className={styles.settings}>
        <div
          className={`${user?.is_outlook_token_expired ? '' : styles.active}`}
          onClick={() => null}
        >
          <Outlook size="2.4rem" />{' '}
          {user?.is_outlook_token_expired
            ? 'Not connected with Outlook'
            : 'User is connected with Outlook'}
        </div>
      </div>
    </div>
  );
};

export default Connections;
