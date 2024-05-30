import EmailSettings from './components/EmailSettings/EmailSettings';
import TaskSettings from './components/TaskSettings/TaskSettings';

export const renderComponent = ({ activeTab, companyID, ...props }) => {
  switch (activeTab) {
    case 'Email':
      return <EmailSettings companyID={companyID} {...props} />;
    case 'Task and Cadences':
      return <TaskSettings companyID={companyID} {...props} />;

    default:
      return <EmailSettings companyID={companyID} {...props} />;
  }
};
