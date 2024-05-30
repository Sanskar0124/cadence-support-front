import { useState, useEffect, useContext } from 'react';
import styles from './DNDview.module.scss';
import { TabNavSlider } from '@cadence-support/widgets';
import { TabNavThemes } from '@cadence-support/themes';
import {
  AVAILABLE_SF_FIELDS,
  CONTACT_ACCOUNT,
  LEAD_ACCOUNT,
} from './constants';
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
import BullhornFields from './components/BullhornFields/BullhornFields';

const DNDView = ({
  currentView,
  setCurrentView,
  ringoverFields,
  setRingoverFields,
  integrationType,
  companyID,
  prevCurrentView,
  setPreviousCurrentView,
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
    candidateFields,
    iscandidatefieldsLoading,
  } = fetchFieldmappingFields(companyID, integrationType);

  const { linkedinData, isdataLoading } = useLinkedinFieldmapping(companyID);

  const [originalSFFields, setOriginalSFFields] = useState(
    DEFAULT_SF_FIELDS_STRUCT
  );
  const [availableSFFields, setAvailableSFFields] = useState(
    DEFAULT_SF_FIELDS_STRUCT
  );
  const { addError, addSuccess } = useContext(MessageContext);
  const [originalRingoverFieldsResponse, setOriginalRingoverFieldsResponse] =
    useState(null);

  useEffect(() => {
    fetchSFFields();
  }, []);

  useEffect(() => {
    if (
      currentView === VIEWS.CONTACT ||
      currentView === VIEWS.ACCOUNT ||
      currentView === VIEWS.LEAD
    ) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
  }, [currentView]);

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
      [VIEWS.CANDIDATE]: originalSFFields[VIEWS.CANDIDATE]?.filter(
        (item) =>
          ringoverFields[VIEWS.CANDIDATE]?.filter(
            (field) => field.value.name === item.name
          ).length === 0
      ),
    });
  }, [ringoverFields, originalSFFields]);

  const setDefaultFieldsWhileOnboarding = (sfFieldsFromServer, view) => {
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
        setDefaultFieldsWhileOnboarding(sfFieldsFromServer, VIEWS.LEAD);
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.LEAD]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
      onError: () => addError('Make sure you have signed in with bullhorn'),
    });

    contactFields(VIEWS.CONTACT, {
      onSuccess: (sfFieldsFromServer) => {
        setDefaultFieldsWhileOnboarding(sfFieldsFromServer, VIEWS.CONTACT);
        // console.log(sfFieldsFromServer, 'contact field');
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
        setDefaultFieldsWhileOnboarding(sfFieldsFromServer, VIEWS.ACCOUNT);
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.ACCOUNT]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });
    candidateFields(VIEWS.CANDIDATE, {
      onSuccess: (sfFieldsFromServer) => {
        setDefaultFieldsWhileOnboarding(sfFieldsFromServer, VIEWS.CANDIDATE);
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.CANDIDATE]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });
  };

  const changeCurrentView = (value) => {
    setPreviousCurrentView(currentView);
    setCurrentView(value);
  };

  return (
    <div className={styles.DNDView}>
      {(currentView === VIEWS.CONTACT ||
        currentView === VIEWS.ACCOUNT ||
        currentView === VIEWS.LEAD) && (
        <div className={styles.header}>
          <TabNavSlider
            theme={TabNavThemes.SLIDER}
            buttons={
              currentView === VIEWS.LEAD
                ? LEAD_ACCOUNT
                : currentView === VIEWS.CONTACT
                ? CONTACT_ACCOUNT
                : currentView === VIEWS.ACCOUNT &&
                  prevCurrentView === VIEWS.LEAD
                ? LEAD_ACCOUNT
                : currentView === VIEWS.ACCOUNT &&
                  prevCurrentView === VIEWS.CONTACT
                ? CONTACT_ACCOUNT
                : LEAD_ACCOUNT
            }
            //buttons={LEAD_ACCOUNT}
            value={currentView}
            setValue={changeCurrentView}
            activeBtnClassName={styles.activeTab}
            btnClassName={styles.tabBtn}
            width="210px"
            noAnimation
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
            iscandidatefieldsLoading ||
            isdataLoading
          }
          currentView={currentView}
          integrationType={integrationType}
          originalSFFieldsForCurrentView={originalSFFields[currentView]}
        />
        <BullhornFields
          loading={
            isleadfieldsLoading ||
            isaccountfieldsLoading ||
            iscontactfieldsLoading ||
            iscandidatefieldsLoading ||
            isdataLoading
          }
          availableSFFields={availableSFFields[currentView]}
        />
      </div>
    </div>
  );
};

export default DNDView;
