import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const getAddonsUsers = (companyID) => {
  const PATH = `/v1/company/enrichments/sub-departments/`;

  const getUsers = async () => {
    return AuthorizedApi.get(`${PATH}/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: usersData, isLoading: isuserDataLoading } = useQuery(
    'get-user-data',
    getUsers
  );

  return {
    usersData,
    isuserDataLoading,
  };
};

export default getAddonsUsers;
