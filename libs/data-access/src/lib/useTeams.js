import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';

const KEY = 'teams';

const ROUTE = (companyID) => `v1/company/teams/team/${companyID}`;
const RECORDS_PER_PAGE = 10;

const useTeams = (companyID, searchValue = '') => {
  const fetchTeamsAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { companyID, searchValue } = queryKey[1];

    return AuthorizedApi.get(ROUTE(companyID), {
      params: {
        limit: RECORDS_PER_PAGE,
        offset,
        ...(searchValue.length > 0 && { search: searchValue }),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: teams,
    isLoading: teamsLoading,
    isRefetching: teamsRefetching,
    error: fetchTeamsError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery([KEY, { companyID, searchValue }], fetchTeamsAPI, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length) return undefined;

      return pages.length * RECORDS_PER_PAGE;
    },
    select: (data) => {
      return data?.pages?.map((page) => page)?.flat();
    },
  });

  return {
    teamsData: teams,
    teamsLoading,
    fetchNextPage,
    teamsRefetching,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default useTeams;
