import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const KEY = 'filter-users';

const useFilterUsers = (userID) => {
  const fetchUsersApi = () =>
    AuthorizedApi.get(`/v1/company/teams/user/get-users/${userID}`).then(
      (res) => res.data.data
    );

  const { data: users, isLoading: usersLoading } = useQuery(KEY, fetchUsersApi);

  return {
    users,
    usersLoading,
  };
};

export default useFilterUsers;
