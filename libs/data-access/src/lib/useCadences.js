import React, { useState, useEffect } from 'react';
import { AuthorizedApi } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  DEFAULT_FILTER_OPTIONS,
  INTEGRATION_TYPE,
  USER_INTEGRATION_TYPES,
} from '@cadence-support/constants';

const RECORDS_PER_PAGE = 7;

export const VIEW_MODES = {
  CADENCE_STEP: 'cadence_step',
  CADENCE_PEOPLE: 'cadence_people',
};

const useCadences = ({
  memberID,
  cadenceID = null,
  searchValue = '',
  viewMode = null,
  integrationType,
}) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_OPTIONS['cadence']);

  const getCadencesAPI = async ({ queryKey, pageParam: offset = 0 }) => {
    const { memberID, searchValue, filters } = queryKey[1];

    let URL = `/v1/company/teams/cadence`;

    return AuthorizedApi({
      method: 'GET',
      url: URL,
      params: {
        limit: RECORDS_PER_PAGE,
        offset,
        user_id: memberID,
        ...(searchValue.length > 0 && { search: searchValue }),
        ...(filters.created_by.length > 0 && {
          created_by: filters.created_by,
        }),
        ...(filters.sd_id.length > 0 && { sd_id: filters.sd_id }),
        ...(filters.status.length > 0 && { status: filters.status }),
        ...(filters.type.length > 0 && { type: filters.type }),
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: cadences,
    isLoading: cadencesLoading,
    fetchNextPage,
    refetch: refetchCadences,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['cadence', { memberID, searchValue, filters }],
    getCadencesAPI,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.length) return undefined;
        return pages.length * RECORDS_PER_PAGE - 1;
      },
      select: (data) => data?.pages?.map((page) => page)?.flat(),
      enabled: !viewMode,
    }
  );

  const fetchStepsAPI = async ({ queryKey }) => {
    const { memberID, cadenceID } = queryKey[1];

    let URL = `/v1/company/cadences/steps`;

    return AuthorizedApi.get(`${URL}/${cadenceID}`, {
      params: {
        user_id: memberID,
      },
    }).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: stepsData,
    isLoading: stepsLoading,
    isFetching: stepsRefetching,
  } = useQuery(['cadences-steps', { memberID, cadenceID }], fetchStepsAPI, {
    enabled: viewMode === VIEW_MODES.CADENCE_STEP,
  });

  //get stats for steps

  const getStepsStats = async ({ queryKey }) => {
    const { cadenceID } = queryKey[1];
    if (integrationType === USER_INTEGRATION_TYPES.SALESFORCE_OWNER)
      integrationType = INTEGRATION_TYPE.SALESFORCE;
    if (integrationType === USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER)
      integrationType = INTEGRATION_TYPE.GOOGLE_SHEETS;
    if (integrationType === USER_INTEGRATION_TYPES.PIPEDRIVE_USER)
      integrationType = INTEGRATION_TYPE.PIPEDRIVE;
    if (integrationType === USER_INTEGRATION_TYPES.HUBSPOT_OWNER)
      integrationType = INTEGRATION_TYPE.HUBSPOT;
    if (integrationType === USER_INTEGRATION_TYPES.EXCEL_USER)
      integrationType = INTEGRATION_TYPE.EXCEL;
    const res = await AuthorizedApi.get(
      `/v1/company/cadences/statistics/${cadenceID}?integration_type=${integrationType}
      `
    );

    let stepStats = res.data.data.nodeStats?.map((node) => {
      let stats = {
        ...node,
        convertedLeadsCount: 0,
        disqualifiedLeadsCount: 0,
        doneTasksCount: 0,
        skippedTasksCount: 0,
        scheduledLeadsCount: 0,
        currentLeadsCount: 0,
      };
      if (stats?.aBTestEnabled && stats?.data?.length) {
        let statsData = {};
        stats?.data?.forEach((item) => {
          statsData[item?.ab_template_id] = item;
        });
        stats.data = statsData;
      } else if (stats?.data?.length) stats.data = stats?.data[0];
      else delete stats?.data;
      if (stats?.doneAndSkippedTasksForCurrentNode?.length) {
        stats.doneTasksCount =
          stats?.doneAndSkippedTasksForCurrentNode[0]?.completed_count;
        stats.skippedTasksCount =
          stats?.doneAndSkippedTasksForCurrentNode[0]?.skipped_count;
      }
      if (stats?.leadsOnCurrentNode?.length) {
        stats.scheduledLeadsCount =
          stats?.leadsOnCurrentNode[0]?.scheduled_count;
        stats.currentLeadsCount = stats?.leadsOnCurrentNode[0]?.current_count;
      }
      if (stats?.disqualifedAndConvertedLeads?.length) {
        stats?.disqualifedAndConvertedLeads.forEach((lead) => {
          switch (lead?.status) {
            case 'converted':
              stats.convertedLeadsCount += lead?.count ?? 1;
              break;
            case 'trash':
              stats.disqualifiedLeadsCount += lead?.count ?? 1;
          }
        });
      }
      delete stats?.leadsOnCurrentNode;
      delete stats?.doneAndSkippedTasksForCurrentNode;
      delete stats?.disqualifedAndConvertedLeads;
      return stats;
    });
    return stepStats;
  };

  const { data: stepsStats, isLoading: stepsStatsLoading } = useQuery(
    ['steps-stats', { cadenceID, integrationType: integrationType }],
    getStepsStats,
    {
      enabled: viewMode === VIEW_MODES.CADENCE_STEP,
    }
  );

  return {
    cadences,
    cadencesLoading,
    refetchCadences,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    stepsData,
    stepsLoading,
    stepsRefetching,
    stepsStats,
    stepsStatsLoading,
    filters,
    setFilters,
  };
};

export default useCadences;
