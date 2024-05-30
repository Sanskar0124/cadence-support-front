import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useLinkedinFieldmapping = (companyID) => {
  const PATH = `/v1/company/integration/field-map/extension/`;

  const getLinkedinData = async () => {
    return AuthorizedApi.get(`${PATH}/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: linkedinData, isLoading: isdataLoading } = useQuery(
    'linkedin-integration',
    getLinkedinData
  );

  return {
    linkedinData,
    isdataLoading,
  };
};

export default useLinkedinFieldmapping;
