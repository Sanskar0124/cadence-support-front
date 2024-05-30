import { useState, useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { CadenceAuthorizedApi } from './api';

const RECORDS_PER_PAGE = 20;
const KEY = 'templates';

const useCadencesTemplates = ({ enabled = true }) => {
  const fetchCadencesTemplateApi = async ({ pageParam }) => {
    return await CadenceAuthorizedApi.get('/v2/support/cadence-template', {
      params: {
        ...(pageParam, { created_at: pageParam }),
      },
    }).then((res) => res.data.data);
  };
  const {
    data: cadenceTemplatesData,
    isLoading: cadenceTemplateLoading,
    refetch: fetchCadenceTemplate,
    isRefetching: cadenceTemplateRefetching,
    error: fetchCadenceTemplateError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery([KEY], fetchCadencesTemplateApi, {
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length) return undefined;
      // return pages.length * RECORDS_PER_PAGE;
      return lastPage?.[lastPage.length - 1]?.created_at;
    },

    select: (data) => data?.pages?.map((page) => page)?.flat(),
  });

  const sendTemplate = (body) => {
    const URL = '/v2/support/cadence-template';
    return CadenceAuthorizedApi.post(URL, body).then((res) => {
      return res?.data?.data;
    });
  };

  const {
    mutate: createCadenceTemplate,
    data,
    isLoading: templateLoading,
    isSuccess: success,
  } = useMutation(sendTemplate);

  const deleteCadenceApi = (cadence) =>
    CadenceAuthorizedApi.delete(
      `v2/support/cadence-template/${cadence?.cadence_template_id}`
    ).then((res) => res.data.data);

  const {
    mutate: deleteCadenceTemplate,
    isLoading: deleteCadenceTemplateLoading,
  } = useMutation(deleteCadenceApi);

  const updateCadenceApi = (cadence) => {
    CadenceAuthorizedApi.put(
      `v2/support/cadence-template/${cadence?.id}`,
      cadence?.body
    ).then((res) => res?.data);
  };

  const {
    mutate: updateCadenceTemplate,
    isLoading: updateCadenceTemplateLoading,
  } = useMutation(updateCadenceApi);

  return {
    cadenceTemplatesData,
    cadenceTemplateLoading,
    cadenceTemplateRefetching,
    fetchCadenceTemplate,
    fetchCadenceTemplateError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    createCadenceTemplate,
    data,
    templateLoading,
    success,
    deleteCadenceTemplate,
    deleteCadenceTemplateLoading,
    updateCadenceTemplate,
    updateCadenceTemplateLoading,
  };
};
export default useCadencesTemplates;
