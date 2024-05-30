import styles from './AddCompany.module.scss';
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
import {
  CREATE_COMPANY_FORM_ERRORS,
  CRM_INTEGRATIONS,
  HIRING_INTEGRATIONS,
  INTEGRATIONS,
  INTEGRATION_TYPES,
} from '../Home/components/AddNewCompanyModal/constants';

const AddCompany = () => {
  const { createCompany, newCompanyLoading } = useAddNewCompany();
  const { addError, addSuccess } = useContext(MessageContext);
  const [error, setError] = useState();
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    url: '',
    linkedin_url: '',
    location: '',
    integration: 'crm',
    type: null,
    no_of_licenses: '',
    is_subscription_active: false,
    using_our_phone_system: true,
    is_trial_active: true,
    phone_system: 'ringover',
    ringover_team_id: '',
    ringover_user_id: '',
    ringover_api_key: '',
    first_name: '',
    last_name: '',
    email: '',
    days_added: '',
  });

  useEffect(() => {
    setCompanyDetails((prev) => ({ ...prev, type: 'salesforce' }));
    setError(null);
  }, []);

  const handleEmptyFields = () => {
    setCompanyDetails({
      companyName: '',
      url: '',
      linkedin_url: '',
      location: '',
      integration: 'crm',
      type: null,
      no_of_licenses: '',
      is_subscription_active: false,
      using_our_phone_system: true,
      is_trial_active: true,
      phone_system: 'ringover',
      ringover_user_id: '',
      ringover_team_id: '',
      ringover_api_key: '',
      first_name: '',
      last_name: '',
      email: '',
      days_added: '',
    });
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
        if (integration.value === companyDetails.type)
          isValid = true;
      }

      if (!isValid) {
        addError("Integration and Integration Type do not Match");
        return;
      } 
    }
    else if (companyDetails?.integration === INTEGRATIONS.CRM) {
      let isValid = false;
      for (let integration of CRM_INTEGRATIONS) {
        if (integration.value === companyDetails.type)
          isValid = true;
      }

      if (!isValid) {
        addError("Integration and Integration Type do not Match");
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

    if (!companyDetails.integration.trim()) {
      setError(CREATE_COMPANY_FORM_ERRORS.COMPANY_INTEGRATION);
      return addError('Missing reuired fields');
    }

    if (!companyDetails?.ringover_user_id) {
      return addError('Ringover User ID is mandatory');
    }

    const body = {
      company_details: {
        name: companyDetails?.companyName,
        url: companyDetails?.url,
        linkedin_url: companyDetails?.linkedin_url,
        location: companyDetails?.location,
      },
      integration: {
        integration: companyDetails?.integration,
        type: companyDetails?.type,
        no_of_licenses: companyDetails?.no_of_licenses,
        is_subscription_active: companyDetails?.is_subscription_active,
        is_trial_active: companyDetails?.is_trial_active,
        ringover_team_id: companyDetails?.ringover_team_id,
        ringover_user_id: companyDetails?.ringover_user_id,
        ringover_api_key: companyDetails?.ringover_api_key,
        phone_system: companyDetails?.phone_system,
        days_added: companyDetails?.days_added,
      },
      user: {
        first_name: companyDetails?.first_name,
        last_name: companyDetails?.last_name,
        email: companyDetails?.email,
      },
    };

    createCompany(body, {
      onSuccess: () => {
        addSuccess('New Company added successfully');
        handleEmptyFields();
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    });
  };

  return (
    <div className={styles.newCompanyContainer}>
      <div className={styles.container}>
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
                  Name
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
                      ? styles.inputWithError
                      : ''
                  }`}
                />
              </div>
              <div className={styles.containerSmall}>
                <Label className={styles.label}> Website Url</Label>
                <Input
                  type="input"
                  title={'Url'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Enter url"
                  name="url"
                />
              </div>
              <div className={styles.containerSmall}>
                <Label className={styles.label}>Address</Label>
                <Input
                  type="input"
                  title={'Address'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Enter Address"
                  name="location"
                />
              </div>

              <div className={styles.containerSmall}>
                <Label className={styles.label}>Company Linkedin Url</Label>
                <Input
                  type="input"
                  title={'Linkedin Url'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Enter linkedin url"
                  name="linkedin_url"
                />
              </div>
            </div>

            <div>
              <Label className={styles.actionLabel}>Integration Details</Label>
            </div>

            <div className={styles.companyDetails}>
              <div className={styles.containerSmall}>
                <Label
                  // className={`${styles.label} ${
                  //   error === CREATE_COMPANY_FORM_ERRORS.COMPANY_INTEGRATION
                  //     ? styles.error
                  //     : ''
                  // }`}
                  className={styles.label}
                  required
                >
                  Integration
                </Label>
                <Select
                  type="select"
                  title={'Integration'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Select"
                  options={INTEGRATION_TYPES.map((item) => ({
                    label: item?.label,
                    value: item?.value,
                  }))}
                  menuOnTop
                  numberOfOptionsVisible="4"
                  name="integration"
                />
              </div>
              <div className={styles.containerSmall}>
                <Label className={styles.label} required>
                  Integration Type
                </Label>
                <Select
                  type="select"
                  title={'Type'}
                  value={companyDetails}
                  setValue={setCompanyDetails}
                  placeholder="Select"
                  options={
                    companyDetails?.integration === 'crm'
                      ? CRM_INTEGRATIONS.map((item) => ({
                          label: item?.label,
                          value: item?.value,
                        }))
                      : HIRING_INTEGRATIONS.map((item) => ({
                          label: item?.label,
                          value: item?.value,
                        }))
                  }
                  
                  menuOnTop
                  numberOfOptionsVisible="4"
                  name="type"
                />
              </div>
              <div className={styles.containerSmall}>
                <Label className={`${styles.label} ${
                error === CREATE_COMPANY_FORM_ERRORS.NO_OF_LICENSES
                  ? styles.error
                  : ''
              }`}>No of Licenses</Label>
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
              <div className={styles.containerSmall}>
                <Label className={`${styles.label} ${
                error === CREATE_COMPANY_FORM_ERRORS.RINGOVER_TEAM_ID
                  ? styles.error
                  : ''
              }`} required>
                  Ringover Team Id
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
 
            </div>
            <p className={styles.notice}>Please make sure you are using the Ringover User_ID from MonAdminBJT not Ringover Dashboard </p>
            <div className={styles.companyDetails}>
              <div className={styles.containerSmall}>
                    <Label className={styles.label} required>
                      Ringover User Id
                    </Label>
                    <Input
                      type="input"
                      title={'Ringover user id'}
                      value={companyDetails}
                      setValue={setCompanyDetails}
                      placeholder="Enter Ringover user id"
                      name="ringover_user_id"
                    />
                  </div>
                  <div className={styles.containerSmall}>
                    <Label className={styles.label}>
                      Ringover API Key
                    </Label>
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

            <div className={styles.companyDetails}>
              <div className={styles.checkboxContainer}>
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
              <div className={styles.checkboxContainer}>
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
            </div>
            {companyDetails?.is_trial_active && (
              <div className={styles.companyDetails}>
                <div className={styles.containerSmall}>
                  <Label className={`${styles.label} ${
                    error === CREATE_COMPANY_FORM_ERRORS.DAYS_ADDED
                      ? styles.error
                      : ''
                  }`} required>
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
                        ? styles.inputWithError
                        : ''
                    }`}
                  />
                </div>
              </div>
            )}
<div className={styles.companyDetails}>
              {' '}
              <div className={styles.checkboxContainer}>
                <Label className={styles.label} required>
                  Using Ringover Phone System
                </Label>
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
            </div>
            <div>
              <Label className={styles.actionLabel}>User</Label>
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
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
