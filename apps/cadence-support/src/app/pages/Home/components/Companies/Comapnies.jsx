import { useCompanyActivity } from '@cadence-support/data-access';
import { useState } from 'react';
import styles from './Companies.module.scss';
import { Placeholder } from './Placeholder/Placeholder';

const Companies = () => {
  const { companyData, companyDataLoading } = useCompanyActivity();
  return (
    <div className={styles.Companies}>
      <div className={styles.sub_heading}>Companies</div>
      <div className={styles.Companies_body}>
        <div className={styles.totalCompanies}>
          <div className={styles.totalCompanies_counts}>
            <p className={styles.count}>
              {companyDataLoading ? (
                <Placeholder />
              ) : (
                companyData?.total_companies
              )}
            </p>
            <p className={styles.catagories}> Total Companies</p>
          </div>
        </div>
        <div className={styles.licenseType}>
          <div className={`${styles.licenseType_counts} ${styles.type1}`}>
            <p className={styles.count}>
              {companyDataLoading ? (
                <Placeholder />
              ) : (
                companyData?.is_trial_active
              )}
            </p>
            <p className={styles.catagories}>Trial Account</p>
          </div>
        </div>
        <div className={styles.licenseType}>
          <div className={`${styles.licenseType_counts} ${styles.type2}`}>
            <p className={styles.count}>
              {companyDataLoading ? (
                <Placeholder />
              ) : (
                companyData?.is_subscription_active
              )}
            </p>
            <p className={styles.catagories}>Active Subscription</p>
          </div>
        </div>
        <div className={styles.licenseType}>
          <div className={`${styles.licenseType_counts} ${styles.type3}`}>
            <p className={styles.count}>
              {companyDataLoading ? <Placeholder /> : companyData?.expired}
            </p>
            <p className={styles.catagories}>Failed Subscription</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
