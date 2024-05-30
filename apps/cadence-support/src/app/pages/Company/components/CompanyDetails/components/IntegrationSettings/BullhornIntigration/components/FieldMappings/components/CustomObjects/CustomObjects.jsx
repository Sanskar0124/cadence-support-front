import styles from './CustomObjects.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';
import { Search } from '@cadence-support/icons';
import {
  Input,
  InputRadio,
  Label,
  Select,
  TabNavSlider,
} from '@cadence-support/widgets';
import { useEffect, useState } from 'react';
import { TabNavThemes } from '@cadence-support/themes';
import { Colors } from '@cadence-support/utils';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import moment from 'moment';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const TABS = [
  { label: 'Lead', value: 'lead' },
  { label: 'Accounts & Contacts', value: 'accounts_&_contacts' },
  { label: 'Candidate', value: 'candidate' },
];

export const VIEWS = {
  LEAD: 'lead',
  CONTACT: 'contact',
  ACCOUNT: 'account',
  CANDIDATE: 'candidate',
  CUSTOM_OBJECTS: 'custom_objects',
};
export const CUSTOM_OBJECT = {
  [VIEWS.LEAD]: [],
  [VIEWS.CONTACT]: [],
};
export const REFERENCES = {
  [VIEWS.LEAD]: {},
  [VIEWS.CONTACT]: {},
  [VIEWS.ACCOUNT]: {},
  [VIEWS.CANDIDATE]: {},
};

export const fields = {
  [VIEWS.LEAD]: {},
  [VIEWS.CONTACT]: {},
  [VIEWS.ACCOUNT]: {},
  [VIEWS.CANDIDATE]: {},
};

