import TimezoneSelect from 'react-timezone-select';
import styles from './Timezone.module.scss';
import { themeStyles } from 'libs/widgets/src/lib/Select/ThemeStyles';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { TABS } from '../../constants';

const Timezone = ({ setRef, user }) => {
  const { roundedStyles } = themeStyles({
    numberOfOptionsVisible: 5,
    width: '578px',
  });

  return (
    <div
      ref={setRef}
      id={TABS.TIMEZONE}
      className={styles.connectionsContainer}
    >
      <div className={styles.cHeading}>Timezone</div>
      <div className={styles.timezone}>
        <TimezoneSelect
          value={user?.timezone || ''}
          onChange={() => null}
          styles={roundedStyles}
          isDisabled
        />
      </div>
    </div>
  );
};

export default Timezone;
