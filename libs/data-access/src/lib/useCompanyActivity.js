import { useInfiniteQuery, useQuery } from 'react-query';
import { AuthorizedApi } from './api';

const PATH = '/v1/dashboard/activity';
const V1_ROUTE = '/v1/dashboard/status';
const V2_ROUTE = '/v1/dashboard/integrations';
const RECORDS_PER_PAGE = 10;

const useCompanyActivity = (searchValue) => {
  // Fetch Company Activity
  const getCompanyActivity = async ({ queryKey, pageParam: offset = 0 }) => {
    const { searchValue } = queryKey[1];

    return AuthorizedApi.get(PATH, {
      params: {
        limit: RECORDS_PER_PAGE,
        offset,
        ...(searchValue?.length > 0 && { search: searchValue }),
      },
    }).then((res) => res.data.data);
  };

  const {
    data: companyActivity,
    isLoading: companyActivityLoading,
    isRefetching: companyActivityRefetching,
    error: fetchCompanyActivityError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['company-activity', { searchValue }],
    getCompanyActivity,
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

  // Fetch Company Count

  const fetchCompanyCount = async () => {
    return await AuthorizedApi.get(V1_ROUTE).then((res) => res.data.data);
  };

  const { data: companyData, isLoading: companyDataLoading } = useQuery(
    'company-status',
    fetchCompanyCount
  );

  // Fetch Integrations Details
  const fetchIntegration = async () => {
    return await AuthorizedApi.get(V2_ROUTE).then((res) => res.data.data);
  };

  const {
    data: integrationsData,
    isLoading: integrationsLoading,
    isRefetching: integrationsRefetching,
  } = useQuery('integrations', fetchIntegration);

  return {
    companyActivity,
    companyActivityLoading,
    companyActivityRefetching,
    fetchCompanyActivityError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    companyData,
    companyDataLoading,
    integrationsData,
    integrationsLoading,
    integrationsRefetching,
  };
};

export default useCompanyActivity;
