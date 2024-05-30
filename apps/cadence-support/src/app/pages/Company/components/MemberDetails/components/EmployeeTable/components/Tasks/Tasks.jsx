import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { Container, Title, Tooltip } from '@cadence-support/components';
import { NoTasks } from '@cadence-support/icons';
import { useTasks } from '@cadence-support/data-access';

import TaskCard from './components/TaskCard/TaskCard';

import { VIEW_MODES } from './constants';

import { userInfo } from '@cadence-support/atoms';

import styles from './Tasks.module.scss';

import { TASKS_LOADER } from './components/Placeholder/Placeholder';
import Placeholder from '../Cadence/components/Placeholder/Placeholder';

const Tasks = ({ memberID, searchValue, filterMode, taskFilters }) => {
  const user = useRecoilValue(userInfo);

  const {
    tasks,
    taskLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    filters,
    setFilters,
  } = useTasks({
    memberID,
    searchValue,
    enabled: { tasks: true, cadences: false },
  });

  useEffect(() => {
    setFilters(taskFilters);
  }, [taskFilters]);

  const [viewMode, setViewMode] = useState(null);

  const observerRef = useRef();

  const lastTaskRef = useCallback(
    (taskCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (taskCard) observerRef.current.observe(taskCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return (
    <Container className={styles.tasks}>
      <div className={`${styles.body} `}>
        <div className={styles.tasksContainer}>
          {taskLoading ? (
            <TASKS_LOADER />
          ) : tasks?.tasks?.length > 0 ? (
            tasks?.tasks?.map((task, index) => {
              const isLastItem = index === tasks?.tasks?.length - 1;
              {
                return isLastItem ? (
                  <>
                    <TaskCard
                      key={task?.task_id}
                      // cardInfoWidth={cardInfoWidth}
                      // active={activeTaskInfo === task}
                      viewMode={viewMode}
                      ref={lastTaskRef}
                      task={task}
                      userTimeZone={user.timezone}
                    />
                    {isFetchingNextPage && <Placeholder rows={1} />}
                  </>
                ) : (
                  <TaskCard
                    key={task?.task_id}
                    // cardInfoWidth={cardInfoWidth}
                    // active={activeTaskInfo === task}
                    viewMode={viewMode}
                    task={task}
                    userTimeZone={user.timezone}
                  />
                );
              }
            })
          ) : (
            <div className={styles.noTasks}>
              <NoTasks />
              <h4>No task found</h4>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Tasks;
