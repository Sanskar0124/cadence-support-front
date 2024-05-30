import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useIntegrationSettings = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getSalesforceSettings = async () => {
    return AuthorizedApi.get(`${PATH}/setting/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: salesforceSettings, isLoading: isSalesforceSettingsLoading } =
    useQuery('salesforce-settings-integration', getSalesforceSettings);

  return {
    salesforceSettings,
    isSalesforceSettingsLoading,
  };
};

export default useIntegrationSettings;
