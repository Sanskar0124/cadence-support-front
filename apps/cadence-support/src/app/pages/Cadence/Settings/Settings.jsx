import moment from 'moment-timezone';
import { createContext, useRef, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Container, Div, Spinner, Title } from '@cadence-support/components';
import { BackButton, ThemedButton } from '@cadence-support/widgets';
import { userInfo, templateSteps } from '@cadence-support/atoms';
import styles from './Settings.module.scss';
import { MessageContext } from '@cadence-support/context';
import { CheckCircle2 } from '@cadence-support/icons';
import { useCadencesTemplates } from '@cadence-support/data-access';
import Steps from './components/Steps/Steps';
import StepSettings from './components/StepSettings/StepSettings';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { checkUnSubscribeIsPresent, deepEqual } from '@cadence-support/utils';

export const CadenceContext = createContext();

const Settings = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userInfo);
  const { id: cadence_id } = useParams();
  let onSaveRef = useRef(null);
  const [saving, setSaving] = useState(null);
  const [activeStep, setActiveStep] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [backTriggered, setBackTriggered] = useState(false);
  const [isStepsUpdated, setIsStepsUpdated] = useState(true);
  const [isUpdated, setIsUpdated] = useState({
    wait_time: false,
    urgent: false,
    loading: false,
  });
  const {
    addConfirmMessage,
    setStepChangeable,
    addSuccess,
    addError,
    stepChangeable,
  } = useContext(MessageContext);
  const [steps, setSteps] = useState([]);
  const [cadenceTemplate, setCadenceTemplate] = useState({});
  const [timerId, setTimerId] = useState(null);
  const [waitTime, setWaitTime] = useState({});
  const [initalStep, setInitialStep] = useState(false);

  const {
    cadenceTemplatesData: templateData,
    updateCadenceTemplate,
    fetchCadenceTemplate,
    templateLoading,
    updateCadenceTemplateLoading,
  } = useCadencesTemplates({
    enabled: true,
  });

  const getCadenceDetails = (templateData, cadence_id) => {
    return templateData?.find(
      (template) => template?.cadence_template_id === parseInt(cadence_id)
    );
  };

  let cadence = getCadenceDetails(templateData, cadence_id);
  useEffect(() => {
    if (cadence) {
      setSteps(cadence?.nodes);
      setCadenceTemplate(cadence);
      if (!initalStep) {
        setActiveStep(cadence?.nodes[0]?.step_number);
      }
    }
  }, [cadence]);

  useEffect(() => {
    setCadenceTemplate((prev) => ({ ...prev, nodes: [...steps] }));
  }, [steps]);

  useEffect(() => {
    if (updateCadenceTemplateLoading) setSaving('Saving changes');
    const loading = templateLoading || updateCadenceTemplateLoading;
    const currTimeout = setTimeout(
      () => setSaving(null),
      !loading ? 800 : 1600
    );
    return () => clearTimeout(currTimeout);
  }, [templateLoading, updateCadenceTemplateLoading]);

  const handleUpdate = () => {
    const body = {
      name: cadenceTemplate?.name,
      type: cadenceTemplate?.type,
      language: cadenceTemplate?.language,
      nodes: cadenceTemplate?.nodes,
    };
    const updatedCadence = {
      body: { ...body },
      id: cadenceTemplate?.cadence_template_id,
    };
    updateCadenceTemplate(updatedCadence, {
      onSuccess: (data) => {
        addSuccess('Cadence updated Successfully');
        const timeoutID = setTimeout(() => {
          fetchCadenceTemplate();
        }, 700);
        setTimerId(timeoutID);
        setIsStepsUpdated(true);
        setInitialStep(true);
      },
      onError: (err) => {
        setError(err?.message ?? 'unable to redirect');
      },
    });
  };
  useEffect(() => {
    if (backTriggered) {
      navigate(`/cadence/`);
      setBackTriggered(false);
    }
  }, [backTriggered]);

  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     if (e.key !== 'ArrowUp' || e.key !== 'ArrowDown') {
  //       setIsStepsUpdated(false);
  //     }
  //   };
  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [cadenceTemplate]);

  const handleNotification = () => setBackTriggered(true);
  const checkNodeData = () => {
    const repliedNodes = steps?.filter(
      (step) => step.type === 'reply_to' || step.type === 'automated_reply_to'
    );
    if (repliedNodes?.length > 0) {
      const checkAllNodes = repliedNodes?.every(
        (node) =>
          node?.data?.replied_node_id === undefined ||
          node?.data?.replied_node_id === ''
      );
      if (checkAllNodes) {
        addError('Please Select Mail step ');
      } else {
        repliedNodes.forEach((node) => {
          if (node?.step_number === activeStep) {
            if (node?.data?.aBTestEnabled) {
              for (let i = 0; i <= node?.data?.templates?.length; i++) {
                if (
                  !checkUnSubscribeIsPresent(node?.data?.templates[i]?.body)
                ) {
                  if (stepChangeable.type === 'unsubscribeError') {
                    addConfirmMessage({
                      msg: 'unsubscribe link is mandatory for Automated mails.',
                      fun: stepChangeable.fun,
                      type: stepChangeable.type,
                    });
                  }
                  return false;
                }
                handleUpdate();
              }
            } else {
              if (!checkUnSubscribeIsPresent(node?.data?.body)) {
                if (stepChangeable.type === 'unsubscribeError') {
                  addConfirmMessage({
                    msg: 'unsubscribe link is mandatory for Automated mails.',
                    fun: stepChangeable.fun,
                    type: stepChangeable.type,
                  });
                }
                return false;
              }
              handleUpdate();
            }
          } else handleUpdate();
        });
      }
    } else {
      handleUpdate();
    }
  };

  return (
    <CadenceContext.Provider
      value={{
        activeStep,
        setActiveStep,
        saveVisible,
        setSaveVisible,
        templateData,
        onSaveRef,
        steps,
        setSteps,
        templateData,
        cadenceTemplate,
        setCadenceTemplate,
        waitTime,
        setWaitTime,
        isUpdated,
        setIsUpdated,
        setIsStepsUpdated,
        isStepsUpdated,
      }}
    >
      <Container className={styles.settings}>
        <div className={styles.header}>
          <div className={styles.left}>
            <BackButton
              text="Steps list"
              link={`/cadence`}
              onClick={() => {
                if (!isStepsUpdated) {
                  addConfirmMessage({
                    type: 'notification',
                    msg: 'Leaving this page without saving could lead to data loss.',
                    fun: () => handleNotification(),
                  });
                } else {
                  navigate('/cadence');
                }
              }}
            />
            <Div className={styles.title}>
              <Title size="1.42rem">{cadence?.name}</Title>
            </Div>
          </div>
          <div className={styles.right}>
            <ThemedButton
              width="fit-content"
              theme={ThemedButtonThemes.GREY}
              className={styles.templateBtn}
              onClick={checkNodeData}
              loading={isUpdated.loading}
            >
              Update cadence template
            </ThemedButton>
            {saving ? (
              <span className={`${styles.status} ${styles.saving}`}>
                <Spinner className={styles.spinner} />
              </span>
            ) : cadence?.created_at !== null ? (
              <span className={`${styles.status} ${styles.saved}`}>
                <CheckCircle2 />
                Saved {moment(cadence?.created_at).fromNow()}
              </span>
            ) : null}
            {/* {error && <span className={styles.error}>Failed to fetch cadence</span>} */}
          </div>
        </div>

        <div className={styles.container}>
          <Steps cadence={cadenceTemplate} isStepsUpdated={isStepsUpdated} />
          <StepSettings cadence={cadenceTemplate} loading={templateLoading} />
        </div>
      </Container>
    </CadenceContext.Provider>
  );
};

export default Settings;
