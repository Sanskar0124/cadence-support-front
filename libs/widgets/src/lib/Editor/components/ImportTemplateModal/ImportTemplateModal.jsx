import React, { useEffect, useState } from 'react';
import { Div, Modal, Title } from '@cadence-support/components';
import styles from './ImportTemplateModal.module.scss';
import { useTemplate } from '@cadence-support/data-access';
import { InputRadio, Checkbox, ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import {
  Common as COMMON_TRANSLATION,
  Templates as TEMPLATES_TRANSLATION,
} from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const TEMPLATE_ID_TYPES = {
  sms: 'mt_id',
  email: 'et_id',
  linkedin: 'lt_id',
  script: 'st_id',
};

const ImportTemplateModal = ({ modal, setModal, setTemplate }) => {
  const [selected, setSelected] = useState(null);
  const onClose = () => {
    setModal(false);
    setSelected(null);
  };
  const user = useRecoilValue(userInfo);

  const {
    templates: templatesData,
    templateLoading,
    refetch,
  } = useTemplate({
    templateLevel: 'personal',
    templateType: modal?.type,
  });

  useEffect(() => {
    if (modal) {
      refetch();
    }
  }, [modal]);

  const onSave = (template) => {
    let templateToSave = template;
    setTemplate(templateToSave);
    onClose();
  };

  return (
    <Modal
      isModal={modal ? true : false}
      onClose={onClose}
      className={styles.modal}
      showCloseButton
    >
      <h2 className={styles.title}>Choose Templates</h2>
      {templateLoading ? (
        <div className={styles.placeholder}>
          {[...Array(3).keys()].map(() => (
            <Div loading />
          ))}
        </div>
      ) : (
        <div className={styles.templateBox}>
          {templatesData?.length > 0 ? (
            templatesData?.map((template) => (
              <div className={styles.template}>
                {
                  <InputRadio
                    size={24}
                    className={styles.radio}
                    checked={selected === template}
                    value={template}
                    onChange={() => setSelected(template)}
                  />
                }

                <span className={styles.name}>{template.name}</span>
              </div>
            ))
          ) : (
            <span className={styles.fallback}>No templates present</span>
          )}
        </div>
      )}

      <ThemedButton
        disabled={!selected}
        className={styles.saveBtn}
        theme={ThemedButtonThemes.PRIMARY}
        onClick={() => onSave(selected)}
      >
        Save
      </ThemedButton>
    </Modal>
  );
};

export default ImportTemplateModal;
