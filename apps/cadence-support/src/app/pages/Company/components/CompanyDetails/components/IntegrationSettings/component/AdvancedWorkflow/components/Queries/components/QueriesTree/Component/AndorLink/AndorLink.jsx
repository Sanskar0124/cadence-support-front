import { Tabs, ThemedButton } from '@cadence-support/widgets';
import {
  TabNavBtnThemes,
  TabNavThemes,
  ThemedButtonThemes,
} from '@cadence-support/themes';
import styles from './AndorLink.module.scss';
import { CONDITIONANDOR } from '../../../../../../constants';

const AndOrLink = ({ index, originalFilter }) => {
  return (
    index !== originalFilter?.children?.length - 1 && (
      <div className={styles.nestedTabs}>
        <div className={styles.verticalLineWrapper}>
          <div className={styles.vLine}></div>
        </div>
        <div className={styles.nestedTabsBtns}>
          <div className={styles.tabSideLine}></div>

          <div className={styles.tabsAllBtns}>
            <div className={styles.tabsWrapper}>
              <Tabs
                value={originalFilter?.operation}
                setValue={() => null}
                btnBordered={false}
                theme={TabNavThemes.WHITE}
                btnTheme={TabNavBtnThemes.PRIMARY_AND_WHITE}
                tabs={CONDITIONANDOR}
                className={styles.tabsOperator}
                btnClassName={styles.tabButton}
                activeBtnClassName={styles.activeBtnClassName}
                activePillClassName={styles.activePillClassName}
                radio
                name={'operator'}
                width="150px"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AndOrLink;
