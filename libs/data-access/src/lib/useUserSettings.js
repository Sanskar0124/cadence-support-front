import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const KEY = 'userSettings';
const ROUTE = 'v1/company/teams/profile/settings';

const useUserSettings = ({ userID }) => {
  const fetchUserSettings = async ({ queryKey }) => {
    const { userID } = queryKey[1];

    return AuthorizedApi.get(`${ROUTE}/${userID}`).then((res) => res.data.data);
  };

  const {
    data: userSettings,
    isLoading: userSettingsLoading,
    error: fetchUserSettingsError,
  } = useQuery([KEY, { userID }], fetchUserSettings);

  return {
    userSettings,
    userSettingsLoading,
    fetchUserSettingsError,
  };
};

export default useUserSettings;
