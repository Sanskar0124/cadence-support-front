import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { Kaspr, KasprLogo, LushaLogo, Snov } from '@cadence-support/icons';

export const TABS = {
  SALESFORCE: 'Salesforce',
  PIPEDRIVE: 'Pipedrive',
  HUBSPOT: 'Hubspot',
  SHEETS: 'Sheets',
  EXCEL: 'Excel',
  ZOHO: 'Zoho',
  BULLHORN: 'Bullhorn',
  DYNAMICS: 'Dynamics',
  SELLSY: 'Sellsy',
};

export const getIntegrationIdLabel = (integration_type) => {
  switch (integration_type) {
    case INTEGRATION_TYPE.SALESFORCE:
    case INTEGRATION_TYPE.PIPEDRIVE:
    case INTEGRATION_TYPE.HUBSPOT:
    case INTEGRATION_TYPE.GOOGLE_SHEETS:
    case INTEGRATION_TYPE.ZOHO:
    case INTEGRATION_TYPE.DYNAMICS:
    case INTEGRATION_TYPE.BULLHORN:
    case INTEGRATION_TYPE.SELLSY:
      return `${TABS[integration_type?.toUpperCase()]} ID`;
  }
};

export const getAddonIcons = (enrichment) => {
  let ICONS_ARR = [
    <LushaLogo size={28} />,
    <KasprLogo size={28} />,
    <img
      src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png"
      alt=""
    />,
    <Snov size={28} />,
    <img
      src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/dropcontact_logo.png"
      alt=""
    />,
  ];

  // if (enrichment?.lusha_service_enabled)
  //   ICONS_ARR.push(<LushaLogo size={28} />);
  // if (enrichment?.kaspr_service_enabled)
  //   ICONS_ARR.push(<KasprLogo size={28} />);
  // if (enrichment?.hunter_service_enabled)
  //   ICONS_ARR.push(
  //     <img
  //       src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png"
  //       alt=""
  //     />
  //   );
  // if (enrichment?.snov_service_enabled) ICONS_ARR.push(<Snov size={28} />);
  // if (enrichment?.dropcontact_service_enabled)
  //   ICONS_ARR.push(
  //     <img
  //       src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/dropcontact_logo.png"
  //       alt=""
  //     />
  //   );

  return ICONS_ARR;
};

