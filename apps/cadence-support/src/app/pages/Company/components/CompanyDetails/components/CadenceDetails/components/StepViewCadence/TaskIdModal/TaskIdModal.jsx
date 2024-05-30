import React, { useState, useEffect } from 'react';
import styles from './Taskidmodal.module.scss';
import { Modal } from '@cadence-support/components';

const TaskIdModal = ({ modal, setModal, stepsStats, stepId }) => {
  const [taskIds, setTaskIds] = useState([]);
  const closeModal = () => {
    setModal(false);
    setTaskIds([]);
  };

  useEffect(() => {
    const foundStep = stepsStats?.find((step) => step?.node_id === stepId);
    setTaskIds(
      (foundStep?.tasks || foundStep?.task).map((task) => task?.task_id)
    );
    return () => setTaskIds([]);
  }, [stepId]);

  return (
    <Modal
      isModal={modal}
      onClose={closeModal}
      showCloseButton
      className={styles.Taskdetailsmodal}
    >
      <p className={styles.title}>Task IDs</p>

      <div className={styles.idcontainer}>
        {taskIds?.length > 0 ? (
          taskIds?.map((id) => {
            return (
              <span key={id} className={styles.taskid}>
                {id}
              </span>
            );
          })
        ) : (
          <div className={styles.message}>No task IDs found.</div>
        )}
      </div>
    </Modal>
  );
};

export default TaskIdModal;
