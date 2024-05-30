import { ProgressiveImg, Skeleton } from '@cadence-support/components';
import {
  AtrManualEmail,
  Call,
  Email,
  Message,
  ThreeDots,
} from '@cadence-support/icons';
import React, { useState, useContext } from 'react';
import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import styles from './Employee.module.scss';
import { getMailStatus, getStatus } from '../../../../constants';

const Employee = ({
  userData: user,
  userLoading,
  tourStatusHandler,
  loading,
}) => {
  const [companyItem, setCompanyItem] = useState(
    JSON.parse(localStorage.getItem('company'))
  );
  return (
    <div className={styles.employeeInfoCard}>
      <div className={styles.header}>
        <div className={styles.left}>
          <ProgressiveImg
            src={
              user?.is_profile_picture_present
                ? user.profile_picture
                : 'https://cdn.ringover.com/img/users/default.jpg'
            }
            className={styles.userProfileImage}
          />
          <div className={styles.user}>
            {!userLoading ? (
              <>
                <h3>
                  {user?.first_name} {user?.last_name}
                </h3>
                <p>User ID : {user?.user_id}</p>
              </>
            ) : (
              <>
                <Skeleton className={`${styles.name} ${styles.loading}`} />
                <Skeleton className={`${styles.userID} ${styles.loading}`} />
              </>
            )}
          </div>
        </div>
        <div className={styles.right}>
          {!userLoading && <ThreeDots className={styles.optionsIcon} />}
        </div>
      </div>
      <div className={styles.body}>
        {userLoading || loading ? (
          new Array(3).fill(0).map((_, i) => {
            return (
              <div key={i} className={styles.employeeInfoCell}>
                <Skeleton className={styles.label} />
                <Skeleton className={styles.value} />
              </div>
            );
          })
        ) : (
          <>
            {/* <div className={styles.employeeInfoCell}>
              <p>Employee ID</p>
              <div>{user?.user_id}</div>
            </div> */}
            <div className={styles.status}>
              <p
                className={
                  user?.onboarding_mail_status === 'Opened'
                    ? styles.configured
                    : user?.onboarding_mail_status === 'Bounced' ||
                      user?.onboarding_mail_status === 'Fail'
                      ? styles.notconfigured
                      : user?.onboarding_mail_status === 'Sent'
                        ? styles.mailsent
                        : styles.common
                }
              >
                Mail: {getMailStatus(user?.onboarding_mail_status)}
              </p>
              <p
                className={
                  user?.is_onboarding_complete
                    ? styles.configured
                    : styles.notconfigured
                }
              >
                {user?.is_onboarding_complete ? 'Onboared' : 'Not onboarded'}
              </p>
            </div>
            <div className={`${styles.employeeInfoCell} ${styles.role}`}>
              <p>Role</p>
              <div>{user?.role?.split('_')}</div>
            </div>
            {Object.values(USER_INTEGRATION_TYPES).includes(
              user?.integration_type
            ) && (
                <div className={styles.employeeInfoCell}>
                  <p>
                    {user?.integration_type ===
                      USER_INTEGRATION_TYPES.SALESFORCE_OWNER && 'Salesforce ID'}
                    {user?.integration_type ===
                      USER_INTEGRATION_TYPES.PIPEDRIVE_USER && 'Pipedrive ID'}
                    {user?.integration_type ===
                      USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER &&
                      'Google Sheets ID'}
                    {user?.integration_type ===
                      USER_INTEGRATION_TYPES.HUBSPOT_OWNER && 'Hubspot ID'}
                    {user?.integration_type ===
                      USER_INTEGRATION_TYPES.EXCEL_USER && 'Excel ID'}
                  </p>
                  <div>
                    {user?.integration_id ? user?.integration_id : 'Not present'}
                  </div>
                </div>
              )}
            {user?.product_tour_status === 'after_onboarding_completed' ? (
              <div
                className={`${styles.employeeInfoCell} ${styles.onboardingContainer} `}
              >
                <p>Product tour status </p>
                <div className={`${styles.completed} ${styles.tag}`}>
                  Completed
                </div>
              </div>
            ) : (
              <div
                className={`${styles.onboardingContainer} ${styles.employeeInfoCell} `}
                style={{ cursor: 'pointer' }}
                onClick={tourStatusHandler}
              >
                <p>Product tour status </p>
                <div className={`${styles.notCompleted} ${styles.tag}`}>
                  {' '}
                  Pending
                </div>
              </div>
            )}

            {user?.primary_email && (
              <div className={`${styles.employeeInfoCell} ${styles.userEmail}`}>
                <div>
                  <p>Email ID</p>
                  <div>{user?.primary_email}</div>
                </div>
                <div>
                  <AtrManualEmail className={styles.emailIcon} />
                </div>
              </div>
            )}

            {user?.primary_phone_number && (
              <div className={`${styles.employeeInfoCell} ${styles.userPhone}`}>
                <div>
                  <p>Phone</p>
                  <div>{user?.primary_phone_number}</div>
                </div>
                <div>
                  <Call className={styles.callIcon} />
                  <Message className={styles.messageIcon} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Employee;
