import { useActivities } from '@cadence-support/data-access';
import React, { useCallback, useRef, useState } from 'react';

import SingleFeed from './components/SingleFeed/SingleFeed';
import { LiveFeedsPlaceholder } from './ActivityPlaceholder';

import styles from './ActivityList.module.scss';
import { NoActivities } from '@cadence-support/icons';

const ActivityList = ({ searchValue, memberID }) => {
  const {
    activities,
    activitiesLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useActivities(searchValue, memberID);

  const observerRef = useRef();

  const lastActivityRef = useCallback(
    (activityCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (activityCard) observerRef.current.observe(activityCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return (
    <div className={styles.activitiesContainer}>
      {activitiesLoading ? (
        <div>
          <LiveFeedsPlaceholder />
        </div>
      ) : activities?.length > 0 ? (
        activities.map((activity, index) => {
          const isLastRow = index === activities.length - 1;
          return isLastRow ? (
            <>
              <SingleFeed
                key={activity?.activity_id}
                activity={activity}
                ref={lastActivityRef}
              />
              {isFetchingNextPage && <LiveFeedsPlaceholder rows={1} />}
            </>
          ) : (
            <SingleFeed key={activity?.activity_id} activity={activity} />
          );
        })
      ) : (
        <div className={styles.noActivities}>
          <NoActivities />
          <h4>No activity found</h4>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
