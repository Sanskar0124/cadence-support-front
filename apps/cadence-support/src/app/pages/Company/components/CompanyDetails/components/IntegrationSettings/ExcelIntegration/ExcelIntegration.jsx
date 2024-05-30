import { useState } from 'react';
import styles from './ExcelIntegration.module.scss';
import ActivityLogs from './components/ActivityLogs/ActivityLogs';
import PhoneSettings from './components/PhoneSettings/PhoneSettings';
import ExcelSettings from './components/ExcelSettings/ExcelSettings';
import EmailSetup from './components/EmailSetup/EmailSetup';
import Settings from './components/Settings/Settings';

export default function ExcelIntegration({ companyID }) {
  const TABS = [
    {
      title: 'Excel Settings',
      component: <ExcelSettings companyID={companyID} />,
    },
    {
      title: 'Activity Logs',
      component: <ActivityLogs companyID={companyID} />,
    },
    {
      title: 'Email Set-Up',
      component: <EmailSetup />,
    },
    {
      title: 'Phone Settings',
      component: <PhoneSettings companyID={companyID} />,
    },
    { title: 'Settings', component: <Settings companyID={companyID} /> },
  ];

  const [selectedTab, setSelectedTab] = useState({
    title: 'Excel Settings',
    component: <ExcelSettings companyID={companyID} />,
  });

  return (
    <div className={styles.salesforceIntegration}>
      <div className={styles.header}>
        {TABS.map((tab) => (
          <h2
            key={tab.title}
            className={selectedTab.title === tab.title && styles.active}
            onClick={() => setSelectedTab(tab)}
          >
            {tab?.title}
          </h2>
        ))}
      </div>
      <div className={styles.tabPage}>{selectedTab.component}</div>
    </div>
  );
}
