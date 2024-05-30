import { useQuery } from 'react-query';
import { AuthorizedApi } from './api';

const KEY = 'users';

const useUsers = (companyID) => {
  const fetchUsersApi = async () => {
    return AuthorizedApi.get(`/v1/company/get-users/${companyID}`).then(
      (res) => res.data.data
    );
  };

  const { data: users, isLoading: usersLoading } = useQuery(KEY, fetchUsersApi);

  return {
    users,
    usersLoading,
  };
};

export default useUsers;
