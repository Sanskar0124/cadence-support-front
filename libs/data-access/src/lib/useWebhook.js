import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useWebhook = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getWebhookSettings = async () => {
    return AuthorizedApi.get(`${PATH}/setting/webhook/${companyID}`).then(
      (res) => {
        return res.data.data;
      }
    );
  };

  const { data: webhookSettings, isLoading: webhookSettingsLoading } = useQuery(
    'webhook-settings',
    getWebhookSettings
  );

  return {
    webhookSettings,
    webhookSettingsLoading,
  };
};

export default useWebhook;
