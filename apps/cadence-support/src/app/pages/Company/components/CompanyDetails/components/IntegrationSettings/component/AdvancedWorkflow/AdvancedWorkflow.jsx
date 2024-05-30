import { Modal } from '@cadence-support/components';
import React, { useEffect, useState, useContext } from 'react';
import styles from './AdvancedWorkflow.module.scss';
import { Title, Div } from '@cadence-support/components';
import { Input } from '@cadence-support/widgets';
import { TRIGGERS, PIPEDRIVE_TRIGGER } from './constants';
import Queries from './components/Queries/Queries';

const AddRuleModal = ({ workflow, modal, setModal, setWorkflowdata }) => {
  const handleClose = () => {
    setModal(false);
    setWorkflowdata({ data: null, modalIndex: '' });
  };
  const [companyItem, setCompanyItem] = useState(
    JSON.parse(localStorage.getItem('company'))
  );
  return (
    <Modal
      showCloseButton={true}
      disableOutsideClick={true}
      isModal={modal}
      onClose={() => handleClose()}
      className={styles.addModal}
    >
      <div className={styles.header}>
        <Title className={styles.title} size="1.2rem">
          Advanced Workflow
        </Title>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inptuGroupOneTwo}>
          <div className={styles.inputGroupOne}>
            <Title className={styles.title} size="1rem">
              Workflow name
            </Title>
            <Input value={workflow?.data?.rule_name} disabled />
          </div>

          <div className={styles.inputGroupTwo}>
            <Title className={styles.title} size="1rem">
              When
            </Title>
            <Input
              value={
                companyItem?.integration_type === 'pipedrive'
                  ? PIPEDRIVE_TRIGGER[workflow?.data?.trigger]
                  : TRIGGERS[workflow?.data?.trigger]
              }
              disabled
            />

            {workflow?.data?.filter && (
              <Div className={styles.conditionGroup}>
                <Title className={styles.title} size=".95rem">
                  If condition
                </Title>{' '}
                {/*--- Main Component----*/}
                <Queries originalFilter={workflow?.data?.filter} />
              </Div>
            )}
          </div>
        </div>

        <div className={styles.inputGroupThree}>
          <Title className={styles.title} size="1rem">
            Then
          </Title>
          <Input
            value={
              workflow?.data?.actions[0].type === 'add_to_cadence' &&
              'Add to Cadence'
            }
            disabled
          />

          {workflow?.data?.actions[0].type === 'add_to_cadence' && (
            <div className={styles.selectCadenceGroup}>
              <Title className={styles.title} size="1rem">
                Cadence Name
              </Title>
              <Input
                disabled
                value={workflow?.data?.actions[0].name ?? 'Deleted Cadence'}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddRuleModal;
