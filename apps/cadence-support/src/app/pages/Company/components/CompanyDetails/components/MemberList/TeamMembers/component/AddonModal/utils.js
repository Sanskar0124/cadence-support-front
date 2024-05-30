import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import { LushaLogo, Kaspr, KasprLogo, Snov } from '@cadence-support/icons';
export const getEnrichmentData = (enrichment) => {
  const arr = [
    {
      name: 'lusha',
      integrationType: enrichment?.lusha_service_enabled
        ? USER_INTEGRATION_TYPES.LUSHA_USER
        : null,
      api_calls: enrichment?.lusha_api_calls,
    },
    {
      name: 'kaspr',
      integrationType: enrichment?.kaspr_service_enabled
        ? USER_INTEGRATION_TYPES.KASPR_USER
        : null,
      api_calls: enrichment?.kaspr_api_calls,
    },
    {
      name: 'snov',
      integrationType: enrichment?.snov_service_enabled
        ? USER_INTEGRATION_TYPES.SNOV_USER
        : null,
      api_calls: enrichment?.snov_api_calls,
    },
    {
      name: 'dropcontact',
      integrationType: enrichment?.dropcontact_service_enabled
        ? USER_INTEGRATION_TYPES.DROPCONTACT_USER
        : null,
      api_calls: enrichment?.dropcontact_api_calls,
    },
    {
      name: 'hunter',
      integrationType: enrichment?.hunter_service_enabled
        ? USER_INTEGRATION_TYPES.HUNTER_USER
        : null,
      api_calls: enrichment?.hunter_api_calls,
    },
  ];
  return arr;
};

export const INTEGRATION_DATA = {
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
};
