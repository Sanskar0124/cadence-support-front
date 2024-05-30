import React, { useEffect, useState } from 'react';
import styles from './StepInfo.module.scss';
import { TabNavSlider, ThemedButton } from '@cadence-support/widgets';
import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { Close } from '@cadence-support/icons';
import { Tooltip } from '@cadence-support/components';
import { CADENCE_NODE_TYPES, STEP_NAME_MAP } from '@cadence-support/constants';
import { ALPHABETS } from './constant';
import Content from './Content/Content';
import PeopleAndUser from './PeopleAndUser/PeopleAndUser';
import { useNodeStats } from '@cadence-support/data-access';
import EndCadenceView from './EndCadenceView/EndCadenceView';

const TABS = {
  CONTENT: 'content',
  PEOPLE_AND_USER: 'people_and_user',
};

const BUTTONS = [
  { label: 'Content', value: TABS.CONTENT },
  { label: 'People and User', value: TABS.PEOPLE_AND_USER },
];

const StepInfo = ({ onClose, stepId, stepsData, movedLeads }) => {
  const { nodeStats, nodeStatsLoading } = useNodeStats(stepId);
  const [tab, setTab] = useState(TABS.CONTENT);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [step, setStep] = useState(
    stepsData?.sequence?.find((s) => s.node_id === stepId)
  );

  useEffect(() => {
    setTemplateIndex(0);
  }, [stepId]);

  useEffect(() => {
    setStep(stepsData?.sequence?.find((s) => s.node_id === stepId));
  }, [stepsData, stepId]);

  return (
    <div className={styles.stepInfo}>
      <div className={styles.header}>
        <ThemedButton
          className={styles.closeBtn}
          onClick={onClose}
          theme={ThemedButtonThemes.ICON}
        >
          <Tooltip text={'close'}>
            <Close color={'#567191'} />
          </Tooltip>
        </ThemedButton>
        <h3>
          <span>
            Step
            {step?.step_number}:
          </span>
          {STEP_NAME_MAP[step?.type]}
        </h3>
      </div>
      <div className={styles.main}>
        {step?.type === CADENCE_NODE_TYPES.END ? (
          <EndCadenceView
            data={step.data}
            movedLeads={movedLeads}
            loading={nodeStatsLoading}
            cadence={stepsData}
          />
        ) : (
          <div className={styles.contentAndPeople}>
            {step?.data?.aBTestEnabled && (
              <div className={styles.mailSlider}>
                <TabNavSlider
                  buttons={step?.data?.templates?.map((_, i) => ({
                    label: `${
                      [
                        CADENCE_NODE_TYPES.AUTOMATED_MESSAGE,
                        CADENCE_NODE_TYPES.MESSAGE,
                      ]?.includes(step?.type)
                        ? 'SMS'
                        : 'Mail'
                    } ${ALPHABETS[i]}`,
                    value: i,
                  }))}
                  theme={TabNavThemes.SLIDER}
                  value={templateIndex}
                  setValue={setTemplateIndex}
                  activeBtnClassName={styles.activeTab}
                  btnClassName={styles.tabBtn}
                  width="100%"
                  name="mail"
                />
              </div>
            )}
            <div className={styles.navSlider}>
              <TabNavSlider
                theme={TabNavThemes.GREY}
                buttons={BUTTONS.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
                value={tab}
                setValue={setTab}
                className={styles.tabs}
                btnClassName={styles.tabBtns}
                activeBtnClassName={styles.tabBtnActive}
                activePillClassName={styles.activePill}
                name="stepinfo"
              />
            </div>
            <div className={styles.contentBox}>
              {tab === TABS.CONTENT ? (
                <Content
                  step={step}
                  templateIndex={templateIndex}
                  cadence={stepsData}
                />
              ) : (
                <PeopleAndUser stats={nodeStats} loading={nodeStatsLoading} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepInfo;
