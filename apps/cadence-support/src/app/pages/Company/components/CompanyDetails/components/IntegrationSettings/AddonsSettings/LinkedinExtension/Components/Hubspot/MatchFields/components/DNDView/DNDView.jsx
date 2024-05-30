import { useState, useEffect, useContext } from 'react';
import styles from './DNDview.module.scss';
import { TabNavSlider } from '@cadence-support/widgets';
import { TabNavThemes } from '@cadence-support/themes';
import { CONTACT_COMPANY } from './constants';
import {
  DEFAULT_SF_FIELDS_STRUCT,
  RINGOVER_FIELDS,
  VIEWS,
} from '../../constants';
import RingoverFields from './components/RingoverFields/RingoverFields';
import {
  fetchFieldmappingFields,
  useLinkedinFieldmapping,
} from '@cadence-support/data-access';
import { ParseRingoverFields } from '../../utils';
import { MessageContext } from '@cadence-support/context';
import HubspotFields from './components/HubspotFields/HubspotFields';

const DNDView = ({
  currentView,
  setCurrentView,
  ringoverFields,
  setRingoverFields,
  integrationType,
  companyID,
  setIsSlider,
  isSlider,
}) => {
  const {
    contactFields,
    iscontactfieldsLoading,
    companyFields,
    iscompanyfieldsLoading,
  } = fetchFieldmappingFields(companyID, integrationType);

  const { addError } = useContext(MessageContext);

  const { linkedinData, isdataLoading } = useLinkedinFieldmapping(companyID);

  const [originalSFFields, setOriginalSFFields] = useState(
    DEFAULT_SF_FIELDS_STRUCT
  );
  const [availableSFFields, setAvailableSFFields] = useState(
    DEFAULT_SF_FIELDS_STRUCT
  );
  const [originalRingoverFieldsResponse, setOriginalRingoverFieldsResponse] =
    useState(null);

  useEffect(() => {
    fetchSFFields();
  }, []);

  useEffect(() => {
    if (currentView === VIEWS.CONTACT || currentView === VIEWS.COMPANY) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
  }, [currentView]);

  useEffect(() => {
    setAvailableSFFields({
      [VIEWS.COMPANY]: originalSFFields[VIEWS.COMPANY]?.filter(
        (item) =>
          ringoverFields[VIEWS.COMPANY]?.filter(
            (field) => field.value?.name === item.name
          ).length === 0
      ),
      [VIEWS.CONTACT]: originalSFFields[VIEWS.CONTACT]?.filter(
        (item) =>
          ringoverFields[VIEWS.CONTACT]?.filter(
            (field) => field.value?.name === item.name
          ).length === 0
      ),
    });
  }, [ringoverFields, originalSFFields]);

  useEffect(() => {
    //fetch all ringoverFields and SF Fields ||| P.S emails,phoneNumbers array to be converted to diff fields  ||Unparse Fn
    if (linkedinData) {
      setOriginalRingoverFieldsResponse(linkedinData);
      setRingoverFields(ParseRingoverFields(linkedinData));
    }
  }, [linkedinData]);

  const setDefaultFieldsWhileOnboarding = (itFieldsFromServer, view) => {
    // if (
    // 	!window.location.pathname.includes("onboarding") ||
    // 	localStorage.getItem(LOCAL_STORAGE_KEYS.FIELD_MAP_DEFAULT_SET)
    // )
    // 	return;
    let defaultFields = [];
    itFieldsFromServer.forEach((sf) => {
      if (Object.values(DEFAULT_VALUES[view]).includes(sf.name))
        defaultFields.push(sf);
    });
    setRingoverFields((prev) => ({
      ...prev,
      [view]: prev[view].map((f) => {
        if (
          Object.keys(DEFAULT_VALUES[view]).includes(f.uid) &&
          defaultFields.find((df) => df.name === DEFAULT_VALUES[view][f.uid])
        ) {
          f.value = defaultFields.find(
            (df) => df.name === DEFAULT_VALUES[view][f.uid]
          );
        }
        return f;
      }),
    }));
  };

  const fetchSFFields = () => {
    contactFields(VIEWS.CONTACT, {
      onSuccess: (sfFieldsFromServer) => {
        // setDefaultFieldsWhileOnboarding(sfFieldsFromServer, VIEWS.CONTACT);
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.CONTACT]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
      onError: () => addError('Make sure you have signed in with Hubspot'),
    });
    companyFields(VIEWS.COMPANY, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.COMPANY]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });
  };

  return (
    <div className={styles.DNDView}>
      {(currentView === VIEWS.CONTACT || currentView === VIEWS.COMPANY) && (
        <div className={styles.header}>
          <TabNavSlider
            theme={TabNavThemes.SLIDER}
            buttons={CONTACT_COMPANY.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
            value={currentView}
            setValue={setCurrentView}
            activeBtnClassName={styles.activeTab}
            btnClassName={styles.tabBtn}
            width="250px"
          />
        </div>
      )}

      <div className={styles.body}>
        <RingoverFields
          fields={ringoverFields[currentView]}
          setFields={(val) => {
            setRingoverFields((prev) => ({
              ...prev,
              [currentView]: val,
            }));
          }}
          loading={
            iscompanyfieldsLoading || iscontactfieldsLoading || isdataLoading
          }
          currentView={currentView}
          integrationType={integrationType}
          // copyFieldsFromFieldMap={copyFieldsFromFieldMap}
          originalSFFieldsForCurrentView={originalSFFields[currentView]}
        />
        <HubspotFields
          availableSFFields={availableSFFields[currentView]}
          loading={
            iscompanyfieldsLoading || iscontactfieldsLoading || isdataLoading
          }
        />
      </div>
    </div>
  );
};

export default DNDView;
