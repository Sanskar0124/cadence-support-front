import { useEffect, useRef } from 'react';

import styles from './Error.module.scss';

//component
import { Close, Caution } from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';

const Error = ({ error, remove }) => {
  const timeoutId = useRef();

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      remove();
    }, 10000);
  });

  const handleClose = (e) => {
    e.preventDefault();
    clearTimeout(timeoutId.current);
    setTimeout(() => remove(), 100);
  };

  return (
    <div className={`${styles.errorBox} ${styles.isActive}`}>
      <span
        className={styles.closeIcon}
        onClick={(e) => {
          handleClose(e);
        }}
      >
        <Close />
      </span>
      <div className={styles.errorText}>
        <Caution color={Colors.white} />
        {error.text}
      </div>
    </div>
  );
};

export default Error;
