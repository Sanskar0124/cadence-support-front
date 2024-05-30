import { Close, Close2 } from '@cadence-support/icons';
import React from 'react';
import styles from './Filters.module.scss';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import {
  INTEGRATION_TYPES,
  LICENSE_TYPE,
  ONBOARDING_STATUS,
  MAIL_INTEGRATION_TYPES,
} from './constants';

const Filters = ({ setIsSidebar, filters, setFilters }) => {
  const handleIntegrationType = (type) => {
    if (filters?.integration_types?.includes(type?.value)) {
      setFilters((prev) => ({
        ...prev,
        integration_types: prev?.integration_types?.filter(
          (item) => item !== type?.value
        ),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        integration_types: prev?.integration_types.concat(type?.value),
      }));
    }
  };

  const handleStatusClick = (type) => {
    if (filters?.status?.includes(type?.value)) {
      setFilters((prev) => ({
        ...prev,
        status: prev?.status?.filter((item) => item !== type?.value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        status: prev?.status.concat(type?.value),
      }));
    }
  };
  return (
    <div className={styles.filters}>
      <div className={styles.title_and_reset}>
        <div className={styles.iconcontainer}>
          <Close onClick={() => setIsSidebar(false)} />
          <p>Filters</p>
        </div>

        {Object.values(filters)?.flat()?.length > 0 && (
          <ThemedButton
            theme={ThemedButtonThemes.TRANSPARENT}
            width="fit-content"
            onClick={() =>
              setFilters({
                integration_types: [],
                mail_integration_types: [],
                status: [],
                license_types: [],
              })
            }
          >
            <div>Reset all</div>
          </ThemedButton>
        )}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <div>Integrations</div>
          {filters?.integration_types?.length > 0 && (
            <ThemedButton
              theme={ThemedButtonThemes.TRANSPARENT}
              width="fit-content"
              className={styles.resetBtn}
              onClick={() =>
                setFilters((prev) => ({ ...prev, integration_types: [] }))
              }
            >
              <div>Reset</div>
            </ThemedButton>
          )}
        </div>
        <div className={styles.btncontainer}>
          {INTEGRATION_TYPES?.map((type) => (
            <ThemedButton
              className={
                filters?.integration_types?.includes(type?.value)
                  ? `${styles.active} ${styles.integrationBtn}`
                  : styles.integrationBtn
              }
              width="49%"
              key={type.label}
              onClick={() => handleIntegrationType(type)}
            >
              {type?.label}
            </ThemedButton>
          ))}
        </div>
        <div className={styles.title}>
          <div>Mail integrations</div>
          {filters?.mail_integration_types?.length > 0 && (
            <ThemedButton
              theme={ThemedButtonThemes.TRANSPARENT}
              width="fit-content"
              className={styles.resetBtn}
              onClick={() =>
                setFilters((prev) => ({ ...prev, mail_integration_types: [] }))
              }
            >
              <div>Reset</div>
            </ThemedButton>
          )}
        </div>
        <div className={styles.btncontainer}>
          {MAIL_INTEGRATION_TYPES?.map((type) => {
            return (
              <ThemedButton
                className={
                  filters?.mail_integration_types?.includes(type?.value)
                    ? `${styles.active} ${styles.integrationBtn}`
                    : styles.integrationBtn
                }
                width="49%"
                key={type.label}
                onClick={() =>
                  filters?.mail_integration_types?.includes(type?.value)
                    ? setFilters((prev) => ({
                        ...prev,
                        mail_integration_types:
                          prev?.mail_integration_types?.filter(
                            (item) => item !== type?.value
                          ),
                      }))
                    : setFilters((prev) => ({
                        ...prev,
                        mail_integration_types: [type?.value],
                      }))
                }
              >
                {type?.label}
              </ThemedButton>
            );
          })}
        </div>
        <div className={styles.title}>
          <div>License type</div>
          {filters?.license_types?.length > 0 && (
            <ThemedButton
              theme={ThemedButtonThemes.TRANSPARENT}
              width="fit-content"
              className={styles.resetBtn}
              onClick={() =>
                setFilters((prev) => ({ ...prev, license_types: [] }))
              }
            >
              <div>Reset</div>
            </ThemedButton>
          )}
        </div>
        <div className={styles.btncontainer}>
          {LICENSE_TYPE?.map((type) => (
            <ThemedButton
              className={
                filters?.license_types?.includes(type?.value)
                  ? `${styles.active} ${styles.integrationBtn}`
                  : styles.integrationBtn
              }
              width="49%"
              key={type?.label}
              onClick={() =>
                filters?.license_types?.includes(type?.value)
                  ? setFilters((prev) => ({
                      ...prev,
                      license_types: prev?.license_types?.filter(
                        (item) => item !== type?.value
                      ),
                    }))
                  : setFilters((prev) => ({
                      ...prev,
                      license_types: [type?.value],
                    }))
              }
            >
              {type?.label}
            </ThemedButton>
          ))}
        </div>
        <div className={styles.title}>
          <div>Status</div>
          {filters?.status?.length > 0 && (
            <ThemedButton
              theme={ThemedButtonThemes.TRANSPARENT}
              width="fit-content"
              className={styles.resetBtn}
              onClick={() => setFilters((prev) => ({ ...prev, status: [] }))}
            >
              <div>Reset</div>
            </ThemedButton>
          )}
        </div>
        <div className={styles.btncontainer}>
          {ONBOARDING_STATUS?.map((type, index) => (
            <ThemedButton
              className={
                filters?.status?.includes(type?.value)
                  ? `${styles.active} ${styles.integrationBtn}`
                  : styles.integrationBtn
              }
              width={index === 2 ? '100%' : '49%'}
              key={type.label}
              onClick={() => handleStatusClick(type)}
            >
              {type?.label}
            </ThemedButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
