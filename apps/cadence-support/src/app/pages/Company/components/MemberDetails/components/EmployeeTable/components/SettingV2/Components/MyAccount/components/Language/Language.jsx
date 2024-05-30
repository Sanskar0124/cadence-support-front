import styles from './Language.module.scss';
import { TabNav, TabNavBtn } from '@cadence-support/widgets';
import { FranceFlag, UkFlag, SpainFlag } from '@cadence-support/icons';
import { TabNavBtnThemes, TabNavThemes } from '@cadence-support/themes';

const Language = ({ setRef, user, loading }) => {
  return (
    <div ref={setRef} className={styles.connectionsContainer}>
      <div className={styles.cHeading}>Language</div>
      <div className={styles.language}>
        <TabNav
          theme={TabNavThemes.WHITE}
          btnTheme={TabNavBtnThemes.PRIMARY_AND_GREY}
        >
          <TabNavBtn active={true} onClick={() => null}>
            <UkFlag className={styles.active} />
            English
          </TabNavBtn>
          <TabNavBtn
            onClick={() => null}
            // active={user?.language === 'french' ? true : false}
          >
            <FranceFlag
            // className={user?.language === 'french' ? styles.active : ''}
            />
            French
          </TabNavBtn>
          <TabNavBtn
            onClick={() => null}
            // active={user?.language === 'spanish' ? true : false}
          >
            <SpainFlag
            // className={user?.language === 'spanish' ? styles.active : ''}
            />
            Spanish
          </TabNavBtn>
        </TabNav>
      </div>
    </div>
  );
};

export default Language;
