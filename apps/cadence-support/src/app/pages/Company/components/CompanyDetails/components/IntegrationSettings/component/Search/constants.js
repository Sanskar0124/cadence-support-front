import { INTEGRATION_TYPE } from '@cadence-support/constants';

export const SEARCH_CATEGORY = {
  EMAILS: 'Emails',
  TASK_AND_CADENCE: 'Task and Cadences',
};
export const SEARCH_OPTIONS = {
  //general settings
  SENDING_CALENDAR: 'Sending calendar',
  UNSUBSCRIBE_RULES: 'Unsubscribe rules',
  BOUNCED_EMAIL_RULES: 'Bounced rules',
  DOMAIN_VERIFICATION: 'Domain verification',
  TASK_SETTINGS: 'Task settings',
  SKIP_TASK_SETTINGS: 'Skip task settings',
  LEAD_SCORING: 'Lead Scroing',
  STANDARD_WORKFLOW: 'Standard Workflow',
  ADVANCED_WORKFLOW: 'Advanced Workflow',
  WEBHOOK: 'Webhook',
};

export const getSearchCategoryLabel = (category) => {
  return {
    //general settings
    [SEARCH_CATEGORY.EMAILS]: SEARCH_CATEGORY.EMAILS,
    [SEARCH_CATEGORY.TASK_AND_CADENCE]: SEARCH_CATEGORY.TASK_AND_CADENCE,
  }[category];
};

export const getSearchOptions = () => {
  return [
    //general settings
    {
      category: SEARCH_CATEGORY.EMAILS,
      label: SEARCH_OPTIONS.SENDING_CALENDAR,
      keywords: [SEARCH_CATEGORY.EMAILS, SEARCH_OPTIONS.SENDING_CALENDAR],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.SENDING_CALENDAR}`,
    },
    {
      category: SEARCH_CATEGORY.EMAILS,
      label: SEARCH_OPTIONS.UNSUBSCRIBE_RULES,
      keywords: [SEARCH_CATEGORY.EMAILS, SEARCH_OPTIONS.UNSUBSCRIBE_RULES],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.UNSUBSCRIBE_RULES}`,
    },
    {
      category: SEARCH_CATEGORY.EMAILS,
      label: SEARCH_OPTIONS.BOUNCED_EMAIL_RULES,
      keywords: [SEARCH_CATEGORY.EMAILS, SEARCH_OPTIONS.BOUNCED_EMAIL_RULES],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.BOUNCED_EMAIL_RULES}`,
    },
    {
      category: SEARCH_CATEGORY.EMAILS,
      label: SEARCH_OPTIONS.DOMAIN_VERIFICATION,
      keywords: [SEARCH_CATEGORY.EMAILS, SEARCH_OPTIONS.DOMAIN_VERIFICATION],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.DOMAIN_VERIFICATION}`,
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.TASK_SETTINGS,
      keywords: [
        SEARCH_CATEGORY.TASK_AND_CADENCE,
        SEARCH_OPTIONS.TASK_SETTINGS,
      ],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.TASK_SETTINGS}`,
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.SKIP_TASK_SETTINGS,
      keywords: [
        SEARCH_CATEGORY.TASK_AND_CADENCE,
        SEARCH_OPTIONS.SKIP_TASK_SETTINGS,
      ],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.SKIP_TASK_SETTINGS}`,
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.LEAD_SCORING,
      keywords: [SEARCH_CATEGORY.TASK_AND_CADENCE, SEARCH_OPTIONS.LEAD_SCORING],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.LEAD_SCORING}`,
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.STANDARD_WORKFLOW,
      keywords: [
        SEARCH_CATEGORY.TASK_AND_CADENCE,
        SEARCH_OPTIONS.STANDARD_WORKFLOW,
      ],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.WORKFLOWS}`,
      integration_not_available: [INTEGRATION_TYPE.GOOGLE_SHEETS],
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.ADVANCED_WORKFLOW,
      keywords: [
        SEARCH_CATEGORY.TASK_AND_CADENCE,
        SEARCH_OPTIONS.ADVANCED_WORKFLOW,
      ],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.WORKFLOWS}`,
      integration_not_available: [
        INTEGRATION_TYPE.GOOGLE_SHEETS,
        INTEGRATION_TYPE.DYNAMICS,
      ],
    },
    {
      category: SEARCH_CATEGORY.TASK_AND_CADENCE,
      label: SEARCH_OPTIONS.WEBHOOK,
      keywords: [SEARCH_CATEGORY.TASK_AND_CADENCE, SEARCH_OPTIONS.WEBHOOK],
      //   link: `?view=${TABS.GENERAL_SETTINGS}&search=${SEARCH_OPTIONS.WEBHOOK}`,
      integration_not_available: Object.values(INTEGRATION_TYPE).filter(
        (it) =>
          it !== INTEGRATION_TYPE.SALESFORCE && it !== INTEGRATION_TYPE.HUBSPOT
      ),
    },
  ];
};
