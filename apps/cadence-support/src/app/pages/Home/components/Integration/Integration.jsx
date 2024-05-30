import { userInfo } from '@cadence-support/atoms';
import { TabNavThemes } from '@cadence-support/themes';
import { TabNavSlider } from '@cadence-support/widgets';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import IntegrationType from './components/IntegrationType';
import { CADENCE_TAB_NAV_OPTIONS, TABLE_TABS } from './constants';
import styles from './Integration.module.scss';

const Integration = () => {
  const [activeTab, setActiveTab] = useState('crm');
  const user = useRecoilValue(userInfo);

  return (
    <div className={styles.integration}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>CRM Integrations</h2>
        </div>
        {/* <div className={styles.right}>
          <TabNavSlider
            theme={TabNavThemes.WHITE}
            buttons={TABLE_TABS}
            value={activeTab}
            setValue={setActiveTab}
            className={styles.tabs}
            btnClassName={styles.tabBtns}
            activeBtnClassName={styles.tabBtnActive}
            activePillClassName={styles.activePill}
            // width="495px"
          />
        </div> */}
      </div>
      <div className={styles.body}>
        <IntegrationType />
      </div>
    </div>
  );
};

export default Integration;
