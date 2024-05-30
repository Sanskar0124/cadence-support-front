import styles from './CalendyLink.module.scss';
import { Input } from '@cadence-support/widgets';
import { InputThemes } from '@cadence-support/themes';
import Placeholder from '../Placeholder/Placeholder';

const CalendyLink = ({ setRef, user, loading }) => {
  return (
    <div ref={setRef} className={styles.connectionsContainer}>
      <div className={styles.cHeading}>Calendy link</div>
      {loading ? (
        <Placeholder rows={1} />
      ) : (
        <div className={styles.calendy}>
          <Input
            value={user?.calendly_url ?? ''}
            style={{ borderRadius: '15px' }}
            theme={InputThemes.WHITE_WITH_GREY_BORDER}
            placeholder="eg : www.calendy.com/usernameoce//somealphaval121234"
            disabled
          />
        </div>
      )}
    </div>
  );
};

export default CalendyLink;
