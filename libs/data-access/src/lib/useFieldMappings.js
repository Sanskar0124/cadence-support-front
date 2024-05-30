import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useFieldMappings = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getFieldMappings = async () => {
    return AuthorizedApi.get(`${PATH}/field-map/${companyID}`).then((res) => {
      return res.data.data;
    });
  };
  const { data: fieldMappings, isLoading: isFieldMappingsLoading } = useQuery(
    'field-mappings-integration',
    getFieldMappings
  );

  return {
    fieldMappings,
    isFieldMappingsLoading,
  };
};

export default useFieldMappings;
