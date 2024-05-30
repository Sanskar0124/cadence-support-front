import { useLeads } from '@cadence-support/data-access';
import { NoTasks } from '@cadence-support/icons';
import React, { useState, useRef, useCallback, useEffect } from 'react';

import LeadRow from './components/LeadRow/LeadRow';
import { Placeholder } from './components/Placeholder/Placeholder';

import styles from './Leads.module.scss';

const Leads = ({ leadsFilter, searchValue, memberID, filterMode }) => {
  const leadsDataAccess = useLeads({
    searchValue,
    memberID,
    enabled: { leads: true },
  });

  const {
    leads,
    leadsLoading,
    refetchLeads,
    filters,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = leadsDataAccess;

  const observerRef = useRef();

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

  useEffect(() => {
    leadsDataAccess.setFilters(leadsFilter);
  }, [leadsFilter]);

  return (
    <div className={styles.leads}>
      {leadsLoading ? (
        <Placeholder rows={6} />
      ) : leads?.length === 0 ? (
        <div className={styles.noTasks}>
          <NoTasks />
          <h4>No leads found</h4>
        </div>
      ) : (
        leads?.map((lead, index) => {
          const isLastRow = index === leads.length - 1;
          return isLastRow ? (
            <>
              <LeadRow lead={lead} key={lead?.lead_id} ref={lastRowRef} />
              {isFetchingNextPage && <LeadRow loading={true} />}
            </>
          ) : (
            <LeadRow lead={lead} key={lead?.lead_id} />
          );
        })
      )}
    </div>
  );
};

export default Leads;
