import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { MessageContext } from '@cadence-support/context';
import {
  Editor,
  Input,
  Label,
  ThemedButton,
  Toggle,
  Select,
} from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { CadenceContext } from '../../../../Settings';
import styles from './Callback.module.scss';
import { INTEGRATION_TYPE, TEMPLATE_TYPES } from '@cadence-support/constants';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { Tooltip } from '@cadence-support/components';
import { getInput, NO_OF_RETRIES, TIME_UNITS_OPTIONS } from './constants';
import * as DOMPurify from 'dompurify';
import { parseEditorValues } from 'libs/widgets/src/lib/Editor/constants';
import { Info } from '@cadence-support/icons';
import { characterLimits } from '../../constants';

const Callback = ({ node }) => {
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
  // const [node, setNode] = useState();
  const { id: cadence_id } = useParams();
  const queryClient = useQueryClient();
  const {
    addError,
    addConfirmMessage,
    removeConfirmMessage,
    setStepChangeable,
  } = useContext(MessageContext);
  const dataRef = useRef(null);
  const [input, setInput] = useState(getInput(node));
  const [isUrgent, setIsUrgent] = useState(node?.is_urgent);
  const [template, setTemplate] = useState(null);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    setInput(getInput(node));
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
    const newNodeData = {
      duration:
        input.duration_time_unit === 'minutes'
          ? input.duration * 60
          : input.duration,
      retries: input.retries,
      retry_after:
        input.retry_after_time_unit === 'hours'
          ? input.retry_after * 60 * 60
          : input.retry_after_time_unit === 'minutes'
          ? input.retry_after * 60
          : input.retry_after,
      script: input.script,
      template_id: input.template_id,
      template_type: input.template_type,
    };
    if (!newNodeData?.template_id) delete newNodeData.template_id;
    if (!newNodeData?.template_type) delete newNodeData.template_type;

    if (JSON.stringify(newNodeData) === JSON.stringify(node?.data)) return;

    let data = {
      step_number: node?.step_number,
      body: {
        data: {
          ...newNodeData,
          script: DOMPurify.sanitize(newNodeData.script),
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

  useEffect(() => {
    if (
      (input?.duration_time_unit === 'minutes'
        ? input?.duration * 60
        : input?.duration) > 300
    ) {
      addConfirmMessage({
        type: 'callback_duration',
        fun: () => {
          setInput((prev) => ({
            ...prev,
            duration: 5,
            duration_time_unit: TIME_UNITS_OPTIONS[1].value,
          }));
        },
        msg: 'Callback duration cannot be more than 5 minutes. \nDo you want to change it to maximum. ?',
      });
      setStepChangeable(false);
      return;
    } else {
      setStepChangeable(true);
      removeConfirmMessage('callback_duration');
    }

    // dataRef.current = input;
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
            is_urgent: dataToUpdate?.body?.is_urgent,
            wait_time: waitTime[node?.step_number],
          };
        }
        return step;
      })
    );
  };

  // useEffect(() => {
  //   if (template)
  //     setInput((prev) => ({
  //       ...prev,
  //       script: template.script,
  //       template_id: template.st_id,
  //       template_type: 'script',
  //     }));
  // }, [template]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Callback</h2>
        <div>
          {/* <ThemedButton
            width="fit-content"
            theme={ThemedButtonThemes.TRANSPARENT}
            //   onClick={() => setTemplateModal({ type: TEMPLATE_TYPES.SCRIPT })}
          >
            <div>Import template</div>
          </ThemedButton> */}
          <div className={styles.toggleBox}>
            <p>Urgent</p>
            <Toggle
              checked={isUrgent}
              onChange={(e) => handleisUrgent(e)}
              theme="PURPLE"
            />
          </div>
        </div>
      </div>
      <div className={styles.inputBoxInline}>
        <div>
          <Label>Duration of callback</Label>
          <div>
            <Input
              type="number"
              placeholder="00"
              className={styles.inputNumber}
              value={input}
              name="duration"
              setValue={setInput}
              width="60px"
            />
            <Select
              options={[TIME_UNITS_OPTIONS[0], TIME_UNITS_OPTIONS[1]]}
              className={styles.inputSelect}
              value={input}
              name="duration_time_unit"
              setValue={setInput}
              width="140px"
            />
          </div>
        </div>
        <div>
          <Label>Retry after</Label>
          <div>
            <Input
              type="number"
              placeholder="00"
              className={styles.inputNumber}
              value={input}
              name="retry_after"
              setValue={setInput}
              width="60px"
            />
            <Select
              options={TIME_UNITS_OPTIONS}
              className={styles.inputSelect}
              value={input}
              name="retry_after_time_unit"
              setValue={setInput}
              width="140px"
            />
          </div>
        </div>
        <div>
          <Label>No. of retries</Label>
          <Select
            options={NO_OF_RETRIES}
            placeholder="Select a number"
            className={styles.inputSelect}
            value={input}
            name="retries"
            setValue={setInput}
            width="220px"
          />
        </div>
      </div>
      <div className={styles.inputBox}>
        <Label>Script</Label>
        <Editor
          value={input?.script}
          setValue={(script) => setInput((prev) => ({ ...prev, script }))}
          className={styles.editor}
          height="max(100vh - 400px, 370px)"
          theme="no_attachments"
          // showCRMCustomVars={
          //   user?.integration_type === INTEGRATION_TYPE.SALESFORCE
          // }
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
      {/* <div className={styles.buttons}>
          <span className={styles.error}>
            {parseEditorValues(input.script)?.length >
              characterLimits(node?.type) &&
              `Message cannot be more than ${characterLimits(
                node?.type
              )} characters`}
          </span>
        </div> */}
    </div>
  );
};

export default Callback;
