import React, { useState, useContext, useEffect } from 'react';
import styles from './LicenseManagement.module.scss';
import { Input, ThemedButton } from '@cadence-support/widgets';
import { Clock, TickSolidIcon } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import TrialExtension from './components/ExtendTrialModal/TrialExtension';
import ActiveLicenseModal from './components/ActivateSubscriptionModal/ActiveLicenseModal';
import { useLicenseManagement } from '@cadence-support/data-access';
import { MessageContext } from '@cadence-support/context';
import { Div } from '@cadence-support/components';
import moment from 'moment';
import dayjs from 'dayjs';
import DeactivateLicenseModal from './components/DeactivateLicenseModal/DeactivateLicenseModal';

const LicenseManagement = ({ companyID }) => {
  const [extendtrialModal, setExtendTrialModal] = useState(false);
  const [activeLicenseModal, setActiveLicenseModal] = useState(false);
  const [extendedPeriod, setExtendedPeriod] = useState(15);
  const { addError, addSuccess } = useContext(MessageContext);
  const [deactivateLicense, setDeactivateLicense] = useState(false);
  const {
    licenseDetails,
    isLicenseDetailsLoading,
    updateLicense,
    isUpdateLicenseLoading,
    refetchLicenseDetails,
    isFetching,
  } = useLicenseManagement(companyID);

  const [companyLicenseDetails, setCompanyLicenseDetails] = useState({});

  useEffect(() => {
    if (licenseDetails) {
      setCompanyLicenseDetails(licenseDetails);
    }
  }, [licenseDetails]);

  const updateLicenseDetailsHandler = () => {
    const body = {
      company_id: companyID,
      is_subscription_active: activeLicenseModal ? true : false,
      is_trial_active: extendtrialModal || deactivateLicense ? true : false,
      trial_duration: activeLicenseModal ? 0 : extendedPeriod,
    };

    updateLicense(body, {
      onSuccess: (data) => {
        setExtendTrialModal(false);
        setActiveLicenseModal(false);
        setExtendedPeriod(15);
        setDeactivateLicense(false);

        setTimeout(() => {
          refetchLicenseDetails();
          addSuccess('License updated successfully');
        }, 1200);
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    });
  };

  return (
    <div
      className={styles.licensemanagement}
      style={{
        overflowY: companyLicenseDetails?.license_type === 'Trial' && 'scroll',
      }}
    >
      <div className={styles.detailscontainer}>
        {/* plan type */}
        <div className={styles.rowTitle}>
          <h1>Plan type</h1>
        </div>

        <div className={`${styles.rowTitle} ${styles.inputdiv}`}>
          {isLicenseDetailsLoading || isFetching ? (
            <Div
              loading={isLicenseDetailsLoading || isFetching}
              className={styles.loader}
            />
          ) : (
            <Input
              width="280px"
              value={companyLicenseDetails?.plan_name ?? ''}
              disabled={true}
            />
          )}
        </div>

        {/*  licence type */}
        <div className={styles.rowTitle}>
          <h1>License type</h1>
        </div>
        <div className={`${styles.rowTitle} ${styles.inputdiv}`}>
          {companyLicenseDetails?.is_subscription_active ? (
            <div className={styles.inputandbtncontainer}>
              {isLicenseDetailsLoading || isFetching ? (
                <Div
                  loading={isLicenseDetailsLoading || isFetching}
                  className={styles.loader}
                  width="400px"
                />
              ) : (
                <div className={styles.activedate}>
                  <div className={styles.licensetype}>
                    <TickSolidIcon color="#40E0CF" size={32} /> Licence
                    activated
                  </div>
                  {companyLicenseDetails?.license_activated_on !== null && (
                    <div className={styles.activate_on}>
                      Activated on
                      {moment(
                        companyLicenseDetails?.license_activated_on
                      ).format('LL')}
                    </div>
                  )}
                </div>
              )}
              {isLicenseDetailsLoading || isFetching ? (
                <Div
                  loading={isLicenseDetailsLoading || isFetching}
                  className={styles.loader}
                  width="400px"
                />
              ) : (
                <div
                  className={styles.deactivate}
                  onClick={() => setDeactivateLicense(true)}
                >
                  Deactivate license
                </div>
              )}
            </div>
          ) : (
            <div className={styles.inputandbtncontainer}>
              {isLicenseDetailsLoading || isFetching ? (
                <Div
                  loading={isLicenseDetailsLoading || isFetching}
                  className={styles.loader}
                />
              ) : (
                <Input
                  width="280px"
                  disabled={true}
                  value={companyLicenseDetails?.license_type ?? ''}
                />
              )}
              {isLicenseDetailsLoading || isFetching ? (
                <Div
                  loading={isLicenseDetailsLoading || isFetching}
                  className={styles.loader}
                />
              ) : (
                <ThemedButton
                  theme={ThemedButtonThemes.GREY}
                  className={styles.licenseBtn}
                  width="184px"
                  onClick={() => setActiveLicenseModal(true)}
                >
                  <TickSolidIcon />
                  <div>Activate license</div>
                </ThemedButton>
              )}
            </div>
          )}
        </div>
        {/* license period */}
        {companyLicenseDetails?.license_type === 'Trial' && (
          <>
            <div className={styles.rowTitle}>
              <h1>License period</h1>
            </div>
            <div className={`${styles.rowTitle} ${styles.inputdiv}`}>
              <div className={styles.inputandbtncontainer}>
                {isLicenseDetailsLoading || isFetching ? (
                  <Div
                    loading={isLicenseDetailsLoading || isFetching}
                    className={styles.loader}
                  />
                ) : (
                  <Input
                    width="280px"
                    disabled={true}
                    value={companyLicenseDetails?.license_period}
                  />
                )}
                {isLicenseDetailsLoading || isFetching ? (
                  <Div
                    loading={isLicenseDetailsLoading || isFetching}
                    className={styles.loader}
                  />
                ) : (
                  <ThemedButton
                    theme={ThemedButtonThemes.GREY}
                    className={styles.licenseBtn}
                    width="175px"
                    onClick={() => setExtendTrialModal(true)}
                  >
                    <Clock />
                    <div>Extend period</div>
                  </ThemedButton>
                )}
              </div>
            </div>
          </>
        )}
        {/* no of license */}
        <div className={styles.rowTitle}>
          <h1>No. of licenses</h1>
        </div>
        <div className={`${styles.rowTitle} ${styles.inputdiv}`}>
          {isLicenseDetailsLoading || isFetching ? (
            <Div
              loading={isLicenseDetailsLoading || isFetching}
              className={styles.loader}
            />
          ) : (
            <Input
              width="280px"
              value={companyLicenseDetails?.number_of_licences ?? 0}
              disabled={true}
            />
          )}
        </div>
        {/* active users */}
        <div className={styles.rowTitle}>
          <h1>Active users</h1>
        </div>
        <div className={`${styles.rowTitle} ${styles.inputdiv}`}>
          {isLicenseDetailsLoading || isFetching ? (
            <Div
              loading={isLicenseDetailsLoading || isFetching}
              className={styles.loader}
            />
          ) : (
            <Input
              width="280px"
              value={companyLicenseDetails?.user_count ?? 0}
              disabled={true}
            />
          )}
        </div>
      </div>
      {extendtrialModal && (
        <TrialExtension
          modal={extendtrialModal}
          setModal={setExtendTrialModal}
          value={extendedPeriod}
          setValue={setExtendedPeriod}
          updateHandler={updateLicenseDetailsHandler}
          isUpdateLicenseLoading={isUpdateLicenseLoading}
        />
      )}
      {activeLicenseModal && (
        <ActiveLicenseModal
          modal={activeLicenseModal}
          setModal={setActiveLicenseModal}
          updateHandler={updateLicenseDetailsHandler}
          isUpdateLicenseLoading={isUpdateLicenseLoading}
        />
      )}
      {deactivateLicense && (
        <DeactivateLicenseModal
          modal={deactivateLicense}
          setModal={setDeactivateLicense}
          updateHandler={updateLicenseDetailsHandler}
          isUpdateLicenseLoading={isUpdateLicenseLoading}
        />
      )}
    </div>
  );
};

export default React.memo(LicenseManagement);
