import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { DEFAULT_FILTER_OPTIONS } from '@cadence-support/constants';

const RECORDS_PER_PAGE = 7;
// import cadenceTypes from 'libs/constants/src/lib/cadenceTypes';

export const VIEW_MODES = {
  CADENCE_STEP: 'cadence_step',
  CADENCE_PEOPLE: 'cadence_people',
};

const useCompanyCadences = ({
  companyID,
  cadenceType,
  memberID = null,
  searchValue = '',
  cadenceID,
}) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS['cadence']);

  const getCadencesAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { memberID, filters, searchValue } = queryKey[1];
    let URL = `/v1/company/cadences/`;

    return AuthorizedApi({
      method: 'GET',
      url: `${URL}${companyID}`,
      params: {
        limit: RECORDS_PER_PAGE,
        type: cadenceType,
        offset: offset,
        // user_id: memberID,
        ...(searchValue.length > 0 && { search: searchValue }),
        ...(filters.created_by.length > 0 && {
          created_by: filters.created_by,
        }),
        ...(filters.sd_id.length > 0 && { sd_id: filters.sd_id }),
        ...(filters.status.length > 0 && { status: filters.status }),
        ...(filters.type.length > 0 && { type: filters.type }),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: cadences,
    isLoading: cadencesLoading,
    fetchNextPage,
    refetch: refetchCadences,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['company-cadence', { cadenceType, memberID, searchValue, filters }],
    getCadencesAPI,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE;
      },
      select: (data) => data?.pages?.map((page) => page)?.flat(),
    }
  );

  return {
    cadences,
    cadencesLoading,
    filters,
    setFilters,
    fetchNextPage,
    refetchCadences,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

export default useCompanyCadences;
