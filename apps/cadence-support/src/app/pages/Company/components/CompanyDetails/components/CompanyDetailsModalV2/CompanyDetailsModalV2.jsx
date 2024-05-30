import { Div, Modal } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import { useUpdateIntegration } from '@cadence-support/data-access';
import { Calendar, SmallArrowDown, SmallArrowUp } from '@cadence-support/icons';
import { InputThemes, ThemedButtonThemes } from '@cadence-support/themes';
import {
  Checkbox,
  Input,
  InputRadio,
  Label,
  Select,
  ThemedButton,
} from '@cadence-support/widgets';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import styles from './CompanyDetailsModal.module.scss';
import CalendarModal from './components/CalendarModal/CalendarModa';

import { AccountTypes, UPDATE_INTEGRATION_ERRORS } from './constants';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import { themeStyles } from 'libs/widgets/src/lib/Select/ThemeStyles';

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

const CompanyDetailsModalV2 = ({
  setModal,
  modal,
  companyID,
  companyDetails,
  setCompanyItem,
  companyItem,
  setResendMailModal,
  setAdminData,
  setIsUpdated,
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
  const [isTrial, setIsTrial] = useState(false);
  const { roundedStyles } = themeStyles({
    numberOfOptionsVisible: 5,
    width: '100%',
    height: '40px',
    menuOnTop: true,
  });
  const [tz, setTZ] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [input, setInput] = useState({
    company_name: '',
    company_id: '',
    integration_name: '',
    integration_type: '',
    ringover_team_id: '',
    no_of_licenses: '',
    ringover_user_id: '',
    ringover_api_key: '',
    is_trial_active: true,
    is_subscription_active: false,
    trial_valid_until: 0,
    trial_duration: 0,
    selectedDate: todaysDate,
    expiryDate: '',
    days_remaining: 0,
    using_our_phone_system: false,
    first_name: '',
    last_name: '',
    email: '',
    user_id: '',
    timezone: '',
    instance_url: '',
    mail_integration_type: '',
  });

  const closeModal = () => {
    setModal(false);
    setInput({
      company_name: '',
      company_id: '',
      url: '',
      address: '',
      linkedin_url: '',
      integration_name: '',
      integration_type: '',
      ringover_team_id: '',
      no_of_licenses: '',
      ringover_user_id: '',
      ringover_api_key: '',
      is_trial_active: true,
      is_subscription_active: false,
      trial_valid_until: 0,
      trial_duration: 0,
      selectedDate: todaysDate,
      expiryDate: '',
      days_remaining: 0,
      using_our_phone_system: false,
      first_name: '',
      last_name: '',
      email: '',
      user_id: '',
      timezone: '',
      instance_url: '',
      mail_integration_type: '',
    });
    setTZ(Intl.DateTimeFormat().resolvedOptions().timeZone);
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

  const IfTrialDateIsInPast = (selectedDate) => {
    if (todaysDate > selectedDate) {
      return todaysDate;
    } else {
      return selectedDate;
    }
  };

  useEffect(() => {
    if (modal) {
      getIntegration(companyID, {
        onSuccess: (data) => {
          const companyData = data?.data;
          setAdminData(companyData?.User);
          setIsTrial(todaysDate > dayjs(companyData?.trial_valid_until) ? true : false);
          setInput((prev) => ({
            ...prev,
            company_name: companyData?.name,
            integration_id: companyData?.integration_id,
            company_id: companyData?.company_id,
            user_id: companyData?.User?.user_id,
            integration_name: companyData?.integration,
            integration_type: companyData.integration_type,
            is_subscription_active: companyData?.is_subscription_active,
            is_trial_active: companyData?.is_trial_active,
            no_of_licenses: companyData?.number_of_licences,
            days_remaining: companyData?.trial_valid_until
              ? getTrialDuration(companyData?.trial_valid_until)
              : 0,
            selectedDate: companyData?.trial_valid_until
              ? IfTrialDateIsInPast(dayjs(companyData?.trial_valid_until))
              : todaysDate,
            expiryDate: companyData?.trial_valid_until,
            ringover_team_id: companyData?.ringover_team_id,
            ringover_user_id: companyData?.User?.ringover_user_id,
            ringover_api_key: companyData?.User?.ringover_api_key,
            using_our_phone_system:
              companyData?.phone_system === 'ringover' ? true : false,
            first_name: companyData?.User?.first_name,
            last_name: companyData?.User?.last_name,
            email: companyData?.User?.email,
            timezone: companyData?.User?.timezone,
            instance_url: companyData?.instance_url,
            mail_integration_type: companyData?.mail_integration_type,
          }));
          setTZ(companyData?.User?.timezone);
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      });
    }
  }, [modal]);

  const handleSave = () => {
    const body = {
      company_id: input?.company_id,
      user_id: input?.user_id,
      is_subscription_active: input?.is_subscription_active,
      is_trial_active: input?.is_trial_active,
      ringover_team_id: input?.ringover_team_id,
      ringover_user_id: input?.ringover_user_id,
      email: input?.email,
      trial_valid_until: input?.selectedDate,
      timezone: tz?.value ?? tz ?? '',
      number_of_licences:
        input?.no_of_licenses !== '' ? input?.no_of_licenses : 0,
    };
    if (
      !input.email?.trim()?.match(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      addError('Please Provide a Valid Email Address');
      return;
    }
    if (!input?.ringover_user_id) {
      return addError('Ringover User ID is mandatory');
    }
    if (!input?.ringover_team_id) {
      return addError('Missing Ringover Team Id');
    }

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
        closeModal();
        setIsUpdated(true);
        setResendMailModal(true);
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
    // const trialDate = IfTrialDateIsInPast(input?.selectedDate);
    setLicenseActiveDate(dayjs(input?.selectedDate).format('DD/MM/YYYY'));
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
          <h3>Company details</h3>
        </div>
        <div className={styles.main}>
          <div>
            <Label className={styles.actionLabel}>General Information</Label>
          </div>
          <div className={styles.detailscontainer}>
            <div className={styles.containerSmall}>
              <Label required className={styles.label}>
                company name
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  value={input}
                  setValue={setInput}
                  type="input"
                  title={'Company Name'}
                  name="company_name"
                  placeholder="Enter company name"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
          </div>
          <div>
            <Label className={styles.actionLabel}>Integration details</Label>
          </div>
          <div className={styles.detailscontainer}>
            <div className={styles.containerSmall}>
              <Label required className={styles.label}>
                Integration
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="select"
                  title={'Integration Name'}
                  value={input}
                  setValue={setInput}
                  name="integration_name"
                  placeholder="Select"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label className={styles.label} required>
                Integration Type
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  title={'Integration Type'}
                  value={input}
                  setValue={setInput}
                  name="integration_type"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} 
            
              `}
                required
              >
                Ringover team ID
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'Ringover Team Id'}
                  value={input}
                  setValue={setInput}
                  placeholder="Ringover Team Id"
                  name="ringover_team_id"
                  className={`${styles.numberInput} `}
                />
              </Div>
            </div>

            <div className={styles.containerSmall}>
              <Label className={`${styles.label} `}>No of Licenses</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="number"
                  title={'No Of Licenses'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter no of licenses"
                  name="no_of_licenses"
                  className={`${styles.numberInput}`}
                />
              </Div>
            </div>

            <div className={styles.containerSmall}>
              <Label className={styles.label}>Ringover API key</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'Ringover api key'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter Ringover api key"
                  name="ringover_api_key"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label className={styles.label}>Mail integration type</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'integration type'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter integration type"
                  name="mail_integration_type"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            {input?.integration_type === 'dynamics' && (
              <div className={styles.containerSmall}>
                <Label className={styles.label}>Instance url</Label>
                <Div
                  loading={getIntegrationLoading}
                  className={styles.innerdiv}
                >
                  <Input
                    type="input"
                    title={'instance url'}
                    value={input}
                    setValue={setInput}
                    placeholder="instance url"
                    name="instance_url"
                    disabled={true}
                    className={styles.disabled}
                  />
                </Div>
              </div>
            )}
            <div className={styles.checkboxcontainer}>
              <Label className={`${styles.label}`} required>
                Is subscription active
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <InputRadio
                  size={20}
                  className={styles.radio}
                  checked={input?.is_subscription_active}
                  value={input}
                  onChange={() =>
                    setInput((prev) => ({
                      ...prev,
                      is_subscription_active: !input?.is_subscription_active,
                      is_trial_active: false,
                    }))
                  }
                  name={'is_subscription_active'}
                />
              </Div>
            </div>
            <div className={styles.checkboxcontainer}>
              <Label className={styles.label}>Is trial active</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <InputRadio
                  size={20}
                  className={styles.radio}
                  checked={input?.is_trial_active}
                  value={input}
                  onChange={() =>
                    setInput((prev) => ({
                      ...prev,
                      is_trial_active: !input?.is_trial_active,
                      is_subscription_active: false,
                      days_added: '',
                    }))
                  }
                  name={'is_trial_active'}
                />
              </Div>
            </div>
          </div>
          {input?.is_trial_active && (
            <div className={styles.detailscontainer}>
              <div className={styles.containerSmall}>
                <Label className={`${styles.label} `} required>
                  Trial duration
                </Label>
                <Div
                  loading={getIntegrationLoading}
                  className={styles.innerdiv}
                >
                  <div className={styles.trialDuration}>
                    <Input
                      type="number"
                      value={licenseActiveDate}
                      placeholder="31"
                      required
                      className={`${styles.numberInput} `}
                      disabled
                    />
                    <ThemedButton
                      theme={
                        showCalendar
                          ? ThemedButtonThemes.PRIMARY
                          : ThemedButtonThemes.GREY
                      }
                      height={50}
                      width="fit-content"
                      onClick={() => setShowCalendar(true)}
                    >
                      <Calendar />
                    </ThemedButton>
                  </div>
                  <div className={styles.remainingDays}>
                    {isTrial ?
                      <p className={styles.alertText}>Trial period has expired</p>
                      :
                      <p>No of remaining days {input.days_remaining}</p>}

                  </div>
                </Div>
              </div>
            </div>
          )}

          <div className={styles.detailscontainer}>
            <div className={styles.checkboxcontainer}>
              <Label className={styles.label}>Ringover phone system</Label>
              <Checkbox
                className={styles.checkbox}
                checked={input?.using_our_phone_system}
                value={input}
                disabled={true}
                name="using_our_phone_system"
              />
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <Label className={styles.actionLabel}>User details</Label>
          </div>
          <div className={`${styles.detailscontainer}`}>
            <div className={styles.containerSmall}>
              <Label required>First Name</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'First Name'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter first name"
                  name="first_name"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label required>Last Name</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'Last Name'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter last name"
                  name="last_name"
                  disabled={true}
                  className={styles.disabled}
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label required>Email</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="input"
                  title={'Email'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter email"
                  name="email"
                />
              </Div>
            </div>
            <div className={styles.containerSmall}>
              <Label className={styles.label} required>
                Ringover user ID
              </Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <Input
                  type="number"
                  title={'Ringover user id'}
                  value={input}
                  setValue={setInput}
                  placeholder="Enter Ringover user id"
                  name="ringover_user_id"
                  className={styles.numberInput}
                />
              </Div>
            </div>

            <div className={styles.containerSmall}>
              <Label className={styles.label}>Timezone</Label>
              <Div loading={getIntegrationLoading} className={styles.innerdiv}>
                <TimezoneSelect
                  value={tz}
                  styles={roundedStyles}
                  timezones={allTimezones}
                  onChange={setTZ}
                  menuOnTop
                />
              </Div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <ThemedButton
            theme={ThemedButtonThemes.PRIMARY}
            className={styles.btnSave}
            onClick={handleSave}
            loading={updateIntegrationLoading}
            loadingText={'Saving'}
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

export default CompanyDetailsModalV2;
