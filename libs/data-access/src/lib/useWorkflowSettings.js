import { AuthorizedApi } from './api';
import { useQuery } from 'react-query';

const useWorkFlowSettings = (companyID) => {
  const PATH = `/v1/company/integration`;

  const getWorkflowSettings = async () => {
    return AuthorizedApi.get(`${PATH}/setting/workflow/${companyID}`).then(
      (res) => {
        return res.data.data;
      }
    );
  };

  const { data: workflowSettings, isLoading: isWorkflowSettingsLoading } =
    useQuery('workflow-settings', getWorkflowSettings);

  const getAutomatedWorkflowSettings = async () => {
    return AuthorizedApi.get(
      `${PATH}/setting/automated-workflow/${companyID}`
    ).then((res) => {
      return res.data.data;
    });
  };

  const {
    data: automatedWorkflowSettings,
    isLoading: automatedWorkflowSettingsLoading,
  } = useQuery('automated-workflow-settings', getAutomatedWorkflowSettings);

  return {
    workflowSettings,
    isWorkflowSettingsLoading,
    automatedWorkflowSettings,
    automatedWorkflowSettingsLoading,
  };
};

export default useWorkFlowSettings;
