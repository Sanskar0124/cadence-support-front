import {
  ENRICHMENT_SERVICES,
  INTEGRATION_TYPE as CRM_INTEGRATION_TYPE,
  LEAD_INTEGRATION_TYPES,
} from '@cadence-support/constants';

export const INTEGRATION_TYPES = {
  ...ENRICHMENT_SERVICES,
  LINKEDIN_EXTENSION: 'linkedin_extension',
};

export const TEAMS_SLIDER_OPTIONS = [
  // {
  //   label: 'Roles',
  //   value: 'roles',
  // },
  {
    label: 'Teams',
    value: 'teams',
  },

  // {
  //   label: 'Sockets',
  //   value: 'sockets',
  // },
  {
    label: 'Cadences',
    value: 'cadences',
  },

  {
    label: 'Add ons',
    value: 'addons',
  },

  // {
  //   label: 'Billing',
  //   value: 'billing',
  // },
];

export const SLIDER_OPTIONS = (integration_type) => {
  return [
    {
      label: 'Teams',
      value: 'teams',
    },

    {
      label: 'Cadences',
      value: 'cadences',
    },
    {
      label: `${integration_type} settings`,
      value: `integrations`,
    },

    {
      label: 'Add ons',
      value: 'addons',
    },

    {
      label: 'License management',
      value: 'license_management',
    },
  ];
};

export const VIEW_MODE = {
  TEAMS: 'teams',
  MEMBERS: 'members',
  MEMBER: 'member',
  INTEGRATIONS: 'integrations',
  ADDONS: 'addons',
  ADDON: 'addon',
  CADENCES: 'cadences',
  CADENCE: 'cadence',
  LICENSE_MANAGEMENT: 'license_management',
};

export const DEFAULT_FILTER_OPTIONS = {
  created_by: [],
  sd_id: [],
  status: [],
  type: [],
};
export const ENRICHMENT_ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
};
export const ENRICHMENT_ACTIONS_OPTIONS = {
  [ENRICHMENT_ACTIONS.ADD]: 'Update only if field is empty',
  [ENRICHMENT_ACTIONS.UPDATE]: 'Update even if there is an existing value',
};

export const LEAD_INTEGRATION_TYPE_MAP = {
  [CRM_INTEGRATION_TYPE.SALESFORCE]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.SALESFORCE_LEAD,
    leadTypeOptions: [
      LEAD_INTEGRATION_TYPES.SALESFORCE_LEAD,
      LEAD_INTEGRATION_TYPES.SALESFORCE_CONTACT,
    ],
  },
  [CRM_INTEGRATION_TYPE.PIPEDRIVE]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.PIPEDRIVE_PERSON,
    leadTypeOptions: [LEAD_INTEGRATION_TYPES.PIPEDRIVE_PERSON],
  },
  [CRM_INTEGRATION_TYPE.HUBSPOT]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.HUBSPOT_CONTACT,
    leadTypeOptions: [LEAD_INTEGRATION_TYPES.HUBSPOT_CONTACT],
  },
  [CRM_INTEGRATION_TYPE.GOOGLE_SHEETS]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.GOOGLE_SHEETS_LEAD,
    leadTypeOptions: [LEAD_INTEGRATION_TYPES.GOOGLE_SHEETS_LEAD],
  },
  [CRM_INTEGRATION_TYPE.EXCEL]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.EXCEL_LEAD,
    leadTypeOptions: [LEAD_INTEGRATION_TYPES.EXCEL_LEAD],
  },
  [CRM_INTEGRATION_TYPE.SELLSY]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.SELLSY_CONTACT,
    leadTypeOptions: [LEAD_INTEGRATION_TYPES.SELLSY_CONTACT],
  },
  [CRM_INTEGRATION_TYPE.DYNAMICS]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.DYNAMICS_LEAD,
    leadTypeOptions: [
      LEAD_INTEGRATION_TYPES.DYNAMICS_LEAD,
      LEAD_INTEGRATION_TYPES.DYNAMICS_CONTACT,
    ],
  },
  [CRM_INTEGRATION_TYPE.ZOHO]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.ZOHO_LEAD,
    leadTypeOptions: [
      LEAD_INTEGRATION_TYPES.ZOHO_LEAD,
      LEAD_INTEGRATION_TYPES.ZOHO_CONTACT,
    ],
  },
  [CRM_INTEGRATION_TYPE.BULLHORN]: {
    defaultLeadType: LEAD_INTEGRATION_TYPES.BULLHORN_LEAD,
    leadTypeOptions: [
      LEAD_INTEGRATION_TYPES.BULLHORN_LEAD,
      LEAD_INTEGRATION_TYPES.BULLHORN_CONTACT,
      LEAD_INTEGRATION_TYPES.BULLHORN_CANDIDATE,
    ],
  },
};
export const USER_ACCESS_FIELDS = {
  [ENRICHMENT_SERVICES.LUSHA]: {
    userAccessField: 'lusha_service_enabled',
    sdNewUsersAccessField: 'enable_new_users_lusha',
  },
  [ENRICHMENT_SERVICES.KASPR]: {
    userAccessField: 'kaspr_service_enabled',
    sdNewUsersAccessField: 'enable_new_users_kaspr',
  },
  [ENRICHMENT_SERVICES.HUNTER]: {
    userAccessField: 'hunter_service_enabled',
    sdNewUsersAccessField: 'enable_new_users_hunter',
  },
  [ENRICHMENT_SERVICES.DROPCONTACT]: {
    userAccessField: 'dropcontact_service_enabled',
    sdNewUsersAccessField: 'enable_new_users_dropcontact',
  },
  [ENRICHMENT_SERVICES.SNOV]: {
    userAccessField: 'snov_service_enabled',
    sdNewUsersAccessField: 'enable_new_users_snov',
  },
};
export const ALL_LEAD_TYPE = {
  salesforce_lead: 'Salesforce Lead',
  salesforce_contact: 'Salesforce Contact',
  bullhorn_candidate: 'Bullhorn Candidate',
  bullhorn_contact: 'Bullhorn Contact',
  bullhorn_lead: 'Bullhorn Lead',
  zoho_lead: 'Zoho Lead',
  zoho_contact: 'Zoho Contact',
  google_sheets_lead: 'Goggle Sheets Lead',
  excel_lead: 'Excel Lead',
  pipedrive_person: 'Pipedrive Person',
  hubspot_contact: 'Hubspot Contact',
  sellsy_contact: 'Sellsy Contact',
};

export const getStatus = (company) => {
  if (company.hasOwnProperty('Integrations'))
    return company?.Integrations[0]?.status;
  else return company?.status;
};

export const getMailStatus = (status) => {
  if (status === 'Fail' || status === 'Complain') return `${status}ed`;
  else return status;
};
