import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AuthorizedApi } from './api';

const KEY = 'leads-cadence';

const DEFAULT_FILTER_OPTIONS = {
  status: null,
};

const RECORDS_PER_PAGE = 20;

const useCadenceForLeads = (cadenceID, memberID, searchValue) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS);

  const URL = '/v1/company/cadences/leads/' + cadenceID;

  const getLeadsApi = async ({ queryKey, pageParam: offset = 0 }) => {
    const { cadenceID, memberID, filters, searchValue } = queryKey[1];

    const params = {
      limit: RECORDS_PER_PAGE,
      offset,
      user_id: memberID,
      ...(searchValue.length > 0 && { search: searchValue }),
      ...(filters.status && { status: filters.status }),
    };
    return AuthorizedApi.get(URL, { params }).then((res) =>
      res.data.data.map((lead) => ({
        ...lead,

        lead_step_number: lead.LeadToCadences[0]?.Tasks[0]?.Node?.step_number,
        lead_cadence_status: lead.LeadToCadences[0]?.status,
      }))
    );
  };

  const {
    data: leadsData,
    isLoading: leadsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [KEY, { cadenceID, memberID, filters, searchValue }],
    getLeadsApi,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE;
      },
      select: (data) => {
        return data.pages.map((page) => page).flat();
      },
    }
  );

  return {
    leadsData,
    leadsLoading,
    fetchNextPage,
    hasNextPage,
    RECORDS_PER_PAGE,
    isFetching,
    isFetchingNextPage,
    filters,
    setFilters,
  };
};

export default useCadenceForLeads;
