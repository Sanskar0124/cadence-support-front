import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { Container, DeleteModal, Title } from '@cadence-support/components';
import {
  Plus,
  Sort,
  TriangleArrow,
  NoCadence,
  PlusOutline,
} from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import styles from './Cadence.module.scss';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import { HEADERS, STEPS_OPTIONS } from './constants';
import Placeholder from './components/Placeholder/Placeholder';
import { cadencesData } from './cadences';
import CadenceCard from './components/CadenceCard/CadenceCard';
import CreateCadenceModal from './components/CreateCadenceModal/CreateCadenceModal';
import { useCadencesTemplates } from '@cadence-support/data-access';
import { MessageContext } from '@cadence-support/context';
import { useNavigate } from 'react-router-dom';

const Cadence = () => {
  const [stepsSorted, setStepsSorted] = useState(null);
  const [createCadenceModal, setCreateCadenceModal] = useState(false);
  const [cadences, setCadences] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const observer = useRef();
  const navigate = useNavigate();
  const { addSuccess } = useContext(MessageContext);

  // fetching templates data
  const {
    cadenceTemplatesData: templateData,
    cadenceTemplateLoading,
    fetchCadenceTemplate,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    deleteCadenceTemplate,
    cadenceTemplateRefetching,
    deleteCadenceTemplateLoading,
    templateLoading,
    updateCadenceTemplate,
    updateCadenceTemplateLoading,
  } = useCadencesTemplates({ enabled: true });

  //side effects
  useEffect(() => {
    setCadences(templateData);
  }, [templateData]);

  useEffect(() => {
    return () => clearTimeout(timerId);
  }, [timerId]);

  useEffect(() => {
    if (stepsSorted === STEPS_OPTIONS.INCREASING) {
      let cadencesArray = [...templateData];
      cadencesArray.sort((a, b) => a.nodes.length - b.nodes.length);
      setCadences(cadencesArray);
    } else if (stepsSorted === STEPS_OPTIONS.DECREASING) {
      let cadencesArray = [...templateData];
      cadencesArray.sort((a, b) => b.nodes.length - a.nodes.length);
      setCadences(cadencesArray);
    } else setCadences(templateData);
  }, [stepsSorted]);

  //functions
  const handleAddNewCadence = () => setCreateCadenceModal(true);

  const handleStepsClick = (isStepsClicked) => {
    if (isStepsClicked && stepsSorted) setStepsSorted(null);
  };
  const handleDeleteModalClose = () => setDeleteModal(false);

  const handleCadenceDelete = () =>
    deleteCadenceTemplate(deleteModal, {
      onError: (err) => addError(err?.response?.data?.msg),
      onSuccess: () => {
        addSuccess('Cadence deleted');
        fetchCadenceTemplate();
      },
    });

  const handleCadenceUpdate = (cadence) => {
    updateCadenceTemplate(cadence, {
      onSuccess: (data) => {
        addSuccess('Cadence updated Successfully');
        setSettingsModal(false);
        const timeoutID = setTimeout(() => {
          fetchCadenceTemplate();
        }, 800);
        setTimerId(timeoutID);
      },
      onError: (err) => {
        setError(err?.message ?? 'unable to redirect');
      },
    });
  };

  const handleIncreasingStepsClick = () => {
    if (stepsSorted) setStepsSorted(null);
    else setStepsSorted(STEPS_OPTIONS.INCREASING);
  };

  const handleDecreasingStepsClick = () => {
    if (stepsSorted) setStepsSorted(null);
    else setStepsSorted(STEPS_OPTIONS.DECREASING);
  };

  const lastTemplateRef = useCallback(
    (template) => {
      if (isFetchingNextPage || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (template) observer.current.observe(template);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return (
    <Container className={styles.container}>
      <div className={styles.cadencePage}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Title>Cadences</Title>
          </div>
          <div className={styles.right}>
            <SearchBar
              height="50px"
              width="280px"
              placeholderText="Search your cadence"
              disabled={true}
            />
            {templateData?.length > 0 && (
              <ThemedButton
                theme={ThemedButtonThemes.WHITE}
                onClick={handleAddNewCadence}
                width="fit-content"
                height="50px"
              >
                <Plus />
                <div>New cadence</div>
              </ThemedButton>
            )}
          </div>
        </div>

        <div className={`${styles.main}`}>
          <div className={`${styles.cadenceHeader}  `}>
            {HEADERS.map((header) => (
              <div
                className={`${styles[header.value]} ${
                  stepsSorted && styles.sorted
                }`}
                onClick={() => handleStepsClick(header.value === 'steps')}
              >
                {header.label}
                {header.value === 'steps' && (
                  <div className={styles.arrows}>
                    {(!stepsSorted ||
                      stepsSorted === STEPS_OPTIONS.INCREASING) && (
                      <TriangleArrow
                        size="8px"
                        onClick={handleIncreasingStepsClick}
                      />
                    )}{' '}
                    {(!stepsSorted ||
                      stepsSorted === STEPS_OPTIONS.DECREASING) && (
                      <TriangleArrow
                        className={styles.downArrow}
                        size="8px"
                        onClick={handleDecreasingStepsClick}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.body}>
            <div className={styles.cadencesContainer}>
              {cadenceTemplateLoading || templateLoading ? (
                <Placeholder rows={10} />
              ) : cadences?.length > 0 ? (
                <>
                  {cadences?.map((cadence, index) => {
                    const isLastCadence = index === cadences.length - 1;
                    return isLastCadence ? (
                      <>
                        <CadenceCard
                          cadence={cadence}
                          cadenceNo={index + 1}
                          totalCadences={cadences?.length}
                          setDeleteModal={setDeleteModal}
                          deleteModal={setDeleteModal}
                          setSettingsModal={setSettingsModal}
                          key={cadence.cadence_template_id}
                          ref={lastTemplateRef}
                        />
                        {isFetchingNextPage && <Placeholder rows={1} />}
                      </>
                    ) : (
                      <CadenceCard
                        cadence={cadence}
                        cadenceNo={index + 1}
                        totalCadences={cadences?.length}
                        setDeleteModal={setDeleteModal}
                        deleteModal={setDeleteModal}
                        key={cadence.cadence_template_id}
                        setSettingsModal={setSettingsModal}
                      />
                    );
                  })}
                </>
              ) : (
                <div className={styles.noCadence}>
                  <NoCadence />
                  <div>
                    <h4>No cadence found</h4>
                    <ThemedButton
                      theme={ThemedButtonThemes.GREY}
                      onClick={handleAddNewCadence}
                      width="fit-content"
                      style={{ fontWeight: '600' }}
                    >
                      <PlusOutline />
                      <div>Create new cadence</div>
                    </ThemedButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateCadenceModal
        modal={createCadenceModal}
        setModal={setCreateCadenceModal}
        settingsModal={settingsModal}
        setSettingsModal={setSettingsModal}
        handleCadenceUpdate={handleCadenceUpdate}
      />
      <DeleteModal
        modal={deleteModal}
        item={`the Cadence ${deleteModal?.name}`}
        handleClose={handleDeleteModalClose}
        onDelete={handleCadenceDelete}
      />
    </Container>
  );
};

export default Cadence;
