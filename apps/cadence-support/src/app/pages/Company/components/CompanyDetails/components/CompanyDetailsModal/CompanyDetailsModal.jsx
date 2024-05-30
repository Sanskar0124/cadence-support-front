import { Div, Modal } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import { useUpdateIntegration } from '@cadence-support/data-access';
import { Calendar, SmallArrowDown, SmallArrowUp } from '@cadence-support/icons';
import { InputThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { Input, Label, Select, ThemedButton } from '@cadence-support/widgets';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import styles from './CompanyDetailsModal.module.scss';
import CalendarModal from './components/CalendarModal/CalendarModa';

import { AccountTypes, UPDATE_INTEGRATION_ERRORS } from './constants';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

const getIntegrationType = (integration_type) => {
  switch (integration_type) {
    case INTEGRATION_TYPE.BULLHORN:
      return 'hiring';
    case INTEGRATION_TYPE.EXCEL:
    case INTEGRATION_TYPE.GOOGLE_SHEETS:
    case INTEGRATION_TYPE.HUBSPOT:
    case INTEGRATION_TYPE.PIPEDRIVE:
    case INTEGRATION_TYPE.SALESFORCE:
    case INTEGRATION_TYPE.SELLSY:
    case INTEGRATION_TYPE.ZOHO:
      return 'crm';
    default:
      return 'crm';
  }
};

const CompanyDetailsModal = ({
  setModal,
  modal,
  companyID,
  companyDetails,
  setCompanyItem,
  companyItem,
}) => {
  const {
    updateIntegrationData,
    updateIntegrationLoading,
    getIntegration,
    getIntegrationLoading,
  } = useUpdateIntegration();
  const [error, setError] = useState();
  const { addError, addSuccess } = useContext(MessageContext);
  const todaysDate = dayjs();
  const [showCalendar, setShowCalendar] = useState(false);
  const [licenseActiveDate, setLicenseActiveDate] = useState('');

  const [input, setInput] = useState({
    integration_id: '',
    company_name: '',
    company_id: '',
    account_type: 'trial',
    is_trial_active: true,
    is_subscription_active: false,
    trial_valid_until: 0,
    no_of_licenses: '',
    trial_duration: 0,
    integration_name: '',
    integration_type: '',
    selectedDate: todaysDate,
    expiryDate: '',
    days_remaining: 0,
  });

  const closeModal = () => {
    setModal(false);
    setInput({
      integration_id: '',
      company_name: '',
      company_id: '',
      account_type: 'trial',
      is_trial_active: true,
      is_subscription_active: false,
      trial_valid_until: 0,
      no_of_licenses: '',
      integration_name: '',
      integration_type: '',
      trial_duration: 0,
      selectedDate: todaysDate,
      expiryDate: '',
      days_remaining: 0,
    });
  };

  const getTrialDuration = (validTill) => {
    const validExpiryDate = dayjs(input.expiryDate);
    const validSelectedDate = dayjs(input.selectedDate);
    var numDays;

    // to decrease trial period
    // if (validSelectedDate <= validExpiryDate) {
    //   numDays = validSelectedDate.diff(validExpiryDate, 'day');
    // }
    // to increase trial period
    // if (validSelectedDate > validExpiryDate) {
    //   numDays = validSelectedDate.diff(validExpiryDate, 'day');
    // }
    if (validExpiryDate === validSelectedDate) {
      numDays = 0;
    }
    if (validExpiryDate.format('DD MM YYYY')) {
      let days = validSelectedDate.diff(todaysDate, 'day') >= 0;
      numDays = days ? validSelectedDate.diff(todaysDate, 'day') + 1 : 0;
    }
    if (validExpiryDate.format('DD MM YYYY') === 'Invalid Date') {
      numDays = validSelectedDate.diff(todaysDate, 'day');
      if (validSelectedDate > todaysDate) {
        numDays = numDays + 1;
      }
    }

    return numDays ?? 0;
  };

  useEffect(() => {
    if (modal) {
      const body = {
        company_id: companyID,
        integration: getIntegrationType(companyDetails?.integration_type),
      };
      getIntegration(body, {
        onSuccess: (data) => {
          data?.data?.forEach((item) =>
            setInput((prev) => ({
              ...prev,
              integration_id: item.integration_id,
              company_id: item.company_id,
              company_name: companyDetails?.name,
              integration_name: item.integration,
              integration_type: item.type,
              account_type: item.is_subscription_active
                ? 'subscription'
                : 'trial',
              is_subscription_active: item.is_subscription_active,
              is_trial_active: item.is_trial_active,
              no_of_licenses: item.no_of_licenses,
              days_remaining: item?.trial_valid_until
                ? getTrialDuration(item.trial_valid_until)
                : 0,
              selectedDate: item?.trial_valid_until
                ? dayjs(item.trial_valid_until)
                : todaysDate,
              expiryDate: item.trial_valid_until,
            }))
          );
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      });
    }
  }, [modal]);

  useEffect(() => {
    if (input?.account_type) {
      setInput((prev) => ({
        ...prev,
        is_trial_active: input?.account_type === 'trial' ? true : false,
        is_subscription_active:
          input?.account_type === 'subscription' ? true : false,
      }));
    }
  }, [input?.account_type]);

  const handleSave = () => {
    const body = {
      integration_id: input?.integration_id,
      no_of_licenses: input?.no_of_licenses,
      is_subscription_active: input?.is_subscription_active,
      is_trial_active: input?.is_trial_active,
      trial_valid_until: input?.trial_valid_until,
    };

    updateIntegrationData(body, {
      onSuccess: () => {
        addSuccess('Integration updated successfully');
        setCompanyItem((prev) => ({
          ...prev,
          number_of_licences: input.no_of_licenses,
          is_subscription_active: input.is_subscription_active,
          is_trial_active: input.is_trial_active,
          trial_valid_until: dayjs(input.selectedDate).toISOString(),
        }));
        // window.location.reload();
        closeModal();
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    });
  };

  useEffect(() => {
    localStorage.setItem('company', JSON.stringify(companyItem));
  }, [companyItem]);

  useEffect(() => {
    setLicenseActiveDate(dayjs(input.selectedDate).format('DD/MM/YYYY'));

    if (input.selectedDate) {
      setInput((prev) => ({
        ...prev,
        trial_valid_until: dayjs(input.selectedDate).toISOString(),
        days_remaining: getTrialDuration(),
      }));
    }
  }, [input.selectedDate]);

  return (
    <Modal
      isModal={modal}
      onClose={closeModal}
      showCloseButton
      className={styles.companyDetailsModal}
    >
      <Div className={styles.companyDetails}>
        <div className={styles.heading}>
          <h3>Company Details</h3>
        </div>
        <div className={styles.main}>
          <div className={`${styles.inputGroup}`}>
            <Label>Company name</Label>
            <Div loading={getIntegrationLoading} className={styles.accountType}>
              {' '}
              <Input
                value={input}
                setValue={setInput}
                name="company_name"
                theme={InputThemes.WHITE}
                className={styles.input}
                placeholder={'Enter Company name'}
                disabled
              />
            </Div>
          </div>

          <div className={`${styles.inputGroup}`}>
            <Label>Company ID</Label>
            <Div loading={getIntegrationLoading} className={styles.accountType}>
              <Input
                value={input}
                setValue={setInput}
                name="company_id"
                theme={InputThemes.WHITE}
                className={styles.input}
                placeholder={'Enter Company id'}
                disabled
              />
            </Div>
          </div>

          <div className={styles.inputContainer}>
            <div className={`${styles.inputGroup}`}>
              <Label>Integration name</Label>
              <Div loading={getIntegrationLoading}>
                <Input
                  value={input}
                  setValue={setInput}
                  name="integration_name"
                  theme={InputThemes.WHITE}
                  className={styles.input}
                  placeholder={'Enter Company name'}
                  disabled
                />
              </Div>
            </div>

            <div className={`${styles.inputGroup}`}>
              <Label>Integration type</Label>
              <Div loading={getIntegrationLoading}>
                <Input
                  value={input}
                  setValue={setInput}
                  name="integration_type"
                  theme={InputThemes.WHITE}
                  className={styles.input}
                  placeholder={'Enter Company id'}
                  disabled
                />
              </Div>
            </div>
          </div>

          <div className={`${styles.inputGroup}`}>
            <Label>Account type</Label>
            <Div loading={getIntegrationLoading} className={styles.accountType}>
              <Select
                type="select"
                title={'Type'}
                value={input}
                setValue={setInput}
                placeholder="Select"
                options={AccountTypes.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))}
                menuOnTop
                numberOfOptionsVisible="2"
                name="account_type"
              />
            </Div>
          </div>

          <div className={styles.duration}>
            {input?.account_type === 'trial' && (
              <div className={styles.inputGroup}>
                <Label
                  required
                  className={` ${
                    error === UPDATE_INTEGRATION_ERRORS.DAYS_ADDED
                      ? styles.error
                      : ''
                  }`}
                >
                  Trial duration
                </Label>
                <Div loading={getIntegrationLoading}>
                  <div className={styles.trialDuration}>
                    <Input
                      type="number"
                      value={licenseActiveDate}
                      placeholder="31"
                      required
                      className={`${styles.input} ${
                        error === UPDATE_INTEGRATION_ERRORS.DAYS_ADDED
                          ? styles.inputWithError
                          : ''
                      }`}
                      disabled
                    />

                    <ThemedButton
                      theme={
                        showCalendar
                          ? ThemedButtonThemes.PRIMARY
                          : ThemedButtonThemes.GREY
                      }
                      height={50}
                      onClick={() => setShowCalendar(true)}
                    >
                      <Calendar />
                    </ThemedButton>
                  </div>
                  <div className={styles.remainingDays}>
                    <p>No of remaining days {input.days_remaining}</p>
                  </div>
                </Div>
              </div>
            )}
            <div className={styles.inputGroup}>
              <Label required>No of licenses</Label>
              <Div loading={getIntegrationLoading}>
                <div className={styles.licenses}>
                  <Input
                    type="number"
                    value={input}
                    setValue={setInput}
                    name="no_of_licenses"
                    placeholder="0"
                    className={styles.numberInput}
                  />
                  <div className={styles.arrowsContainer}>
                    <ThemedButton
                      className={styles.arrowBtn}
                      theme={ThemedButtonThemes.GREY}
                      onClick={() =>
                        setInput((prev) => ({
                          ...prev,
                          no_of_licenses: JSON.parse(input?.no_of_licenses + 1),
                        }))
                      }
                    >
                      <SmallArrowUp />
                    </ThemedButton>

                    <ThemedButton
                      className={styles.arrowBtn}
                      theme={ThemedButtonThemes.GREY}
                      onClick={() =>
                        setInput((prev) => ({
                          ...prev,
                          no_of_licenses: JSON.parse(input?.no_of_licenses - 1),
                        }))
                      }
                      disabled={input?.no_of_licenses === 0}
                    >
                      <SmallArrowDown />
                    </ThemedButton>
                  </div>
                </div>
              </Div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <ThemedButton
            className={styles.createBtn}
            theme={ThemedButtonThemes.PRIMARY}
            onClick={handleSave}
            loading={updateIntegrationLoading}
          >
            Save
          </ThemedButton>
        </div>
        <CalendarModal
          isModal={showCalendar}
          setShowCalendar={setShowCalendar}
          todaysDate={todaysDate}
          value={input}
          setValue={setInput}
          licenseActiveDate={licenseActiveDate}
        />
      </Div>
    </Modal>
  );
};

export default CompanyDetailsModal;
