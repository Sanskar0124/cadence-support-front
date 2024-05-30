import { useMutation } from 'react-query';
import { AuthorizedApi } from './api';

const V4_Route = '/v1/dashboard/health-check?service';

const useHomePage = () => {
  //FETCH Calendar Services
  const fetchCalendarServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=calendar`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: calendarServices,
    data: calendarServicesdata,
    isLoading: calendarServicesLoading,
  } = useMutation(fetchCalendarServices);

  //FETCH Backend Services
  const fetchBackendServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=backend`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: backendServices,
    data: backendServicesdata,
    isLoading: backendServicesLoading,
  } = useMutation('company-count', fetchBackendServices);

  //FETCH CadenceTracking.com Services
  const fetchCadenceTrackingServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=cadencetracking.com`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: cadenceTrackingServices,
    data: cadenceTrackingServicesdata,
    isLoading: cadencetrackingServicesLoading,
  } = useMutation('company-count', fetchCadenceTrackingServices);

  //FETCH Call Services
  const fetchCallServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=call`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: callServices,
    data: callServicesdata,
    isLoading: callServicesLoading,
  } = useMutation('company-count', fetchCallServices);

  //FETCH Mail Services
  const fetchMailServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=mail`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: mailServices,
    data: mailServicesdata,
    isLoading: mailServicesLoading,
  } = useMutation('company-count', fetchMailServices);

  //FETCH Task Services
  const fetchTaskServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=task`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: taskServices,
    data: taskServicesdata,
    isLoading: taskServicesLoading,
  } = useMutation('company-count', fetchTaskServices);

  //FETCH Lead-extension Services
  const fetchLeadExtensionServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=lead-extension`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: leadExtensionServices,
    data: leadExtensionServicesdata,
    isLoading: leadExtensionServicesLoading,
  } = useMutation('company-count', fetchLeadExtensionServices);

  //FETCH Marketplace Services
  const fetchMarketplaceServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=marketplace`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: marketplaceServices,
    data: marketplaceServicesdata,
    isLoading: marketplaceServicesLoading,
  } = useMutation('company-count', fetchMarketplaceServices);

  //FETCH Cadence-dev Services
  const fetchCadenceDevServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=cadence-dev`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: cadencedevServices,
    data: cadenceDevServicesdata,
    isLoading: cadenceDevServicesLoading,
  } = useMutation('company-count', fetchCadenceDevServices);

  //FETCH Automated-workflow Services
  const fetchAutomatedWorkflowServices = async () => {
    return await AuthorizedApi.get(`${V4_Route}=automated-workflow`, {}).then(
      (res) => res.data
    );
  };

  const {
    mutate: automatedWorkflowServices,
    data: automatedWorkflowServicesdata,
    isLoading: automatedWorkflowServicesLoading,
  } = useMutation('company-count', fetchAutomatedWorkflowServices);

  return {
    calendarServices,
    calendarServicesdata,
    calendarServicesLoading,
    backendServices,
    backendServicesdata,
    backendServicesLoading,
    callServices,
    callServicesdata,
    callServicesLoading,
    cadenceTrackingServices,
    cadenceTrackingServicesdata,
    cadencetrackingServicesLoading,
    mailServices,
    mailServicesdata,
    mailServicesLoading,
    cadencedevServices,
    cadenceDevServicesdata,
    cadenceDevServicesLoading,
    taskServices,
    taskServicesdata,
    taskServicesLoading,
    leadExtensionServices,
    leadExtensionServicesdata,
    leadExtensionServicesLoading,
    marketplaceServices,
    marketplaceServicesdata,
    marketplaceServicesLoading,
    automatedWorkflowServices,
    automatedWorkflowServicesdata,
    automatedWorkflowServicesLoading,
  };
};

export default useHomePage;
