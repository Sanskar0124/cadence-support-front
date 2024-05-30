import { useState, useEffect, useContext } from 'react';
import styles from './DNDview.module.scss';
import { TabNavSlider } from '@cadence-support/widgets';
import { TabNavThemes } from '@cadence-support/themes';
import { PERSON_ORGANIZATION } from './constants';
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
import PipedriveFields from './components/PipedriveFields/PipedriveFields';

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
    personFields,
    ispersonfieldsLoading,
    organizationFields,
    isorganizationfieldsLoading,
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
    if (currentView === VIEWS.PERSON || currentView === VIEWS.ORGANIZATION) {
      setIsSlider(true);
    } else {
      setIsSlider(false);
    }
  }, [currentView]);

  useEffect(() => {
    setAvailableSFFields({
      [VIEWS.ORGANIZATION]: originalSFFields[VIEWS.ORGANIZATION]?.filter(
        (item) =>
          ringoverFields[VIEWS.ORGANIZATION]?.filter(
            (field) => field.value?.name === item.name
          ).length === 0
      ),
      [VIEWS.PERSON]: originalSFFields[VIEWS.PERSON]?.filter(
        (item) =>
          ringoverFields[VIEWS.PERSON]?.filter(
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

  const fetchSFFields = () => {
    personFields(VIEWS.PERSON, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.PERSON]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
    });
    organizationFields(VIEWS.ORGANIZATION, {
      onSuccess: (sfFieldsFromServer) => {
        setOriginalSFFields((prev) => ({
          ...prev,
          [VIEWS.ORGANIZATION]: sfFieldsFromServer
            ?.sort((a, b) => a.label.localeCompare(b.label))
            ?.map((field, i) => ({ index: i, ...field })), //will have name, type, picklistVlaues(conditionally)
        }));
      },
      onError: () => addError('Make sure you have signed in with pipedrive'),
    });
  };

  return (
    <div className={styles.DNDView}>
      {(currentView === VIEWS.PERSON || currentView === VIEWS.ORGANIZATION) && (
        <div className={styles.header}>
          <TabNavSlider
            theme={TabNavThemes.SLIDER}
            buttons={PERSON_ORGANIZATION.map((opt) => ({
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
            ispersonfieldsLoading ||
            isorganizationfieldsLoading ||
            isdataLoading
          }
          currentView={currentView}
          integrationType={integrationType}
          originalSFFieldsForCurrentView={originalSFFields[currentView]}
        />
        <PipedriveFields
          availableSFFields={availableSFFields[currentView]}
          loading={
            ispersonfieldsLoading ||
            isorganizationfieldsLoading ||
            isdataLoading
          }
        />
      </div>
    </div>
  );
};

export default DNDView;
