import { useState, useEffect, useContext } from 'react';
import styles from './DNDview.module.scss';
import { TabNavSlider } from '@cadence-support/widgets';
import { TabNavThemes } from '@cadence-support/themes';
import { AVAILABLE_SF_FIELDS, CONTACT_ACCOUNT } from './constants';
import {
  DEFAULT_SF_FIELDS_STRUCT,
  RINGOVER_FIELDS,
  VIEWS,
} from '../../constants';
import RingoverFields from './components/RingoverFields/RingoverFields';
import { ParseRingoverFields } from '../../utils';
import {
  fetchFieldmappingFields,
  useLinkedinFieldmapping,
} from '@cadence-support/data-access';
import { MessageContext } from '@cadence-support/context';
import ZohoFields from './components/ZohoFields/ZohoFields';

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
    accountFields,
    isaccountfieldsLoading,
    leadFields,
    isleadfieldsLoading,
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
    setAvailableSFFields({
      [VIEWS.ACCOUNT]: originalSFFields[VIEWS.ACCOUNT].filter(
        (item) =>
          ringoverFields[VIEWS.ACCOUNT].filter(
            (field) => field.value.name === item.name
          ).length === 0
      ),
      [VIEWS.CONTACT]: originalSFFields[VIEWS.CONTACT].filter(
        (item) =>
          ringoverFields[VIEWS.CONTACT].filter(
            (field) => field.value.name === item.name
          ).length === 0
      ),
      [VIEWS.LEAD]: originalSFFields[VIEWS.LEAD].filter(
        (item) =>
          ringoverFields[VIEWS.LEAD].filter(
            (field) => field.value.name === item.name
          ).length === 0
      ),
    });
  }, [ringoverFields, originalSFFields]);

  useEffect(() => {
    if (linkedinData) {
      setOriginalRingoverFieldsResponse(linkedinData);
      setRingoverFields(ParseRingoverFields(linkedinData));
    }
  }, [linkedinData]);

  useEffect(() => {
    if (currentView === VIEWS.CONTACT || currentView === VIEWS.ACCOUNT) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
  }, [currentView]);

  const setDefaultFieldsWhileOnboarding = (sfFieldsFromServer, view) => {
    // if (
    // 	!window.location.pathname.includes("onboarding") ||
    // 	localStorage.getItem(LOCAL_STORAGE_KEYS.FIELD_MAP_DEFAULT_SET)
    // )
    // 	return;
    let defaultFields = [];

    sfFieldsFromServer.forEach((sf) => {
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
    leadFields(VIEWS.LEAD, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.LEAD]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
      onError: () => addError('Make sure you have signed in with Zoho'),
    });

    contactFields(VIEWS.CONTACT, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.CONTACT]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });

    accountFields(VIEWS.ACCOUNT, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.ACCOUNT]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });
  };

  return (
    <div className={styles.DNDView}>
      {(currentView === VIEWS.CONTACT || currentView === VIEWS.ACCOUNT) && (
        <div className={styles.header}>
          <TabNavSlider
            theme={TabNavThemes.SLIDER}
            buttons={CONTACT_ACCOUNT}
            value={currentView}
            setValue={setCurrentView}
            activeBtnClassName={styles.activeTab}
            btnClassName={styles.tabBtn}
            width="210px"
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
            isleadfieldsLoading ||
            isaccountfieldsLoading ||
            iscontactfieldsLoading ||
            isdataLoading
          }
          currentView={currentView}
          integrationType={integrationType}
          originalSFFieldsForCurrentView={originalSFFields[currentView]}
        />
        <ZohoFields
          loading={
            isleadfieldsLoading ||
            isaccountfieldsLoading ||
            iscontactfieldsLoading ||
            isdataLoading
          }
          availableSFFields={availableSFFields[currentView]}
        />
      </div>
    </div>
  );
};

export default DNDView;
