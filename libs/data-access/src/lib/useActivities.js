import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';

const KEY = 'activities';

const ROUTE = (memberID) => `/v1/company/teams/activity/${memberID}`;
const RECORDS_PER_PAGE = 12;

const useActivities = (searchValue, memberID) => {
  const fetchActivitiesAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { memberID, searchValue } = queryKey[1];

    return AuthorizedApi.get(ROUTE(memberID), {
      params: {
        limit: 12,
        offset,
        ...(searchValue.length > 0 && { search: searchValue }),
      },
    }).then((res) => res.data.data);
  };

  const {
    data: activities,
    isLoading: activitiesLoading,
    isRefetching: activitiesRefetching,
    error: fetchActivitiesError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [KEY, { memberID, searchValue }],
    fetchActivitiesAPI,

    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE - 1;
      },
      select: (data) => data?.pages?.map((page) => page)?.flat(),
    }
  );

  return {
    activities,
    activitiesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default useActivities;
