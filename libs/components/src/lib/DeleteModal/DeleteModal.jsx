import React from 'react';
import Modal from '../Modal/Modal';

import styles from './DeleteModal.module.scss';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const DeleteModal = ({ modal, setModal, handleClose, item, onDelete }) => {
  const onClose = () => {
    if (setModal && typeof setModal === 'function') setModal(false);
    else handleClose();
  };
  const onDeleteClick = () => {
    onDelete();
    onClose();
  };

  const user = useRecoilValue(userInfo);
  return (
    <Modal
      isModal={modal ? true : false}
      onClose={onClose}
      className={styles.deleteModal}
      showCloseButton
    >
      <div className={styles.icon}>!</div>
      <div className={styles.warning}>
        Delete
        <div className={styles.name} title={item}>
          {item}
        </div>
        ?
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.RED}
        onClick={onDeleteClick}
        className={styles.deleteBtn}
      >
        <div>Delete</div>
      </ThemedButton>
    </Modal>
  );
};

export default DeleteModal;
