import TimezoneSelect from 'react-timezone-select';
import styles from './Timezone.module.scss';
import { themeStyles } from 'libs/widgets/src/lib/Select/ThemeStyles';

const Timezone = ({ setRef, user }) => {
  const { roundedStyles } = themeStyles({
    numberOfOptionsVisible: 5,
    width: '578px',
  });

  return (
    <div ref={setRef} className={styles.connectionsContainer}>
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
