import { useState, useEffect, useRef } from 'react';
import { useUserProfile, useUserSettings } from '@cadence-support/data-access';
import styles from './SettingsV2.module.scss';
import { Container, Div, Skeleton } from '@cadence-support/components';

import {
  INTEGRATION_TAB,
  PROFILE_TABS,
  INTEGRATION_NAME,
  TABS,
  renderView,
  getTabOptions,
} from './constants';

const SettingsV2 = ({ userData, userLoading, memberID, integrationType }) => {
  // request for general settings for specific user
  const { userSettings, userSettingsLoading } =
    useUserSettings({
      userID: userData?.user_id,
    }) || {};

  //request for specific user related data
  const { userData: singleUserData, userLoading: singleUserDataLoading } =
    useUserProfile(memberID, integrationType);

  const [activeTab, setActiveTab] = useState({
    name: 'My Account',
    value: 'my_account',
    subTabs: [
      { name: 'Email', value: 'email' },
      { name: 'Email Signature', value: 'email_signature' },
      { name: 'Primary Phone', value: 'primary_phone' },
      { name: 'Connected Sources', value: 'connect_source' },
      { name: 'Calendly Link', value: 'calendly_link' },
      { name: 'Language', value: 'language' },
      { name: 'timezone', value: 'timezone' },
    ],
  });

  const [selectedSubTabs, setSelectedSubTabs] = useState({
    name: 'Email',
    value: 'email',
  });
  const [selectedInnerTab, setSelectedInnerTab] = useState({
    name: 'Sending calendar',
    value: 'sending_calendar',
  });
  const [isSelect, setIsSelect] = useState(false);
  const [scrollTochild, setScrollToChild] = useState(false);

  const handleActiveTab = (maintTabs) => {
    setActiveTab(maintTabs);
  };

  const handleSubclick = (e, subtab) => {
    setSelectedSubTabs(subtab);
    e.stopPropagation();
    setIsSelect(true);
  };
  const handleInnerTabClick = (e, innerTab) => {
    setIsSelect(false);
    e.stopPropagation();
    setSelectedInnerTab(innerTab);
  };
  useEffect(() => {
    if (isSelect) {
      if (selectedSubTabs.name === 'Task and Cadences') {
        setSelectedInnerTab({ name: 'Task Settings', value: 'task_settings' });
      }
      if (selectedSubTabs.name === 'Emails') {
        setSelectedInnerTab({
          name: 'Sending calendar',
          value: 'sending_calendar',
        });
      }
    }
  }, [isSelect, selectedSubTabs]);

  useEffect(() => {
    if (activeTab?.value === 'general_settings') {
      setSelectedSubTabs({
        name: 'Emails',
        value: 'emails',
        innerTabs: [
          { name: 'Sending calendar', value: 'sending_calendar' },
          { name: 'Unsubscribe rules', value: 'unsubscribe_rules' },
          { name: 'Bounced rules', value: 'bounced_rules' },
        ],
      });
    }
    if (activeTab?.value === 'my_account') {
      setSelectedSubTabs({ name: 'Email', value: 'email' });
    }
  }, [activeTab]);

  return (
    <Container className={styles.settings}>
      <div className={styles.sidebar}>
        {getTabOptions(userData?.integration_type).map((item) => (
          <div className={styles.maintab}>
            {item?.tabName}
            {item?.tabs?.map((maintTabs) => {
              return (
                <div
                  className={
                    activeTab.name === maintTabs.name
                      ? styles.activeTabs
                      : styles.tabs
                  }
                  onClick={() => handleActiveTab(maintTabs)}
                >
                  {maintTabs.name}

                  <div
                    className={
                      maintTabs.value === activeTab.value &&
                      activeTab?.value === 'my_account'
                        ? styles.subtabBG
                        : ''
                    }
                  >
                    {maintTabs.name === activeTab.name
                      ? activeTab?.subTabs?.map((subtab) => (
                          <div
                            className={
                              selectedSubTabs.name === subtab.name
                                ? selectedSubTabs.hasOwnProperty('innerTabs')
                                  ? styles.subtabactive
                                  : styles.noinnerTab
                                : ''
                            }
                          >
                            <h4
                              className={
                                selectedSubTabs?.name === subtab.name
                                  ? styles.active_subtab
                                  : styles.subtab
                              }
                              onClick={(e) => handleSubclick(e, subtab)}
                              style={{
                                marginLeft:
                                  !selectedSubTabs.hasOwnProperty(
                                    'innerTabs'
                                  ) && '8px',
                              }}
                            >
                              {subtab.name}
                              {subtab.name === selectedSubTabs?.name
                                ? selectedSubTabs?.innerTabs?.map(
                                    (innerTab) => (
                                      <p
                                        className={
                                          innerTab.name ===
                                          selectedInnerTab.name
                                            ? styles.active_innertab
                                            : styles.innerTab
                                        }
                                        onClick={(e) =>
                                          handleInnerTabClick(e, innerTab)
                                        }
                                      >
                                        {innerTab.name}
                                      </p>
                                    )
                                  )
                                : ''}
                            </h4>
                          </div>
                        ))
                      : ''}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.component}>
        {renderView({
          activeTab,
          userSettings,
          userSettingsLoading,
          userData,
          userLoading,
          selectedInnerTab,
          selectedSubTabs,
          setSelectedSubTabs,
          singleUserData,
          singleUserDataLoading,
        })}
      </div>
    </Container>
  );
};

export default SettingsV2;

export const Placeholder = ({ rows = 6 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <Skeleton className={styles.placeholder} />
      ))}
    </>
  );
};
