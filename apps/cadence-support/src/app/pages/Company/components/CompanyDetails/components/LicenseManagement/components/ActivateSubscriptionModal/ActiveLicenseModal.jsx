import React from 'react';
import styles from './ActiveLicenseModal.module.scss';
import { Modal } from '@cadence-support/components';
import { TickSolidGradient } from '@cadence-support/icons';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';

const ActiveLicenseModal = ({
  modal,
  setModal,
  updateHandler,
  isUpdateLicenseLoading,
}) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Modal
      isModal={Boolean(modal)}
      onClose={closeModal}
      showCloseButton
      className={styles.container}
    >
      <div className={styles.msgcontainer}>
        <div>
          <TickSolidGradient />
        </div>
        <h2>Activating subscription</h2>
        <p className={styles.message}>
          By this, you will be ending the trial period, and your subscription
          will become active
        </p>
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.PRIMARY}
        onClick={updateHandler}
        loading={isUpdateLicenseLoading}
      >
        Active
      </ThemedButton>
    </Modal>
  );
};

export default ActiveLicenseModal;
