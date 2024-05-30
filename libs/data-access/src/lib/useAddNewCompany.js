import { AuthorizedApi } from './api';
import { useMutation } from 'react-query';

const ROUTE = '/v1/dashboard/create-company';

const useAddNewCompany = () => {
  // CREATE COMPANY
  const createNewCompanyApi = (body) => {
    // delete empty fields for phone system
    if (body?.integration?.ringover_user_id) {
      body.integration.phone_system = 'ringover';
    }
    if (body?.integration?.ringover_user_id === '') {
      delete body.integration.ringover_user_id;
      body.integration.phone_system = 'none';
    }
    if (body?.integration?.ringover_api_key === '')
      delete body.integration.ringover_api_key;
    if (!body?.integration?.is_trial_active) delete body.integration.days_added;
    if (!body?.integration?.ringover_team_id)
      delete body.integration.ringover_team_id;

    return AuthorizedApi.post(`${ROUTE}`, body).then((res) => res.data);
  };

  const {
    mutate: createCompany,
    data: newCompanyData,
    isLoading: newCompanyLoading,
  } = useMutation(createNewCompanyApi);

  return {
    createCompany,
    newCompanyData,
    newCompanyLoading,
  };
};

export default useAddNewCompany;
