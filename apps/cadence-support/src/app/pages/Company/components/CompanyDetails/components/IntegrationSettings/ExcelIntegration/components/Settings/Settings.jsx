import { useState, useEffect } from 'react';
import styles from './Settings.module.scss';
import EmailSettings from './components/EmailSettings/EmailSettings';
import TaskSettings from './components/TaskSettings/TaskSettings';
import WorkingDaysSettings from './components/WorkingDaysSettings/WorkingDaysSettings';
import { useTeams, useUsers } from '@cadence-support/data-access';

function Settings({ companyID }) {
  const { teamsData: subDepartments } = useTeams(companyID);
  const { users } = useUsers(companyID);
  const TABS = [
    {
      title: 'Email',
      component: <EmailSettings companyID={companyID} />,
      subTabs: [
        'Sending calendar',
        'Unsubscribe rules',
        'Bounced rules',
        'Domain verification',
      ],
    },
    {
      title: 'Task and Cadences',
      component: (
        <TaskSettings
          companyID={companyID}
          subDepartments={subDepartments?.map((sd) => ({
            label: sd.name,
            value: sd.sd_id,
          }))}
          users={users?.map((user) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.user_id,
            sd_id: user.sd_id,
          }))}
        />
      ),
      subTabs: ['Task settings', 'Skip task settings'],
    },
    {
      title: 'Working days',
      component: <WorkingDaysSettings companyID={companyID} />,
      subTabs: [],
    },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className={styles.settings}>
      <div className={styles.sidebar}>
        {TABS.map((tab) => {
          return (
            <div
              className={`${tab.title === activeTab.title && styles.active} ${
                styles.tab
              }`}
            >
              <h1 onClick={() => setActiveTab(tab)}>{tab.title}</h1>
              {tab.title === activeTab.title
                ? activeTab.subTabs.map((subtab) => <h2>{subtab}</h2>)
                : ''}
            </div>
          );
        })}
      </div>
      <div className={styles.page}>{activeTab.component}</div>
    </div>
  );
}

export default Settings;
