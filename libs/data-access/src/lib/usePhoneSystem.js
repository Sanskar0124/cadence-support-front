import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const usePhoneSystem = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getPhoneSystem = async () => {
    return AuthorizedApi.get(`${PATH}/phone-system/${companyID}`).then(
      (res) => {
        return res.data.data;
      }
    );
  };

  const { data: phoneSystem, isLoading: isPhoneSystemLoading } = useQuery(
    'phone-system-integration',
    getPhoneSystem
  );

  return {
    phoneSystem,
    isPhoneSystemLoading,
  };
};

export default usePhoneSystem;
