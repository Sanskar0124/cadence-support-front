import { useEffect, useState, useRef } from 'react';
import styles from './DynamicsIntegration.module.scss';
import { renderComponent } from './constants';
import { getSettingpageTabOptions } from '../../constants';
import DynamicsSettings from './components/DynamicsSettings/DynamicsSettings';

export default function SalesforceIntegrationV2({ companyID }) {
  const [selectedSubTabs, setSelectedSubTabs] = useState({
    name: 'Emails',
    innerTabs: [
      'Sending calendar',
      'Unsubscribe rules',
      'Bounced rules',
      'Domain verification',
    ],
  });
  const [selectedInnerTab, setSelectedInnerTab] = useState('Sending calendar');
  const [isSelect, setIsSelect] = useState(false);

  const [selectedTab, setSelectedTab] = useState({
    title: 'Dynamics Set-up',
    component: <DynamicsSettings companyID={companyID} />,
  });
  const [companyItem, setCompanyItem] = useState(
    JSON.parse(localStorage.getItem('company'))
  );

  const handleSubclick = (subtab) => {
    setSelectedSubTabs(subtab);
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
        setSelectedInnerTab('Task settings');
      }
      if (selectedSubTabs.name === 'Emails') {
        setSelectedInnerTab('Sending calendar');
      }
    }
  }, [isSelect, selectedSubTabs]);

  return (
    <div className={styles.salesforceIntegration}>
      <div className={styles.header} id="tabscontainer">
        {getSettingpageTabOptions(companyItem?.integration_type).map((tab) => (
          <div
            className={
              selectedTab?.subTabs?.length > 0 &&
              selectedTab.title === tab.title
                ? `${styles.settings} ${styles.active}`
                : ''
            }
          >
            <h2
              key={tab.title}
              className={
                selectedTab.title === tab.title
                  ? `${styles.active} ${styles.title} `
                  : styles.title
              }
              onClick={() => setSelectedTab(tab)}
            >
              {tab?.title}
              {tab.title === selectedTab.title
                ? selectedTab?.subTabs?.map((subtab) => (
                    <div
                      className={
                        selectedSubTabs.name === subtab.name
                          ? styles.subtabactive
                          : ''
                      }
                    >
                      <h4
                        className={
                          selectedSubTabs.name === subtab.name
                            ? styles.active_subtab
                            : styles.subtab
                        }
                        onClick={() => handleSubclick(subtab)}
                      >
                        {subtab.name}
                        {subtab.name === selectedSubTabs.name
                          ? selectedSubTabs?.innerTabs?.map((innerTab) => (
                              <p
                                className={
                                  innerTab === selectedInnerTab
                                    ? styles.active_innertab
                                    : styles.innerTab
                                }
                                onClick={(e) =>
                                  handleInnerTabClick(e, innerTab)
                                }
                              >
                                {innerTab}
                              </p>
                            ))
                          : ''}
                      </h4>
                    </div>
                  ))
                : ''}
            </h2>
          </div>
        ))}
      </div>
      <div className={styles.tabPage}>
        {renderComponent({
          activeTab: selectedTab.title,
          companyID,
          selectedSubTabs,
          selectedInnerTab,
          setSelectedSubTabs,
          setSelectedInnerTab,
          setSelectedTab,
        })}
      </div>
    </div>
  );
}
