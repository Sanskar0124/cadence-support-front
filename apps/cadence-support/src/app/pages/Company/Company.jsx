import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCompany, useUsersSearch } from '@cadence-support/data-access';
//components
import {
  SearchBar,
  SearchResults,
  ThemedButton,
} from '@cadence-support/widgets';
import { Container, Title, Button, Tooltip } from '@cadence-support/components';

import {
  Filter,
  NewFilter,
  NoCadence,
  PlusOutline,
} from '@cadence-support/icons';

import styles from './Company.module.scss';
import CompanyCard from './components/CompanyCard/CompanyCard';
import { Colors, cardCountHandler } from '@cadence-support/utils';
import Filters from './components/CompanyDetails/components/Filters/Filters';
import { ThemedButtonThemes } from '@cadence-support/themes';

const Company = () => {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [width, setWidth] = useState(false);
  const [isUserSearchFocused, setIsUserSearchFocused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(cardCountHandler());

  const [filters, setFilters] = useState({
    integration_types: [],
    mail_integration_types: [],
    status: [],
    license_types: [],
  });
  const [filterLength, setFilterLength] = useState('');

  const {
    companies,
    companiesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    getSearchedUsers,
    searchedUsers,
    searchedUsersLoading,
  } = useCompany(true, filters);

  const observerRef = useRef();

  const lastCompanyRef = useCallback(
    (companyCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (companyCard) observerRef.current.observe(companyCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  //search

  useEffect(() => {
    if (!search) setSearchValue('');
  }, [search]);

  const onSearch = useCallback(() => {
    if (search != '') setSearchValue(search);
    if (!isUserSearchFocused) setIsUserSearchFocused(true);
  }, [search]);

  useEffect(() => {
    if (companies?.length <= 2 && isSidebar === false) {
      setWidth('repeat(auto-fit, minmax(380px, 0.34fr))');
    }
  }, [isSidebar, companies]);

  useEffect(() => {
    setFilterLength(Object?.values(filters)?.flat()?.length);
  }, [filters]);

  return (
    <Container
      className={styles.tasks}
      onClick={() => setIsSearchFocused(false)}
    >
      <div className={styles.header}>
        <div>
          <div className={styles.title}>
            <Title>My Companies</Title>
          </div>
        </div>
        <div className={styles.right}>
          {/* <div className={styles.search}>
            <SearchBar
              onSearch={() => {
                setSearchValue(search);
              }}
              value={search}
              setValue={setSearch}
              onClick={() => setIsSearchFocused(true)}
              placeholderText={'Search by company name'}
              companySearch
            />
          </div> */}
          <div className={styles.search}>
            <SearchBar
              value={search}
              setValue={setSearch}
              onSearch={onSearch}
              onClick={() => setIsUserSearchFocused(true)}
              placeholderText={'Search by user or company'}
              maxLength={255}
            />
            {searchValue != '' && (
              <SearchResults input={searchValue} active={isUserSearchFocused} />
            )}
          </div>
          <ThemedButton
            theme={
              isSidebar || filterLength > 0
                ? ThemedButtonThemes.PRIMARY
                : ThemedButtonThemes.WHITE
            }
            className={styles.btnFilter}
            width="fit-content"
            height="50px"
            onClick={() => setIsSidebar((prev) => !prev)}
          >
            <NewFilter
              color={
                isSidebar || filterLength > 0 ? Colors.white : Colors.lightBlue
              }
              size={20}
            />
            Filter &nbsp;
            {filterLength > 0 && `(${filterLength})`}
          </ThemedButton>
        </div>
      </div>
      <div
        className={`${styles.body} `}
        // style={{ width: !viewMode ? `calc(100%-${sidebarWidth})` : '100%' }}
      >
        <div
          className={styles.companyListContainer}
          style={{
            gridTemplateColumns:
              companies?.length <= 2 && isSidebar === false ? width : '',
          }}
        >
          {companiesLoading ? (
            new Array(cardsPerPage)
              .fill(0)
              .map((_, i) => <CompanyCard key={Math.random()} loading={true} />)
          ) : companies?.length > 0 ? (
            companies?.map((company, index) => {
              const isLastCompany = index === companies.length - 1;

              return isLastCompany ? (
                <>
                  <CompanyCard
                    key={company.company_id}
                    ref={lastCompanyRef}
                    company={company}
                    loading={false}
                  />
                  {isFetchingNextPage && <CompanyCardPlaceholder />}
                </>
              ) : (
                <CompanyCard
                  key={company.company_id}
                  company={company}
                  loading={false}
                  i
                />
              );
            })
          ) : (
            <div
              className={styles.noCompanies}
              style={{ left: isSidebar ? '40%' : '50%' }}
            >
              <NoCadence />
              <h4>No companies found</h4>
            </div>
          )}
        </div>

        {isSidebar && (
          <Filters
            setIsSidebar={setIsSidebar}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
    </Container>
  );
};

const CompanyCardPlaceholder = () => {
  return new Array(3)
    .fill(0)
    .map((_, i) => <CompanyCard key={i} loading={true} />);
};

export default Company;
