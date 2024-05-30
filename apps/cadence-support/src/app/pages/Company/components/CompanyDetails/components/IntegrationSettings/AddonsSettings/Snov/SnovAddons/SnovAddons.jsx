import { useEffect, useState, useContext, useCallback } from 'react';
import {
  Input,
  TabNavSlider,
  Checkbox,
  Toggle,
} from '@cadence-support/widgets';

import { LushaLogo, Snov, TickGradient } from '@cadence-support/icons';
import { TabNavThemes, TabNavBtnThemes } from '@cadence-support/themes';
import styles from './SnovAddons.module.scss';
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

const SnovAddon = ({ companyID, defaultLeadType, leadTypeOptions }) => {
  const user = useRecoilValue(userInfo);
  const { addonsSettings, isaddonSettingsLoading } =
    useAddonSettings(companyID);

  const [entity, setEntity] = useState(defaultLeadType);

  return (
    <div className={styles.addon}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.titleContainer}>
            <Snov />
            <h2 className={styles.title}>Snov</h2>
          </div>
        </div>
        <div className={styles.right}>
          {isaddonSettingsLoading ? (
            <Placeholder width="340px" />
          ) : addonsSettings?.is_snov_activated ? (
            <div>
              <div className={styles.activated}>
                <TickGradient size="20px" />
                <p>Snov integration is currently active</p>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.notactive}>
                <TickGradient size="20px" />
                <p>Snov integration is currently not active</p>
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
              <h2>Snov client id</h2>
              <p>Enter your Snov Client Id</p>
            </div>
            {isaddonSettingsLoading ? (
              <Placeholder width="340px" />
            ) : (
              <Input
                value={addonsSettings?.snov_client_id}
                disabled={true}
                name="snov_client_id"
                width="340px"
                className={
                  addonsSettings?.snov_client_id === null ? styles.disabled : ''
                }
              />
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Snov client secret</h2>
              <p>Enter your Snov Client Secret</p>
            </div>
            {isaddonSettingsLoading ? (
              <Placeholder width="340px" />
            ) : (
              <Input
                value={addonsSettings?.snov_client_secret}
                disabled={true}
                name="snov_client_secret"
                width="340px"
                className={
                  addonsSettings?.snov_client_secret === null && styles.disabled
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
                  value={addonsSettings?.snov_action}
                  disabled={true}
                  name="snov_action"
                  width="340px"
                  className={
                    addonsSettings?.snov_action === null && styles.disabled
                  }
                />
              )}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.container}>
            <div className={styles.title}>
              <h2>Daily API Limit</h2>
              <p>This is your organization's daily Snov limit</p>
            </div>
            <div className={styles.settings}>
              {isaddonSettingsLoading ? (
                <Placeholder width="340px" />
              ) : (
                <Input
                  type="number"
                  maxValue={100000000}
                  value={addonsSettings?.snov_api_limit}
                  disabled={true}
                  name="snov_api_limit"
                  width="340px"
                  className={!addonsSettings?.snov_api_limit && styles.disabled}
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
                  checked={addonsSettings?.snov_linkedin_enabled}
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
              {isaddonSettingsLoading && (
                <Placeholder number={3} width="250px" height="25px" />
              )}
              {!!addonsSettings &&
              addonsSettings?.snov_email?.[entity]?.fields?.length > 0 ? (
                addonsSettings?.snov_email?.[entity]?.fields?.map((option) => {
                  return (
                    <div
                      className={styles.inputGroup}
                      key={`snov_email_${entity}_${option}`}
                    >
                      <Checkbox
                        checked={addonsSettings?.snov_email?.[
                          entity
                        ]?.fields?.includes(option)}
                      />
                      <p>{option}</p>
                    </div>
                  );
                })
              ) : (
                <p>No data found</p>
              )}
            </div>
          </div>
        </div>
        <UsersAccess
          companyID={companyID}
          userAccessField={
            USER_ACCESS_FIELDS[ENRICHMENT_SERVICES.SNOV].userAccessField
          }
        />
      </div>
    </div>
  );
};

export default SnovAddon;

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
