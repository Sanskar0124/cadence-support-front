import styles from './Cadences.module.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SearchBar,
  TabNavSlider,
  ThemedButton,
} from '@cadence-support/widgets';
import {
  Sort,
  CadencesGradient,
  LeadsGradient,
  NoCadence,
  Paused,
} from '@cadence-support/icons';
import { useCompanyCadences } from '@cadence-support/data-access';
import { ProgressiveImg } from '@cadence-support/components';
import { VIEW_MODE } from '../../../../constants';
import moment from 'moment';
import Filters from './components/Filters';
import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { CADENCE_FILTER_DEFAULTS } from '../../../../constants';
import Placeholder from './components/Placeholder/Placeholder';
import { STATUS_LABELS_CL_NAMES } from '../../../MemberDetails/components/EmployeeTable/components/Cadence/constants';
import { getLabelFromEnum } from '@cadence-support/utils';
import { CADENCE_STATUS } from '@cadence-support/constants';
import { CADENCES_SLIDER_OPTIONS, getTabOptions } from './constants';
import TableRow from './components/TableRow/TableRow';

const cadenceTypes = {
  PERSONAL: 'personal',
  TEAM: 'team',
  COMPANY: 'company',
};

function Cadences({
  companyID,
  setViewMode,
  setSelectedCadence,
  setSelectedCadenceID,
  setMemberID,
  memberID,
  setIntegrationType,
}) {
  const [cadenceType, setCadenceType] = useState(cadenceTypes.PERSONAL);
  const [filterMode, setFilterMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const observerRef = useRef();

  const cadenceSelect = (cadence) => {
    setSelectedCadence(cadence?.name);
    setSelectedCadenceID(cadence?.cadence_id);
    setMemberID(cadence?.user_id);
    setIntegrationType(cadence?.integration_type);
    setViewMode(VIEW_MODE.CADENCE);
  };
  const {
    cadences,
    filters,
    setFilters,
    cadencesLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCompanyCadences({
    companyID,
    cadenceType,
    memberID,
    searchValue,
  });

  const lastRowRef = useCallback(
    (cadenceCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (cadenceCard) observerRef.current.observe(cadenceCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return (
    <>
      <div className={styles.cadences}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <TabNavSlider
              theme={TabNavThemes.WHITE}
              className={styles.buttonSliderClassName}
              btnClassName={styles.buttonClassName}
              activeBtnClassName={styles.activeBtnClassName}
              activePillClassName={styles.activePillClassName}
              buttons={getTabOptions(cadences, cadenceType)}
              value={cadenceType}
              setValue={setCadenceType}
              width="425px"
            />
          </div>

          <div>
            <SearchBar
              onSearch={() => {
                setSearchValue(search);
              }}
              value={search}
              setValue={setSearch}
              onClick={() => setIsSearchFocused(true)}
            />
            <ThemedButton
              onClick={() => setFilterMode(!filterMode)}
              className={styles.filter}
              width="60px"
              height="44px"
              theme={
                filterMode ? ThemedButtonThemes.ACTIVE : ThemedButtonThemes.GREY
              }
            >
              <Sort height={20} />
            </ThemedButton>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <h1>Cadence</h1>
            <h1>Created by</h1>
            <h1>Created on</h1>
            <h1>People</h1>
            <h1>Status</h1>
          </div>
          <div className={styles.tableRows}>
            {cadencesLoading ? (
              <Placeholder rows={10} />
            ) : cadences?.length > 0 ? (
              cadences?.map((data, index) => {
                const isLastRow = index === cadences?.length - 1;
                return isLastRow ? (
                  <>
                    <TableRow
                      data={data}
                      handler={cadenceSelect}
                      key={cadences?.cadence_id}
                      ref={lastRowRef}
                    />
                    {isFetchingNextPage && <TableRow loading={true} />}
                  </>
                ) : (
                  <TableRow
                    data={data}
                    handler={cadenceSelect}
                    key={cadences?.cadence_id}
                  />
                );
              })
            ) : (
              <div className={styles.noCadence}>
                <NoCadence />
                <div>
                  <h4>No cadence found</h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {filterMode && (
        <Filters
          setFilterMode={setFilterMode}
          cadences={cadences}
          setFilters={setFilters}
          filters={filters}
        />
      )}
    </>
  );
}

export default Cadences;
