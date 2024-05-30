import { AuthorizedApi } from './api';
import { useMutation } from 'react-query';

const ROUTE = 'v1/dashboard/update-integration';
const ROUTE_1 = '/v1/dashboard/get-integration';

const useUpdateIntegration = () => {
  // CREATE COMPANY
  const updateIntegration = (body) => {
    // delete empty fields for active subscription
    if (body?.is_subscription_active) {
      delete body?.days_added;
    }

    return AuthorizedApi.post(`${ROUTE}`, body).then((res) => res.data);
  };

  const { mutate: updateIntegrationData, isLoading: updateIntegrationLoading } =
    useMutation(updateIntegration);

  const getIntegrationAPI = (companyID) => {
    return AuthorizedApi.get(`${ROUTE_1}/${companyID}`).then(
      (res) => res?.data
    );
  };

  const { mutate: getIntegration, isLoading: getIntegrationLoading } =
    useMutation(getIntegrationAPI);

  const sendEmail = (id) => {
    return AuthorizedApi.get(`/v1/company/teams/user/send-mail/${id}`);
  };

  const { mutate: sendMailInvitation, isLoading: mailinviatationloading } =
    useMutation(sendEmail);

  return {
    updateIntegrationData,
    updateIntegrationLoading,
    getIntegration,
    getIntegrationLoading,
    sendMailInvitation,
    mailinviatationloading,
  };
};

export default useUpdateIntegration;
