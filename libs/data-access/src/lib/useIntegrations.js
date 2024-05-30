import { AuthorizedApi } from './api';
import { useQuery, useMutation } from 'react-query';

const useIntegrations = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getIntegrations = async () => {
    return AuthorizedApi.get(`${PATH}/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: integrations, isFetching: isIntegrationsFetching } = useQuery(
    'integrations',
    getIntegrations
  );

  const getEmailSettings = async () => {
    return AuthorizedApi.get(
      `${PATH}/setting/company-settings/${companyID}`
    ).then((res) => {
      return res?.data.data;
    });
  };

  const { data: emailSettings, isLoading: isEmailSettingsLoading } = useQuery(
    'email-settings-integration',
    getEmailSettings
  );

  //  here adding a licence management get and put request
  const fetchLicenceDetails = (companyID) => {
    return AuthorizedApi.get(`/v1/company/license/${companyID}`).then(
      (res) => res?.data?.data
    );
  };
  const { mutate: getLicenceDetails, isLoading: isLicenceLoading } =
    useMutation(fetchLicenceDetails);

  return {
    integrations,
    isIntegrationsFetching,
    emailSettings,
    isEmailSettingsLoading,
    getLicenceDetails,
    isLicenceLoading,
  };
};

export default useIntegrations;
