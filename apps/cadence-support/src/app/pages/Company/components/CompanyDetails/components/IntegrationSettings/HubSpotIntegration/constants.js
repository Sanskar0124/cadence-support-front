import FieldMappings from './components/FieldMappings/FieldMappings';
import ActivityLogs from './components/ActivityLogs/ActivityLogs';
import PhoneSettings from './components/PhoneSettings/PhoneSettings';
import Settings from './components/Settings/Settings';
import EmailSetup from './components/EmailSetup/EmailSetup';
import HubspotSettings from './components/HubspotSettings/HubspotSettings';

export const renderComponent = ({ activeTab, companyID, ...props }) => {
  switch (activeTab) {
    case 'Hubspot Set-up':
      return <HubspotSettings companyID={companyID} />;
    case 'Field mapping':
      return <FieldMappings companyID={companyID} />;
    case 'Activity logs':
      return <ActivityLogs companyID={companyID} />;
    case 'Email Setup':
      return <EmailSetup companyID={companyID} />;
    case 'Phone System':
      return <PhoneSettings companyID={companyID} />;
    case 'Settings':
      return <Settings companyID={companyID} {...props} />;

    default:
      return <HubspotSettings companyID={companyID} />;
  }
};
