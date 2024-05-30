import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import {
  SalesforceBox,
  Hubspot,
  LushaLogo,
  Kaspr,
  Pipedrive,
  GoogleSheets,
  Excel,
  LinkedinBox,
  Bullhorn,
  Sellsy,
  Zoho,
  KasprLogo,
  Dynamics,
  Snov,
} from '@cadence-support/icons';

export const INTEGRATION_DATA = {
  salesforce: {
    name: 'Salesforce',
    icon: <SalesforceBox height={35} color=" #00a1e0" />,
    background: 'rgb(0, 161, 224,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.SALESFORCE_OWNER,
  },
  pipedrive: {
    name: 'Pipedrive',
    icon: <Pipedrive height={35} />,
    background: 'rgb(185, 190, 196,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.PIPEDRIVE_USER,
  },
  sheets: {
    name: 'Sheets',
    icon: <GoogleSheets height={35} />,
    background: 'rgb(33, 163, 102,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.GOOGLE_SHEETS_USER,
  },

  hubspot: {
    name: 'Hubspot',
    icon: <Hubspot height={35} />,
    background: 'rgb(255, 122, 89,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.HUBSPOT_OWNER,
  },
  lusha: {
    name: 'Lusha',
    icon: <LushaLogo height={35} />,
    background: 'rgb(21, 20, 23,0.1)',
    subtitle: 'Add-ons , Enrichment',
    reqIntegrationType: USER_INTEGRATION_TYPES.LUSHA_USER,
  },
  kaspr: {
    name: 'Kaspr',
    icon: <Kaspr height={35} />,
    background: 'rgb(130, 122, 234,0.1)',
    subtitle: 'Add-ons , Enrichment',
    reqIntegrationType: USER_INTEGRATION_TYPES.KASPR_USER,
  },
  hunter: {
    name: 'Hunter',
    icon: (
      <img
        src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png"
        alt=""
      />
    ),
    background: 'rgb(255, 87, 34,0.1)',
    subtitle: 'Add-ons , Enrichment',
    reqIntegrationType: USER_INTEGRATION_TYPES.HUNTER_USER,
  },
  snov: {
    name: 'Snov',
    icon: <Snov height={35} />,
    background: 'rgb(137, 66, 175,0.1)',
    subtitle: 'Add-ons , Enrichment',
    reqIntegrationType: USER_INTEGRATION_TYPES.SNOV_USER,
  },
  dropcontact: {
    name: 'Dropcontact',
    icon: (
      <img
        src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/dropcontact_logo.png"
        alt=""
      />
    ),
    background: 'rgb(10, 186, 159,0.1)',
    subtitle: 'Add-ons , Enrichment',
    reqIntegrationType: USER_INTEGRATION_TYPES.DROPCONTACT_USER,
  },
  linkedin_extension: {
    name: 'Extension',
    icon: <LinkedinBox color="#3275B3" />,
    background: 'rgb(0, 119, 181,0.1)',
    subtitle: 'Extension',
    reqIntegrationType: USER_INTEGRATION_TYPES.LINKEDIN_USER,
  },
  bullhorn: {
    name: 'Bullhorn',
    icon: <Bullhorn height={35} />,
    background: 'rgb(241, 106, 34,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.BULLHORN_USER,
  },
  sellsy: {
    name: 'Sellsy',
    icon: <Sellsy height={35} />,
    background: 'rgb(74, 73, 142,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.SELLSY_OWNER,
  },
  zoho: {
    name: 'Zoho',
    icon: <Zoho height={35} />,
    background: 'rgb(34, 109, 180,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.ZOHO_USER,
  },
  dynamics: {
    name: 'Dynamics',
    icon: <Dynamics height={35} />,
    background: 'rgb(152, 146, 241,0.1)',
    subtitle: 'CRM',
    reqIntegrationType: USER_INTEGRATION_TYPES.DYNAMICS_OWNER,
  },
};
export const getEnrichmentData = (data) => {
  const arr = [
    {
      name: 'lusha',
      integrationType: data?.lusha_service_enabled
        ? USER_INTEGRATION_TYPES.LUSHA_USER
        : null,
      api_calls: data?.lusha_api_calls,
    },
    {
      name: 'kaspr',
      integrationType: data?.kaspr_service_enabled
        ? USER_INTEGRATION_TYPES.KASPR_USER
        : null,
      api_calls: data?.kaspr_api_calls,
    },
    {
      name: 'snov',
      integrationType: data?.snov_service_enabled
        ? USER_INTEGRATION_TYPES.SNOV_USER
        : null,
      api_calls: data?.snov_api_calls,
    },
    {
      name: 'dropcontact',
      integrationType: data?.dropcontact_service_enabled
        ? USER_INTEGRATION_TYPES.DROPCONTACT_USER
        : null,
      api_calls: data?.dropcontact_api_calls,
    },
    {
      name: 'hunter',
      integrationType: data?.hunter_service_enabled
        ? USER_INTEGRATION_TYPES.HUNTER_USER
        : null,
      api_calls: data?.hunter_api_calls,
    },
  ];
  return arr;
};
