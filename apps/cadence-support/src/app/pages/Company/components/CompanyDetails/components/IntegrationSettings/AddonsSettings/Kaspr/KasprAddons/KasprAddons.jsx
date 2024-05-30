import { useEffect, useState, useContext, useCallback } from 'react';

import {
  BackButton,
  Input,
  Label,
  Select,
  ThemedButton,
  TabNavSlider,
  Checkbox,
  Toggle,
} from '@cadence-support/widgets';

import { TickGradient } from '@cadence-support/icons';
import { TabNavThemes, TabNavBtnThemes } from '@cadence-support/themes';

// constants
import { RESOURCE_TYPES } from './constants';

import styles from './KasprAddons.module.scss';
import { Div, Title } from '@cadence-support/components';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { useAddonSettings } from '@cadence-support/data-access';
import UsersAccess from '../../UserAccess/UserAccess';
import {
  ALL_LEAD_TYPE,
  USER_ACCESS_FIELDS,
} from 'apps/cadence-support/src/app/pages/Company/constants';
import { ENRICHMENT_SERVICES } from '@cadence-support/constants';

const KasprAddon = ({ companyID, defaultLeadType, leadTypeOptions }) => {
  const user = useRecoilValue(userInfo);
  const { addonsSettings, isaddonSettingsLoading } =
    useAddonSettings(companyID);
  const [entity, setEntity] = useState(defaultLeadType);

  return (
    <div className={styles.addon}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.titleContainer}>
            <img src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/kaspr_logo.png" />
            <h2 className={styles.title}>Kaspr</h2>
          </div>
        </div>
        <div className={styles.right}>
          {isaddonSettingsLoading ? (
            <Placeholder width="340px" />
          ) : addonsSettings?.is_kaspr_activated ? (
            <div>
              <div className={styles.activated}>
                <TickGradient size="20px" />
                <p>Kaspr integration is currently active</p>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.notactive}>
                <TickGradient size="20px" />
                <p>Kaspr integration is currently not active</p>
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
              <p>Enter your Kaspr API Key</p>
            </div>
            {isaddonSettingsLoading ? (
              <Placeholder width="340px" />
            ) : (
              <Input
                value={addonsSettings?.kaspr_api_key}
                disabled={true}
                name="kaspr_api_key"
                width="340px"
                className={
                  addonsSettings?.kaspr_api_key === null && styles.disabled
                }
              />
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Data enrichment</h2>
              <p>Select how you want your data to be enriched</p>
            </div>
            <div className={styles.settings}>
              {isaddonSettingsLoading ? (
                <Placeholder width="340px" />
              ) : (
                <Input
                  value={addonsSettings?.kaspr_action}
                  disabled={true}
                  name="kaspr_action"
                  width="340px"
                  className={
                    addonsSettings?.kaspr_action === null && styles.disabled
                  }
                />
              )}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Daily API Limit</h2>
              <p>This is your organization's daily Kaspr limit</p>
            </div>
            <div className={styles.settings}>
              {isaddonSettingsLoading ? (
                <Placeholder width="340px" />
              ) : (
                <Input
                  type="number"
                  maxValue={100000000}
                  value={addonsSettings?.kaspr_api_limit}
                  disabled={true}
                  className={
                    addonsSettings?.kaspr_api_limit === null && styles.disabled
                  }
                  name="kaspr_api_limit"
                  width="340px"
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
                  checked={addonsSettings?.kaspr_linkedin_enabled}
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
          <div
            className={`${styles.fieldsContainer} ${styles[user?.language]}`}
          >
            <div>
              <Label>Cadence Phone field value</Label>
              <div className={styles.fields}>
                {isaddonSettingsLoading && (
                  <Placeholder number={3} width="230px" height="25px" />
                )}
                {!!addonsSettings &&
                addonsSettings?.kaspr_phone?.[entity]?.fields?.length > 0 ? (
                  addonsSettings?.kaspr_phone?.[entity]?.fields?.map(
                    (option) => {
                      return (
                        <div
                          className={styles.inputGroup}
                          key={`kaspr_phone_${entity}_${option}`}
                        >
                          <Checkbox checked={true} />
                          <p>{option}</p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>No data found</p>
                )}
              </div>
            </div>

            <div>
              <Label>Cadence Email field value</Label>
              <div className={styles.fields}>
                {isaddonSettingsLoading && (
                  <Placeholder number={3} width="250px" height="25px" />
                )}
                {!!addonsSettings &&
                addonsSettings?.kaspr_email?.[entity]?.fields?.length > 0 ? (
                  addonsSettings?.kaspr_email?.[entity]?.fields?.map(
                    (option) => {
                      return (
                        <div
                          className={styles.inputGroup}
                          key={`kaspr_email_${entity}_${option}`}
                        >
                          <Checkbox
                            checked={addonsSettings?.[RESOURCE_TYPES.EMAIL]?.[
                              entity
                            ]?.fields?.includes(option)}
                          />
                          <p>{option}</p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <>No data found</>
                )}
              </div>
            </div>
          </div>
        </div>
        <UsersAccess
          companyID={companyID}
          userAccessField={
            USER_ACCESS_FIELDS[ENRICHMENT_SERVICES.KASPR].userAccessField
          }
        />
      </div>
    </div>
  );
};

export default KasprAddon;

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
