import styles from './PeopleViewCadence.module.scss';
import { NoLeads } from '@cadence-support/icons';
import React, { useRef, useCallback } from 'react';
import PeopleCard from '../PeopleCard/PeopleCard';
import { useCadencesLeads } from '@cadence-support/data-access';
import Placeholder from '../Placeholder/Placeholder';

function PeopleViewCadence({ memberID, selectedCadenceID, searchValue }) {
  const observerRef = useRef();
  const {
    leadsData,
    leadsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCadencesLeads({
    memberID,
    cadenceID: selectedCadenceID,
    searchValue,
  });

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

  return (
    <div className={styles.cadencePeople}>
      <div className={styles.header}></div>
      <div className={styles.leadsContainer}>
        {leadsLoading ? (
          <Placeholder rows={5} />
        ) : leadsData?.length > 0 ? (
          leadsData.map((lead, index) => {
            const isLastRow = index === leadsData.length - 1;
            return isLastRow ? (
              <>
                <PeopleCard lead={lead} ref={lastLeadRef} key={lead?.lead_id} />
                {isFetchingNextPage && <PeopleCard loading={true} />}
              </>
            ) : (
              <PeopleCard lead={lead} key={lead?.lead_id} />
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
}

export default React.forwardRef(PeopleViewCadence);
