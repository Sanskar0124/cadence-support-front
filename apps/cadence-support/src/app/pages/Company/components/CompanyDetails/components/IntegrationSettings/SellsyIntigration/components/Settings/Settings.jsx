import { useState, useEffect, useRef } from 'react';
import styles from './Settings.module.scss';
import { useTeams, useUsers } from '@cadence-support/data-access';
import { SearchBar } from '@cadence-support/widgets';
import { renderComponent } from './constant';
import Search from '../../../component/Search/Search';

function Settings({
  companyID,
  selectedSubTabs,
  selectedInnerTab,
  setSelectedInnerTab,
  setSelectedSubTabs,
  setSelectedTab,
}) {
  const { teamsData: subDepartments } = useTeams(companyID);
  const { users } = useUsers(companyID);
  const [search, setSearch] = useState('');
  const allUsers =
    users &&
    users?.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.user_id,
      sd_id: user.sd_id,
    }));

  const teamsData =
    subDepartments &&
    subDepartments?.map((sd) => ({
      label: sd.name,
      value: sd.sd_id,
    }));
  //
  // ALL REFS FOR SCROLLING TO THE TARGET DIV
  const sendingCalenderRef = useRef(null);
  const unbouncedRuleRef = useRef(null);
  const BouncedMailRules = useRef(null);
  const domainverification = useRef(null);
  const tasksettingRef = useRef(null);
  const skiptaskRef = useRef(null);
  const leadscoreRef = useRef(null);
  const standardwflowRef = useRef(null);
  const advancewflowRef = useRef(null);
  const webhookRef = useRef(null);

  return (
    <div className={styles.settings}>
      <div className={styles.searchbar}>
        <Search
          setSelectedInnerTab={setSelectedInnerTab}
          setSelectedSubTabs={setSelectedSubTabs}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className={styles.page}>
        {renderComponent({
          activeTab: selectedSubTabs.name,
          companyID,
          users: allUsers,
          subDepartments: teamsData,
          selectedInnerTab,
          sendingCalenderRef,
          unbouncedRuleRef,
          BouncedMailRules,
          domainverification,
          tasksettingRef,
          advancewflowRef,
          standardwflowRef,
          webhookRef,
          skiptaskRef,
          leadscoreRef,
        })}
      </div>
    </div>
  );
}

export default Settings;
