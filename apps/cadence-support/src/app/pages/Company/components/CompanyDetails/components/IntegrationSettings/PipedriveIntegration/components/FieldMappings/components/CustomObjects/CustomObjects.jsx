import styles from './CustomObjects.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';
import { Input, Label, Select, TabNavSlider } from '@cadence-support/widgets';
import { useEffect, useState } from 'react';
import { TabNavThemes } from '@cadence-support/themes';
import moment from 'moment';

const TABS = [{ label: 'Person', value: 'person' }];

export const PHONE_OPTIONS = [
  {
    label: 'Home',
    value: 'home',
  },
  {
    label: 'Work',
    value: 'work',
  },
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
export const EMAIL_OPTIONS = [
  {
    label: 'Home',
    value: 'home',
  },
  {
    label: 'Work',
    value: 'work',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const VIEWS = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
  CUSTOM_OBJECTS: 'custom_objects',
};
export const CUSTOM_OBJECT = {
  [VIEWS.PERSON]: [],
};

export const REFERENCES = {
  [VIEWS.PERSON]: {},
  [VIEWS.ORGANIZATION]: {},
};

export const fields = {
  [VIEWS.PERSON]: {},
  [VIEWS.ORGANIZATION]: {},
};

function FieldMappings({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const [maxRow, setMaxRow] = useState(0);
  const [form, setForm] = useState();
  const [buttonText, setButtonText] = useState();
  const [activeTab, setActiveTab] = useState('person');
  const [personInput, setPersonInput] = useState({});
  const [organizationInput, setOrganizationInput] = useState({});

  useEffect(() => {
    if (form) {
      form.forEach((item) => {
        const value = fields[item.pipedrive_endpoint][item.pipedrive_field];
        if (item.type === 'multi_select_dropdown') {
          setPersonInput((prev) => ({
            ...prev,
            [item.pipedrive_field]: value != null ? value.split(';') : [],
          }));
        } else if (item.type === 'input_box') {
          const type = item.input_type;
          if (type === 'date') {
            setPersonInput((prev) => ({
              ...prev,
              [item.pipedrive_field]:
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
          } else if (type === 'datetime') {
            setPersonInput((prev) => ({
              ...prev,
              [item.pipedrive_field]:
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
            setPersonInput((prev) => ({
              ...prev,
              [item.pipedrive_field]: value !== null ? value : '',
            }));
          }
        } else if (item.type === 'dropdown' && item.reference_field_name) {
          setPersonInput((prev) => ({
            ...prev,
            [item.pipedrive_field]: value != null ? value.id : '',
          }));
        } else {
          setPersonInput((prev) => ({
            ...prev,
            [item.pipedrive_field]: value !== null ? value : '',
          }));
        }
      });
    }
  }, [form, fields]);

  useEffect(() => {
    if (fieldMappings?.person_custom_object != null) {
      setForm(fieldMappings?.person_custom_object[0].form);
      setButtonText(fieldMappings?.person_custom_object[0].button_text);
    } else {
      setForm([]);
      setButtonText('Qualification');
    }
    // }

    setPersonInput({});
    setOrganizationInput({});
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
      case 'int':
        return (
          <>
            <Label>{item.pipedrive_label}</Label>
            <Input
              type={'number'}
              disabled={true}
              placeholder="Type here"
              value={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? personInput
                  : organizationInput
              }
              setValue={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? setPersonInput
                  : setOrganizationInput
              }
              name={item.pipedrive_field}
              className={`${styles.intInput} ${
                !item.editable && styles.disabled
              }`}
            />
          </>
        );
      case 'double':
        return (
          <>
            <Label>{item.pipedrive_label}</Label>
            <Input
              type={'number'}
              disabled={true}
              placeholder="Type here"
              value={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? personInput
                  : organizationInput
              }
              setValue={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? setPersonInput
                  : setOrganizationInput
              }
              name={item.pipedrive_field}
              className={`${styles.intInput} ${
                !item.editable && styles.disabled
              }`}
            />
          </>
        );
      case 'date':
        return (
          <>
            <Label>{item.pipedrive_label}</Label>
            <Input
              placeholder={'Select Date and Time'}
              type="datetime"
              left={item.position.column === 2 && count === 3}
              value={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? personInput
                  : organizationInput
              }
              disabled={true}
              setValue={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? setPersonInput
                  : setOrganizationInput
              }
              name={item.pipedrive_field}
              className={`${!item.editable && styles.disabled}`}
            />
          </>
        );

      default:
        return (
          <>
            <Label>{item.pipedrive_label}</Label>
            <Input
              type={type}
              disabled={true}
              placeholder="Type here"
              value={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? personInput
                  : organizationInput
              }
              setValue={
                item.pipedrive_endpoint === VIEWS.PERSON
                  ? setPersonInput
                  : setOrganizationInput
              }
              name={item.pipedrive_field}
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
            width="200px"
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
                                    <Label>{item.pipedrive_label}</Label>
                                    <Select
                                      placeholder={'Select here'}
                                      value={
                                        item.pipedrive_endpoint === VIEWS.PERSON
                                          ? personInput
                                          : organizationInput
                                      }
                                      setValue={
                                        item.pipedrive_endpoint === VIEWS.PERSON
                                          ? setPersonInput
                                          : setOrganizationInput
                                      }
                                      name={item.pipedrive_field}
                                      disabled={true}
                                      className={`${
                                        !item.editable && styles.disabled
                                      }`}
                                      menuOnTop={row === maxRow ? true : false}
                                      numberOfOptionsVisible="3"
                                      options={item.possible_values.map(
                                        (item) => ({
                                          label: item.label,
                                          value: item.id,
                                        })
                                      )}
                                    ></Select>
                                  </>
                                )}
                                {item.type === 'input_select' && (
                                  <>
                                    <Label>{item.pipedrive_label}</Label>

                                    <div className={styles.inputSelectBox}>
                                      {item.pipedrive_endpoint ===
                                      VIEWS.PERSON ? (
                                        <div className={styles.current}>
                                          <div className={styles.inputBox}>
                                            <Input
                                              placeholder="Type here"
                                              disabled={true}
                                              // value={inp?.value}
                                              name={item.pipedrive_field}
                                              className={`${
                                                styles.inputSelect
                                              } ${
                                                !item.editable &&
                                                styles.disabled
                                              }`}
                                            />
                                          </div>
                                          <div className={styles.selectBox}>
                                            <Select
                                              placeholder={'Select here'}
                                              borderRadius={'0 15px 15px 0'}
                                              options={
                                                item?.input_type === 'phone'
                                                  ? PHONE_OPTIONS
                                                  : EMAIL_OPTIONS
                                              }
                                              disabled={true}
                                              // value={inp.label}
                                            ></Select>
                                          </div>
                                        </div>
                                      ) : (
                                        organizationInput[
                                          item.pipedrive_field
                                        ]?.map((inp, key) => {
                                          return (
                                            <div className={styles.current}>
                                              <div className={styles.inputBox}>
                                                <Input
                                                  placeholder="Type here"
                                                  disabled={true}
                                                  value={inp?.value}
                                                  setValue={(val) => {
                                                    setPersonInput((prev) => ({
                                                      ...prev,
                                                      [item.pipedrive_field]:
                                                        prev[
                                                          item.pipedrive_field
                                                        ]?.map((i, k) => {
                                                          if (k === key) {
                                                            return {
                                                              ...i,
                                                              value: val,
                                                            };
                                                          } else {
                                                            return i;
                                                          }
                                                        }),
                                                    }));
                                                  }}
                                                  name={item.pipedrive_field}
                                                  className={`${
                                                    styles.inputSelect
                                                  } ${
                                                    !item.editable &&
                                                    styles.disabled
                                                  }`}
                                                />
                                              </div>
                                              <div className={styles.selectBox}>
                                                <Select
                                                  placeholder={'Select here'}
                                                  borderRadius={'0 15px 15px 0'}
                                                  options={
                                                    item?.input_type === 'phone'
                                                      ? PHONE_OPTIONS
                                                      : EMAIL_OPTIONS
                                                  }
                                                  value={inp.label}
                                                  disabled={true}
                                                ></Select>
                                              </div>
                                            </div>
                                          );
                                        })
                                      )}
                                    </div>
                                  </>
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
