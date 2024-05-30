import { Modal } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import { useAddNewCompany } from '@cadence-support/data-access';
import { ThemedButtonThemes } from '@cadence-support/themes';
import {
  Checkbox,
  Input,
  InputRadio,
  Label,
  Select,
  ThemedButton,
} from '@cadence-support/widgets';
import { useContext, useEffect, useState } from 'react';
import styles from './AddNewCompanyModal.module.scss';
import {
  CREATE_COMPANY_FORM_ERRORS,
  CRM_INTEGRATIONS,
  EMAIL_LANGUAGE,
  HIRING_INTEGRATIONS,
  INTEGRATIONS,
  INTEGRATION_TYPES,
  MAIL_INTEGRATION_TYPE,
} from './constants';
import dayjs from 'dayjs';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import { themeStyles } from 'libs/widgets/src/lib/Select/ThemeStyles';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

const AddNewCompanyModal = ({ modal, setModal }) => {
  const { roundedStyles } = themeStyles({
    numberOfOptionsVisible: 5,
    width: '95%',
    height: '40px',
    menuOnTop: true,
  });
  const { createCompany, newCompanyLoading } = useAddNewCompany();
  const { addError, addSuccess } = useContext(MessageContext);
  const [error, setError] = useState();
  const [tz, setTZ] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    url: '',
    linkedin_url: '',
    location: '',
    integration: 'crm',
    type: null,
    no_of_licenses: '',
    is_subscription_active: false,
    is_trial_active: true,
    ringover_team_id: '',
    ringover_user_id: '',
    ringover_api_key: '',
    phone_system: 'ringover',
    first_name: '',
    last_name: '',
    email: '',
    days_added: '',
    mail_integration_type: 'google',
    instance_url: '',
    timezone: null,
    language: "english"
  });
  const todaysDate = dayjs();

  useEffect(() => {
    if (modal) {
      setCompanyDetails((prev) => ({ ...prev, type: 'salesforce' }));
      setError(null);
    }
  }, [modal]);

  useEffect(() => {
    if (companyDetails?.days_added) {
      if (companyDetails?.days_added > 365) {
        addError("can't provide the trial more than 365 days");
      } else {
        const newDate = getTrialDuration(companyDetails?.days_added, tz);
        if (newDate) {
          setCompanyDetails((prev) => ({
            ...prev,
            trial_valid_until: newDate,
          }));
        }
      }
    }
  }, [companyDetails.days_added, tz]);

  const getTrialDuration = (days_added, tz) => {
    const newDate = todaysDate.add(days_added, 'day');
    return dayjs(newDate).toISOString();
  };

  const closeModal = () => {
    setModal(false);
    setCompanyDetails({
      companyName: '',
      url: '',
      linkedin_url: '',
      location: '',
      integration: 'crm',
      type: null,
      no_of_licenses: '',
      is_subscription_active: false,
      is_trial_active: true,
      ringover_team_id: '',
      ringover_user_id: '',
      ringover_api_key: '',
      phone_system: 'ringover',
      first_name: '',
      last_name: '',
      email: '',
      days_added: '',
      mail_integration_type: null,
      instance_url: null,
      language: "english"
      
    });
    setTZ(Intl.DateTimeFormat().resolvedOptions().timeZone);
  };

  const handleSave = () => {

    setError(null);
    if (
      !companyDetails.companyName.trim() ||
      !companyDetails.first_name.trim() ||
      !companyDetails.last_name.trim() ||
      !companyDetails.email.trim()
    ) {
      if (!companyDetails.companyName.trim())
        setError(CREATE_COMPANY_FORM_ERRORS.COMPANY_NAME);
      else if (!companyDetails.first_name.trim())
        setError(CREATE_COMPANY_FORM_ERRORS.USER_FIRST_NAME);
      else if (!companyDetails.last_name.trim())
        setError(CREATE_COMPANY_FORM_ERRORS.USER_LAST_NAME);
      else if (!companyDetails.email.trim())
        setError(CREATE_COMPANY_FORM_ERRORS.USER_EMAIL);
      addError(
        'Fill company name, user first name, last name, email with unique data that is not used before'
      );
      return;
    }

    if (companyDetails?.integration === INTEGRATIONS.HIRING) {
      let isValid = false;
      for (let integration of HIRING_INTEGRATIONS) {
        if (integration.value === companyDetails.type) isValid = true;
      }

      if (!isValid) {
        addError('Integration and Integration Type do not Match');
        return;
      }
    } else if (companyDetails?.integration === INTEGRATIONS.CRM) {
      let isValid = false;
      for (let integration of CRM_INTEGRATIONS) {
        if (integration.value === companyDetails.type) isValid = true;
      }

      if (!isValid) {
        addError('Integration and Integration Type do not Match');
        return;
      }
    }

    if (
      !companyDetails.email?.trim()?.match(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError(CREATE_COMPANY_FORM_ERRORS.USER_EMAIL);
      addError('Please Provide a Valid Email Address');
      return;
    }
    if (!companyDetails.integration.trim()) {
      setError(CREATE_COMPANY_FORM_ERRORS.COMPANY_INTEGRATION);
      return addError('Missing required fields');
    }

    if (!companyDetails?.ringover_team_id) {
      setError(CREATE_COMPANY_FORM_ERRORS.RINGOVER_TEAM_ID);
      return addError('Missing Ringover Team Id');
    }

    if (!companyDetails?.no_of_licenses) {
      setError(CREATE_COMPANY_FORM_ERRORS.NO_OF_LICENSES);
      return addError('Missing Number of Licenses');
    }

    if (companyDetails.is_trial_active && !companyDetails.days_added) {
      setError(CREATE_COMPANY_FORM_ERRORS.DAYS_ADDED);
      return addError('Missing Number of Days in Trial');
    }



    const body = {
      company_name: companyDetails?.companyName,
      // url: companyDetails?.url,
      // linkedin_url: companyDetails?.linkedin_url,
      // location: companyDetails?.location,
      integration: 'crm',
      integration_type: 'sheets',
      number_of_licences: companyDetails?.no_of_licenses,
      is_subscription_active: companyDetails?.is_subscription_active,
      is_trial_active: companyDetails?.is_trial_active,
      ringover_team_id: companyDetails?.ringover_team_id,
      trial_valid_until: companyDetails?.trial_valid_until,
      phone_system: 'ringover',
      mail_integration_type: companyDetails?.mail_integration_type,
      instance_url: null,
      admin: {
        first_name: companyDetails?.first_name,
        last_name: companyDetails?.last_name,
        email: companyDetails?.email,
        ringover_user_id:
          companyDetails?.ringover_user_id !== ''
            ? companyDetails?.ringover_user_id
            : null,
        ringover_api_key:
          companyDetails?.ringover_api_key !== ''
            ? companyDetails?.ringover_api_key
            : null,
        language: companyDetails?.language ?? 'english',
        timezone: tz?.value ?? tz ?? "Europe/Brussels",
      },
    };

    const newbody = { ...body, instance_url: companyDetails?.instance_url };

    createCompany(companyDetails?.type === 'dynamics' ? newbody : body, {
      onSuccess: () => {
        addSuccess('New Company added successfully');
        closeModal();
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    });
  };

  return (
    <Modal
      isModal={modal}
      onClose={closeModal}
      showCloseButton
      className={styles.customTaskModal}
    >
      <h2 className={styles.header}>Add New Company</h2>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <div>
            <Label className={styles.actionLabel}>Company Details</Label>
          </div>

          <div className={styles.companyDetails}>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.COMPANY_NAME
                    ? styles.error
                    : ''
                }`}
                required
              >
                Company name
              </Label>
              <Input
                type="input"
                title={'Company Name'}
                value={companyDetails}
                setValue={setCompanyDetails}
                name="companyName"
                placeholder="Enter company name"
                className={`${
                  error === CREATE_COMPANY_FORM_ERRORS.COMPANY_NAME
                    ? `${styles.inputWithError} ${styles.singleInputincontainer}`
                    : styles.singleInputincontainer
                }`}
                required
              />
            </div>
            <div className={styles.containerSmall}>
              <Label className={styles.label} required>Language</Label>
              <Select
                options={EMAIL_LANGUAGE.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="select language"
                name="language"
              />
            </div>
          </div>
          <div>
            <Label className={styles.actionLabel}>Admin details</Label>
          </div>

          <div className={styles.companyDetails}>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_FIRST_NAME
                    ? styles.error
                    : ''
                }`}
                required
              >
                First Name
              </Label>
              <Input
                type="input"
                title={'First Name'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter first name"
                name="first_name"
                className={`${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_FIRST_NAME
                    ? styles.inputWithError
                    : ''
                }`}
              />
            </div>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_LAST_NAME
                    ? styles.error
                    : ''
                }`}
                required
              >
                Last Name
              </Label>
              <Input
                type="input"
                title={'Last Name'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter last name"
                name="last_name"
                className={`${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_LAST_NAME
                    ? styles.inputWithError
                    : ''
                }`}
              />
            </div>
          </div>
          <div className={styles.companyDetails}>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_EMAIL
                    ? styles.error
                    : ''
                }`}
                required
              >
                Email
              </Label>
              <Input
                type="input"
                title={'Email'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter email"
                name="email"
                className={`${
                  error === CREATE_COMPANY_FORM_ERRORS.USER_EMAIL
                    ? styles.inputWithError
                    : ''
                }`}
              />
            </div>
            <div className={styles.containerSmall}>
              <Label className={styles.label}>Ringover user ID</Label>
              <Input
                type="number"
                title={'Ringover user id'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter Ringover user id"
                name="ringover_user_id"
                className={`${styles.numberInput}`}
              />
            </div>
          </div>
          <div className={styles.companyDetails}>


            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.TIMEZONE
                    ? styles.error
                    : ''
                }`}
                required
              >
                Timezone
              </Label>
              <TimezoneSelect
                value={tz}
                styles={roundedStyles}
                timezones={allTimezones}
                onChange={setTZ}
                menuOnTop
                className={styles.timezone}
              />
            </div>
          </div>

          <div>
            <Label className={styles.actionLabel}>Integration Details</Label>
          </div>

          <div className={styles.companyDetails}>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.RINGOVER_TEAM_ID
                    ? styles.error
                    : ''
                }`}
                required
              >
                Ringover team ID
              </Label>
              <Input
                type="input"
                title={'Ringover Team Id'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Ringover Team Id"
                name="ringover_team_id"
                className={`${styles.numberInput} ${
                  error === CREATE_COMPANY_FORM_ERRORS.RINGOVER_TEAM_ID
                    ? styles.inputWithError
                    : ''
                }`}
              />
            </div>
            <div className={styles.containerSmall}>
              <Label
                className={`${styles.label} ${
                  error === CREATE_COMPANY_FORM_ERRORS.NO_OF_LICENSES
                    ? styles.error
                    : ''
                }`}
                required
              >
                No of Licenses
              </Label>
              <Input
                type="number"
                title={'No Of Licenses'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter no of licenses"
                name="no_of_licenses"
                className={`${styles.numberInput} ${
                  error === CREATE_COMPANY_FORM_ERRORS.NO_OF_LICENSES
                    ? styles.inputWithError
                    : ''
                }`}
              />
            </div>
          </div>
          <p className={styles.notice}>
            Please make sure you are using the Ringover User_ID from MonAdminBJT
            not Ringover Dashboard{' '}
          </p>
          <div className={styles.companyDetails}>
            <div className={styles.containerSmall}>
              <Label className={styles.label}>Ringover API Key</Label>
              <Input
                type="input"
                title={'Ringover api key'}
                value={companyDetails}
                setValue={setCompanyDetails}
                placeholder="Enter Ringover api key"
                name="ringover_api_key"
              />
            </div>
                
          </div>
          {companyDetails?.type === 'dynamics' && (
            <div className={styles.companyDetails}>
              <div className={styles.containerSmall}>
                <Label className={styles.label}>Instance url</Label>
                <Input
                  type="input"
                  title="instance_url"
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Enter instance url"
                  name="instance_url"
                  className={styles.singleInputincontainer}
                />
              </div>
            </div>
          )}

          <div className={styles.companyDetails}>
              <div className={styles.radioContainer}>
                <Label className={styles.label}>Is Trial Active</Label>
                <InputRadio
                  size={20}
                  className={styles.radio}
                  checked={companyDetails?.is_trial_active}
                  value={companyDetails}
                  onChange={() =>
                    setCompanyDetails((prev) => ({
                      ...prev,
                      is_trial_active: !companyDetails?.is_trial_active,
                      is_subscription_active: false,
                      days_added: '',
                    }))
                  }
                  name={'subscription_active'}
                />
              </div>
            <div className={styles.radioContainer}>
              <Label
                className={`${styles.label} ${
                  error ===
                  CREATE_COMPANY_FORM_ERRORS.COMPANY_IS_SUBSCRIPTION_ACTIVE
                    ? styles.error
                    : ''
                }`}
                required
              >
                Is Subscription Active
              </Label>
              <InputRadio
                size={20}
                className={styles.radio}
                checked={companyDetails?.is_subscription_active}
                value={companyDetails}
                onChange={() =>
                  setCompanyDetails((prev) => ({
                    ...prev,
                    is_subscription_active:
                      !companyDetails?.is_subscription_active,
                    is_trial_active: false,
                  }))
                }
                name={'subscription_active'}
              />
            </div>
          </div>

          {companyDetails?.is_trial_active && (
            <div className={styles.companyDetails}>
              <div className={styles.containerSmall}>
                <Label
                  className={`${styles.label} ${
                    error === CREATE_COMPANY_FORM_ERRORS.DAYS_ADDED
                      ? styles.error
                      : ''
                  }`}
                  required
                >
                  No of Trial Days
                </Label>
                <Input
                  type="number"
                  title={'No of trial days'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="14"
                  name="days_added"
                  className={`${styles.numberInput} ${
                    error === CREATE_COMPANY_FORM_ERRORS.DAYS_ADDED
                      ? `${styles.inputWithError} ${styles.singleInputincontainer}`
                      : styles.singleInputincontainer
                  }`}
                />
              </div>
            </div>
          )}
          {/* <div className={styles.companyDetails}>
            <div className={styles.checkboxContainer}>
              <Label className={styles.label}>Ringover Phone System</Label>
              <Checkbox
                className={styles.checkbox}
                checked={companyDetails?.using_our_phone_system}
                value={companyDetails}
                onClick={() =>
                  setCompanyDetails((prev) => ({
                    ...prev,
                    using_our_phone_system:
                      !companyDetails?.using_our_phone_system,
                  }))
                }
                name="using_our_phone_system"
              />
            </div>
          </div> */}

          
        </div>
      </div>
      <div className={styles.footer}>
        <ThemedButton
          theme={ThemedButtonThemes.PRIMARY}
          className={styles.btnSave}
          onClick={handleSave}
          loading={newCompanyLoading}
          loadingText={'Saving'}
        >
          Save
        </ThemedButton>
        {/* <div
          className={styles.error}
          //   style={{
          //       display: error ? "" : "none",
          //       transition: "0.25s ease-in-out",
          //   }}
        >
          Please fill all the required details
        </div> */}
      </div>
    </Modal>
  );
};

export default AddNewCompanyModal;
