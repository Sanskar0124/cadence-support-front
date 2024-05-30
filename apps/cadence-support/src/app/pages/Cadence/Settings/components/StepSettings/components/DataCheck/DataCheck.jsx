import { Editor, Label, Toggle } from '@cadence-support/widgets';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageContext } from '@cadence-support/context';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { CadenceContext } from '../../../../Settings';
import styles from './DataCheck.module.scss';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import * as DOMPurify from 'dompurify';

const DataCheck = ({ node }) => {
  const {
    activeStep,
    setActiveStep,
    setSaveVisible,
    onSaveRef,
    cadenceTemplate,
    steps,
    setSteps,
    waitTime,
    setIsStepsUpdated,
  } = useContext(CadenceContext);
  const { id: cadence_id } = useParams();
  const queryClient = useQueryClient();
  const { addError } = useContext(MessageContext);
  const dataRef = useRef(null);
  const [message, setMessage] = useState(node.data.message);
  const [isUrgent, setIsUrgent] = useState(node.is_urgent);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    setMessage(node.data.message);
  }, [node?.step_number]);

  useEffect(() => {
    setIsUrgent(node.is_urgent);
  }, [node]);

  useEffect(() => {
    onSave();
    const handleKeyPress = (e) => {
      if (e.key !== 'ArrowUp' || e.key !== 'ArrowDown' || e.key !== '') {
        setIsStepsUpdated(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [message]);

  const onSave = () => {
    // if (
    //   JSON.stringify({ message: dataRef.current }) ===
    //   JSON.stringify({ message: node.data.message })
    // )
    //   return;
    let data = {
      step_number: node.step_number,
      body: {
        data: {
          message: DOMPurify.sanitize(message),
        },
      },
    };

    setSteps((prev) =>
      prev.map((step) => {
        if (step.step_number === node.step_number) {
          return {
            ...step,
            data: data.body.data,
            wait_time: waitTime[node?.step_number],
          };
        }
        return step;
      })
    );
    setSaveVisible(true);
  };

  // useEffect(() => {
  //   dataRef.current = message;
  // }, [message]);

  const handleisUrgent = (e) => {
    let dataToUpdate = {
      step_number: node.step_number,
      body: { is_urgent: e.target.checked },
    };
    setIsUrgent(e.target.checked);
    setSteps((prev) =>
      prev.map((step) => {
        if (step.step_number === node.step_number) {
          return {
            ...step,
            is_urgent: dataToUpdate.body.is_urgent,
            wait_time: waitTime[node?.step_number],
          };
        }
        return step;
      })
    );
  };

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Data Check</h2>
        <div>
          <div className={styles.toggleBox}>
            <p>Urgent</p>
            <Toggle
              checked={isUrgent}
              onChange={handleisUrgent}
              theme="PURPLE"
            />
          </div>
        </div>
      </div>
      <div className={styles.inputBox}>
        <Label>Message</Label>
        <Editor
          height="max(100vh - 300px, 500px)"
          value={message}
          setValue={setMessage}
          className={styles.editor}
          theme="no_attachments"
          showCRMCustomVars
        />
      </div>
    </div>
  );
};

export default DataCheck;
