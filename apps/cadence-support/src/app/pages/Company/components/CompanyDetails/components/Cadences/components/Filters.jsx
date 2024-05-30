import { useState } from 'react';

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
import { CADENCE_STATUS_ENUMS } from '../../../../../../Company/components/MemberDetails/components/EmployeeTable/components/CadenceFilter/constants';

import styles from './Filters.module.scss';

import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';

import UserAndGroup from '../../../../MemberDetails/components/EmployeeTable/components/CadenceFilter/components/UserAndGroup/UserAndGroup';

const Filters = ({
  filters,
  setFilters,
  setFilterMode,
  memberID,
  cadences,
}) => {
  const [usersAndGroups, setUsersAndGroups] = useState(false);

  const language = 'english';

  const textFilter = COMMON_TRANSLATION.FILTERS['ENGLISH'];

  const handleRadioSelect = (ENUM, filterType) => {
    if (cadences?.type === ENUM)
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
    return filters?.[filterType] === ENUM ? styles.active : '';
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <Title size="14px" className={styles.heading}>
          {`${textFilter}`.slice(0, 1).toUpperCase() + `${textFilter}`.slice(1)}
        </Title>

        <ThemedButton
          onClick={() => setFilterMode(false)}
          className={styles.closeBtn}
          theme={ThemedButtonThemes.ICON}
        >
          <Close color={'#000'} />
        </ThemedButton>
      </div>
      <div className={styles.body}>
        <div className={styles.filterType}>
          <div className={styles.taskType}>Cadence Status</div>{' '}
          {filters['status'].length !== 0 && (
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
        </div>
      </div>
      {/* <UserAndGroup
        open={usersAndGroups}
        setOpen={setUsersAndGroups}
        filters={filters}
        setFilters={setFilters}
        resetFilter={reset}
        memberID={'49ed6822-df47-4df9-ae2a-737e3a861f7a'}
      /> */}
    </div>
  );
};

export default Filters;
