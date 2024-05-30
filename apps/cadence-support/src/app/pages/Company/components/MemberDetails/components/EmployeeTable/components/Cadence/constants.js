// key for storing active tab in localstorage
export const CADENCE_ACTIVE_TAB_KEY = 'active-tab-cadence';

export const CADENCE_TYPES = {
  PERSONAL: 'personal',
  TEAM: 'team',
  COMPANY: 'company',
};

export const VIEW_MODE_DISABLED_HEADERS = [
  'steps',
  'created_on',
  'created_by',
  'sub_department',
];

export const STEPS_OPTIONS = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
};

export const CADENCE_STATUS = {
  NOT_STARTED: 'not_started',
  PROCESSING: 'processing',
  PAUSED: 'paused',
  IN_PROGRESS: 'in_progress',
  STOPPED: 'stopped',
};

export const CADENCE_PRIORITY = {
  STANDARD: 'standard',
  HIGH: 'high',
};

export const CADENCE_TAGS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
};

export const STATUS_LABELS_CL_NAMES = {
  not_started: 'notStarted',
  paused: 'paused',
  processing: 'processing',
  in_progress: 'inProgress',
  stopped: 'stopped',
  completed: 'completed',
};

export const PRIORITY_LABELS_CL_NAMES = {
  standard: 'standard',
  high: 'high',
};

export const TAG_LABELS_CL_NAMES = {
  inbound: 'inbound',
  outbound: 'outbound',
};

export const CADENCE_INTEGRATIONS = {
  SALESFORCE: 'salesforce',
};

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  DUPLICATE: 'duplicate',
  SHARE: 'share',
};

export const VIEW_MODES = {
  CADENCE_STEP: 'cadence_step',
  CADENCE_PEOPLE: 'cadence_people',
};

export const TAB_OPTIONS = [
  {
    label: 'Steps',
    value: 'Steps',
  },
  {
    label: 'People',
    value: 'People',
  },
];

export const LIST_DROPDOWN_VALUES = {
  LEADS: 'leads',
  ACCOUNTS: 'accounts',
};
