import { INTEGRATION_TYPE } from '@cadence-support/constants';

export default function () {
  // let url = '',
  //   port = '';
  // if (!integrationType) {
  //   url = '/crm/404';
  //   port = '4300';
  // }
  // switch (integrationType) {
  //   case INTEGRATION_TYPE.SALESFORCE:
  //     url = '/crm/salesforce';
  //     port = '4100';
  //     break;
  //   case INTEGRATION_TYPE.PIPEDRIVE:
  //     url = '/crm/pipedrive';
  //     port = '4200';
  //     break;
  // }
  // if (window.location.origin.includes('localhost'))
  //   url = `http://localhost:${port}${url}/redirect?path=/home&a_token=${accessToken}`;
  // return (window.location.href = url);
  window.location.href = '/home'
  return;
}
