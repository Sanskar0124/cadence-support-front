import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';

const KEY = 'members';
const ROUTE = '/v1/company/teams/team/department';
const RECORDS_PER_PAGE = 5;

const useMembers = ({
  search: searchValue = '',
  teamID,
  integration_type,
  companyID,
}) => {
  const fetchCompanyAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { teamID, searchValue, companyID, integration_type } = queryKey[1];

    return AuthorizedApi.post(`${ROUTE}`, {
      limit: RECORDS_PER_PAGE,
      offset,
      ...(searchValue.length > 0 && { search: searchValue }),
      // integration_type: integration_type ?? 'salesforce',
      company_id: companyID,
      sd_id: teamID,
    }).then((res) => res.data.data);
  };

  const {
    data: members,
    isLoading: membersLoading,
    isRefetching: membersRefetching,
    error: fetchMembersError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [KEY, { teamID, searchValue, companyID, integration_type }],
    fetchCompanyAPI,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE;
      },
      select: (data) => data?.pages?.map((page) => page)?.flat(),
    }
  );

  return {
    members,
    membersLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default useMembers;
