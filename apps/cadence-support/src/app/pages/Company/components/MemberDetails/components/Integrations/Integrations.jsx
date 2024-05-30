import {
  Pipedrive,
  SalesforceBox,
  Zendesk,
  Flatchr,
  Kaspr,
  LushaLogo,
  Hubspot,
  GoogleSheets,
  Excel,
  Bullhorn,
  Sellsy,
  Snov,
  LinkedinBox,
  Zoho,
  Dynamics,
} from '@cadence-support/icons';
import React from 'react';
import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import styles from './Integrations.module.scss';
import { Skeleton } from '@cadence-support/components';

const Integrations = ({ userData, userLoading }) => {
  return (
    <div className={styles.userIntegrationsCard}>
      <div className={styles.header}>Integrations</div>
      <div className={styles.body}>
        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.SALESFORCE_OWNER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <SalesforceBox className={styles.salesforceIcon} />
              <div>
                <h4>Salesforce</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.SALESFORCE_OWNER}
              userLoading={userLoading}
            />
          </div>
        )}

        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.PIPEDRIVE_USER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Pipedrive className={styles.pipedriveIcon} />
              <div>
                <h4>Pipedrive</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.PIPEDRIVE_USER}
              userLoading={userLoading}
            />
          </div>
        )}

        {userData?.integration_type === USER_INTEGRATION_TYPES.EXCEL_USER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Excel />
              <div>
                <h4>Excel</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.EXCEL_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {/* <div className={styles.integration}>
          <div className={styles.details}>
            <Zendesk className={styles.zendeskIcon} />
            <div>
              <h4>Zendesk</h4>
              <p>Helpdesk</p>
            </div>
          </div>
          <Status
            integration_type={userData?.integration_type}
            reqIntegrationType={USER_INTEGRATION_TYPES.FLATCHR_USER}
            userLoading={userLoading}
          />
        </div> */}
        {/* <div className={styles.integration}>
          <div className={styles.details}>
            <Flatchr />
            <div>
              <h4>Flatchr</h4>
              <p>Application System</p>
            </div>
          </div>
          <Status
            integration_type={userData?.integration_type}
            reqIntegrationType={USER_INTEGRATION_TYPES.KASPR_USER}
            userLoading={userLoading}
          />
        </div> */}

        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <GoogleSheets />
              <div>
                <h4>Google Sheets</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER}
              userLoading={userLoading}
            />
          </div>
        )}

        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.HUBSPOT_OWNER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Hubspot />
              <div>
                <h4>Hubspot</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.HUBSPOT_OWNER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.BULLHORN_USER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Bullhorn className={styles.salesforceIcon} />
              <div>
                <h4>Bullhorn</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.BULLHORN_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.integration_type === USER_INTEGRATION_TYPES.SELLSY_OWNER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Sellsy className={styles.salesforceIcon} />
              <div>
                <h4>Sellsy</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.SELLSY_OWNER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.integration_type === USER_INTEGRATION_TYPES.ZOHO_USER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Zoho className={styles.salesforceIcon} />
              <div>
                <h4>Zoho</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.ZOHO_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.integration_type ===
          USER_INTEGRATION_TYPES.DYNAMICS_OWNER && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Dynamics className={styles.salesforceIcon} />
              <div>
                <h4>Dynamics</h4>
                <p>CRM</p>
              </div>
            </div>
            <Status
              integration_type={userData?.integration_type}
              reqIntegrationType={USER_INTEGRATION_TYPES.DYNAMICS_OWNER}
              userLoading={userLoading}
            />
          </div>
        )}

        {userData?.Enrichment?.kaspr_service_enabled && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Kaspr />
              <div>
                <h4>Kaspr</h4>
                <p>Add on, Enrichment</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.Enrichment?.kaspr_service_enabled
                  ? USER_INTEGRATION_TYPES.KASPR_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.KASPR_USER}
              userLoading={userLoading}
            />
          </div>
        )}

        {userData?.Enrichment?.lusha_service_enabled && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <LushaLogo />
              <div>
                <h4>Lusha</h4>
                <p>Add on, Enrichment</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.Enrichment?.lusha_service_enabled
                  ? USER_INTEGRATION_TYPES.LUSHA_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.LUSHA_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.Enrichment?.dropcontact_service_enabled && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <img
                src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/dropcontact_logo.png"
                alt=""
              />
              <div>
                <h4>Dropcontact</h4>
                <p>Add on, Enrichment</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.Enrichment?.dropcontact_service_enabled
                  ? USER_INTEGRATION_TYPES.DROPCONTACT_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.DROPCONTACT_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.Enrichment?.hunter_service_enabled && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <img
                src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png"
                alt=""
              />
              <div>
                <h4>Hunter</h4>
                <p>Add on, Enrichment</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.Enrichment?.hunter_service_enabled
                  ? USER_INTEGRATION_TYPES.HUNTER_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.HUNTER_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {userData?.Enrichment?.snov_service_enabled && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <Snov />
              <div>
                <h4>Snov</h4>
                <p>Add on, Enrichment</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.Enrichment?.snov_service_enabled
                  ? USER_INTEGRATION_TYPES.SNOV_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.SNOV_USER}
              userLoading={userLoading}
            />
          </div>
        )}
        {/*    */}
        {userData?.is_linkedin_activated && (
          <div className={styles.integration}>
            <div className={styles.details}>
              <LinkedinBox />
              <div>
                <h4>Linkedin Extenstion</h4>
                <p>Extension</p>
              </div>
            </div>
            <Status
              integration_type={
                userData?.is_linkedin_activated
                  ? USER_INTEGRATION_TYPES.LINKEDIN_USER
                  : null
              }
              reqIntegrationType={USER_INTEGRATION_TYPES.LINKEDIN_USER}
              userLoading={userLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Status = ({ integration_type, reqIntegrationType, userLoading }) => {
  return (
    <div className={styles.statusWrapper}>
      {userLoading ? (
        <Skeleton className={styles.placeholder} />
      ) : integration_type === reqIntegrationType ? (
        <span className={styles.inUse}>In use</span>
      ) : (
        <span className={styles.notInUse}>Not in use</span>
      )}
    </div>
  );
};
export default Integrations;
