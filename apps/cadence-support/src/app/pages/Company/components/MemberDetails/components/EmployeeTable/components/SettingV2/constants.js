import GeneralSettings from './Components/GeneralSettings/GeneralSettings';
import MyAccount from './Components/MyAccount/MyAccount';
import MyConnection from './Components/MyConnections/MyConnection';

export const PROFILE_TABS = [
  {
    label: 'My Acccount',
    value: 'my_account',
  },
  {
    label: 'My Connection',
    value: 'my_connection',
  },
];
export const INTEGRATION_TAB = [
  {
    label: 'General Settings',
    value: 'general_settings',
  },
];

export const TABS = {
  MY_CONNECTION: 'my_connection',
  MY_ACCOUNT: 'my_account',
  GENERAL_SETTINGS: 'general_settings',
};

export const INTEGRATION_NAME = {
  salesforce_owner: 'salesforce',
  pipedrive_user: 'pipedrive',
  sheets_user: 'sheets',
  hubspot_owner: 'hubspot',
  bullhorn_user: 'bullhorn',
  zoho_user: 'zoho',
  sellsy_owner: 'sellsy',
  dynamics_owner: 'dynamics',
};
export const renderView = ({ activeTab, ...props }) => {
  switch (activeTab.value) {
    case TABS.MY_ACCOUNT:
      return <MyAccount {...props} />;
      break;
    case TABS.MY_CONNECTION:
      return <MyConnection {...props} />;
      break;
    case TABS.GENERAL_SETTINGS:
      return <GeneralSettings {...props} />;
      break;

    default:
      <MyConnection {...props} />;
      break;
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

export const getTabOptions = (integration_type) => {
  return [
    {
      tabName: 'Profile',
      tabs: [
        {
          name: 'My Account',
          value: 'my_account',
          subTabs: [
            { name: 'Email', value: 'email' },
            { name: 'Email Signature', value: 'email_signature' },
            { name: 'Primary Phone', value: 'primary_phone' },
            { name: 'Connected Sources', value: 'connect_source' },
            { name: 'Calendly Link', value: 'calendly_link' },
            { name: 'Language', value: 'language' },
            { name: 'Timezone', value: 'timezone' },
          ],
        },
        {
          name: 'My Connection',
          value: 'my_connection',
          subTabs: [],
        },
      ],
    },
    {
      tabName: INTEGRATION_NAME[integration_type],
      tabs: [
        {
          name: 'General Settings',
          value: 'general_settings',
          subTabs: [
            {
              name: 'Emails',
              value: 'emails',
              innerTabs: [
                { name: 'Sending calendar', value: 'sending_calendar' },
                { name: 'Unsubscribe rules', value: 'unsubscribe_rules' },
                { name: 'Bounced rules', value: 'bounced_rules' },
              ],
            },
            {
              name: 'Task and Cadences',
              value: 'task_and_cadence',
              innerTabs: [
                { name: 'Task Settings', value: 'task_settings' },
                { name: 'Skip Task Settings', value: 'skip_task_settings' },
                { name: 'Lead Scoring', value: 'lead_scoring' },
              ],
            },
          ],
        },
      ],
    },
  ];
};
