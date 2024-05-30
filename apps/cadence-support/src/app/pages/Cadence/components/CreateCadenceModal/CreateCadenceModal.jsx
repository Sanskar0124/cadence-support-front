/* eslint-disable no-console */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { MessageContext } from '@cadence-support/context';
import { Modal } from '@cadence-support/components';
import { Input, Label, ThemedButton, Select } from '@cadence-support/widgets';
import { InputThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { INTEGRATION_TYPE, ROLES } from '@cadence-support/constants';

import {
  CADENCE_INTEGRATIONS,
  CADENCE_TAGS,
  CADENCE_TYPES,
  CREATE_CADENCE_ERRORS,
  TYPES,
  LANGUAGE_OPTIONS,
} from '../../constants';

import styles from './CreateCadenceModal.module.scss';
import { useCadencesTemplates, useUser } from '@cadence-support/data-access';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { CadenceContext } from '../../Settings/Settings';
import { v4 as uuidv4 } from 'uuid';

const CreateCadenceModal = ({
  modal,
  setModal,
  settingsModal,
  setSettingsModal,
  handleCadenceUpdate,
}) => {
  const [step, setStep] = useState([
    {
      previous_step_number: 0,
      data: {
        aBTestEnabled: false,
        attachments: [],
        body: '',
        subject: 'First steps',
        templates: [],
      },
      is_first: false,
      is_urgent: false,
      name: 'Automated Mail',
      step_number: uuidv4(),
      type: 'automated_mail',
      wait_time: 0,
    },
  ]);
  const [input, setInput] = useState({ name: '', type: '', language: '' });
  const [error, setError] = useState(null);

  const {
    cadenceTemplatesData: templateData,
    createCadenceTemplate,
    data,
    templateLoading,
    success,
    fetchCadenceTemplate,
    updateCadenceTemplate,
    updateCadenceTemplateLoading,
  } = useCadencesTemplates({ enabled: true });

  const { addError } = useContext(MessageContext);
  const navigate = useNavigate();
  const [templateId, setTemplateId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  //sideeffect
  useEffect(() => {
    if (settingsModal) {
      setInput({
        name: settingsModal.name,
        type: settingsModal.type,
        language: settingsModal.language,
      });
    }
  }, [settingsModal]);

  const handleClose = () => {
    if (settingsModal) {
      setModal(false);
      setInput({ name: '', type: '', language: '' });
    } else {
      setModal(false);
      setInput({ name: '', type: '', language: '' });
    }
  };

  const handleSubmit = () => {
    const body = {
      name: input.name,
      type: input.type,
      language: input.language,
      nodes: [...step],
    };
    if (templateData.find((item) => item.name === input.name)) {
      addError('A cadence with same name exists, please use another name');
    } else {
      createCadenceTemplate(body, {
        onSuccess: (data) => {
          setModal(false);
          fetchCadenceTemplate();
          navigate(`/cadence/edit/${data.cadence_template_id}`);
          setInput({ name: '', type: '', language: '' });
          setIsAdded(true);
        },
        onError: (err) => {
          setError(err?.message ?? 'unable to redirect');
        },
      });
    }
  };

  const handleUpdate = () => {
    const body = {
      name: input.name,
      type: input.type,
      language: input.language,
      nodes: settingsModal?.nodes,
    };
    const cadence = {
      body: { ...body },
      id: settingsModal?.cadence_template_id,
    };
    handleCadenceUpdate(cadence);
    // setTimeout(() => {
    //   navigate(`/cadence/edit/${cadence?.cadence_template_id}`);
    // }, 1000);
    setInput({ name: '', type: '', language: '' });
  };

  return (
    <Modal
      isModal={settingsModal ? settingsModal : modal}
      onClose={handleClose}
      showCloseButton
    >
      <div className={styles.createCadenceModal}>
        <div className={styles.heading}>
          <h3>{settingsModal ? 'Edit cadence details' : 'Set up cadence'}</h3>
        </div>
        <div className={styles.main}>
          <div className={`${styles.inputGroup} `}>
            <Label required>Cadence name</Label>
            <Input
              value={input}
              setValue={setInput}
              name="name"
              theme={InputThemes.WHITE}
              className={styles.input}
              placeholder="Type here"
            />
          </div>
          <div className={`${styles.inputGroup} `}>
            <Label required>Cadence type</Label>
            <Select
              options={TYPES}
              placeholder="Select here"
              value={input}
              setValue={setInput}
              name="type"
              height="44px"
              numberOfOptionsVisible="4"
            />
          </div>
          <div className={`${styles.inputGroup} `}>
            <Label required>Language</Label>
            <Select
              options={LANGUAGE_OPTIONS}
              placeholder="Select here"
              value={input}
              setValue={setInput}
              name="language"
              height="44px"
              numberOfOptionsVisible="4"
            />
          </div>
        </div>
        <div className={styles.footer}>
          {settingsModal ? (
            <ThemedButton
              className={styles.createBtn}
              theme={ThemedButtonThemes.PRIMARY}
              onClick={handleUpdate}
              loading={updateCadenceTemplateLoading}
            >
              Update cadence
            </ThemedButton>
          ) : (
            <ThemedButton
              className={styles.createBtn}
              theme={ThemedButtonThemes.PRIMARY}
              onClick={handleSubmit}
              loading={templateLoading}
            >
              Create new cadence
            </ThemedButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateCadenceModal;
