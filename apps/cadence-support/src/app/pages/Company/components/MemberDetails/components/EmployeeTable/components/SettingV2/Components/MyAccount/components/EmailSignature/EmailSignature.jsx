import styles from './EmailSignature.module.scss';
import { InputRadio } from '@cadence-support/widgets';
import Placeholder from '../Placeholder/Placeholder';

const EmailSignature = ({ setRef, user, loading }) => {
  return (
    <>
      <div
        ref={setRef}
        // id={TABS.EMAIL_SIGNATURE}
        className={styles.connectionsContainer}
      >
        <div className={styles.cHeading}>Email signature</div>
        <div className={styles.cTitle}>Your email signatures</div>
        <div className={styles.options}>
          {loading ? (
            <Placeholder rows={3} />
          ) : user?.Signatures?.length > 0 ? (
            user?.Signatures?.map((sign) => (
              <div
                key={sign?.signature_id}
                className={`${sign?.is_primary ? styles.active : ''}`}
              >
                <div className={styles.input}>
                  {sign?.name && (
                    <InputRadio
                      size={40}
                      checked={sign?.is_primary}
                      value={sign?.signature_id}
                      onChange={() => null}
                    />
                  )}

                  <span className={styles.name} title={sign?.name}>
                    {sign?.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className={styles.input}>
                <span className={styles.name}>Not Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailSignature;
