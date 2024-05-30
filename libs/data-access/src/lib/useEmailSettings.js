import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useEmailSettings = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getEmailSettings = async () => {
    return await AuthorizedApi.get(
      `${PATH}/setting/company-settings/${companyID}`
    ).then((res) => {
      return res.data.data;
    });
  };

  const { data: emailSettings, isLoading: isEmailSettingsLoading } = useQuery(
    'email-settings-integration',
    getEmailSettings
  );

  return {
    emailSettings,
    isEmailSettingsLoading,
  };
};

export default useEmailSettings;
