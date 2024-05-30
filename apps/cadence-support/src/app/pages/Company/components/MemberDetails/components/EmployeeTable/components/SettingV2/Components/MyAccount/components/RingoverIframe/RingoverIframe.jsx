import styles from './RingoverIframe.module.scss';
import { InputRadio } from '@cadence-support/widgets';
import { Profile as PROFILE_TRANSLATION } from '@cadence-support/languages';
import { IFRAME_POSITION_OPTIONS } from './constants';
import { TABS } from '../../constants';

const RingoverIframe = ({ setRef, user }) => {
  return (
    null
    // <div
    //   ref={setRef}
    //   id={TABS.RINGOVER_IFRAME}
    //   className={styles.connectionsContainer}
    // >
    //   <div className={styles.cHeading}>
    //     {PROFILE_TRANSLATION.RINGOVER_I_FRAME[user?.language?.toUpperCase()] ??
    //       'ringover I-frame'}
    //   </div>
    //   <div className={styles.cTitle}>
    //     {PROFILE_TRANSLATION.I_FRAME[user?.language?.toUpperCase()] ??
    //       'set the position for the I-frame'}
    //   </div>
    //   <div className={styles.cSubtitle}>
    //     Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
    //     sint.
    //   </div>
    //   <div className={styles.signatures}>
    //     {Object.values(IFRAME_POSITION_OPTIONS).map((option) => (
    //       <div
    //         className={`${
    //           user?.is_call_iframe_fixed === option.value ? styles.active : ''
    //         }`}
    //       >
    //         <div className={styles.input}>
    //           <InputRadio
    //             size={40}
    //             checked={user?.is_call_iframe_fixed === option.value}
    //             value={option.value}
    //             onChange={() => null}
    //           />
    //           <span className={styles.name}>
    //             {option.label[user?.language?.toUpperCase() ?? 'ENGLISH']}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default RingoverIframe;
