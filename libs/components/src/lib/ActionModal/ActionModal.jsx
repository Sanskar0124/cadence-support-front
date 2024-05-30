import { CadencesGradient } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import ThemedButton from '@cadence-support/widgets';
import Modal from '../Modal/Modal';
import styles from './ActionModal.module.scss';

const ActionModal = ({
  modal,
  setModal,
  message,
  handleClose,
  icon,
  buttonText,
  onAction,
}) => {
  const onClose = () => {
    if (setModal && typeof setModal === 'function') setModal(false);
    else handleClose();
  };
  const onButtonClick = () => {
    onClose();
    onAction();
  };
  return (
    <Modal
      isModal={Boolean(modal)}
      onClose={handleClose}
      className={styles.actionModal}
      showCloseButton
    >
      <div className={styles.icon}>{icon ?? <CadencesGradient />}</div>
      <div className={styles.name}>Are you sure {message}</div>
      <ThemedButton
        theme={ThemedButtonThemes.PRIMARY}
        onClick={onButtonClick}
        className={styles.actionBtn}
      >
        {buttonText}
      </ThemedButton>
    </Modal>
  );
};

export default ActionModal;
