import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTeams, useUsers } from '@cadence-support/data-access';
import { renderViewComponent } from './constants';
import styles from './GeneralSettings.module.scss';

const GeneralSettings = ({
  userSettings,
  userSettingsLoading,
  userData,
  selectedInnerTab,
  selectedSubTabs,
  setSelectedSubTabs,
}) => {
  const { companyID } = useParams();
  const { teamsData: subDepartments } = useTeams(companyID);
  const { users } = useUsers(companyID);
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

  const sendingCalenderRef = useRef(null);
  const unbouncedRuleRef = useRef(null);
  const BouncedMailRules = useRef(null);
  const tasksettingRef = useRef(null);
  const skiptaskRef = useRef(null);
  const leadscoreRef = useRef(null);
  return (
    <div className={styles.settings}>
      {renderViewComponent({
        selectedSubTabs,
        userSettings,
        userSettingsLoading,
        userData,
        users: allUsers,
        subDepartments: teamsData,
        sendingCalenderRef,
        unbouncedRuleRef,
        BouncedMailRules,
        tasksettingRef,
        skiptaskRef,
        leadscoreRef,
        selectedInnerTab,
      })}
    </div>
  );
};

export default GeneralSettings;
