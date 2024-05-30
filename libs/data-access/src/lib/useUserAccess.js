import { AuthorizedApi } from './api';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from 'react-query';

const RECORDS_PER_PAGE = 20;

const useUserAccess = ({ enabled }, searchValue) => {
  const getRingoverUsers = async () => {
    return await AuthorizedApi.get('/v1/user/ringover-users').then((res) => {
      return res.data.data;
    });
  };
  const { data: ringoverUsers, isLoading: ringoverUsersLoading } = useQuery(
    ['fetch-ringover-users'],
    getRingoverUsers,
    { enabled }
  );
  const fetchusers = async ({ queryKey, pageParam: offset = 0 }) => {
    const { searchValue } = queryKey[1];
    return await AuthorizedApi.get('/v1/user', {
      params: {
        limit: 10,
        offset,
        ...(searchValue.length > 0 && { search: searchValue }),
      },
    }).then((res) => res.data.data);
  };
  const {
    data: supportUsers,
    isLoading: isfetchuserLoading,
    refetch: fetchSupportUsers,
    isRefetching: supportUsersRefetching,
    error: fetchsupportUsersError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['fetch-users', { searchValue }], fetchusers, {
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length) return undefined;
      return pages.length * RECORDS_PER_PAGE;
    },

    select: (data) => data?.pages?.map((page) => page)?.flat(),
  });

  const deleteSupportUser = async ({ id }) => {
    return await AuthorizedApi.put(`/v1/user/remove/${id}`).then(
      (res) => res.data.data
    );
  };

  const {
    mutate: removeUser,
    isLoading: removeUserLoading,
    isError: removeUserError,
  } = useMutation(deleteSupportUser);

  const addSupportUsers = async (body) => {
    return await AuthorizedApi.put(`/v1/user/add`, body).then(
      (res) => res.data.data
    );
  };

  const {
    mutate: addUsers,
    isLoading: addUsersLoading,
    isError: addUsersError,
  } = useMutation(addSupportUsers);

  const getAccess = async ({ id, role }) => {
    return await AuthorizedApi.patch(
      `/v1/user/update/${id}?support_role=${role}`
    );
  };

  const {
    mutate: changeAccess,
    isLoading: changeAccessLoading,
    isError: changeAccessError,
  } = useMutation(getAccess);

  return {
    supportUsers,
    isfetchuserLoading,
    ringoverUsers,
    ringoverUsersLoading,
    fetchSupportUsers,
    supportUsersRefetching,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
    removeUser,
    removeUserLoading,
    addUsers,
    addUsersLoading,
    changeAccess,
    changeAccessLoading,
  };
};

export default useUserAccess;
