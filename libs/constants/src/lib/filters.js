export const TABS = {
  ACTIVITY: 'activity',
  TASKS: 'tasks',
  CADENCE: 'cadence',
  LEADS: 'leads',
  SETTINGS: 'settings',
};

const DEFAULT_FILTER_OPTIONS = {
  [TABS.ACTIVITY]: {
    type: '',
    status: '',
    created_by: '',
    sd_id: '',
  },
  [TABS.TASKS]: {
    task_action: [],
    task_cadences: [],
    task_status: [],
    task_date_creation: [],
    task_type: [],
  },
  [TABS.CADENCE]: {
    created_by: [],
    sd_id: [],
    status: [],
    type: [],
  },
  [TABS.LEADS]: {
    tags: [],
  },
};
export default DEFAULT_FILTER_OPTIONS;
