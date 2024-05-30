import React, { useState } from 'react';
import { Modal } from '@cadence-support/components';
import styles from './TrialExtension.module.scss';
import { Input, ThemedButton } from '@cadence-support/widgets';
import {
  ArrowDown,
  ArrowUp,
  SmallArrowUp,
  TrayArrowUp,
  TriangleArrow,
  TriangleDown,
} from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';

const TrialExtension = ({
  modal,
  setModal,
  value,
  setValue,
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
      <h2 className={styles.title}>Trial period extension</h2>
      <div className={styles.inputcontainer}>
        <p> Trial period duration</p>
        <div className={styles.textandBtns}>
          <Input width="150px" height="48px" value={value} disabled={true} />{' '}
          Days
          <div>
            <div onClick={() => setValue((prev) => prev + 1)}>
              <TriangleArrow />
            </div>
            <div
              onClick={
                value === 0 ? () => null : () => setValue((prev) => prev - 1)
              }
            >
              <TriangleArrow className={styles.downArrow} />
            </div>
          </div>
        </div>
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.PRIMARY}
        onClick={updateHandler}
        loading={isUpdateLicenseLoading}
      >
        Save
      </ThemedButton>
    </Modal>
  );
};

export default TrialExtension;
