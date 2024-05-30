import {
  Flatchr,
  Hubspot,
  Netflix,
  Pipedrive,
  Salesforce,
  Zendesk,
} from '@cadence-support/icons';
import DisconnectedLeads from '../ServicesHealth/ServicesHealth';
import styles from './CompanyTabs.module.scss';

const CompanyTabs = () => {
  return (
    <div className={styles.companyTabs}>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <div className={styles.logo}>
            <Netflix />
            <span>12</span>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.logo}>
            <Hubspot />
            <span>12</span>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.logo}>
            <Zendesk />
            <span>12</span>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.logo}>
            <Flatchr />
            <span>12</span>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.logo}>
            <Pipedrive />
            <span>12</span>
          </div>
        </div>
      </div>

      <DisconnectedLeads />
    </div>
  );
};

export default CompanyTabs;
