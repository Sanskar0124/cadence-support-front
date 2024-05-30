import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';
import { DEFAULT_FILTER_OPTIONS } from '@cadence-support/constants';
import { useQuery as useQueryParams } from '@cadence-support/utils';

const RECORDS_PER_PAGE = 14;

const useTasks = ({ searchValue, memberID, enabled }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS['tasks']);

  const [userId, setUserId] = useState(null);
  const [nextTaskId, setNextTaskId] = useState(null);

  const getTasksAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { memberID, searchValue, filters } = queryKey[1];
    let URL = `/v1/company/teams/task/${memberID}`;

    return AuthorizedApi.post(
      URL,
      {
        offset: offset,
        limit: RECORDS_PER_PAGE,
        ...(searchValue.length > 0 && { search: searchValue }),
        ...(Object.values(filters)?.find((prev) => prev.length) && {
          filters: filters,
        }),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.data.data)
      .catch((err) => console.log(err));
  };

  const {
    data: tasks,
    isLoading: taskLoading,
    fetchNextPage,
    refetch: refetchTasks,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['tasks', { memberID, searchValue, filters }],
    getTasksAPI,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.tasks?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE;
      },
      select: (data) => {
        const results = data?.pages?.map((page) => page)?.flat();
        const resultArray = results.reduce(
          (acc, current) => {
            const tasks = acc.tasks.concat(current.tasks);
            const task_count = acc.task_count + current.task_count;
            return { tasks, task_count };
          },
          { tasks: [], task_count: 0 }
        );
        return resultArray;
      },
      enabled: enabled.tasks,
    }
  );

  //get cadences for cadence filter
  const getCadencesForFilter = ({ queryKey }) => {
    const { memberID } = queryKey[1];
    return AuthorizedApi.get(
      `/v1/company/teams/task/get-cadences/${memberID}`,
      {}
    ).then((res) => res.data.data);
  };

  const { data: cadences, isLoading: cadencesLoading } = useQuery(
    ['cadencesForTaskFilter', { memberID }],
    getCadencesForFilter,
    {
      enabled: enabled.cadences,
    }
  );

  return {
    tasks,
    taskLoading,
    refetchTasks,
    userId,
    setUserId,
    nextTaskId,
    setNextTaskId,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    cadences,
    cadencesLoading,
    filters,
    setFilters,
  };
};

export default useTasks;
