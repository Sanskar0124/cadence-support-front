import { SOCKET_ON_EVENTS } from '@cadence-support/constants';
import { SocketContext } from '@cadence-support/context';
import { useCompanyActivity } from '@cadence-support/data-access';
import { NoActivities } from '@cadence-support/icons';
import { SearchBar } from '@cadence-support/widgets';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import Placeholder from '../OngoingServices/components/Placeholder/Placeholder';
import styles from './CompanyActivity.module.scss';
import CompanyActivities from './components/CompanyActivities/CompanyActivities';

const CompanyActivity = () => {
  const [companyActivites, setCompanyActivites] = useState([]);
  const { addSocketHandler } = useContext(SocketContext);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const observerRef = useRef();
  const {
    companyActivity,
    companyActivityLoading,
    companyActivityRefetching,
    fetchCompanyActivityError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCompanyActivity(searchValue);

  const lastCompanyActivityRef = useCallback(
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
    setCompanyActivites(companyActivity);
  }, [companyActivity]);

  useEffect(() => {
    addSocketHandler({
      event_name: SOCKET_ON_EVENTS.COMPANY_ACTIVITY,
      key: 'activity',
      handler: handleSockentEvent,
    });
  }, []);

  const handleSockentEvent = (activity) => {
    setCompanyActivites((prev) => [...prev, activity]);
  };

  return (
    <div className={styles.feed}>
      <div className={styles.feed_heading}>
        <div className={styles.text}>Company Activity</div>

        <div className={styles.search}>
          <SearchBar
            placeholderText={'Search Activity'}
            onSearch={() => {
              setSearchValue(search);
            }}
            value={search}
            setValue={setSearch}
            onClick={() => setIsSearchFocused(true)}
          />
        </div>
      </div>
      <div className={styles.CompanyActivities}>
        {companyActivityLoading ? (
          <Placeholder />
        ) : companyActivites?.length > 0 ? (
          companyActivites?.map((activity, index) => {
            const isLastRow = index === companyActivites.length - 1;
            return isLastRow ? (
              <>
                <CompanyActivities
                  activity={activity}
                  ref={lastCompanyActivityRef}
                  key={activity?.activity_id}
                />
                {isFetchingNextPage && <CompanyActivities loading={true} />}
              </>
            ) : (
              <CompanyActivities
                activity={activity}
                key={activity?.activity_id}
              />
            );
          })
        ) : (
          <div className={styles.noActivity}>
            <NoActivities />
            <h4>No activity found</h4>
          </div>
        )}
      </div>
      {/* <CompanyActivities
        companyActivites={companyActivites}
        companyActivityLoading={companyActivityLoading}
      /> */}
    </div>
  );
};

export default CompanyActivity;
