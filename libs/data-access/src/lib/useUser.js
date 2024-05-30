import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useQuery, useMutation } from 'react-query';

const KEY = 'user';
const ROUTE = '/v1/company/teams/user';

const useUser = ({ memberID }) => {
  const fetchUserAPI = async ({ queryKey }) => {
    const { memberID } = queryKey[1];
    if (memberID !== undefined) {
      return AuthorizedApi.get(`${ROUTE}/${memberID}`).then(
        (res) => res.data.data
      );
    }
  };

  const {
    data: userData,
    isLoading: userLoading,
    error: fetchUserError,
    refetch: fetchUserData,
  } = useQuery([KEY, { memberID }], fetchUserAPI);

  const getProductTourStatus = async (id) => {
    return await AuthorizedApi.put(`/v1/user/complete-product-tour/${id}`).then(
      (res) => res?.data?.data
    );
  };
  const {
    mutate: productTourStatus,
    isLoading: productTourStatusLoading,
    isError: productTourStatusError,
  } = useMutation(getProductTourStatus);

  return {
    userData,
    userLoading,
    fetchUserError,
    productTourStatus,
    fetchUserData,
    productTourStatusLoading,
    productTourStatusError,
  };
};

export default useUser;
