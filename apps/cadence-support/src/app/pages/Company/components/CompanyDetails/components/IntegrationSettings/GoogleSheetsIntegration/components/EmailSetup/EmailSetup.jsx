import styles from './EmailSetup.module.scss';
import { Google, Outlook } from '@cadence-support/icons';
import { MAIL_INTEGRATION_TYPES } from '@cadence-support/constants';
import { useLocation } from 'react-router-dom';

function EmailSetup() {
  const { state: companyDetails } = useLocation();

  return (
    <div className={styles.emailSetupContainer}>
      {companyDetails?.Company_Setting?.mail_integration_type ===
      MAIL_INTEGRATION_TYPES.GOOGLE ? (
        <>
          <div className={styles.rowTitle}>
            <h1>Your selected mail system</h1>
          </div>
          <div className={styles.rowValue}>
            <div className={styles.integrationStatus}>
              <Google />
              <h2>This organisation is connected with Google Workspace</h2>
            </div>
          </div>
        </>
      ) : 
      companyDetails?.Company_Setting?.mail_integration_type ===
        MAIL_INTEGRATION_TYPES.OUTLOOK ?
      (
        <>
          <div className={styles.rowTitle}>
            <h1>Your selected mail system</h1>
          </div>
          <div className={styles.rowValue}>
            <div className={styles.integrationStatusOutlook}>
              <Outlook size={35} />
              <h2>This organisation is connected with Microsoft Outlook</h2>
            </div>
          </div>
        </>
      ) :
      <>
      <div className={styles.rowTitle}>
        <h1>Your selected mail system</h1>
      </div>
      <div className={styles.rowValue}>
        <div className={styles.integrationStatusOutlook}>
          <h2>This organisation is not connected with a Mail System yet</h2>
        </div>
      </div>
    </>
    }
    </div>
  );
}

export default EmailSetup;
