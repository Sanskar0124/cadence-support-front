import React, { forwardRef } from 'react';
import styles from './CompanyInfo.module.scss';
import {
  Company,
  SalesforceBox,
  Pipedrive,
  Hubspot,
  GoogleSheets,
  Excel,
  Sellsy,
  Zoho,
  Bullhorn,
  Dynamics,
} from '@cadence-support/icons';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { useNavigate } from 'react-router-dom';

const getSubscriptionDetails = (company) => {
  if (company?.is_subscription_active) return `Active Subscription`;
  else if (company?.is_trial_active) return `Trial Period`;
  else return `Term has expired`;
};

const CompanyInfo = forwardRef(({ company }, ref) => {
  const navigate = useNavigate();

  const companyCardClickHandler = (company) => {
    if (!company?.integration_type) return;
    localStorage.removeItem('company');
    localStorage.setItem('company', JSON.stringify(company));
    navigate(`./${company?.company_id}`, { state: company });
  };
  return (
    <div
      className={styles.companyCard}
      onClick={() => companyCardClickHandler(company)}
      ref={ref}
    >
      <div className={styles.left}>
        <div className={styles.logo}>
          <Company />
        </div>
        <div className={styles.details}>
          <h2>{company?.name}</h2>
          <p>{getSubscriptionDetails(company)}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.userdetails}>
          <p className={styles.usercount}>{company?.user_count ?? 0}</p>
          <p className={styles.users}>Users</p>
        </div>
        <div className={styles.icon}>
          {(company?.integration_type === INTEGRATION_TYPE.SALESFORCE ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.SALESFORCE) && <SalesforceBox color="#00a1e0" />}
          {(company?.integration_type === INTEGRATION_TYPE.PIPEDRIVE ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.PIPEDRIVE) && <Pipedrive />}
          {(company?.integration_type === INTEGRATION_TYPE.GOOGLE_SHEETS ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.GOOGLE_SHEETS ||
            company?.integration_type === 'excel_sheets' ||
            company?.integration_type === INTEGRATION_TYPE.EXCEL ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.EXCEL) && (
            <GoogleSheets />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.HUBSPOT ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.HUBSPOT) && (
            <Hubspot />
          )}
          {/* {(company?.integration_type === INTEGRATION_TYPE.EXCEL ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.EXCEL ||
            company?.integration_type === 'excel_sheets') && <Excel />} */}
          {(company?.integration_type === INTEGRATION_TYPE.SELLSY ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.SELLSY) && (
            <Sellsy />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.ZOHO ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.ZOHO) && (
            <Zoho />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.BULLHORN ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.BULLHORN) && (
            <Bullhorn />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.DYNAMICS ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.DYNAMICS) && (
            <Dynamics />
          )}
        </div>
      </div>
    </div>
  );
});

export default CompanyInfo;
