import styles from './PrimaryPhone.module.scss';
import { InputRadio } from '@cadence-support/widgets';
import Placeholder from '../Placeholder/Placeholder';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { TABS } from '../../constants';

const PrimaryPhone = ({ setRef, user, loading }) => {
  return (
    <div
      ref={setRef}
      id={TABS.PRIMARY_PHONE}
      className={styles.connectionsContainer}
    >
      <div className={styles.cHeading}>Primary phone</div>
      <div className={styles.cTitle}>Your primary phone number</div>
      <div className={styles.options}>
        {loading ? (
          <Placeholder rows={3} />
        ) : user?.phone_numbers?.length > 0 ? (
          user?.phone_numbers.map((number) => (
            <div
              key={number}
              className={`${
                number === user?.primary_phone_number ? styles.active : ''
              }`}
            >
              <div className={styles.input}>
                <InputRadio
                  size={40}
                  checked={number === user?.primary_phone_number}
                  value={number}
                  onChange={() => null}
                />

                <span className={styles.name}>{number}</span>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className={styles.input}>
              <span className={styles.name}>Not Selected</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryPhone;
