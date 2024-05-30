import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';
import { DEFAULT_FILTER_OPTIONS } from '@cadence-support/constants';
import { useState } from 'react';

const RECORDS_PER_PAGE = 10;

const useCadencesLeads = ({ memberID, cadenceID, searchValue = '' }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS['cadence']);

  //get cadence people

  const getCadenceLeads = async ({ queryKey, pageParam: offset = 0 }) => {
    const { cadenceID, filters, memberID, searchValue } = queryKey[1];
    let URL = `/v1/company/cadences/leads/`;

    return AuthorizedApi({
      method: 'GET',
      url: `${URL}${cadenceID}`,
      params: {
        limit: RECORDS_PER_PAGE,
        offset,
        user_id: memberID,
        ...(searchValue.length > 0 && { search: searchValue }),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: leadsData,
    isLoading: leadsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['cadence-leads', { memberID, filters, cadenceID, searchValue }],
    getCadenceLeads,
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
    isFetching,
    isFetchingNextPage,
    filters,
    setFilters,
  };
};

export default useCadencesLeads;
