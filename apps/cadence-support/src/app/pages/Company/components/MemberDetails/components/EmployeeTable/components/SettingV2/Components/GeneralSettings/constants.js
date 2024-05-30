import UserTaskSettings from './components/TaskSettings/TaskSettings';
import UserEmailSettings from './components/UserEmailSetting/UserEmailSettings';

export const renderViewComponent = ({ selectedSubTabs, ...props }) => {
  switch (selectedSubTabs?.value) {
    case 'emails':
      return <UserEmailSettings {...props} />;
      break;

    case 'task_and_cadence':
      return <UserTaskSettings {...props} />;
      break;
    default:
      return <UserEmailSettings {...props} />;
  }
};
