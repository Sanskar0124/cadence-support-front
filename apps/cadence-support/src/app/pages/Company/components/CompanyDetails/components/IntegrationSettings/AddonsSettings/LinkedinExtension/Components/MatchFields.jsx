import { userInfo } from '@cadence-support/atoms';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

// Integrations
import SalesforceMatchFields from './Salesforce/MatchFields/MatchFields';
import PipedriveMatchFields from './Pipedrive/MatchFields/MatchFields';
import HubspotMatchFields from './Hubspot/MatchFields/MatchFields';
import ZohoMatchFields from './Zoho/MatchFields/MatchFields';
import SellsyMatchFields from './Sellsy/MatchFields/MatchFields';
import BullhornMatchFields from './Bullhorn/MatchFields/MatchFields';

const MatchFields = (props) => {
  switch (props.integrationType) {
    case INTEGRATION_TYPE.SALESFORCE:
      return <SalesforceMatchFields {...props} />;
    case INTEGRATION_TYPE.PIPEDRIVE:
      return <PipedriveMatchFields {...props} />;
    case INTEGRATION_TYPE.HUBSPOT:
      return <HubspotMatchFields {...props} />;
    case INTEGRATION_TYPE.ZOHO:
      return <ZohoMatchFields {...props} />;
    case INTEGRATION_TYPE.SELLSY:
      return <SellsyMatchFields {...props} />;
    case INTEGRATION_TYPE.BULLHORN:
      return <BullhornMatchFields {...props} />;
    default:
      return null;
  }
};

export default MatchFields;
