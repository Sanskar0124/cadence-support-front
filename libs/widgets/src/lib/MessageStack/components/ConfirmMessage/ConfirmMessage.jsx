import { useEffect, useRef } from 'react';

import styles from './ConfirmMessage.module.scss';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

//component
import { Close, Caution } from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';

const ConfirmMessage = ({ message, remove, yesFun, type }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setTimeout(() => remove(), 100);
  };

  const user = useRecoilValue(userInfo);

  return (
    <div className={`${styles.errorBox} ${styles.isActive}`}>
      <div className={styles.errorText}>
        <Caution color={Colors.white} />
        {message.split('\n').map((line) => (
          <>
            {line} <br />
          </>
        ))}
      </div>
      {/* <div className={styles.partition}></div> */}
      <div className={styles.buttons}>
        <div
          className={styles.yes}
          onClick={(e) => {
            if (type !== 'replyMailError') yesFun();
            handleClose(e);
          }}
        >
          {type === 'unsubscribeError'
            ? 'ADD'
            : type === 'replyMailError' || type === 'notification'
            ? 'OK'
            : 'YES'}
        </div>
        {type !== 'unsubscribeError' && type !== 'replyMailError' && (
          <div
            className={styles.no}
            onClick={(e) => {
              handleClose(e);
            }}
          >
            NO
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmMessage;
