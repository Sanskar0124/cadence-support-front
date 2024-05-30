import React from 'react';
import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Div, Title, Button } from '@cadence-support/components';
import {
  TabNavSlider,
  SearchBar,
  BackButton,
  ThemedButton,
  Tabs,
} from '@cadence-support/widgets';

import { TAB_OPTIONS, VIEW_MODES } from '../../constants';

import styles from './CadenceView.module.scss';

import CadenceSteps from '../CadenceSteps/CadenceSteps';
import CadencePeople from '../CadencePeople/CadencePeople';
import { TabNavThemes } from '@cadence-support/themes';
import { useCadences } from '@cadence-support/data-access';

const TABS = {
  Steps: 'Steps',
  People: 'People',
};

const CadenceView = ({
  memberID,
  cadenceID,
  viewMode,
  setViewMode,
  userData,
  setSelectedCadence,
}) => {
  const [activeTab, setActiveTab] = useState(TABS.Steps);

  const {
    stepsData: cadence,
    stepsLoading,
    stepsRefetching,
    stepsStats,
    stepsStatsLoading,
  } = useCadences({
    memberID,
    cadenceID,
    viewMode,
    integrationType: userData?.integration_type,
  });

  const renderSubComponent = useCallback(
    (activeTab, cadenceID, userData, stepsStats) => {
      switch (activeTab) {
        case TABS.Steps:
          return (
            cadenceID && (
              <CadenceSteps
                cadence={cadence}
                stepsLoading={stepsLoading}
                stepsRefetching={stepsRefetching}
                stepsStats={stepsStats}
                stepsStatsLoading={stepsStatsLoading}
              />
            )
          );
        case TABS.People:
          return <CadencePeople cadenceID={cadenceID} memberID={memberID} />;
      }
    },
    [activeTab, cadenceID, memberID, stepsLoading, stepsRefetching, stepsStats]
  );

  const onCadenceDeselect = () => {
    setViewMode(null);
    setSelectedCadence(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <BackButton text={'Back'} onClick={onCadenceDeselect} />
          <h4>{!stepsLoading && cadence?.name}</h4>
        </div>
        <div className={styles.right}>
          <TabNavSlider
            width="200px"
            theme={TabNavThemes.WHITE}
            className={styles.buttonSliderClassName}
            btnClassName={styles.buttonClassName}
            activeBtnClassName={styles.activeBtnClassName}
            activePillClassName={styles.activePillClassName}
            buttons={TAB_OPTIONS}
            value={activeTab}
            setValue={setActiveTab}
          />
        </div>
      </div>
      <div className={styles.body}>
        {renderSubComponent(activeTab, cadenceID, userData, stepsStats)}
      </div>
    </div>
  );
};

export default CadenceView;
