import React from 'react';
import styles from './MyConnection.module.scss';
import { INTEGRATION_DATA, getEnrichmentData } from './constant';
import { INTEGRATION_NAME } from '../../constants';
import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import moment from 'moment';

const MyConnection = ({
  singleUserData,
  singleUserDataLoading,
  userData,
  userLoading,
}) => {
  return (
    <div className={styles.myconnections}>
      <div className={styles.integrationcontainer}>
        <h2>Integrations</h2>
        <IntegrationCard
          integrationData={
            INTEGRATION_DATA[INTEGRATION_NAME[singleUserData?.integration_type]]
          }
          userLoading={singleUserDataLoading}
          integration_type={singleUserData?.integration_type}
        />
      </div>

      <div className={styles.integrationcontainer}>
        <h2>Extentions</h2>
        <IntegrationCard
          integrationData={INTEGRATION_DATA['linkedin_extension']}
          userData={singleUserData}
          userLoading={userLoading}
        />
      </div>

      <div className={styles.integrationcontainer}>
        <h2>Add ons</h2>
        <div className={styles.addonscontainer}>
          {getEnrichmentData(singleUserData?.Enrichment)?.map((item) => {
            return (
              <IntegrationCard
                integrationData={INTEGRATION_DATA[item.name]}
                userData={userData}
                userLoading={userLoading}
                addOn={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyConnection;

export const IntegrationCard = ({
  integrationData,
  userLoading,
  userData,
  integration_type,
  addOn,
}) => {
  const trackingDateforExtenstion = userData?.tracking?.find(
    (obj) => obj?.activity === 'extension_signin'
  );
  console.log(trackingDateforExtenstion);
  return (
    <div className={styles.cardcontainer} key={integration_type}>
      <div
        className={styles.integrationbg}
        style={{ background: integrationData?.background }}
      >
        <div className={styles.icon}>{integrationData?.icon}</div>
        <div className={styles.details}>
          <p className={styles.title}>{integrationData?.name}</p>
          <p className={styles.subtitle}>{integrationData?.subtitle}</p>
        </div>
        {integrationData?.subtitle === 'Extension' && (
          <span className={styles.version}>{userData?.extension_version} </span>
        )}
      </div>

      <div className={styles.status}>
        {integrationData?.subtitle === 'CRM' ? (
          <div>
            <p>Last connected on</p>
            <p>18 September,2023</p>
          </div>
        ) : integrationData?.subtitle === 'Extension' ? (
          <div>
            {trackingDateforExtenstion?.created_at !== null && (
              <>
                <p>Last connected on</p>
                <p>
                  {moment(trackingDateforExtenstion?.created_at).format(
                    'DD MMMM, YYYY'
                  )}
                </p>
              </>
            )}
          </div>
        ) : (
          <div>
            <p>No of API calls: {addOn?.api_calls ?? 0}</p>
          </div>
        )}
        <div>
          {integrationData?.subtitle === 'CRM' ? (
            <Status
              integration_type={integration_type}
              reqIntegrationType={integrationData?.reqIntegrationType}
              userLoading={userLoading}
            />
          ) : integrationData?.subtitle === 'Extension' ? (
            <Status
              integration_type={
                userData?.is_linkedin_activated
                  ? USER_INTEGRATION_TYPES.LINKEDIN_USER
                  : null
              }
              reqIntegrationType={integrationData?.reqIntegrationType}
              userLoading={userLoading}
            />
          ) : (
            <Status
              integration_type={addOn?.integrationType}
              reqIntegrationType={integrationData?.reqIntegrationType}
              userLoading={userLoading}
            />
          )}
        </div>
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
