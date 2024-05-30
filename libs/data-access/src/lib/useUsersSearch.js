import { useMutation, useInfiniteQuery } from 'react-query';
import { AuthorizedApi } from './api';

const RECORDS_PER_PAGE = 10;

const useUsersSearch = (searchValue, activeDiv = 'company') => {
  const searchUsersApi = async ({ queryKey, pageParam: offset = 0 }) => {
    const { searchValue } = queryKey[1];
    return await AuthorizedApi.post('/v1/company/search', {
      limit: 10,
      offset,
      ...(searchValue.length > 0 && { search: searchValue }),
    }).then((res) => res.data.data);
  };

  // const {
  //   mutate: searchUsers,
  //   data: searchResults,
  //   isLoading: searchLoading,
  //   error: searchError,
  // } = useMutation(searchUsersApi);

  const {
    data: searchResults,
    isLoading: searchLoading,
    refetch: fetchSearchResults,
    isRefetching: searchRefetching,
    error: searchError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['search', { searchValue }], searchUsersApi, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.companies?.length) return undefined;
      if (!lastPage?.users?.length) return undefined;
      return pages?.length * RECORDS_PER_PAGE;
    },

    select: (data) => {
      const results = data?.pages?.map((page) => page)?.flat();
      //results data [{companies:array[10],users:array[10]}]
      const resultArray = results.reduce(
        (acc, current) => {
          const companies = acc.companies.concat(current.companies);
          const users = acc.users.concat(current.users);
          return { companies, users };
        },
        { companies: [], users: [] }
      );
      return resultArray;
    },
  });

  return {
    searchResults,
    searchLoading,
    searchError,
    fetchSearchResults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    searchRefetching,
  };
};

export default useUsersSearch;
