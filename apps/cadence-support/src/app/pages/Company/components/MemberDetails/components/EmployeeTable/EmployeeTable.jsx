import React, { useState, useCallback, useEffect } from 'react';

import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';
import {
  SearchBar,
  TabNavSlider,
  ThemedButton,
} from '@cadence-support/widgets';
import ActivityList from './components/ActivityList/ActivityList';

import styles from './EmployeeTable.module.scss';
import Tasks from './components/Tasks/Tasks';
import Cadence from './components/Cadence/Cadence';
import { Sort } from '@cadence-support/icons';
import CadenceFilter from './components/CadenceFilter/CadenceFilter';
import Filter from './components/Tasks/components/Filters/Filters';

import { DEFAULT_FILTER_OPTIONS } from '@cadence-support/constants';
import Leads from './components/Leads/Leads';
import Filters from './components/Leads/components/Filters/Filter';
import Settings from './components/Settings/Settings';
import SettingsV2 from './components/SettingV2/SettingV2';

export const TABLE_TABS = [
  {
    label: 'Activity',
    value: 'activity',
  },
  {
    label: 'Tasks',
    value: 'tasks',
  },
  {
    label: 'Cadence',
    value: 'cadence',
  },
  {
    label: 'Leads',
    value: 'leads',
  },
  {
    label: 'Profile',
    value: 'settings',
  },
];

const TABS = {
  ACTIVITY: 'activity',
  TASKS: 'tasks',
  CADENCE: 'cadence',
  LEADS: 'leads',
  SETTINGS: 'settings',
};

const SECTION_WITH_FILTERS = [TABS.TASKS, TABS.CADENCE, TABS.LEADS];
const SECTION_WITH_SEARCH = [
  TABS.ACTIVITY,
  TABS.TASKS,
  TABS.CADENCE,
  TABS.LEADS,
];

const EmployeeTable = ({ memberID, userData, userLoading }) => {
  const [activeTab, setActiveTab] = useState(TABS.ACTIVITY);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [filtersCount, setFiltersCount] = useState(0);
  const [filterMode, setFilterMode] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS[activeTab]);

  useEffect(() => {
    setFilterMode(null);
    setFiltersCount(0);
    setFilters(DEFAULT_FILTER_OPTIONS[activeTab]);
  }, [activeTab]);

  const renderComponent = useCallback(
    (activeTab, searchValue, userData, filterMode, setFilterMode) => {
      switch (activeTab) {
        case TABS.ACTIVITY:
          return <ActivityList memberID={memberID} searchValue={searchValue} />;

        case TABS.TASKS:
          return (
            <Tasks
              memberID={memberID}
              searchValue={searchValue}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              taskFilters={filters}
            />
          );

        case TABS.CADENCE:
          return (
            <Cadence
              memberID={memberID}
              searchValue={searchValue}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              selectedCadence={selectedCadence}
              setSelectedCadence={setSelectedCadence}
              userData={userData}
              setFiltersCount={setFiltersCount}
              cadenceFilters={filters}
            />
          );

        case TABS.LEADS:
          return (
            <Leads
              memberID={memberID}
              searchValue={searchValue}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              leadsFilter={filters}
            />
          );

        case TABS.SETTINGS:
          return (
            <SettingsV2
              userData={userData}
              userLoading={userLoading}
              memberID={memberID}
              integrationType={userData?.integration_type}
            />
            // <Settings
            //   memberID={memberID}
            //   integrationType={userData?.integrationType}
            // />
          );

        default:
          break;
      }
    },
    [
      activeTab,
      searchValue,
      userData,
      selectedCadence,
      filters,
      filterMode,
      setFilterMode,
      memberID,
    ]
  );

  const renderFilter = useCallback(() => {
    {
      switch (filterMode) {
        case TABS.CADENCE:
          return (
            <CadenceFilter
              filters={filters}
              setFilters={setFilters}
              setFilterMode={setFilterMode}
              memberID={memberID}
            />
          );
        case TABS.TASKS:
          return (
            <Filter
              filters={filters}
              setFilters={setFilters}
              setFilterMode={setFilterMode}
              memberID={memberID}
            />
          );

        case TABS.LEADS:
          return (
            <Filters
              filters={filters}
              setFilters={setFilters}
              setFilterMode={setFilterMode}
              memberID={memberID}
            />
          );
      }
    }
  }, [filters, memberID, filterMode]);

  return (
    <div className={styles.employeeTable}>
      {!selectedCadence && (
        <div className={styles.header}>
          <div className={styles.left}>
            <TabNavSlider
              theme={TabNavThemes.WHITE}
              buttons={TABLE_TABS}
              value={activeTab}
              setValue={setActiveTab}
              className={styles.tabs}
              btnClassName={styles.tabBtns}
              activeBtnClassName={styles.tabBtnActive}
              activePillClassName={styles.activePill}
              width="460px"
            />
          </div>

          <div className={styles.right}>
            {SECTION_WITH_SEARCH.includes(activeTab) && (
              <SearchBar
                width="300px"
                height="40px"
                setValue={setSearch}
                onSearch={() => setSearchValue(search)}
                value={search}
                minLength={8}
                placeholderText={
                  activeTab === 'tasks' ? 'lead_id:__' : 'Search'
                }
                className={styles.searchBar}
              />
            )}
            {SECTION_WITH_FILTERS.includes(activeTab) && (
              <ThemedButton
                theme={
                  filterMode === activeTab || filtersCount
                    ? ThemedButtonThemes.ACTIVE
                    : ThemedButtonThemes.WHITE
                }
                onClick={() => {
                  setFilterMode((prevState) => (prevState ? null : activeTab));
                }}
                className={styles.filterThemedButton}
                width="fit-content"
              >
                <Sort />
              </ThemedButton>
            )}
          </div>
          {renderFilter()}
        </div>
      )}
      <div className={styles.body}>
        {renderComponent(
          activeTab,
          searchValue,
          userData,
          filters,
          filterMode,
          setFilterMode
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
