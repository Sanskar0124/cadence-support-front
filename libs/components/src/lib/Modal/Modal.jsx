import { Close } from '@cadence-support/icons';
import { ThemedButtonThemes, TooltipThemes } from '@cadence-support/themes';
import { useOutsideClickHandler } from '@cadence-support/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ThemedButton } from '@cadence-support/widgets';
import Tooltip from '../Tooltip/Tooltip';
import styles from './Modal.module.scss';

/**
 * This component is used to make a Modal.
 *
 * @component
 * @example
 * const [modal, setModal] = useState(false)
 *
 * const closeModal = () => {
 * 	setModal(false);
 * 	//some other stuff
 * }
 *
 * return(
 * 	<Modal isModal={modal} onClose={closeModal}>
 * 		content
 * 	</Modal>
 * )
 */

const Modal = ({
  children,
  onClose,
  isModal,
  className,
  showCloseButton = false,
  disableOutsideClick,
  leftCloseIcon = false,
  disableCloseHover,
  closeColor,
}) => {
  // for closing on outside click
  const modalRef = useRef(null);
  const closeRef = useRef();
  useOutsideClickHandler(modalRef, onClose, disableOutsideClick);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isModal) setShowModal(true);
  }, [isModal]);

  useEffect(() => {
    if (closeRef && showModal) closeRef.current.focus();
  }, [closeRef, showModal]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };
  const onAnimationEnd = () => {
    if (!isModal) setShowModal(false);
  };

  return (
    showModal && (
      <div
        className={`${styles.modalOverlay} ${isModal && styles.open}`}
        ref={closeRef}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div
          className={`${styles.modalBox} ${
            isModal ? styles.open : styles.close
          } ${className}`}
          onAnimationEnd={onAnimationEnd}
          ref={modalRef}
        >
          {showCloseButton && (
            <ThemedButton
              className={`${styles.closeIcon} ${
                leftCloseIcon ? styles.leftClose : ''
              } ${disableCloseHover ? styles.closeHoverless : ''}`}
              onClick={onClose}
              theme={ThemedButtonThemes.ICON}
            >
              <Tooltip text="Close" theme={TooltipThemes.BOTTOM} span>
                <Close color={closeColor ?? '#567191'} />
              </Tooltip>
            </ThemedButton>
          )}
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
