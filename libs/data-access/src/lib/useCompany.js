import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

const KEY = 'company';
const ROUTE = '/v1/company';
const ROUTE1 = '/marketplace/v1/company';
const TEMPLATES_PER_PAGE = 10;

const useCompany = (enabled = true, filters) => {
  const fetchCompanyAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const filters = queryKey[1];
    const body = filters;
    return AuthorizedApi.post(ROUTE, body, {
      params: {
        limit: 10,
        offset,
      },
    }).then((res) => res.data.data);
  };

  const {
    data: companies,
    isLoading: companiesLoading,
    isRefetching: companiesRefetching,
    error: fetchCompaniesError,
    refetch: refetchCompanies,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery([KEY, filters], fetchCompanyAPI, {
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length) return undefined;
      return pages.length * TEMPLATES_PER_PAGE;
    },
    select: (data) => data?.pages?.map((page) => page)?.flat(),
  });

  // CREATE COMPANY
  const createNewCompanyApi = (body) =>
    AuthorizedApi.post(`${ROUTE}`, body).then((res) => res.data.data);

  const {
    mutate: createCompany,
    data: newCompanyData,
    isLoading: newCompanyLoading,
  } = useMutation(createNewCompanyApi);

  //fetch company details on specific user clicks

  const FetchCompanyDetails = (id) => {
    return AuthorizedApi.get(`/v1/company/${id}`).then(
      (res) => res?.data?.data
    );
  };

  const {
    mutate: getCompanyDetails,
    data: companyData,
    isLoading: companyDataLoading,
  } = useMutation(FetchCompanyDetails, { enabled });

  return {
    companies,
    companiesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    createCompany,
    newCompanyData,
    newCompanyLoading,
    refetchCompanies,
    companiesRefetching,
    companyData,
    companyDataLoading,
    getCompanyDetails,
  };
};

export default useCompany;
