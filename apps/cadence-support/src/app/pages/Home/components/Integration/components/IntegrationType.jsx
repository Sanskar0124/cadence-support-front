import { useCompanyActivity } from '@cadence-support/data-access';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { ThemedButton } from '@cadence-support/widgets';
import styles from './IntegrationType.module.scss';
import { INTEGRATION_ICONS, INTEGRATION_NAME_MAP } from '../constants';
import { Placeholder } from './Placeholder/Placeholder';
import { useEffect, useState } from 'react';

const IntegrationType = () => {
  const { integrationsData, integrationsLoading, integrationsRefetching } =
    useCompanyActivity();
  const [integrationList, setIntegrationList] = useState([]);
  useEffect(() => {
    if (Array.isArray(integrationsData)) {
      const filteredData = integrationsData?.filter(
        (item) => item.integration_type !== 'excel_sheets'
      );
      setIntegrationList(filteredData);
    } else return;
  }, [integrationsData]);

  return (
    <div className={styles.integrationType}>
      {integrationsLoading || integrationsRefetching ? (
        <Placeholder />
      ) : (
        integrationList?.length > 0 &&
        integrationList?.map((item, index) => {
          return (
            <div
              className={`${styles.companyContainer} ${
                styles[item?.integration_type]
              }`}
              key={index}
            >
              <div className={styles.head}>
                <div className={styles.logo}>
                  {INTEGRATION_ICONS[item?.integration_type]}
                </div>
                <div>
                  <p>{INTEGRATION_NAME_MAP[item?.integration_type]}</p>
                  <p>CRM</p>
                </div>
              </div>

              <div className={styles.companyDetails}>
                <div className={styles.details}>
                  <div className={styles.categories}>
                    <p>{item?.company_count}</p>
                    <p>Companies</p>
                  </div>

                  <div className={styles.categories}>
                    <p>{item?.user_count}</p>
                    <p>Users</p>
                  </div>
                </div>

                <ThemedButton
                  className={styles.companyStatusBtn}
                  theme={ThemedButtonThemes.TRANSPARENT}
                  width="135px"
                  height="26px"
                >
                  <div>Operational</div>
                </ThemedButton>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default IntegrationType;
