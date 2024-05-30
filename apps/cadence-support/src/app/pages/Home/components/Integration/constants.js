import {
  Bullhorn,
  Dynamics,
  Excel,
  Google,
  GoogleBox,
  GoogleSheets,
  Hubspot,
  Kaspr,
  KasprLogo,
  LushaLogo,
  Pipedrive,
  Salesforce,
  SalesforceBox,
  SalesforcePlain,
  Sellsy,
  Zoho,
  ZohoBox,
} from '@cadence-support/icons';

export const TABLE_TABS = [
  {
    label: 'CRM',
    value: 'crm',
  },
  // {
  //   label: 'Application System',
  //   value: 'application_system',
  // },
  // {
  //   label: 'Helpdesk',
  //   value: 'helpdesk',
  // },
  // {
  //   label: 'Add-ons',
  //   value: 'add_ons',
  // },
];

export const INTEGRATION_TYPES = {
  CRM: 'crm',
  APPLICATION_SYSTEM: 'application_system',
  HELPDESK: 'helpdesk',
  ADD_ONS: 'add_ons',
};

export const INTEGRATION_ICONS = {
  salesforce: <SalesforcePlain />,
  pipedrive: <Pipedrive />,
  sheets: <GoogleSheets />,
  hubspot: <Hubspot />,
  excel: <Excel />,
  zoho: <ZohoBox />,
  sellsy: <Sellsy />,
  bullhorn: <Bullhorn />,
  dynamics: <Dynamics />,
};

export const INTEGRATION_NAME_MAP = {
  salesforce: 'Salesforce',
  pipedrive: 'Pipedrive',
  sheets: 'Sheets',
  hubspot: 'Hubspot',
  excel: 'Excel',
  zoho: 'Zoho',
  sellsy: 'Sellsy',
  bullhorn: 'Bullhorn',
  dynamics: 'Dynamics',
};

export const INTEGRATION_LABELS_CL_NAMES = {
  salesforce_owner: 'salesforce',
  pipedrive_user: 'pipedrive',
  google_sheets_user: 'googleSheets',
  hubspot_owner: 'hubspot',
  Lusha: 'lusha',
  Kaspr: 'kaspr',
};
