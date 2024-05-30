import { useEffect, useState, useContext, useCallback } from 'react';

import {
  Input,
  Label,
  TabNavSlider,
  Checkbox,
  Toggle,
} from '@cadence-support/widgets';

import { TickGradient } from '@cadence-support/icons';
import { TabNavThemes, TabNavBtnThemes } from '@cadence-support/themes';

import styles from './HunterAddons.module.scss';
import { Div, Title } from '@cadence-support/components';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { useAddonSettings } from '@cadence-support/data-access';
import UsersAccess from '../../UserAccess/UserAccess';
import {
  USER_ACCESS_FIELDS,
  ALL_LEAD_TYPE,
} from 'apps/cadence-support/src/app/pages/Company/constants';
import { ENRICHMENT_SERVICES } from '@cadence-support/constants';

const HunterAddon = ({ companyID, defaultLeadType, leadTypeOptions }) => {
  const user = useRecoilValue(userInfo);
  const { addonsSettings, isaddonSettingsLoading } =
    useAddonSettings(companyID);

  const [entity, setEntity] = useState(defaultLeadType);

  return (
    <div className={styles.addon}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.titleContainer}>
            <img src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png" />
            <h2 className={styles.title}>Hunter</h2>
          </div>
        </div>
        <div className={styles.right}>
          {isaddonSettingsLoading ? (
            <Placeholder width="340px" />
          ) : addonsSettings?.is_hunter_activated ? (
            <div>
              <div className={styles.activated}>
                <TickGradient size="20px" />
                <p>Hunter integration is currently active</p>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.notactive}>
                <TickGradient size="20px" />
                <p>Hunter integration is currently not active</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.integrationSettings}>
          <Title size="1.1rem">Settings</Title>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>API Key</h2>
              <p>Enter your Hunter API Key</p>
            </div>
            {isaddonSettingsLoading ? (
              <Placeholder width="340px" />
            ) : (
              <Input
                value={addonsSettings?.hunter_api_key}
                disabled={true}
                name="hunter_api_key"
                width="340px"
                className={
                  addonsSettings?.hunter_api_key === null && styles.disabled
                }
              />
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Daily API Limit</h2>
              <p>This is your organization's daily Hunter limit</p>
            </div>
            <div className={styles.settings}>
              {isaddonSettingsLoading ? (
                <Placeholder width="340px" />
              ) : (
                <Input
                  type="number"
                  maxValue={100000000}
                  value={addonsSettings?.hunter_api_limit}
                  disabled={true}
                  name="hunter_api_limit"
                  width="340px"
                  className={
                    addonsSettings?.hunter_api_limit === null && styles.disabled
                  }
                />
              )}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Linkedin Extension</h2>
              <p>Allow the linkedin extension to use this add-on</p>
            </div>
            <div className={styles.settings}>
              {isaddonSettingsLoading ? (
                <Placeholder width="340px" />
              ) : (
                <Toggle
                  checked={addonsSettings?.hunter_linkedin_enabled}
                  theme="PURPLE"
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.fieldSettings}>
          <Title size="1.1rem">Field Values</Title>
          <div className={styles.divider} />
          {leadTypeOptions.length > 1 && (
            <TabNavSlider
              theme={TabNavThemes.SLIDER}
              btnTheme={TabNavBtnThemes.PRIMARY_AND_GREY}
              buttons={leadTypeOptions.map((leadType) => ({
                label: ALL_LEAD_TYPE[leadType],
                value: leadType,
              }))}
              value={entity}
              setValue={setEntity}
              width={leadTypeOptions?.length >= 3 ? '500px' : '300px'}
              className={styles.tabs}
              btnClassName={styles.tabBtns}
              activeBtnClassName={styles.tabBtnActive}
              activePillClassName={styles.activePill}
            />
          )}
          <div className={`${styles.fieldsContainer}`}>
            <div className={styles.fields}>
              <div className={styles.inputGroup}>
                <Label>Email field value</Label>
                {isaddonSettingsLoading ? (
                  <Placeholder width="300px" />
                ) : (
                  <Input
                    value={addonsSettings?.hunter_email?.[entity]?.field}
                    disabled={true}
                    className={
                      addonsSettings?.hunter_email?.[entity]?.field === null &&
                      styles.disabled
                    }
                    width="240px"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <UsersAccess
          companyID={companyID}
          userAccessField={
            USER_ACCESS_FIELDS[ENRICHMENT_SERVICES.HUNTER].userAccessField
          }
        />
      </div>
    </div>
  );
};

export default HunterAddon;

export const Placeholder = ({
  width = '100%',
  number = 1,
  height = '40px',
}) => {
  return (
    <>
      {[...Array(number)].map((_, j) => (
        <Div style={{ height, width }} loading></Div>
      ))}
    </>
  );
};
