import { useEffect, useState, useRef, useCallback } from 'react';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import SearchPlaceholder from './Placeholder/Placeholder';
import './SearchResults.scss';
import UserInfo from './UserInfo/UserInfo';
import { Div, Skeleton } from '@cadence-support/components';
import { useUsersSearch } from '@cadence-support/data-access';

const SearchResults = ({ active, input }) => {
  const [viewCompaniesMore, setViewCompaniesMore] = useState(false);
  const [viewUsersMore, setViewUsersMore] = useState(false);
  const [activeDiv, setActiveDiv] = useState(false);
  const observerRef = useRef();
  const observeUserRef = useRef();
  const {
    searchResults: results,
    searchLoading,
    searchError,
    fetchSearchResults,
    searchRefetching,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useUsersSearch(input, activeDiv);

  const lastCompanyRef = useCallback(
    (company) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (company) observerRef.current.observe(company);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  const lastUserRef = useCallback(
    (user) => {
      if (isFetchingNextPage || isFetching) return;
      if (observeUserRef.current) observeUserRef.current.disconnect();
      observeUserRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (user) observeUserRef.current.observe(user);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );
  const getHeight = () => {
    const screenWidth = window?.innerWidth;
    if (viewCompaniesMore || viewUsersMore) {
      if (
        screenWidth === 1920 ||
        screenWidth === 1660 ||
        screenWidth === 1440
      ) {
        return `calc(100vh - 716px)`;
      } else if (screenWidth === 1366) return `calc(100vh - 406px)`;
      else return `calc(100vh - 360px)`;
    } else if (
      screenWidth === 1920 ||
      screenWidth === 1660 ||
      screenWidth === 1440
    ) {
      return `calc(100vh - 930px)`;
    } else if (screenWidth === 1366) return `calc(100vh - 609px)`;
    else return `calc(100vh - 554px)`;
  };
  useEffect(() => {
    if (!viewCompaniesMore || !viewUsersMore) {
      const companyDiv = document.getElementById('companydiv');
      const userDiv = document.getElementById('userdiv');
      if (companyDiv) companyDiv.scrollIntoView({ behavior: 'smooth' });
      if (userDiv) userDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }, [viewCompaniesMore, viewUsersMore]);

  return (
    <div className={`search ${active && 'active'}`}>
      {searchLoading ? (
        <SearchPlaceholder />
      ) : input?.length > 0 ? (
        results?.companies?.length === 0 && results?.users?.length === 0 ? (
          <>
            <div className="no-results">No Results found</div>
            {/* <span className="error">{error}</span> */}
          </>
        ) : (
          <div>
            {results?.companies?.length > 0 && (
              <div
                className="companies"
                style={{ display: activeDiv === 'users' ? 'none' : 'block' }}
              >
                <div className="title">
                  <h2>Company</h2>
                  {viewCompaniesMore ? (
                    <p
                      onClick={() => {
                        setViewCompaniesMore(false);
                        setActiveDiv(false);
                      }}
                    >
                      View less
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setViewCompaniesMore(true);
                        setActiveDiv('company');
                      }}
                    >
                      View more
                    </p>
                  )}
                </div>
                <div
                  className="results"
                  id="companydiv"
                  style={{
                    maxHeight: getHeight(),
                    overflowY: 'scroll',
                  }}
                >
                  {results?.companies?.map((company, index) => {
                    const isLastCompany =
                      index === results?.companies.length - 1;
                    return isLastCompany ? (
                      <>
                        <CompanyInfo
                          company={company}
                          key={company?.company_id}
                          ref={lastCompanyRef}
                        />
                        {isFetchingNextPage && (
                          <>
                            {[...Array(1)].map((_, i) => (
                              <div>
                                <Skeleton className="loader" />
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      <CompanyInfo
                        company={company}
                        key={company?.company_id}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {/* users results */}
            {results?.users?.length > 0 && (
              <div
                className="companies"
                style={{ display: activeDiv === 'company' ? 'none' : 'block' }}
              >
                <div className="title">
                  <h2>Users</h2>
                  {viewUsersMore ? (
                    <p
                      onClick={() => {
                        setViewUsersMore(false);
                        setActiveDiv(false);
                      }}
                    >
                      View less
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setViewUsersMore(true);
                        setActiveDiv('users');
                      }}
                    >
                      View more
                    </p>
                  )}
                </div>
                <div
                  className="results"
                  id="userdiv"
                  style={{
                    maxHeight: getHeight(),
                    overflowY: 'scroll',
                    // paddingBottom: viewUsersMore ? '30px' : '0px',
                  }}
                >
                  {results?.users?.map((user, index) => {
                    const isLastUser = index === results?.users.length - 1;
                    return isLastUser ? (
                      <>
                        <UserInfo
                          key={user?.user_id}
                          user={user}
                          ref={lastUserRef}
                        />
                        {isFetchingNextPage && (
                          <>
                            {[...Array(1)].map((_, i) => (
                              <div>
                                <Skeleton className="loader" />
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      <UserInfo key={user?.user_id} user={user} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchResults;
