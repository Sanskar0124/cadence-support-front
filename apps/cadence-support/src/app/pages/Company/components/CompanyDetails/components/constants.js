import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { INTEGRATION_TYPES } from '../../../constants';

export const SETTING_TABS = {
  SALESFORCE_SETUP: 'Salesforce Set-up',
  ZOHO_SETUP: 'Zoho Set-up',
  PIPEDRIVE_SETUP: 'Pipedrive Set-up',
  HUBSPOT_SETUP: 'Hubspot Set-up',
  SELLSY_SETUP: 'Sellsy Set-up',
  SHEETS_SETUP: 'Sheets Set-up',
  DYNAMICS_SETUP: 'Dynamics Set-up',
  BULLHORN_SETUP: 'Bullhorn Set-up',
  FIELD_MAPPING: 'Field mapping',
  ACTIVITY_LOGS: 'Activity logs',
  EMAIL_SETUP: 'Email Setup',
  PHONE_SYSTEM: 'Phone System',
  SETTINGS: 'Settings',
  SENDING_CALENDAR: 'Sending calendar',
  UNSUBSCRIBE_RULES: 'Unsubscribe rules',
  BOUNCED_MAILS: 'Bounced rules',
  DOMAIN_VARIFICATION: 'Domain verification',
  WEBHOOK: 'Webhook',
  TASK_SETTINGS: 'Task settings',
  SKIP_TASK_SETTING: 'Skip task settings',
  LEAD_SCORING: 'Lead Scroing',
  STANDARD_WORKFLOW: 'Standard Workflow',
  ADVANCED_WORKFLOW: 'Advanced Workflow',
  EMAIL: 'Emails',
  TASK_CADENCE: 'Task and Cadences',
  WORKING_DAYS: 'Working days',
};

export const COMMON_TABS = [
  {
    title: SETTING_TABS.FIELD_MAPPING,
    subTabs: [],
  },
  {
    title: SETTING_TABS.ACTIVITY_LOGS,
    subTabs: [],
  },
  {
    title: SETTING_TABS.EMAIL_SETUP,
    subTabs: [],
  },
  {
    title: SETTING_TABS.PHONE_SYSTEM,
    subTabs: [],
  },
];

export const getSettingpageTabOptions = (integration_type) => {
  switch (integration_type) {
    case INTEGRATION_TYPE.SALESFORCE:
    case INTEGRATION_TYPE.HUBSPOT:
      return [
        {
          title:
            integration_type === 'salesforce'
              ? SETTING_TABS.SALESFORCE_SETUP
              : SETTING_TABS.HUBSPOT_SETUP,
          subTabs: [],
        },
        ...COMMON_TABS,
        {
          title: SETTING_TABS.SETTINGS,
          subTabs: [
            {
              name: SETTING_TABS.EMAIL,
              innerTabs: [
                SETTING_TABS.SENDING_CALENDAR,
                SETTING_TABS.UNSUBSCRIBE_RULES,
                SETTING_TABS.BOUNCED_MAILS,
                SETTING_TABS.DOMAIN_VARIFICATION,
              ],
            },
            {
              name: SETTING_TABS.TASK_CADENCE,
              innerTabs: [
                SETTING_TABS.TASK_SETTINGS,
                SETTING_TABS.SKIP_TASK_SETTING,
                SETTING_TABS.LEAD_SCORING,
                SETTING_TABS.STANDARD_WORKFLOW,
                SETTING_TABS.ADVANCED_WORKFLOW,
                SETTING_TABS.WEBHOOK,
              ],
            },
          ],
        },
      ];

    case INTEGRATION_TYPE.ZOHO:
    case INTEGRATION_TYPE.SELLSY:
    case INTEGRATION_TYPE.BULLHORN:
    case INTEGRATION_TYPE.PIPEDRIVE:
      return [
        {
          title:
            integration_type === 'zoho'
              ? SETTING_TABS.ZOHO_SETUP
              : integration_type === 'bullhorn'
              ? SETTING_TABS.BULLHORN_SETUP
              : integration_type === 'pipedrive'
              ? SETTING_TABS.PIPEDRIVE_SETUP
              : SETTING_TABS.SELLSY_SETUP,
          subTabs: [],
        },
        ...COMMON_TABS,
        {
          title: SETTING_TABS.SETTINGS,
          subTabs: [
            {
              name: SETTING_TABS.EMAIL,
              innerTabs: [
                SETTING_TABS.SENDING_CALENDAR,
                SETTING_TABS.UNSUBSCRIBE_RULES,
                SETTING_TABS.BOUNCED_MAILS,
                SETTING_TABS.DOMAIN_VARIFICATION,
              ],
            },
            {
              name: SETTING_TABS.TASK_CADENCE,
              innerTabs: [
                SETTING_TABS.TASK_SETTINGS,
                SETTING_TABS.SKIP_TASK_SETTING,
                SETTING_TABS.LEAD_SCORING,
                SETTING_TABS.STANDARD_WORKFLOW,
                SETTING_TABS.ADVANCED_WORKFLOW,
              ],
            },
          ],
        },
      ];
    case INTEGRATION_TYPE.GOOGLE_SHEETS:
      return [
        {
          title: SETTING_TABS.SHEETS_SETUP,
          subTabs: [],
        },
        ...COMMON_TABS,
        {
          title: SETTING_TABS.SETTINGS,
          subTabs: [
            {
              name: SETTING_TABS.EMAIL,
              innerTabs: [
                SETTING_TABS.SENDING_CALENDAR,
                SETTING_TABS.UNSUBSCRIBE_RULES,
                SETTING_TABS.BOUNCED_MAILS,
                SETTING_TABS.DOMAIN_VARIFICATION,
              ],
            },
            {
              name: SETTING_TABS.TASK_CADENCE,
              innerTabs: [
                SETTING_TABS.TASK_SETTINGS,
                SETTING_TABS.SKIP_TASK_SETTING,
                SETTING_TABS.LEAD_SCORING,
              ],
            },
          ],
        },
      ];

    case INTEGRATION_TYPE.DYNAMICS:
      return [
        {
          title: SETTING_TABS.DYNAMICS_SETUP,
          subTabs: [],
        },
        ...COMMON_TABS,
        {
          title: SETTING_TABS.SETTINGS,
          subTabs: [
            {
              name: SETTING_TABS.EMAIL,
              innerTabs: [
                SETTING_TABS.SENDING_CALENDAR,
                SETTING_TABS.UNSUBSCRIBE_RULES,
                SETTING_TABS.BOUNCED_MAILS,
                SETTING_TABS.DOMAIN_VARIFICATION,
              ],
            },
            {
              name: SETTING_TABS.TASK_CADENCE,
              innerTabs: [
                SETTING_TABS.TASK_SETTINGS,
                SETTING_TABS.SKIP_TASK_SETTING,
                SETTING_TABS.LEAD_SCORING,
                SETTING_TABS.STANDARD_WORKFLOW,
              ],
            },
          ],
        },
      ];
  }
};
export const WEEK_DAYS = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};
