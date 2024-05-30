import { Div, Modal, Skeleton } from '@cadence-support/components';
import React from 'react';
import styles from './AddonModal.module.scss';
import { useUser, useUserProfile } from '@cadence-support/data-access';
import { INTEGRATION_DATA, getEnrichmentData } from './utils';
import { NoCadence, NoLeads, NoStep } from '@cadence-support/icons';

const AddonModal = ({ modal, setModal }) => {
  const onClose = (e) => {
    setModal((prev) => ({ ...prev, isVisible: false, data: null }));
  };

  return (
    <Modal
      isModal={Boolean(modal?.isVisible)}
      onClose={onClose}
      showCloseButton
      className={styles.modalcontainer}
    >
      <p className={styles.title}> Add ons</p>
      <div className={styles.addonData}>
        {false ? (
          <div className={styles.linePlaceholders}>
            {[...Array(3).keys()].map((key) => (
              <Skeleton className={styles.linePlaceholder} />
            ))}
          </div>
        ) : getEnrichmentData(modal?.data?.Enrichment)?.length > 0 ? (
          getEnrichmentData(modal?.data?.Enrichment)?.map((addon) => {
            return (
              <div className={styles.cardcontainer}>
                <div
                  className={styles.integrationbg}
                  style={{
                    background: INTEGRATION_DATA[addon.name]?.background,
                  }}
                >
                  <div className={styles.icon}>
                    {INTEGRATION_DATA[addon.name]?.icon}
                  </div>
                  <div className={styles.details}>
                    <p className={styles.title}>
                      {INTEGRATION_DATA[addon.name]?.name}
                    </p>
                    <p className={styles.subtitle}>
                      {INTEGRATION_DATA[addon.name]?.subtitle}
                    </p>
                  </div>
                </div>

                <div className={styles.status}>
                  <div>
                    <p>No of API calls: {addon?.api_calls ?? 0}</p>
                  </div>

                  <div>
                    <Status
                      integration_type={addon.integrationType}
                      reqIntegrationType={
                        INTEGRATION_DATA[addon.name]?.reqIntegrationType
                      }
                      userLoading={false}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <NoLeads />
            <p>Currently no addons are connected</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddonModal;

const Status = ({ integration_type, reqIntegrationType, userLoading }) => {
  return (
    <div className={styles.statusWrapper}>
      {userLoading ? (
        <Skeleton className={styles.placeholder} />
      ) : integration_type === reqIntegrationType ? (
        <span className={styles.inUse}>In use</span>
      ) : (
        <span className={styles.notInUse}>Not in use</span>
      )}
    </div>
  );
};
