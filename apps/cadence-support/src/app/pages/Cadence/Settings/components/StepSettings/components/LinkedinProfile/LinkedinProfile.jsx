import {
  Editor,
  Input,
  Label,
  ThemedButton,
  Toggle,
} from '@cadence-support/widgets';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageContext } from '@cadence-support/context';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { CadenceContext } from '../../../../Settings';
import styles from './LinkedinProfile.module.scss';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import * as DOMPurify from 'dompurify';

const LinkedinProfile = ({ node }) => {
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
  const isUrgentRef = useRef(null);
  const [message, setMessage] = useState(node.data.message);
  const [isUrgent, setIsUrgent] = useState(node.is_urgent);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    setMessage(node.data.message);
    // return () => onSave();
  }, [node?.step_number]);

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

  // useEffect(() => {
  //   dataRef.current = message;
  // }, [message]);
  useEffect(() => {
    setIsUrgent(node.is_urgent);
  }, [node]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Linkedin</h2>
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
        <Label>View profile</Label>
        <Editor
          value={message}
          setValue={setMessage}
          height="max(100vh - 300px, 470px)"
          theme="no_attachments"
          showCRMCustomVars
        />
      </div>
    </div>
  );
};

export default LinkedinProfile;
