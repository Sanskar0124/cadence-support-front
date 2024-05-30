import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { MessageContext } from '@cadence-support/context';
import { Editor, Label, ThemedButton, Toggle } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { CadenceContext } from '../../../../Settings';
import styles from './Call.module.scss';
import { INTEGRATION_TYPE, TEMPLATE_TYPES } from '@cadence-support/constants';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import * as DOMPurify from 'dompurify';
import { parseEditorValues } from 'libs/widgets/src/lib/Editor/constants';
import { Tooltip } from '@cadence-support/components';
import { Info } from '@cadence-support/icons';
import { characterLimits } from '../../constants';

const Call = ({ node }) => {
  const {
    activeStep,
    setActiveStep,
    setSaveVisible,
    onSaveRef,
    steps,
    setSteps,
    cadenceTemplate,
    setCadenceTemplate,
    waitTime,
    setWaitTime,
    setIsStepsUpdated,
  } = useContext(CadenceContext);
  // const [node, setNode] = useState();
  const { id: cadence_id } = useParams();
  const queryClient = useQueryClient();
  const { addError } = useContext(MessageContext);
  const dataRef = useRef(null);
  const [input, setInput] = useState(node?.data);
  const [isUrgent, setIsUrgent] = useState(node?.is_urgent);
  const [template, setTemplate] = useState(null);
  const user = useRecoilValue(userInfo);
  const [isInputChanged, setInputChanged] = useState(null);

  // useEffect(() => {
  // 	activeStep && setNode(cadence?.sequence?.find(s => s.node_id === activeStep));
  // }, [cadence, activeStep]);

  useEffect(() => {
    setInput(node?.data);

    // return () => {
    //   onSave();
    // };
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
    // if (JSON.stringify(dataRef.current) === JSON.stringify(node?.data)) return;
    let data = {
      step_number: node?.step_number,
      body: {
        data: {
          ...input,
          script: DOMPurify.sanitize(input?.script),
        },
      },
    };

    setSteps((prev) =>
      prev.map((step) => {
        if (step.step_number === node.step_number) {
          return {
            ...step,
            data: data?.body?.data,
            wait_time: waitTime[node?.step_number],
          };
        }
        return step;
      })
    );
    setSaveVisible(true);
  };

  useEffect(() => {
    // if (template) {
    //   if (input.template_id && input?.script !== template?.script) {
    //     setInput((prev) => ({ script: prev.script }));
    //     setTemplate(null);
    //   }
    // } else {
    //   if (node?.data?.template_id && input?.script !== node?.data?.script)
    //     setInput((prev) => ({ script: prev.script }));
    // }
    dataRef.current = input;
  }, [input]);

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
  //       script: template.script,
  //       template_id: template.st_id,
  //       template_type: 'script',
  //     });
  // }, [template]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Call</h2>
        <div>
          {/* <ThemedButton
            width="fit-content"
            theme={ThemedButtonThemes.TRANSPARENT}
            // onClick={() => setTemplateModal({ type: TEMPLATE_TYPES.SCRIPT })}
          >
            <div>Import Template</div>
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
        <Label>Script</Label>
        <Editor
          value={input?.script}
          setValue={(script) => setInput((prev) => ({ ...prev, script }))}
          className={styles.editor}
          height="max(100vh - 300px, 410px)"
          theme="no_attachments"
          showCRMCustomVars
        />
      </div>
      <div className={styles.wordLimit}>
        <p>
          <span
            className={
              parseEditorValues(input.script)?.length >
              characterLimits(node?.type)
                ? styles.red
                : ''
            }
          >
            {parseEditorValues(input.script)?.length}
          </span>{' '}
          / <span>{characterLimits(node?.type)}</span>{' '}
        </p>
        <Tooltip text={'Character count includes html'} theme={'RIGHT'}>
          <Info size={'15px'} />
        </Tooltip>
      </div>
      <div className={styles.buttons}>
        <span className={styles.error}>
          {parseEditorValues(input.script)?.length >
            characterLimits(node?.type) &&
            `Message cannot be more than ${characterLimits(
              node?.type
            )} characters`}
        </span>
      </div>
    </div>
  );
};

export default Call;
