import moment from 'moment';
import React from 'react';

import { Divider, Skeleton } from '@cadence-support/components';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

import { useNavigate } from 'react-router-dom';

import styles from './CompanyCard.module.scss';
import {
  SalesforceBox,
  Pipedrive,
  Hubspot,
  Company,
  GoogleSheets,
  Excel,
  Sellsy,
  Zoho,
  Bullhorn,
  ZohoBox,
  Dynamics,
} from '@cadence-support/icons';
import { useRecoilState } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { COMPANY_STATUS } from './constants';
import { getStatus } from '../../constants';

const getNameWithLicenses = ({ name, is_trial_active, number_of_licences }) => {
  if (is_trial_active) {
    return (
      <>
        <h2 className={styles.companyName}>{name}</h2>
        {/* <span className={styles.licensesInfo}>
          {number_of_licences >= 2 ? 'Licenses:' : 'License:'}{' '}
          {number_of_licences}
        </span> */}
      </>
    );
  } else {
    return <h2 className={styles.companyName}>{name}</h2>;
  }
};

const getSubscriptionDetails = ({
  is_subscription_active,
  is_trial_active,
  integration_type,
}) => {
  if (!integration_type)
    return (
      <div className={styles.expired}>
        Not Configured (Onboarding Email Sent)
      </div>
    );
  if (is_subscription_active)
    return <div className={styles.subscribed}>Active Subscription</div>;
  else if (is_trial_active)
    return <div className={styles.trial}>Trial Period</div>;
  else return <div className={styles.expired}>Term has expired</div>;
};

const getLicenseDetails = ({
  number_of_licences,
  trial_valid_until,
  is_trial_active,
  is_subscription_active,
  integration_type,
  ...company
}) => {
  if (!integration_type)
    return (
      <div className={styles.expired}>
        Licenses:{' '}
        {company?.Integrations?.[0]?.no_of_licenses ?? 'Onboarding Pending'}
      </div>
    );
  if (is_subscription_active && number_of_licences >= 1)
    return (
      <div className={styles.subscribed}>Licenses: {number_of_licences}</div>
    );
  else if (is_trial_active && trial_valid_until)
    return (
      <div className={styles.trial}>
        Trial Active till: {moment(trial_valid_until)?.format('MMMM Do YYYY')}
      </div>
    );
  else return <div className={styles.expired}>Term has expired</div>;
};

const CompanyCard = ({ company, loading }, ref) => {
  const navigate = useNavigate();
  const user = useRecoilState(userInfo);

  const companyCardClickHandler = (integration_type) => {
    if (!integration_type) return;
    localStorage.removeItem('company');
    localStorage.setItem('company', JSON.stringify(company));
    navigate(`./${company?.company_id}`, { state: company });
  };

  return (
    <div
      className={
        company?.integration_type || loading
          ? styles.companyCard
          : styles.companyCardUnOnboarded
      }
      loading={loading.toString()}
      onClick={() => companyCardClickHandler(company?.integration_type)}
      ref={ref}
    >
      <div className={styles.header}>
        <div className={styles.companyProps}>
          <div className={styles.companyImageLogoWrapper}>
            {!loading ? (
              <Company
                style={{
                  marginTop: '0.5em',
                }}
              />
            ) : (
              <Skeleton className={styles.loading} />
            )}
          </div>
          <div className={styles.companyInfo}>
            {loading ? (
              <Skeleton className={styles.loading} />
            ) : (
              <>
                <div className={styles.companyNameInfo}>
                  {getNameWithLicenses({
                    name: company?.name,
                    is_trial_active: company?.is_trial_active,
                    number_of_licences: company?.number_of_licences,
                  })}
                </div>
                <div className={styles.companyExtraDetails}>
                  {getSubscriptionDetails({
                    is_subscription_active: company?.is_subscription_active,
                    is_trial_active: company?.is_trial_active,
                    integration_type: company?.integration_type,
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.integrations}>
          {(company?.integration_type === INTEGRATION_TYPE.SALESFORCE ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.SALESFORCE) && (
            <SalesforceBox className={styles.salesforceIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.PIPEDRIVE ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.PIPEDRIVE) && (
            <Pipedrive className={styles.pipedriveIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.GOOGLE_SHEETS ||
            company?.Integrations?.[0]?.type ===
              INTEGRATION_TYPE.GOOGLE_SHEETS ||
            company?.integration_type === INTEGRATION_TYPE.EXCEL ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.EXCEL) && (
            <GoogleSheets className={styles.googleSheetsIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.HUBSPOT ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.HUBSPOT) && (
            <Hubspot className={styles.hubspotIcon} />
          )}
          {/* {(company?.integration_type === INTEGRATION_TYPE.EXCEL ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.EXCEL) && (
            <Excel className={styles.googleSheetsIcon} />
          )} */}
          {(company?.integration_type === INTEGRATION_TYPE.SELLSY ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.SELLSY) && (
            <Sellsy className={styles.sellsyIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.ZOHO ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.ZOHO) && (
            <Zoho className={styles.zohoIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.BULLHORN ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.BULLHORN) && (
            <Bullhorn className={styles.bullhornIcon} />
          )}
          {(company?.integration_type === INTEGRATION_TYPE.DYNAMICS ||
            company?.Integrations?.[0]?.type === INTEGRATION_TYPE.DYNAMICS) && (
            <Dynamics />
          )}
        </div>
      </div>

      <div className={styles.footer}>
        {loading ? (
          <Skeleton className={styles.loading} />
        ) : (
          <>
            <div className={styles.left}>
              {/* {!company?.integration_type && (
                <div className={styles.unonboardedAdmin}>
                  <div className={styles.subscribed}>
                    {company?.Users?.[0]?.email}
                  </div>
                </div>
              )} */}
              <p
                className={
                  getStatus(company) === 'configured'
                    ? styles.configured
                    : getStatus(company) === 'onboarding_pending'
                    ? styles.pending
                    : styles.notconfigured
                }
              >
                {COMPANY_STATUS[getStatus(company)]}
              </p>
            </div>
            <div className={styles.right}>
              <div>
                <h3>1</h3>
                <div>Integration</div>
              </div>
              <Divider className={styles.divider} />
              <div>
                <h3>{company?.user_count ?? 1}</h3>
                <div>{company?.user_count > 1 ? 'Users' : 'User'}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(CompanyCard);
