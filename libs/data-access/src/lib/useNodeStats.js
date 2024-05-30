import { useQuery } from 'react-query';
import { AuthorizedApi } from './api';

const useNodeStats = (node_id, enabled = true) => {
  const fetchNodeStatsApi = () =>
    AuthorizedApi.get(`v1/company/cadences/stats/${node_id}`).then(
      (res) => res.data.data.leadsOnCurrentNode
    );

  const { data: nodeStats, isLoading: nodeStatsLoading } = useQuery(
    ['node-stats', node_id],
    fetchNodeStatsApi,
    {
      enabled,
    }
  );

  return {
    nodeStats,
    nodeStatsLoading,
  };
};

export default useNodeStats;
