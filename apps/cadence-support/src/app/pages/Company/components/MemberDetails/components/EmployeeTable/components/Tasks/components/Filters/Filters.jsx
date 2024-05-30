import { useState, useEffect } from 'react';
import styles from './Filters.module.scss';

//components
import { Button, Title, Tooltip } from '@cadence-support/components';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { DEFAULT_FILTER_OPTIONS } from './constants';
import {
  Call,
  Message,
  AtrManualEmail,
  Close,
  LinkedinConnection,
  LinkedinInteract,
  LinkedinMessage,
  LinkedinProfile,
  Reply,
  Wrench,
  DataCheck,
  Linkedin,
} from '@cadence-support/icons';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { ROLES } from '@cadence-support/constants';
import { useSettings, useTasks } from '@cadence-support/data-access';
import CadencesOverlay from './components/Cadences/Cadences';
import {
  FILTER_ENUMS_BACKEND,
  GenerateCompanyOptionsFromSfMap,
} from '@cadence-support/utils';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { Tasks as TASKS_TRANSLATION } from '@cadence-support/languages';
import { TASKS_FILTERS_REQUEST_VALUES } from 'libs/utils/src/lib/filterEnums';

//constants

const Filter = ({
  filters,
  setFilters,
  filtersCount,
  setFilterMode,
  memberID,
}) => {
  let user = useRecoilValue(userInfo);

  user = { ...user, language: 'english' };
  const { cadences } = useTasks({
    memberID: memberID,
    enabled: { tasks: false, cadences: true },
  });

  const handleMultiSelect = (ENUM, filterType) => {
    filters?.[filterType]?.includes(ENUM)
      ? setFilters((prev) => ({
          ...prev,
          [filterType]: prev?.[filterType].filter((f) => f !== ENUM),
        }))
      : setFilters((prev) => ({
          ...prev,
          [filterType]: [...prev?.[filterType], ENUM],
        }));
  };

  const [cadenceOverlay, setCadenceOverlay] = useState(false);

  const handleRadioSelect = (ENUM, filterType) => {
    filters?.task_type?.includes(ENUM)
      ? setFilters((prev) => ({
          ...prev,
          [filterType]: [ENUM],
        }))
      : setFilters((prev) => ({
          ...prev,
          [filterType]: [ENUM],
        }));
  };

  const decideTheme = (ENUM, filterType) => {
    return filters?.[filterType]?.includes(ENUM) ? styles.active : '';
  };

  const reset = (filterType) => {
    if (filterType === 'ALL') {
      setFilters(DEFAULT_FILTER_OPTIONS);
      // setUserId(false);
    }
    setFilters((prev) => ({
      ...prev,
      [filterType]: typeof prev[filterType] === 'boolean' ? false : [],
    }));
  };

  const checkFiltersLength = () => {
    if (filtersCount > 0) return true;
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <Title size="1rem" className={styles.heading}>
          {COMMON_TRANSLATION.FILTERS[user?.language?.toUpperCase()]}
        </Title>
        <div className={styles.right}>
          {checkFiltersLength() && (
            <div
              className={styles.resetAllButton}
              onClick={() => {
                reset('ALL');
              }}
            >
              {COMMON_TRANSLATION.RESET_ALL[user?.language?.toUpperCase()]}
            </div>
          )}
          <ThemedButton
            onClick={() => setFilterMode(null)}
            className={styles.closeBtn}
            theme={ThemedButtonThemes.ICON}
            width="1.7rem"
            height="1.7rem"
          >
            <Tooltip text="Close">
              <Close color={'#000'} />
            </Tooltip>
          </ThemedButton>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.filterType}>
          <div className={styles.taskType}>
            {TASKS_TRANSLATION.TASK_TYPE[user?.language?.toUpperCase()]}

            {filters[FILTER_ENUMS_BACKEND.TASK_TYPE].length > 0 && (
              <div
                className={styles.resetButton}
                onClick={() => {
                  reset(FILTER_ENUMS_BACKEND.TASK_TYPE);
                }}
              >
                {COMMON_TRANSLATION.RESET[user?.language?.toUpperCase()]}
              </div>
            )}
          </div>
          <div className={styles.filterOptions}>
            <ThemedButton
              onClick={() =>
                handleRadioSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_TYPE_CREATED_BY,
                  FILTER_ENUMS_BACKEND.TASK_TYPE
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_TYPE_CREATED_BY,
                FILTER_ENUMS_BACKEND.TASK_TYPE
              )}
            >
              Created by a Cadence
            </ThemedButton>
            <ThemedButton
              onClick={() =>
                handleRadioSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_TYPE_CUSTOM,
                  FILTER_ENUMS_BACKEND.TASK_TYPE
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_TYPE_CUSTOM,
                FILTER_ENUMS_BACKEND.TASK_TYPE
              )}
            >
              Custom
            </ThemedButton>
          </div>
        </div>

        <div className={styles.filterType}>
          <div className={styles.taskType}>
            {TASKS_TRANSLATION.TASK_ACTION[user?.language?.toUpperCase()]}

            {filters[FILTER_ENUMS_BACKEND.TASK_ACTION].length > 0 && (
              <div
                className={styles.resetButton}
                onClick={() => {
                  reset(FILTER_ENUMS_BACKEND.TASK_ACTION);
                }}
              >
                {COMMON_TRANSLATION.RESET[user?.language?.toUpperCase()]}
              </div>
            )}
          </div>
          <div className={styles.filterOptions}>
            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_CALL,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_CALL,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Call /> Call
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_EMAIL,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_EMAIL,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <AtrManualEmail />
              Email
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_SMS,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_SMS,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Message /> SMS
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_CONNECTION,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_CONNECTION,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Linkedin /> Linkedin Connection
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_INTERACT,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_INTERACT,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Linkedin /> Linkedin Interact
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_MESSAGE,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_MESSAGE,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Linkedin /> Linkedin Message
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_PROFILE,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_LINKEDIN_PROFILE,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Linkedin /> Linkedin Profile
            </ThemedButton>

            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_CADENCE_CUSTOM,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_CADENCE_CUSTOM,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <Wrench /> Custom
            </ThemedButton>
            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_DATA_CHECK,
                  FILTER_ENUMS_BACKEND.TASK_ACTION
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_ACTION_DATA_CHECK,
                FILTER_ENUMS_BACKEND.TASK_ACTION
              )}
            >
              <DataCheck /> Data Check
            </ThemedButton>
          </div>
        </div>

        <div className={styles.filterType}>
          <div className={styles.taskType}>
            Task Status
            {filters[FILTER_ENUMS_BACKEND.TASK_STATUS].length > 0 && (
              <div
                className={styles.resetButton}
                onClick={() => {
                  reset(FILTER_ENUMS_BACKEND.TASK_STATUS);
                }}
              >
                {COMMON_TRANSLATION.RESET[user?.language?.toUpperCase()]}
              </div>
            )}
          </div>
          <div className={styles.filterOptions}>
            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_LATE,
                  FILTER_ENUMS_BACKEND.TASK_STATUS
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_LATE,
                FILTER_ENUMS_BACKEND.TASK_STATUS
              )}
            >
              Late
            </ThemedButton>
            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_URGENT,
                  FILTER_ENUMS_BACKEND.TASK_STATUS
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_URGENT,
                FILTER_ENUMS_BACKEND.TASK_STATUS
              )}
            >
              Urgent
            </ThemedButton>
            <ThemedButton
              onClick={() =>
                handleMultiSelect(
                  TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_DONE,
                  FILTER_ENUMS_BACKEND.TASK_STATUS
                )
              }
              theme={ThemedButtonThemes.GREY}
              className={decideTheme(
                TASKS_FILTERS_REQUEST_VALUES.TASK_STATUS_DONE,
                FILTER_ENUMS_BACKEND.TASK_STATUS
              )}
            >
              Done
            </ThemedButton>
          </div>
        </div>

        <div className={styles.filterType}>
          {cadences?.length > 0 && (
            <div className={styles.taskType}>
              Cadence
              {filters[FILTER_ENUMS_BACKEND.TASK_CADENCES]?.length > 0 && (
                <div
                  className={styles.resetButton}
                  onClick={() => {
                    reset(FILTER_ENUMS_BACKEND.TASK_CADENCES);
                  }}
                >
                  {COMMON_TRANSLATION.RESET[user?.language?.toUpperCase()]}
                </div>
              )}
            </div>
          )}
          <div className={styles.filterOptions}>
            {cadences
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.slice(0, 2)
              ?.map((cadence) => (
                <ThemedButton
                  onClick={() =>
                    handleMultiSelect(
                      cadence.cadence_id + '',
                      FILTER_ENUMS_BACKEND.TASK_CADENCES
                    )
                  }
                  theme={ThemedButtonThemes.GREY}
                  className={
                    filters?.['task_cadences']?.includes(
                      cadence.cadence_id + ''
                    )
                      ? styles.active
                      : ''
                  }
                  title={cadence.name.length > 15 && cadence.name}
                >
                  {cadence.name.length > 15
                    ? `${cadence.name.slice(0, 15)}...`
                    : cadence.name}
                </ThemedButton>
              ))}

            {cadences?.length > 2 && (
              <ThemedButton
                onClick={() => setCadenceOverlay(true)}
                theme={ThemedButtonThemes.GREY}
                className={
                  cadences
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    ?.slice(2)
                    ?.map((c) => c.cadence_id)
                    ?.some((value) => filters.task_cadences?.includes(value))
                    ? styles.active
                    : ''
                }
              >
                + {cadences?.length - 2} more
              </ThemedButton>
            )}
          </div>
        </div>
      </div>

      <CadencesOverlay
        open={cadenceOverlay}
        setOpen={setCadenceOverlay}
        filters={filters}
        cadences={cadences}
        handleMultiSelect={handleMultiSelect}
      />
    </div>
  );
};

export default Filter;
