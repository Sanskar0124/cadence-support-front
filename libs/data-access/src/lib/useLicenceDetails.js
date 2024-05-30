import { AuthorizedApi } from './api';
import { useMutation, useQuery } from 'react-query';

const useLicenseManagement = (companyID) => {
  const PATH = `/v1/company/license/`;

  const getLicenseDetails = async () => {
    return AuthorizedApi.get(`${PATH}${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: licenseDetails,
    isLoading: isLicenseDetailsLoading,
    refetch: refetchLicenseDetails,
    isFetching,
  } = useQuery('license-management', getLicenseDetails);

  const updateLicenseDetails = (body) => {
    return AuthorizedApi.put(`${PATH}`, body).then((res) => res?.data?.data);
  };

  const { mutate: updateLicense, isLoading: isUpdateLicenseLoading } =
    useMutation(updateLicenseDetails);

  return {
    licenseDetails,
    isLicenseDetailsLoading,
    updateLicense,
    isUpdateLicenseLoading,
    refetchLicenseDetails,
    isFetching,
  };
};

export default useLicenseManagement;
