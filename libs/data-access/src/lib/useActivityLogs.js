import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useActivityLogs = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getActivityLogs = async () => {
    return AuthorizedApi.get(`${PATH}/activities/${companyID}`).then((res) => {
      return res.data.data;
    });
  };

  const { data: activityLogs, isLoading: isActivityLogsLoading } = useQuery(
    'activity-logs-integration',
    getActivityLogs
  );

  return {
    activityLogs,
    isActivityLogsLoading,
  };
};

export default useActivityLogs;
