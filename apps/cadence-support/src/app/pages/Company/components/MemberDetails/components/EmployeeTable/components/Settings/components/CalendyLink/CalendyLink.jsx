import styles from './CalendyLink.module.scss';
import { Input } from '@cadence-support/widgets';
import { InputThemes } from '@cadence-support/themes';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { TABS } from '../../constants';

const CalendyLink = ({ setRef, user }) => {
  return (
    <div
      ref={setRef}
      id={TABS.CALENDLY_LINK}
      className={styles.connectionsContainer}
    >
      <div className={styles.cHeading}>Calendy link</div>
      <div className={styles.calendy}>
        <Input
          value={user?.calendly_url ?? ''}
          style={{ borderRadius: '15px' }}
          theme={InputThemes.WHITE_WITH_GREY_BORDER}
          placeholder="eg : www.calendy.com/usernameoce//somealphaval121234"
          disabled
        />
      </div>
    </div>
  );
};

export default CalendyLink;
