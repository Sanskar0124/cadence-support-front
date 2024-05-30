import { useEffect, useState, useCallback, useRef } from 'react';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';

import styles from './CadencePeople.module.scss';
import { useCadenceForLead } from '@cadence-support/data-access';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { NoLeads, Sort } from '@cadence-support/icons';
import LeadCard from './components/LeadCard/LeadCard';
import Filters from './components/Filters/Filters';

const CadencePeople = ({ cadenceID, memberID }) => {
  const [peopleFilterActive, setPeopleFilterActive] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);
  const [filterActive, setFilterActive] = useState(false);

  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const cadenceLeadsDataAccess = useCadenceForLead(
    cadenceID,
    memberID,
    searchValue
  );
  const {
    leadsData,
    leadsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    filters,
    setFilters,
  } = cadenceLeadsDataAccess;

  const observerRef = useRef();

  const lastLeadRef = useCallback(
    (leadNode) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (leadNode) observerRef.current.observe(leadNode);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  useEffect(() => {
    let count = 0;
    for (const filter of Object.keys(filters)) if (filters[filter]) count++;
    setFiltersCount(count);
  }, [filters]);

  return (
    <div className={styles.cadencePeople}>
      <div className={styles.header}>
        <SearchBar
          width="300px"
          height="48px"
          setValue={setSearch}
          onSearch={() => setSearchValue(search)}
          value={search}
          placeholderText="Search"
        ></SearchBar>

        <ThemedButton
          theme={
            peopleFilterActive || filtersCount
              ? ThemedButtonThemes.ACTIVE
              : ThemedButtonThemes.WHITE
          }
          onClick={() => {
            setFilterActive((prevState) => !prevState);
          }}
          className={styles.filterThemedButton}
          width="fit-content"
        >
          <Sort />
        </ThemedButton>
        {filterActive && (
          <Filters
            filters={filters}
            setFilterActive={setFilterActive}
            setFilters={setFilters}
            filtersCount={filtersCount}
          />
        )}
      </div>
      <div className={styles.leadsContainer}>
        {leadsLoading ? (
          new Array(20).fill(0).map((_, i) => <LeadCard loading={true} />)
        ) : leadsData?.length > 0 ? (
          leadsData.map((lead, index) => {
            const isLastRow = index === leadsData.length - 1;
            return isLastRow ? (
              <>
                <LeadCard lead={lead} ref={lastLeadRef} key={lead?.lead_id} />
                {isFetchingNextPage && (
                  <>
                    <LeadCard loading={true} />
                    <LeadCard loading={true} />
                  </>
                )}
              </>
            ) : (
              <LeadCard lead={lead} key={lead?.lead_id} />
            );
          })
        ) : (
          <div className={styles.noLeads}>
            <NoLeads />
            <h4>No leads found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default CadencePeople;
