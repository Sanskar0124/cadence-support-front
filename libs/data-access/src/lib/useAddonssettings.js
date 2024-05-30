import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useAddonSettings = (companyID) => {
  const PATH = `/v1/company/enrichments/config/`;

  const getaddonSettings = async () => {
    return AuthorizedApi.get(`${PATH}/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: addonsSettings, isLoading: isaddonSettingsLoading } = useQuery(
    'addons-settings-integration',
    getaddonSettings
  );

  return {
    addonsSettings,
    isaddonSettingsLoading,
  };
};

export default useAddonSettings;
