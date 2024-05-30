import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useCadencesSteps = ({ memberID, cadenceID, integrationType = null }) => {
  const getCadenceSteps = async ({ queryKey }) => {
    const { memberID, cadenceID } = queryKey[1];

    let URL = `/v1/company/cadences/steps/`;

    return AuthorizedApi.get(`${URL}${cadenceID}`, {
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
  } = useQuery(['cadence-steps', { memberID, cadenceID }], getCadenceSteps);

  //get stats for steps

  const getStepsStats = async ({ queryKey }) => {
    const { cadenceID, integrationType } = queryKey[1];
    let URL = '/v1/company/cadences/statistics/';
    const res = await AuthorizedApi.get(
      `${URL}${cadenceID}?integration_type=${integrationType} `
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
    [
      'steps-stats',
      { cadenceID, integrationType: integrationType ?? 'salesforce' },
    ],
    getStepsStats
  );

  return {
    stepsData,
    stepsLoading,
    stepsRefetching,
    stepsStats,
    stepsStatsLoading,
  };
};

export default useCadencesSteps;
