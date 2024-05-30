import { Modal } from '@cadence-support/components';
import React, { useContext, useEffect } from 'react';
import styles from './ResendMailModal.module.scss';
import {
  MailGradient,
  MailsGradient,
  ResendMailGradient,
} from '@cadence-support/icons';
import { ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { useUpdateIntegration } from '@cadence-support/data-access';
import { MessageContext } from '@cadence-support/context';

const ResendEmailModal = ({
  resendMailModal,
  setResendMailModal,
  adminData,
  companyID,
  setAdminData,
  isDetailsUpdated,
}) => {
  const {
    sendMailInvitation,
    mailinviatationloading,
    getIntegration,
    getIntegrationLoading,
  } = useUpdateIntegration();
  const { addSuccess, addError } = useContext(MessageContext);

  const closeModal = () => {
    setResendMailModal(false);
    if (isDetailsUpdated) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  useEffect(() => {
    if (adminData?.length === 0) {
      getIntegration(companyID, {
        onSuccess: (data) => {
          const companyData = data?.data;
          setAdminData(companyData?.User);
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      });
    }
  }, []);

  const handleSave = () => {
    sendMailInvitation(adminData?.user_id, {
      onSuccess: (data) => {
        addSuccess('Mail sent successfully');
        setResendMailModal(false);
        if (isDetailsUpdated) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    });
  };

  return (
    <Modal
      isModal={resendMailModal}
      onClose={closeModal}
      showCloseButton
      className={styles.resendmailcontainer}
    >
      <div className={styles.details}>
        <ResendMailGradient />
        <p className={styles.title}>Re-send email invite</p>
        <p className={styles.message}>
          By this you can resend the email invite to the super admin for the
          company
        </p>
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.PRIMARY}
        onClick={handleSave}
        loading={mailinviatationloading}
      >
        Send invite
      </ThemedButton>
    </Modal>
  );
};

export default ResendEmailModal;
