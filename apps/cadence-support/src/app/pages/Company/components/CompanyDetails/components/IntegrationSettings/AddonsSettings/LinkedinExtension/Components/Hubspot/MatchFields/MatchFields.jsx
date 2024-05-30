import React, { useState, useEffect } from 'react';

import { VIEWS, RINGOVER_FIELDS, DEFAULT_TOPVIEW_DATA } from './constants';
import styles from './MatchFields.module.scss';
import { ParseRingoverFields } from '../../utils';
import { useQuery } from '@cadence-support/utils';
import TopView from './components/TopView/TopView';
import DNDView from './components/DNDView/DNDView';

const MatchFields = ({
  setPostData,
  setDisableNext,
  setIfUnsavedChanges,
  integrationType,
  companyID,
  setIsSlider,
  isSlider,
}) => {
  const [currentView, setCurrentView] = useState(VIEWS.COMPANY);
  const [currentlyHovered, setCurrentlyHovered] = useState([]);
  const [topViewData, setTopViewData] = useState(DEFAULT_TOPVIEW_DATA);
  const [ringoverFields, setRingoverFields] = useState(RINGOVER_FIELDS);
  const [formCount, setFormCount] = useState(0);

  //useEffect to update TopViewData
  useEffect(() => {
    setTopViewData({
      [VIEWS.CONTACT]: ringoverFields[VIEWS.CONTACT]?.filter(
        (item) => item.value.name !== ''
      ).length,
      [VIEWS.COMPANY]: ringoverFields[VIEWS.COMPANY]?.filter(
        (item) => item.value.name !== ''
      ).length,
    });
  }, [ringoverFields]);

  return (
    <div className={`${styles.matchFields}`}>
      <div className={styles.header}>
        <TopView
          currentView={currentView}
          setCurrentView={setCurrentView}
          topViewData={topViewData}
          integrationType={integrationType}
          companyID={companyID}
        />
      </div>

      <div className={styles.body}>
        <DNDView
          currentView={currentView}
          setCurrentView={setCurrentView}
          ringoverFields={ringoverFields}
          setRingoverFields={setRingoverFields}
          integrationType={integrationType}
          companyID={companyID}
          setIsSlider={setIsSlider}
          isSlider={isSlider}
        />
      </div>
    </div>
  );
};

export default MatchFields;
