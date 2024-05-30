import { useEffect, useState } from 'react';
import { useNodeStats } from '@cadence-support/data-access';

import styles from './StepInfo.module.scss';
import { Button, Tooltip } from '@pipedrive/components';
import { Close } from '@cadence-support/icons';
import { TabNavSlider, ThemedButton } from '@pipedrive/widgets';
import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { CADENCE_NODE_TYPES } from '@cadence-support/constants';
import { ALPHABETS } from './constants';
import PeopleAndUser from './components/PeopleAndUser/PeopleAndUser';
import Content from './components/Content/Content';
import EndCadenceView from './components/EndCadenceView/EndCadenceView';

const TABS = {
  CONTENT: 'content',
  PEOPLE_AND_USER: 'people_and_user',
};

const BUTTONS = [
  { label: 'Content', value: TABS.CONTENT },
  { label: 'People and user', value: TABS.PEOPLE_AND_USER },
];

const StepInfo = ({ step, onClose, cadence }) => {
  const { nodeStats, nodeStatsLoading } = useNodeStats(step?.node_id);
  const [tab, setTab] = useState(TABS.CONTENT);
  const [mailIndex, setMailIndex] = useState(0);

  useEffect(() => {
    setMailIndex(0);
  }, [step]);

  return (
    <div className={styles.stepInfo}>
      <div className={styles.header}>
        <ThemedButton
          className={styles.closeBtn}
          onClick={onClose}
          theme={ThemedButtonThemes.ICON}
        >
          <Tooltip text="Close">
            <Close color={'#567191'} />
          </Tooltip>
        </ThemedButton>
        <h3>
          <span>Step {step?.step_number}:</span>
          {step?.name}
        </h3>
      </div>
      <div className={styles.main}>
        {step?.type === CADENCE_NODE_TYPES.END ? (
          <EndCadenceView data={step.data} />
        ) : (
          <div className={styles.contentAndPeople}>
            {((step?.type === 'automated_mail' &&
              step?.data?.[0]?.aBTestEnabled) ||
              step?.data?.aBTestEnabled) && (
              <div className={styles.mailSlider}>
                <TabNavSlider
                  buttons={
                    step?.type === 'automated_mail'
                      ? step?.data?.[0]?.templates?.map((_, i) => ({
                          label: `Mail ${ALPHABETS[i]}`,
                          value: i,
                        }))
                      : step?.data?.templates?.map((_, i) => ({
                          label: `Mail ${ALPHABETS[i]}`,
                          value: i,
                        }))
                  }
                  theme={TabNavThemes.SLIDER}
                  value={mailIndex}
                  setValue={setMailIndex}
                  activeBtnClassName={styles.activeTab}
                  btnClassName={styles.tabBtn}
                  width="100%"
                />
              </div>
            )}
            <div className={styles.navSlider}>
              <TabNavSlider
                theme={TabNavThemes.GREY}
                buttons={BUTTONS}
                value={tab}
                setValue={setTab}
                className={styles.tabs}
                btnClassName={styles.tabBtns}
                activeBtnClassName={styles.tabBtnActive}
                activePillClassName={styles.activePill}
              />
            </div>
            <div className={styles.contentBox}>
              {tab === TABS.CONTENT ? (
                <Content step={step} mailIndex={mailIndex} />
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
