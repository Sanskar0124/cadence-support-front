import styles from './SalesforceAuth.module.scss';
import {
  Excel,
  GoogleSheets,
  Hubspot,
  Pipedrive,
  SalesforceCloud,
  Bullhorn,
  Zoho,
  Sellsy,
  Dynamics,
} from '@cadence-support/icons';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { Colors } from '@cadence-support/utils';
import { TABS } from '../../constants';
import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';

const SalesforceAuth = ({ setRef, user, integrationType }) => {
  return (
    <div
      ref={setRef}
      id={TABS.CONNECT_INTEGRATION}
      className={styles.connectionsContainer}
    >
      <div className={styles.cHeading}>Connect to your integration</div>
      <div className={styles.settings}>
        {integrationType === USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <GoogleSheets />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Google Sheets'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.SALESFORCE_OWNER && (
          <div
            className={`${
              user?.User_Token?.is_salesforce_logged_out ? '' : styles.active
            }`}
            onClick={() => null}
          >
            <SalesforceCloud color={Colors.blueShade1} />{' '}
            {user?.User_Token?.is_salesforce_logged_out
              ? 'Not connected with Salesforce'
              : 'Salesforce authenticated'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.HUBSPOT_OWNER && (
          <div
            className={`${
              user?.Hubspot_Token?.is_logged_out ? '' : styles.active
            } ${styles.icon}`}
            onClick={() => null}
          >
            <Hubspot />{' '}
            {user?.Hubspot_Token?.is_logged_out
              ? 'Not connected with Hubspot'
              : 'Hubspot authenticated'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.PIPEDRIVE_USER && (
          <div
            className={`${
              user?.Pipedrive_Token?.is_logged_out ? '' : styles.active
            } ${styles.icon}`}
            onClick={() => null}
          >
            <Pipedrive />{' '}
            {user?.Pipedrive_Token?.is_logged_out
              ? 'Not connected with Pipedrive'
              : 'Pipedrive authenticated'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.EXCEL_USER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <Excel />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Excel'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.BULLHORN_USER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <Bullhorn />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Bullhorn'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.SELLSY_OWNER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <Sellsy />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Sellsy'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.ZOHO_USER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <Zoho />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Zoho'}
          </div>
        )}
        {integrationType === USER_INTEGRATION_TYPES.DYNAMICS_OWNER && (
          <div
            className={`${user?.integration_id ? styles.active : ''} ${
              styles.icon
            }`}
            onClick={() => null}
          >
            <Dynamics />{' '}
            {user?.integration_id
              ? user?.integration_id
              : 'Not connected with Microsoft dynamics'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesforceAuth;
