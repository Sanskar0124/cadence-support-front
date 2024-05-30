import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';
import {
  INTEGRATION_TYPE,
  USER_INTEGRATION_TYPES,
} from '@cadence-support/constants';

const KEY = 'profile';
const ROUTE = '/v1/company/teams/profile';

const useUserProfile = (memberID, integration_type) => {
  const fetchUserAPI = async ({ queryKey }) => {
    const { memberID } = queryKey[1];
    if (integration_type === USER_INTEGRATION_TYPES.SALESFORCE_OWNER)
      integration_type = INTEGRATION_TYPE.SALESFORCE;
    if (integration_type === USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER)
      integration_type = INTEGRATION_TYPE.GOOGLE_SHEETS;
    if (integration_type === USER_INTEGRATION_TYPES.PIPEDRIVE_USER)
      integration_type = INTEGRATION_TYPE.PIPEDRIVE;
    if (integration_type === USER_INTEGRATION_TYPES.HUBSPOT_OWNER)
      integration_type = INTEGRATION_TYPE.HUBSPOT;
    if (integration_type === USER_INTEGRATION_TYPES.EXCEL_USER)
      integration_type = INTEGRATION_TYPE.EXCEL;

    return AuthorizedApi.get(
      `${ROUTE}/${memberID}?integration_type=${integration_type}`
    ).then((res) => res.data.data);
  };

  const {
    data: userData,
    isLoading: userLoading,
    error: fetchUserError,
  } = useQuery([KEY, { memberID }], fetchUserAPI);

  return {
    userData,
    userLoading,
    fetchUserError,
  };
};

export default useUserProfile;
