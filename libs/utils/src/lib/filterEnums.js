export const DEFAULT_FILTER_OPTIONS = ({ cadence_id }) => {
  let task_cad = [];
  if (cadence_id != null) {
    task_cad.push(cadence_id);
  }
  return {
    // company_size: [],
    task_action: [],
    task_cadences: task_cad,
    // task_completion: [],
    task_date_creation: [],
    // task_tag: [],
    task_type: [],
    task_status: [],
  };
};

export const FILTER_ENUMS_BACKEND = {
  TASK_TYPE: 'task_type',
  TASK_ACTION: 'task_action',
  TASK_STATUS: 'task_status',
  TASK_CADENCES: 'task_cadences',
  TASK_DATE_CREATION: 'task_date_creation',
};

export const TASKS_FILTERS_REQUEST_VALUES = {
  TASK_TYPE_CREATED_BY: 'task_created_by',
  TASK_TYPE_CUSTOM: 'task_custom',

  TASK_ACTION_CALL: 'task_action_call',
  TASK_ACTION_EMAIL: 'task_action_email',
  TASK_ACTION_REPLY_TO: 'task_action_reply_to',
  TASK_ACTION_SMS: 'task_action_sms',
  TASK_ACTION_LINKEDIN: 'task_action_linkedin',
  TASK_ACTION_LINKEDIN_CONNECTION: 'task_action_linkedin_connection',
  TASK_ACTION_LINKEDIN_MESSAGE: 'task_action_linkedin_message',
  TASK_ACTION_LINKEDIN_PROFILE: 'task_action_linkedin_profile',
  TASK_ACTION_LINKEDIN_INTERACT: 'task_action_linkedin_interact',
  TASK_ACTION_CADENCE_CUSTOM: 'task_action_cadence_custom',
  TASK_ACTION_DATA_CHECK: 'task_action_data_check',

  TASK_STATUS_LATE: 'task_status_late',
  TASK_STATUS_URGENT: 'task_status_urgent',
  TASK_STATUS_DONE: 'task_status_done',

  TASK_DATE_CREATION_TODAY: 'task_date_creation_today',
  TASK_DATE_CREATION_YESTERDAY: 'task_date_creation_yesterday',
};
