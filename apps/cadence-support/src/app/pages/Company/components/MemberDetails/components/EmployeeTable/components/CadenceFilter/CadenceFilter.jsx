import { useState, useEffect } from 'react';

//components
import { Title } from '@cadence-support/components';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { Close } from '@cadence-support/icons';

//constants
import {
  CADENCE_TYPES,
  CADENCE_FILTER_DEFAULTS,
} from '@cadence-support/constants';
import { CADENCE_STATUS_ENUMS } from './constants';

import styles from './CadenceFilter.module.scss';

import { Cadence as CADENCE_TRANSLATION } from '@cadence-support/languages';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';

import UserAndGroup from './components/UserAndGroup/UserAndGroup';

const CadenceFilter = ({ filters, setFilters, setFilterMode, memberID }) => {
  const [usersAndGroups, setUsersAndGroups] = useState(false);

  const language = 'english';

  const textFilter = COMMON_TRANSLATION.FILTERS['ENGLISH'];

  const handleRadioSelect = (ENUM, filterType) => {
    if (filters?.[filterType] === ENUM)
      setFilters((prev) => ({ ...prev, [filterType]: '' }));
    else
      setFilters((prev) => ({
        ...prev,
        [filterType]: ENUM,
      }));
  };

  const reset = (filterType) => {
    if (filterType === 'ALL') {
      setFilters(CADENCE_FILTER_DEFAULTS);
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [filterType]: typeof prev[filterType] === 'boolean' ? false : '',
    }));
  };

  const decideTheme = (ENUM, filterType) => {
    return filters?.[filterType] == ENUM ? styles.active : '';
  };

  const onClose = () => {
    setFilterMode(null);
  };
  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <Title size="14px" className={styles.heading}>
          {`${textFilter}`.slice(0, 1).toUpperCase() + `${textFilter}`.slice(1)}
        </Title>

        <ThemedButton
          onClick={onClose}
          className={styles.closeBtn}
          theme={ThemedButtonThemes.ICON}
        >
          <Close color={'#000'} />
        </ThemedButton>
      </div>
      <div className={styles.body}>
        {/* <div className={styles.filterType}>
          <div className={styles.taskType}>Created By</div>{' '}
          {filters.created_by && (
            <div
              className={styles.resetButton}
              onClick={() => {
                reset('created_by');
              }}
            >
              Reset
            </div>
          )}
          <div className={styles.filterOptions}>
            <ThemedButton
              width="fit-content"
              onClick={() => setUsersAndGroups(true)}
              theme={ThemedButtonThemes.GREY}
              className={filters.created_by ? styles.active : ''}
            >
              Select user
            </ThemedButton>
          </div>
        </div> */}

        <div className={styles.filterType}>
          <div className={styles.taskType}>Cadence type</div>{' '}
          {filters['type'].length !== 0 && (
            <div
              className={styles.resetButton}
              onClick={() => {
                reset('type');
              }}
            >
              {COMMON_TRANSLATION.RESET[language?.toUpperCase()]}
            </div>
          )}
          <div className={styles.filterOptions}>
            {Object.keys(CADENCE_TYPES).map((key) => (
              <ThemedButton
                width="fit-content"
                onClick={() => handleRadioSelect(key.toLowerCase(), 'type')}
                theme={ThemedButtonThemes.GREY}
                className={decideTheme(key.toLowerCase(), 'type')}
              >
                {CADENCE_TYPES[key]}
              </ThemedButton>
            ))}
          </div>
        </div>

        {/* <div className={styles.filterType}>
          <div className={styles.taskType}>Cadence Status</div>{' '}
          {filters['status'] && (
            <div
              className={styles.resetButton}
              onClick={() => {
                reset('status');
              }}
            >
              {COMMON_TRANSLATION.RESET[language?.toUpperCase()]}
            </div>
          )}
          <div className={styles.filterOptions}>
            {Object.keys(CADENCE_STATUS_ENUMS).map((key) => (
              <ThemedButton
                width="fit-content"
                onClick={() => handleRadioSelect(key.toLowerCase(), 'status')}
                theme={ThemedButtonThemes.GREY}
                className={decideTheme(key.toLowerCase(), 'status')}
              >
                {CADENCE_STATUS_ENUMS[key][language?.toUpperCase()]}
              </ThemedButton>
            ))}
          </div>
        </div> */}
      </div>
      <UserAndGroup
        open={usersAndGroups}
        setOpen={setUsersAndGroups}
        filters={filters}
        setFilters={setFilters}
        resetFilter={reset}
        memberID={memberID}
      />
    </div>
  );
};

export default CadenceFilter;
