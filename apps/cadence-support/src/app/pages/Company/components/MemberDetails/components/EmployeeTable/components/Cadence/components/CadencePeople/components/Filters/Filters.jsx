import { useState, useEffect } from 'react';
import styles from './Filters.module.scss';

import { ThemedButton } from '@cadence-support/widgets';
import { Button, Tooltip } from '@cadence-support/components';
import { Close } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { DEFAULT_FILTER_OPTIONS, CADENCE_STATUS_ENUMS } from './constants';

import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const Filters = ({
  filters,
  setFilters,
  filtersCount,
  setFilterActive,
  onClose,
}) => {
  const user = useRecoilValue(userInfo);
  let loggedInUser = { ...user, language: 'english' };

  useEffect(() => {
    localStorage.setItem('cadence_leads_filters', JSON.stringify(filters));
  }, [filters]);

  const handleRadioSelect = (ENUM, filterType) => {
    if (filters?.[filterType] === ENUM)
      setFilters((prev) => ({ ...prev, [filterType]: null }));
    else
      setFilters((prev) => ({
        ...prev,
        [filterType]: ENUM,
      }));
  };

  const decideTheme = (ENUM, filterType) => {
    return filters?.[filterType]?.includes(ENUM) ? styles.active : '';
  };

  const reset = (filterType) => {
    if (filterType === 'ALL') {
      setFilters(DEFAULT_FILTER_OPTIONS);
      setOwner(null);
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [filterType]: typeof prev[filterType] === 'boolean' ? false : null,
    }));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <h3>Filters</h3>
        <ThemedButton
          className={styles.closeBtn}
          onClick={() => setFilterActive(false)}
          theme={ThemedButtonThemes.ICON}
        >
          <Tooltip text="Close">
            <Close color={'#567191'} />
          </Tooltip>
        </ThemedButton>
      </div>

      <div className={styles.body}>
        <div className={styles.filterType}>
          <div className={styles.taskType}>
            Lead Status
            {filters['status'] && (
              <div
                className={styles.resetButton}
                onClick={() => {
                  reset('status');
                }}
              >
                {
                  COMMON_TRANSLATION.RESET[
                    loggedInUser?.language?.toUpperCase()
                  ]
                }
              </div>
            )}
          </div>{' '}
          <div className={styles.filterOptions}>
            {Object.keys(CADENCE_STATUS_ENUMS).map((key) => (
              <ThemedButton
                width="fit-content"
                onClick={() => handleRadioSelect(key.toLowerCase(), 'status')}
                theme={ThemedButtonThemes.GREY}
                className={decideTheme(key.toLowerCase(), 'status')}
              >
                <span>
                  {CADENCE_STATUS_ENUMS[key][
                    loggedInUser?.language?.toUpperCase()
                  ]
                    .split(' ')
                    .slice(0, 1)}
                </span>
                <span>
                  {CADENCE_STATUS_ENUMS[key][
                    loggedInUser?.language?.toUpperCase()
                  ].split(' ').length > 1 &&
                    CADENCE_STATUS_ENUMS[key][
                      loggedInUser?.language?.toUpperCase()
                    ]
                      .split(' ')
                      .slice(1)
                      .join(' ')}
                </span>
              </ThemedButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
