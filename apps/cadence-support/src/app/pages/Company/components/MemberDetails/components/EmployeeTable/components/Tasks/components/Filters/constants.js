// export const FILTER_ENUMS = {
//   TASK_TYPE_ASSIGNED: 'task_assigned',
//   TASK_TYPE_CUSTOM: 'task_custom',
//   TASK_TAG_LATE: 'task_tag_late',
//   TASK_TAG_URGENT: 'task_tag_urgent',
//   TASK_ACTION_CALL: 'task_action_call',
//   TASK_ACTION_LINKEDIN_CONNECTION: 'task_action_linkedin_connection',
//   TASK_ACTION_LINKEDIN_MESSAGE: 'task_action_linkedin_message',
//   TASK_ACTION_LINKEDIN_PROFILE: 'task_action_linkedin_profile',
//   TASK_ACTION_LINKEDIN_INTERACT: 'task_action_linkedin_interact',
//   TASK_ACTION_EMAIL: 'task_action_email',
//   TASK_ACTION_REPLY_TO: 'task_action_reply_to',
//   TASK_ACTION_SMS: 'task_action_sms',
//   TASK_ACTION_DATA_CHECK: 'task_action_data_check',
//   TASK_ACTION_CADENCE_CUSTOM: 'task_action_cadence_custom',
//   TASK_COMPLETION_DUE: 'task_completion_due',
//   TASK_COMPLETION_DONE: 'task_completion_done',
//   COMPANY_SIZE_MICRO: 'company_size_micro',
//   COMPANY_SIZE_SMALL: 'company_size_small',
//   COMPANY_SIZE_MEDIUM: 'company_size_medium',
//   COMPANY_SIZE_LARGE: 'company_size_large',
//   FAVOURITE: 'favourite',
//   TASK_DATE_CREATION_TODAY: 'task_date_creation_today',
//   TASK_DATE_CREATION_YESTERDAY: 'task_date_creation_yesterday',
// };
export const TASKS_FILTERS_REQUEST_VALUES = {
  TASK_TYPE_CREATED_BY: 'task_created_by',
  TASK_TYPE_CUSTOM: 'task_custom',

  TASK_ACTION_CALL: 'task_action_call',
  TASK_ACTION_EMAIL: 'task_action_email',
  TASK_ACTION_REPLY_TO: 'task_action_reply_to',
  TASK_ACTION_SMS: 'task_action_sms',
  TASK_ACTION_LINKEDIN: 'task_action_linkedin',
  TASK_ACTION_CADENCE_CUSTOM: 'task_action_cadence_custom',
  TASK_ACTION_DATA_CHECK: 'task_action_data_check',

  TASK_STATUS_LATE: 'task_status_late',
  TASK_STATUS_URGENT: 'task_status_urgent',
  TASK_STATUS_DONE: 'task_status_done',

  TASK_DATE_CREATION_TODAY: 'task_date_creation_today',
  TASK_DATE_CREATION_YESTERDAY: 'task_date_creation_yesterday',
};

export const DEFAULT_FILTER_OPTIONS = {
  task_type: [],
  task_tag: [],
  task_action: [],
  task_completion: [],
  company_size: [],
  favourite: false,
  task_date_creation: [],
  task_cadences: [],
};

export const COMPANY_SIZE_ENUMS = {
  company_size_1_10: '1-10',
  company_size_11_50: '11-50',
  company_size_51_200: '51-200',
  company_size_201_500: '201-500',
  company_size_501_1000: '501-1000',
  company_size_1001_5000: '1001-5000',
  company_size_5000_10000: '5000-10000',
  company_size_10000: '10000+',
};
