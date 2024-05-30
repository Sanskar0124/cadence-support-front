import React from 'react';
import styles from './DeactivateLicenseModal.module.scss';
import { Modal } from '@cadence-support/components';
import { ErrorGradient, ErrorGradientNew } from '@cadence-support/icons';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';

const DeactivateLicenseModal = ({
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
        <ErrorGradient />

        <h2>Deactivating subscription</h2>
        <p className={styles.message}>
          Are you sure you want to deactivate your subscription?
        </p>
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.RED}
        onClick={updateHandler}
        loading={isUpdateLicenseLoading}
        className={styles.btn}
      >
        Deactivate
      </ThemedButton>
    </Modal>
  );
};

export default DeactivateLicenseModal;
