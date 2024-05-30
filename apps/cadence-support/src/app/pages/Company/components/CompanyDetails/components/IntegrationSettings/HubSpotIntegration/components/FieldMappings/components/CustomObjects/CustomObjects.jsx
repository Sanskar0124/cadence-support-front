import styles from './CustomObjects.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';
import {
  Input,
  InputRadio,
  Label,
  Select,
  TabNavSlider,
} from '@cadence-support/widgets';
import { useEffect, useState } from 'react';
import { TabNavThemes } from '@cadence-support/themes';

import moment from 'moment';

const TABS = [{ label: 'Contact', value: 'contact' }];

export const VIEWS = {
  CONTACT: 'contact',
  COMPANY: 'company',
  CUSTOM_OBJECTS: 'custom_objects',
};
export const CUSTOM_OBJECT = {
  [VIEWS.CONTACT]: [],
};

//hovers are the uids from 3types of below constants
export const QUICKVIEW_FIELDS = {
  INTEGRATION_STATUS: {
    value: 'qvf_integration_status',
    hovers: ['__integration_status'],
    hoversFor: [VIEWS.COMPANY],
  },
  LINKEDIN_URL: {
    value: 'qvf_linkedin_url',
    hovers: ['__linkedin_url'],
    hoversFor: [VIEWS.CONTACT],
  },
  COMPANY_URL: {
    value: 'qvf_company_url',
    hovers: ['__company_linkedin_url'],
    hoversFor: [VIEWS.COMPANY],
  },
  FIRST_NAME: {
    value: 'qvf_first_name',
    hovers: ['__first_name'],
    hoversFor: [VIEWS.CONTACT],
  },
  LAST_NAME: {
    value: 'qvf_last_name',
    hovers: ['__last_name'],
    hoversFor: [VIEWS.CONTACT],
  },
  JOB_POSITION: {
    value: 'qvf_job_position',
    hovers: ['__job_position'],
    hoversFor: [VIEWS.CONTACT],
  },
  COMPANY_NAME: {
    value: 'qvf_company_name',
    hovers: ['__company_name'],
    hoversFor: [VIEWS.COMPANY],
  },
  COMPANY_SIZE: {
    value: 'qvf_company_size',
    hovers: ['__company_size'],
    hoversFor: [VIEWS.COMPANY],
  },
  COMPANY_PHONE_NUMBER: {
    value: 'qvf_company_phone_number',
    hovers: ['__company_phone_number'],
    hoversFor: [VIEWS.COMPANY],
  },
  ZIPCODE: {
    value: 'qvf_zipcode',
    hovers: ['__zipcode'],
    hoversFor: [VIEWS.COMPANY],
  },
  COUNTRY: {
    value: 'qvf_country',
    hovers: ['__country'],
    hoversFor: [VIEWS.COMPANY],
  },
  P_EMAIL: {
    value: 'qvf_p_email',
    hovers: ['__p_email'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_EMAIL1: {
    value: 'qvf_a_email1',
    hovers: ['__a_email1'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_EMAIL2: {
    value: 'qvf_a_email2',
    hovers: ['__a_email2'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_EMAIL3: {
    value: 'qvf_a_email3',
    hovers: ['__a_email3'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_EMAIL4: {
    value: 'qvf_a_email4',
    hovers: ['__a_email4'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  P_PHONE_NUMBER: {
    value: 'qvf_p_phone_number',
    hovers: ['__p_phone_number'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_PHONE_NUMBER1: {
    value: 'qvf_a_phone_number1',
    hovers: ['__a_phone_number1'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_PHONE_NUMBER2: {
    value: 'qvf_a_phone_number2',
    hovers: ['__a_phone_number2'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_PHONE_NUMBER3: {
    value: 'qvf_a_phone_number3',
    hovers: ['__a_phone_number3'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
  A_PHONE_NUMBER4: {
    value: 'qvf_a_phone_number4',
    hovers: ['__a_phone_number4'],
    hoversFor: [VIEWS.LEAD, VIEWS.CONTACT],
  },
};

//parseValues are used for implementing final construction of object before sending
//hovers is used to hover in quickView

const CONTACT_FIELDS = [
  {
    uid: '__first_name',
    label: 'First Name',
    value: { name: '' },
    backendField: 'first_name',
    hovers: [QUICKVIEW_FIELDS.FIRST_NAME.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__last_name',
    label: 'Last Name',
    value: { name: '' },
    backendField: 'last_name',
    hovers: [QUICKVIEW_FIELDS.LAST_NAME.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__linkedin_url',
    label: 'Linkedin URL',
    value: { name: '' },
    backendField: 'linkedin_url',
    hovers: [QUICKVIEW_FIELDS.LINKEDIN_URL.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__job_position',
    label: 'Job position',
    value: { name: '' },
    backendField: 'job_position',
    hovers: [QUICKVIEW_FIELDS.JOB_POSITION.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__p_phone_number',
    label: 'Primary Phone Number',
    value: { name: '' },
    backendField: 'phone_numbers',
    hovers: [QUICKVIEW_FIELDS.P_PHONE_NUMBER.value],
    isArray: true,
    type: ['string', 'number'],
    index: 0,
  },
  {
    uid: '__a_phone_number1',
    label: 'Mobile Phone',
    value: { name: '' },
    backendField: 'phone_numbers',
    hovers: [QUICKVIEW_FIELDS.A_PHONE_NUMBER1.value],
    isArray: true,
    type: ['string', 'number'],
    index: 1,
  },
  {
    uid: '__a_phone_number2',
    label: 'Company Phone',
    value: { name: '' },
    backendField: 'phone_numbers',
    hovers: [QUICKVIEW_FIELDS.A_PHONE_NUMBER2.value],
    isArray: true,
    type: ['string', 'number'],
    index: 2,
  },
  {
    uid: '__a_phone_number3',
    label: 'Other Phone 1',
    value: { name: '' },
    backendField: 'phone_numbers',
    hovers: [QUICKVIEW_FIELDS.A_PHONE_NUMBER3.value],
    isArray: true,
    type: ['string', 'number'],
    index: 3,
  },
  {
    uid: '__a_phone_number4',
    label: 'Other Phone 2',
    value: { name: '' },
    backendField: 'phone_numbers',
    hovers: [QUICKVIEW_FIELDS.A_PHONE_NUMBER4.value],
    isArray: true,
    type: ['string', 'number'],
    index: 4,
  },
  {
    uid: '__p_email',
    label: 'Primary Email',
    value: { name: '' },
    backendField: 'emails',
    hovers: [QUICKVIEW_FIELDS.P_EMAIL.value],
    isArray: true,
    type: ['string'],
    index: 0,
  },
  {
    uid: '__a_email1',
    label: 'Alternative Email 1',
    value: { name: '' },
    backendField: 'emails',
    hovers: [QUICKVIEW_FIELDS.A_EMAIL1.value],
    isArray: true,
    index: 1,
    type: ['string'],
  },
  {
    uid: '__a_email2',
    label: 'Alternative Email 2',
    value: { name: '' },
    backendField: 'emails',
    hovers: [QUICKVIEW_FIELDS.A_EMAIL2.value],
    isArray: true,
    index: 2,
    type: ['string'],
  },
  {
    uid: '__a_email3',
    label: 'Alternative Email 3',
    value: { name: '' },
    backendField: 'emails',
    hovers: [QUICKVIEW_FIELDS.A_EMAIL3.value],
    isArray: true,
    index: 3,
    type: ['string'],
  },
  {
    uid: '__a_email4',
    label: 'Alternative Email 4',
    value: { name: '' },
    backendField: 'emails',
    hovers: [QUICKVIEW_FIELDS.A_EMAIL4.value],
    isArray: true,
    index: 4,
    type: ['string'],
  },
];

const COMPANY_FIELDS = [
  {
    uid: '__company_name',
    label: 'Company Name',
    value: { name: '' },
    backendField: 'name',
    hovers: [QUICKVIEW_FIELDS.COMPANY_NAME.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__company_phone_number',
    label: 'Company Phone Number',
    value: { name: '' },
    backendField: 'phone_number',
    hovers: [QUICKVIEW_FIELDS.COMPANY_PHONE_NUMBER.value],
    isArray: false,
    type: ['string', 'number'],
  },
  {
    uid: '__company_size',
    label: 'Company Size',
    value: { name: '' },
    backendField: 'size',
    hovers: [QUICKVIEW_FIELDS.COMPANY_SIZE.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__company_linkedin_url',
    label: 'Company Linkedin URL',
    value: { name: '' },
    backendField: 'linkedin_url',
    hovers: [QUICKVIEW_FIELDS.COMPANY_URL.value],
    isArray: false,
    type: ['string'],
  },
  {
    uid: '__zipcode',
    label: 'Zipcode',
    value: { name: '' },
    backendField: 'zip_code',
    hovers: [QUICKVIEW_FIELDS.ZIPCODE.value],
    isArray: false,
    type: ['string', 'number'],
  },
  {
    uid: '__country',
    label: 'Country',
    value: { name: '' },
    backendField: 'country',
    hovers: [QUICKVIEW_FIELDS.COUNTRY.value],
    isArray: false,
    type: ['string'],
  },
];

export const fields = {
  [VIEWS.CONTACT]: {},
  [VIEWS.COMPANY]: {},
};

function FieldMappings({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const [maxRow, setMaxRow] = useState(0);
  const [form, setForm] = useState();
  const [buttonText, setButtonText] = useState();
  const [activeTab, setActiveTab] = useState('contact');
  const [contactInput, setContactInput] = useState({});
  const [companyInput, setCompanyInput] = useState({});

  useEffect(() => {
    if (form) {
      form.forEach((item) => {
        const value = fields[item.hubspot_endpoint][item.hubspot_field];
        if (item.type === 'multi_select_dropdown') {
          if (item.hubspot_endpoint === VIEWS.CONTACT) {
            setContactInput((prev) => ({
              ...prev,
              [item.hubspot_field]: value != null ? value.split(';') : [],
            }));
          } else {
            setCompanyInput((prev) => ({
              ...prev,
              [item.hubspot_field]: value != null ? value.split(';') : [],
            }));
          }
        } else if (item.type === 'input_box') {
          const type = item.input_type;
          if (type === 'date') {
            if (item.hubspot_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.hubspot_field]:
                  value != null
                    ? {
                        DD: value.split('-')[2],
                        MM: value.split('-')[1],
                        YYYY: value.split('-')[0],
                      }
                    : {
                        DD: 'dd',
                      },
              }));
            } else {
              setCompanyInput((prev) => ({
                ...prev,
                [item.hubspot_field]:
                  value != null
                    ? {
                        DD: value.split('-')[2],
                        MM: value.split('-')[1],
                        YYYY: value.split('-')[0],
                      }
                    : {
                        DD: 'dd',
                      },
              }));
            }
          } else if (type === 'datetime') {
            if (item.hubspot_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.hubspot_field]:
                  value != null
                    ? {
                        DD: moment(value).format('DD'),
                        MM: moment(value).format('MM'),
                        YYYY: moment(value).format('YYYY'),
                        time: `${moment(value).format('HH')}:${moment(
                          value
                        ).format('mm')}`,
                      }
                    : {
                        DD: 'dd',
                      },
              }));
            } else {
              setCompanyInput((prev) => ({
                ...prev,
                [item.hubspot_field]:
                  value != null
                    ? {
                        DD: moment(value).format('DD'),
                        MM: moment(value).format('MM'),
                        YYYY: moment(value).format('YYYY'),
                        time: `${moment(value).format('HH')}:${moment(
                          value
                        ).format('mm')}`,
                      }
                    : {
                        DD: 'dd',
                      },
              }));
            }
          } else {
            if (item.hubspot_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.hubspot_field]: value !== null ? value : '',
              }));
            } else {
              setCompanyInput((prev) => ({
                ...prev,
                [item.hubspot_field]: value !== null ? value : '',
              }));
            }
          }
        } else {
          if (item.hubspot_endpoint === VIEWS.CONTACT) {
            setContactInput((prev) => ({
              ...prev,
              [item.hubspot_field]: value !== null ? value : '',
            }));
          } else {
            setCompanyInput((prev) => ({
              ...prev,
              [item.hubspot_field]: value !== null ? value : '',
            }));
          }
        }
      });
    }
  }, [form, fields]);

  useEffect(() => {
    if (fieldMappings?.contact_custom_object != null) {
      setForm(fieldMappings?.contact_custom_object[0].form);
      setButtonText(fieldMappings?.contact_custom_object[0].button_text);
    } else {
      setForm([]);
      setButtonText('Qualification');
    }
    // }

    setContactInput({});
    setCompanyInput({});
  }, [fieldMappings]);
  useEffect(() => {
    let max = 0;
    form?.forEach((formElement) => {
      if (formElement.position.row > max) {
        max = formElement.position.row;
      }
    });
    setMaxRow(max);
  }, [form]);

  const renderInput = (item, row) => {
    const type = item.input_type;
    const count = form.filter((item) => item.position.row === row).length;

    switch (type) {
      case 'textarea':
        return (
          <>
            <Label>{item.hubspot_label}</Label>
            <Input
              placeholder="Type here"
              type="textarea"
              height="70px"
              value={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : companyInput
              }
              disabled={true}
              className={`${!item.editable && styles.disabled}`}
              setValue={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : setCompanyInput
              }
              name={item.hubspot_field}
            />
          </>
        );
      case 'date':
        return (
          <>
            <Label>{item.hubspot_label}</Label>
            <Input
              placeholder="Select Date"
              type="date"
              left={item.position.column === 2 && count === 3}
              value={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : companyInput
              }
              className={`${!item.editable && styles.disabled}`}
              disabled={true}
              setValue={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : setCompanyInput
              }
              top={row > maxRow / 2 && maxRow / 2 >= 5}
              name={item.hubspot_field}
            />
          </>
        );
      case 'datetime':
        return (
          <>
            <Label>{item.hubspot_label}</Label>
            <Input
              placeholder={'Select Date and Time'}
              type="datetime"
              left={item.position.column === 2 && count === 3}
              value={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : companyInput
              }
              disabled={true}
              setValue={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : setCompanyInput
              }
              name={item.hubspot_field}
              className={`${!item.editable && styles.disabled}`}
            />
          </>
        );

      default:
        return (
          <>
            <Label>{item.hubspot_label}</Label>
            <Input
              type={type}
              disabled={true}
              placeholder="Type here"
              value={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : companyInput
              }
              setValue={
                item.hubspot_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : setCompanyInput
              }
              name={item.hubspot_field}
              className={`${!item.editable && styles.disabled} ${
                styles.intInput
              }`}
            />
          </>
        );
    }
  };

  return (
    <div className={styles.CustomObjects}>
      <div className={styles.header}>
        <div />
        <div className={styles.tabs}>
          <TabNavSlider
            theme={TabNavThemes.WHITE}
            className={styles.buttonSliderClassName}
            btnClassName={styles.buttonClassName}
            activeBtnClassName={styles.activeBtnClassName}
            activePillClassName={styles.activePillClassName}
            buttons={TABS}
            value={activeTab}
            setValue={setActiveTab}
            width="270px"
          />
        </div>
      </div>
      <div className={styles.card}>
        <h1>{buttonText}</h1>

        <div className={`${styles.body}`}>
          {[...Array(maxRow + 1).keys()].map(
            (row) => {
              return (
                form?.filter((element) => element.position.row === row)
                  .length !== 0 && (
                  <div className={styles.formRow} key={`${row}`}>
                    {form
                      ?.filter((element) => element.position.row === row)
                      .sort((a, b) => a.position.column - b.position.column)
                      .map(
                        (item) =>
                          item.type !== '' && (
                            <div
                              key={`${row}-${item.position.column}`}
                              className={`${styles.formColumn}`}
                            >
                              <div
                                className={styles.dragItem}
                                key={`${row}-${item.position.column}-drag`}
                              >
                                {item.type === 'dropdown' && (
                                  <>
                                    <Label>{item.hubspot_label}</Label>
                                    <Select
                                      placeholder={'Select here'}
                                      value={
                                        item.hubspot_endpoint === VIEWS.CONTACT
                                          ? contactInput
                                          : companyInput
                                      }
                                      setValue={
                                        item.hubspot_endpoint === VIEWS.CONTACT
                                          ? setContactInput
                                          : setCompanyInput
                                      }
                                      name={item.hubspot_field}
                                      disabled={true}
                                      className={`${
                                        !item.editable && styles.disabled
                                      }`}
                                      menuOnTop={row === maxRow ? true : false}
                                      numberOfOptionsVisible="3"
                                      options={item?.possible_values?.map(
                                        (item) => ({
                                          label: item?.label,
                                          value: item?.value,
                                        })
                                      )}
                                    ></Select>
                                  </>
                                )}

                                {item.type === 'multi_select_dropdown' && (
                                  <>
                                    <Label>{item.hubspot_label}</Label>
                                    <Select
                                      placeholder={'Select here'}
                                      disabled={true}
                                      value={
                                        item.hubspot_endpoint === VIEWS.CONTACT
                                          ? contactInput
                                          : companyInput
                                      }
                                      setValue={
                                        item.hubspot_endpoint === VIEWS.CONTACT
                                          ? setContactInput
                                          : setCompanyInput
                                      }
                                      name={item.hubspot_field}
                                      height="auto"
                                      menuOnTop={row === maxRow ? true : false}
                                      className={`${
                                        !item.editable && styles.disabled
                                      }`}
                                      numberOfOptionsVisible="3"
                                      options={item?.possible_values?.map(
                                        (item) => ({
                                          label: item?.label,
                                          value: item?.value,
                                        })
                                      )}
                                      isMulti
                                    ></Select>
                                  </>
                                )}
                                {item.type === 'radio_button' && (
                                  <div className={`${styles.radioBox}`}>
                                    <div className={styles.label}>
                                      {item.hubspot_label}?
                                    </div>
                                    <div className={`${styles.btnBox}`}>
                                      {item?.possible_values?.map((i) => (
                                        <div className={styles.btn}>
                                          <InputRadio
                                            className={styles.radio}
                                            size="24"
                                            disabled={true}
                                            value={
                                              item.hubspot_endpoint ===
                                              VIEWS.CONTACT
                                                ? contactInput[
                                                    item.hubspot_field
                                                  ]
                                                : companyInput[
                                                    item.hubspot_field
                                                  ]
                                            }
                                            checked={
                                              item.hubspot_endpoint ===
                                              VIEWS.CONTACT
                                                ? contactInput[
                                                    item.hubspot_field
                                                  ] === i?.value
                                                  ? true
                                                  : false
                                                : companyInput[
                                                    item.hubspot_field
                                                  ] === i?.value
                                                ? true
                                                : false
                                            }
                                            onChange={() => {
                                              if (
                                                item.hubspot_endpoint ===
                                                VIEWS.CONTACT
                                              ) {
                                                setContactInput((prev) => ({
                                                  ...prev,
                                                  [item.hubspot_field]:
                                                    i?.value,
                                                }));
                                              } else {
                                                setCompanyInput((prev) => ({
                                                  ...prev,
                                                  [item.hubspot_field]:
                                                    i?.value,
                                                }));
                                              }
                                            }}
                                          />
                                          <div className={styles.btnLabel}>
                                            {i?.label}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {item.type === 'input_box' &&
                                  renderInput(item, row)}
                              </div>
                            </div>
                          )
                      )}
                  </div>
                )
              );
            }
            // )
          )}
        </div>
      </div>
    </div>
  );
}

export default FieldMappings;
