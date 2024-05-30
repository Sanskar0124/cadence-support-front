import React, { useState, useCallback, useEffect } from 'react';
import styles from './Linkedin.module.scss';
import { useLinkedinFieldmapping } from '@cadence-support/data-access';
import { LinkedinBox } from '@cadence-support/icons';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { Input, Label, Select } from '@cadence-support/widgets';
import MatchFields from './Components/MatchFields';

export const TABS = {
  FIELD_MAP: 'field_map',
  ACCESS: 'access',
};

const LinkedinExtenstion = ({ companyID }) => {
  const [activeTab, setActiveTab] = useState(TABS.FIELD_MAP);
  const [postData, setPostData] = useState(null);
  const [isSlider, setIsSlider] = useState(false);
  const [ifUnsavedChangesForFieldMapping, setIfUnsavedChangesForFieldMapping] =
    useState(null);

  const getIntegrationtype = () => {
    let integration = localStorage.getItem('company');
    if (integration) integration = JSON.parse(integration);
    return integration;
  };
  const integration = getIntegrationtype();

  const renderComponent = useCallback(() => {
    switch (activeTab) {
      case TABS.FIELD_MAP:
        return (
          <MatchFields
            integrationType={integration?.integration_type}
            setPostData={setPostData}
            setIfUnsavedChanges={setIfUnsavedChangesForFieldMapping}
            companyID={companyID}
            setIsSlider={setIsSlider}
            isSlider={isSlider}
          />
        );

      case TABS.ACCESS:
        return null;

      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className={styles.linkedinExtension}>
      <div className={styles.header}>
        <div className={styles.left}>
          {/* <div className={styles.titleContainer}>
            <LinkedinBox size="45px" color="#3275B3" />
            <h2 className={styles.title}>Linkedin Extension</h2>
          </div> */}
        </div>
        <div className={styles.right}>
          {INTEGRATION_TYPE.SALESFORCE === integration?.integration_type && (
            <div className={styles.inputGroup}>
              <Label>Default export type</Label>
              <Input
                value={'Lead'}
                name="default_linkedin_export_type"
                width="150px"
                disabled={true}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.integrationSettings}></div>

      <div
        className={styles.main}
        style={{
          height: isSlider ? `calc(100vh - 260px)` : `calc(100vh - 218px)`,
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default LinkedinExtenstion;
