import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';

const RECORDS_PER_PAGE = 10;

const DEFAULT_FILTER_OPTIONS = {
  tags: [],
};

const useLeads = ({ searchValue, memberID, enabled }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS);

  const getLeadsAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { memberID, searchValue, filters } = queryKey[1];

    let URL = `/v1/company/teams/lead/list`;
    return AuthorizedApi.post(
      URL,

      {
        user_id: memberID,
        ...(searchValue.length && { search: searchValue }),
        ...(filters?.tags?.length > 0 && { tag: filters.tags }),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          limit: RECORDS_PER_PAGE,
          offset,
        },
      }
    )
      .then((res) => res.data.data)
      .catch((err) => console.log(err));
  };

  const {
    data: leads,
    isLoading: leadsLoading,
    fetchNextPage,
    refetch: refetchLeads,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['leads', { memberID, searchValue, filters }],
    getLeadsAPI,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE;
      },
      select: (data) => data?.pages?.map((page) => page)?.flat(),
      enabled: enabled.leads,
    }
  );

  return {
    leads,
    leadsLoading,
    refetchLeads,
    filters,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

export default useLeads;
