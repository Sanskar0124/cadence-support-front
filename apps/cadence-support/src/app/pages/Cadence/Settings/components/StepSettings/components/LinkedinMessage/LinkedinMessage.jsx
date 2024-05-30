import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { MessageContext } from '@cadence-support/context';
import { Editor, Label, ThemedButton, Toggle } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { StripHtml } from '@cadence-support/utils';
import { TEMPLATE_TYPES } from '@cadence-support/constants';
import { CadenceContext } from '../../../../Settings';
import styles from './LinkedinMessage.module.scss';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import { parseEditorValues } from 'libs/widgets/src/lib/Editor/constants';
import { Tooltip } from '@cadence-support/components';
import { Info } from '@cadence-support/icons';
import { characterLimits } from '../../constants';

const LinkedinMessage = ({ node }) => {
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
  const [input, setInput] = useState(node.data);
  const [isUrgent, setIsUrgent] = useState(node.is_urgent);
  const [template, setTemplate] = useState(null);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    setInput(node.data);
    setTemplate(null);
    // return () => onSave();
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
  }, [input]);

  const onSave = () => {
    // if (
    //   JSON.stringify({ ...dataRef.current }) ===
    //   JSON.stringify({ ...node.data })
    // )
    //   return;
    let data = {
      step_number: node.step_number,
      body: {
        data: {
          ...input,
          message: input.message,
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
  //   // if (template) {
  //   // 	if (input.template_id && input.message !== template?.message) {
  //   // 		setInput(prev => ({ message: prev.message }));
  //   // 		setTemplate(null);
  //   // 	}
  //   // } else {
  //   // 	if (node.data?.template_id && input.message !== node.data?.message)
  //   // 		setInput(prev => ({ message: prev.message }));
  //   // }
  //   dataRef.current = input;
  // }, [input]);

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
  //   if (template)
  //     setInput({
  //       message: template.message,
  //       template_id: template.lt_id,
  //       template_type: 'linkedin',
  //     });
  // }, [template]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Linkedin</h2>
        <div>
          {/* <ThemedButton
            width="fit-content"
            theme={ThemedButtonThemes.TRANSPARENT}
            // onClick={() => setTemplateModal({ type: TEMPLATE_TYPES.LINKEDIN })}
          >
            <div>Import template</div>
          </ThemedButton> */}
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
        <Label>Direct message</Label>
        <Editor
          value={input.message}
          setValue={(message) => setInput((prev) => ({ ...prev, message }))}
          theme="message"
          height="max(100vh - 320px, 470px)"
          showCRMCustomVars
        />
      </div>
      <div className={styles.wordLimit}>
        <p>
          <span
            className={
              parseEditorValues(input.message)?.length >
              characterLimits(node?.type)
                ? styles.red
                : ''
            }
          >
            {parseEditorValues(input.message)?.length}
          </span>{' '}
          / <span>{characterLimits(node?.type)}</span>{' '}
        </p>
        <Tooltip text={'Character count includes html'} theme={'RIGHT'}>
          <Info size={'15px'} />
        </Tooltip>
      </div>
      <div className={styles.buttons}>
        <span className={styles.error}>
          {parseEditorValues(input.message)?.length >
            characterLimits(node?.type) &&
            `Message cannot be more than ${characterLimits(
              node?.type
            )} characters`}
        </span>
      </div>
    </div>
  );
};

export default LinkedinMessage;