function FieldMappings({ companyID }) {
  const { fieldMappings, isFieldMappingsLoading } = useFieldMappings(companyID);
  const [maxRow, setMaxRow] = useState(0);
  const [form, setForm] = useState();
  const [buttonText, setButtonText] = useState();
  const [activeTab, setActiveTab] = useState('lead');
  const [leadInput, setLeadInput] = useState({});
  const [contactInput, setContactInput] = useState({});
  const [accountInput, setAccountInput] = useState({});
  const [candidateInput, setCandidateInput] = useState({});
  const [inputChange, setInputChange] = useState();
  const [searchItem, setSearchItem] = useState();
  const [references, setReferences] = useState(REFERENCES);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    if (form) {
      form.forEach((item) => {
        const value = fields?.[item?.bullhorn_endpoint]?.[item?.bullhorn_field];
        if (item.type === 'multi_select_dropdown') {
          if (item.bullhorn_endpoint === VIEWS.LEAD) {
            setLeadInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.split(';') : [],
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
            setContactInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.split(';') : [],
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
            setCandidateInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.split(';') : [],
            }));
          } else {
            setAccountInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.split(';') : [],
            }));
          }
        } else if (item.type === 'input_box') {
          const type = item.input_type;
          if (type === 'date') {
            if (item.bullhorn_endpoint === VIEWS.LEAD) {
              setLeadInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
              setCandidateInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
              setAccountInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            if (item.bullhorn_endpoint === VIEWS.LEAD) {
              setLeadInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
              setCandidateInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
              setAccountInput((prev) => ({
                ...prev,
                [item.bullhorn_field]:
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
            if (item.bullhorn_endpoint === VIEWS.LEAD) {
              setLeadInput((prev) => ({
                ...prev,
                [item.bullhorn_field]: value !== null ? value : '',
              }));
            } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
              setContactInput((prev) => ({
                ...prev,
                [item.bullhorn_field]: value !== null ? value : '',
              }));
            } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
              setCandidateInput((prev) => ({
                ...prev,
                [item.bullhorn_field]: value !== null ? value : '',
              }));
            } else {
              setAccountInput((prev) => ({
                ...prev,
                [item.bullhorn_field]: value !== null ? value : '',
              }));
            }
          }
        } else if (item.type === 'dropdown' && item.reference_field_name) {
          if (item.bullhorn_endpoint === VIEWS.LEAD) {
            setLeadInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.id : '',
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
            setContactInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.id : '',
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
            setCandidateInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.id : '',
            }));
          } else {
            setAccountInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value != null ? value.id : '',
            }));
          }
        } else {
          if (item.bullhorn_endpoint === VIEWS.LEAD) {
            setLeadInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value !== null ? value : '',
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CONTACT) {
            setContactInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value !== null ? value : '',
            }));
          } else if (item.bullhorn_endpoint === VIEWS.CANDIDATE) {
            setCandidateInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value !== null ? value : '',
            }));
          } else {
            setAccountInput((prev) => ({
              ...prev,
              [item.bullhorn_field]: value !== null ? value : '',
            }));
          }
        }
      });
    }
  }, [form, fields]);

  useEffect(() => {
    if (activeTab === 'lead') {
      if (fieldMappings?.lead_custom_object != null) {
        setForm(fieldMappings?.lead_custom_object[0].form);
        setButtonText(fieldMappings?.lead_custom_object[0].button_text);
      } else {
        setForm([]);
        setButtonText('Qualification');
      }
    } else if (activeTab === 'candidate') {
      if (fieldMappings?.candidate_custom_object != null) {
        setForm(fieldMappings?.candidate_custom_object[0].form);
        setButtonText(fieldMappings?.candidate_custom_object[0].button_text);
      } else {
        setForm([]);
        setButtonText('Qualification');
      }
    } else {
      if (fieldMappings?.contact_custom_object != null) {
        setForm(fieldMappings?.contact_custom_object[0].form);
        setButtonText(fieldMappings?.contact_custom_object[0].button_text);
      } else {
        setForm([]);
        setButtonText('Qualification');
      }
    }

    setLeadInput({});
    setContactInput({});
    setAccountInput({});
    setCandidateInput({});
  }, [activeTab, fieldMappings]);
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
            <Label>{item.bullhorn_label}</Label>
            <Input
              placeholder="Type here"
              type="textarea"
              height="70px"
              value={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? leadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? candidateInput
                  : accountInput
              }
              disabled={true}
              className={`${!item.editable && styles.disabled}`}
              setValue={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? setLeadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? setCandidateInput
                  : setAccountInput
              }
              name={item.bullhorn_field}
            />
          </>
        );
      case 'date':
        return (
          <>
            <Label>{item.bullhorn_label}</Label>
            <Input
              placeholder="Select Date"
              type="date"
              left={item.position.column === 2 && count === 3}
              value={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? leadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? candidateInput
                  : accountInput
              }
              className={`${!item.editable && styles.disabled}`}
              disabled={true}
              setValue={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? setLeadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? setCandidateInput
                  : setAccountInput
              }
              top={row > maxRow / 2 && maxRow / 2 >= 5}
              name={item.bullhorn_field}
            />
          </>
        );
      case 'datetime':
        return (
          <>
            <Label>{item.bullhorn_label}</Label>
            <Input
              placeholder={'Select Date and Time'}
              type="datetime"
              left={item.position.column === 2 && count === 3}
              value={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? leadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? candidateInput
                  : accountInput
              }
              disabled={true}
              setValue={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? setLeadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? setCandidateInput
                  : setAccountInput
              }
              name={item.bullhorn_field}
              className={`${!item.editable && styles.disabled}`}
            />
          </>
        );

      default:
        return (
          <>
            <Label>{item.bullhorn_label}</Label>
            <Input
              type={type}
              disabled={true}
              placeholder="Type here"
              value={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? leadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? contactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? candidateInput
                  : accountInput
              }
              setValue={
                item.bullhorn_endpoint === VIEWS.LEAD
                  ? setLeadInput
                  : item.bullhorn_endpoint === VIEWS.CONTACT
                  ? setContactInput
                  : item.bullhorn_endpoint === VIEWS.CANDIDATE
                  ? setCandidateInput
                  : setAccountInput
              }
              name={item.bullhorn_field}
              className={`${!item.editable && styles.disabled}`}
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
            width="580px"
          />
        </div>
      </div>
      <div className={styles.card}>
        <h1>{buttonText}</h1>

        <div className={`${styles.body}`}>
          {
            // loading ? (
            // 	<div>
            // 		<FormPlaceholder row={maxRow + 1} />
            // 	</div>
            // ) : (
            [...Array(maxRow + 1).keys()].map(
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
                                  {item.type === 'dropdown' &&
                                    !item.reference_to && (
                                      <>
                                        <Label>{item.bullhorn_label}</Label>
                                        <Select
                                          placeholder={'Select here'}
                                          value={
                                            item.bullhorn_endpoint ===
                                            VIEWS.LEAD
                                              ? leadInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ? contactInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ? candidateInput
                                              : accountInput
                                          }
                                          setValue={
                                            item.bullhorn_endpoint ===
                                            VIEWS.LEAD
                                              ? setLeadInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ? setContactInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ? setCandidateInput
                                              : setAccountInput
                                          }
                                          name={item.bullhorn_field}
                                          disabled={true}
                                          className={`${
                                            !item.editable && styles.disabled
                                          }`}
                                          menuOnTop={
                                            row === maxRow ? true : false
                                          }
                                          numberOfOptionsVisible="3"
                                          options={item.possible_values.map(
                                            (item) => ({
                                              label: item.label,
                                              value: item.value,
                                            })
                                          )}
                                        ></Select>
                                      </>
                                    )}
                                  {item.type === 'dropdown' &&
                                    item.reference_to && (
                                      <>
                                        <Label>{item.bullhorn_label}</Label>
                                        <Select
                                          placeholder={'Select here'}
                                          value={
                                            item.bullhorn_endpoint ===
                                            VIEWS.LEAD
                                              ? leadInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ? contactInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ? candidateInput
                                              : accountInput
                                          }
                                          setValue={
                                            item.bullhorn_endpoint ===
                                            VIEWS.LEAD
                                              ? setLeadInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ? setContactInput
                                              : item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ? setCandidateInput
                                              : setAccountInput
                                          }
                                          isLoading={
                                            searchItem?.bullhorn_field ===
                                              item?.bullhorn_field &&
                                            isFieldMappingsLoading
                                          }
                                          name={item.bullhorn_field}
                                          icon={
                                            <Search color={Colors.lightBlue} />
                                          }
                                          iconIsRotatable={false}
                                          disabled={true}
                                          background={
                                            !item.editable &&
                                            'rgb(250, 246, 246)'
                                          }
                                          menuOnTop={
                                            row === maxRow ? true : false
                                          }
                                          numberOfOptionsVisible="3"
                                          options={
                                            Array.isArray(
                                              references[
                                                item.bullhorn_endpoint
                                              ]?.[item.bullhorn_field]
                                            )
                                              ? references[
                                                  item.bullhorn_endpoint
                                                ]?.[item.bullhorn_field]?.map(
                                                  (obj) => ({
                                                    label:
                                                      obj[
                                                        item
                                                          .reference_field_name
                                                          .name
                                                      ],
                                                    value: obj.Id,
                                                  })
                                                )
                                              : Object.keys(
                                                  fields[item.bullhorn_endpoint]
                                                ).length !== 0 &&
                                                fields[item.bullhorn_endpoint][
                                                  item.bullhorn_field
                                                ] != null && [
                                                  {
                                                    label:
                                                      fields[
                                                        item.bullhorn_endpoint
                                                      ][item.bullhorn_field][
                                                        item
                                                          .reference_field_name
                                                          ?.name
                                                      ],
                                                    value:
                                                      fields[
                                                        item.bullhorn_endpoint
                                                      ][item.bullhorn_field].id,
                                                  },
                                                ]
                                          }
                                          onFocus={() => {
                                            setInputChange(
                                              fields[item.bullhorn_endpoint][
                                                item.bullhorn_field
                                              ]
                                                ? fields[
                                                    item.bullhorn_endpoint
                                                  ]?.[item.bullhorn_field]?.[
                                                    item.reference_field_name
                                                      ?.name
                                                  ]?.[0]
                                                : 'a'
                                            );
                                            setSearchItem(item);
                                          }}
                                          onInputChange={(input) =>
                                            input
                                              ? setInputChange(input)
                                              : setInputChange(
                                                  fields[
                                                    item.bullhorn_endpoint
                                                  ][item.bullhorn_field]
                                                    ? fields[
                                                        item.bullhorn_endpoint
                                                      ]?.[
                                                        item.bullhorn_field
                                                      ]?.[
                                                        item
                                                          .reference_field_name
                                                          ?.name
                                                      ]?.[0]
                                                    : 'a'
                                                )
                                          }
                                          isSearchable
                                          isClearable
                                        ></Select>
                                      </>
                                    )}
                                  {item.type === 'multi_select_dropdown' && (
                                    <>
                                      <Label>{item.bullhorn_label}</Label>
                                      <Select
                                        placeholder={'Select here'}
                                        disabled={true}
                                        value={
                                          item.bullhorn_endpoint === VIEWS.LEAD
                                            ? leadInput
                                            : item.bullhorn_endpoint ===
                                              VIEWS.CONTACT
                                            ? contactInput
                                            : item.bullhorn_endpoint ===
                                              VIEWS.CANDIDATE
                                            ? candidateInput
                                            : accountInput
                                        }
                                        setValue={
                                          item.bullhorn_endpoint === VIEWS.LEAD
                                            ? setLeadInput
                                            : item.bullhorn_endpoint ===
                                              VIEWS.CONTACT
                                            ? setContactInput
                                            : item.bullhorn_endpoint ===
                                              VIEWS.CANDIDATE
                                            ? setCandidateInput
                                            : setAccountInput
                                        }
                                        name={item.bullhorn_field}
                                        height="auto"
                                        menuOnTop={
                                          row === maxRow ? true : false
                                        }
                                        className={`${
                                          !item.editable && styles.disabled
                                        }`}
                                        numberOfOptionsVisible="3"
                                        options={item.possible_values.map(
                                          (item) => ({
                                            label: item.label,
                                            value: item.value,
                                          })
                                        )}
                                        isMulti
                                      ></Select>
                                    </>
                                  )}
                                  {item.type === 'radio_button' && (
                                    <div className={`${styles.radioBox}`}>
                                      <div className={styles.label}>
                                        {item.bullhorn_label}?
                                      </div>
                                      <div className={`${styles.btnBox}`}>
                                        <div className={styles.btn}>
                                          <InputRadio
                                            className={styles.radio}
                                            size="24"
                                            disabled={true}
                                            value={
                                              item.bullhorn_endpoint ===
                                              VIEWS.LEAD
                                                ? leadInput[item.bullhorn_field]
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CONTACT
                                                ? contactInput[
                                                    item.bullhorn_field
                                                  ]
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CANDIDATE
                                                ? candidateInput[
                                                    item.bullhorn_field
                                                  ]
                                                : accountInput[
                                                    item.bullhorn_field
                                                  ]
                                            }
                                            checked={
                                              item.bullhorn_endpoint ===
                                              VIEWS.LEAD
                                                ? leadInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? leadInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CONTACT
                                                ? contactInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? contactInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CANDIDATE
                                                ? candidateInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? candidateInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : accountInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                ? accountInput[
                                                    item.bullhorn_field
                                                  ]
                                                : false
                                            }
                                            onChange={() => {
                                              if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.LEAD
                                              ) {
                                                setLeadInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !leadInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ) {
                                                setContactInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !contactInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ) {
                                                setCandidateInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !candidateInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else {
                                                setAccountInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !accountInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              }
                                            }}
                                          />
                                          <div className={styles.btnLabel}>
                                            {
                                              COMMON_TRANSLATION
                                                .PROFILE_SETTING[
                                                user?.language?.toUpperCase()
                                              ]
                                            }
                                          </div>
                                        </div>
                                        <div className={styles.btn}>
                                          <InputRadio
                                            className={styles.radio}
                                            disabled={true}
                                            size="24"
                                            checked={
                                              item.bullhorn_endpoint ===
                                              VIEWS.LEAD
                                                ? leadInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? !leadInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CONTACT
                                                ? contactInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? !contactInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CANDIDATE
                                                ? candidateInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                  ? !candidateInput[
                                                      item.bullhorn_field
                                                    ]
                                                  : false
                                                : accountInput[
                                                    item.bullhorn_field
                                                  ] !== ''
                                                ? !accountInput[
                                                    item.bullhorn_field
                                                  ]
                                                : false
                                            }
                                            value={
                                              item.bullhorn_endpoint ===
                                              VIEWS.LEAD
                                                ? !leadInput[
                                                    item.bullhorn_field
                                                  ]
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CONTACT
                                                ? !contactInput[
                                                    item.bullhorn_field
                                                  ]
                                                : item.bullhorn_endpoint ===
                                                  VIEWS.CANDIDATE
                                                ? !candidateInput[
                                                    item.bullhorn_field
                                                  ]
                                                : !accountInput[
                                                    item.bullhorn_field
                                                  ]
                                            }
                                            onChange={() => {
                                              if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.LEAD
                                              ) {
                                                setLeadInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !leadInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.CONTACT
                                              ) {
                                                setContactInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !contactInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else if (
                                                item.bullhorn_endpoint ===
                                                VIEWS.CANDIDATE
                                              ) {
                                                setCandidateInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !candidateInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              } else {
                                                setAccountInput((prev) => ({
                                                  ...prev,
                                                  [item.bullhorn_field]:
                                                    !accountInput[
                                                      item.bullhorn_field
                                                    ],
                                                }));
                                              }
                                            }}
                                          />
                                          <div className={styles.btnLabel}>
                                            No
                                          </div>
                                        </div>
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
            )
          }
        </div>
      </div>
    </div>
  );
}

export default FieldMappings;
