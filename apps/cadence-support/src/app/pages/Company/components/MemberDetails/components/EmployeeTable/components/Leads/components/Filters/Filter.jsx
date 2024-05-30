import { useState, useEffect } from 'react';
import styles from './Filters.module.scss';

import { ThemedButton } from '@cadence-support/widgets';
import { Button, Tooltip } from '@cadence-support/components';
import { Close } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { LEAD_TYPE_ENUMS, DEFAULT_FILTER_OPTIONS } from '../../constants';

import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const Filters = ({
  filters,
  setFilters,
  filtersCount,
  setFilterMode,
  onClose,
}) => {
  const user = useRecoilValue(userInfo);
  let loggedInUser = { ...user, language: 'english' };

  const handleMultiSelect = (ENUM, filterType) => {
    filters?.[filterType]?.includes(ENUM)
      ? setFilters((prev) => ({
          ...prev,
          [filterType]: prev?.[filterType].filter((f) => f !== ENUM),
        }))
      : setFilters((prev) => ({
          ...prev,
          [filterType]: [...(prev?.[filterType] ?? []), ENUM],
        }));
  };

  const decideTheme = (ENUM, filterType) => {
    return filters?.[filterType]?.includes(ENUM) ? styles.active : '';
  };

  const reset = (filterType) => {
    if (filterType === 'ALL') {
      setFilters(DEFAULT_FILTER_OPTIONS);

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
          onClick={() => setFilterMode(null)}
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
            Tags
            {filters['tags']?.length > 0 && (
              <div
                className={styles.resetButton}
                onClick={() => {
                  reset('tags');
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
            {Object.keys(LEAD_TYPE_ENUMS).map((key) => (
              <ThemedButton
                width="fit-content"
                onClick={() => handleMultiSelect(key.toLowerCase(), 'tags')}
                theme={ThemedButtonThemes.GREY}
                className={decideTheme(key.toLowerCase(), 'tags')}
              >
                <span>{LEAD_TYPE_ENUMS[key]}</span>
              </ThemedButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
