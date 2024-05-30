import styles from './Sidebar.module.scss';

//components
import { Button } from '@cadence-support/components';
import { Close } from '@cadence-support/icons';
import { VIEW_MODES } from '../../constants';
import TaskInfo from '../TaskInfo/TaskInfo';
import Filters from '../Filters/Filters';
import Calendar from '../Calendar/Calendar';
import TemplateSidebar from '../../../../Common/Templates/components/AddOrEditTemplateModal/components/TemplateSidebar/TemplateSidebar';

//constants

const Sidebar = ({
  viewMode,
  filterProps,
  className,
  onClose,
  activeTaskInfo,
  setTasks,
  userId,
  setUserId,
  ...rest
}) => {
  const RenderView = (viewMode) => {
    switch (viewMode) {
      case VIEW_MODES.TASK:
        return (
          <TaskInfo
            activeTaskInfo={activeTaskInfo}
            setTasks={setTasks}
            onSidebarClose={onClose}
            userId={userId}
          />
        );
      case VIEW_MODES.FILTER:
        return (
          <Filters
            {...filterProps}
            onSidebarClose={onClose}
            userId={userId}
            setUserId={setUserId}
          />
        );
      case VIEW_MODES.CALENDAR:
        return <Calendar onSidebarClose={onClose} />;
    }
  };

  return (
    <div
      className={`${styles.sidebar} ${styles[viewMode]} ${
        viewMode ? styles.open : styles.close
      } ${className ?? ''}`}
    >
      {RenderView(viewMode)}
    </div>
  );
};

export default Sidebar;
