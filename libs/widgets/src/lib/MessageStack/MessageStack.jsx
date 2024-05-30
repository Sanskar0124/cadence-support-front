import { useContext } from 'react';

import { MessageContext } from '@cadence-support/context';

//components
import Error from './components/Error/Error';
import Success from './components/Success/Success';
import ConfirmMessage from './components/ConfirmMessage/ConfirmMessage';

import styles from './MessageStack.module.scss';

const MessageStack = () => {
  const {
    errorsArray,
    removeError,
    successArray,
    removeSuccess,
    confirmMessage,
    removeConfirmMessage,
  } = useContext(MessageContext);
  return (
    <div className={styles.errorStack}>
      {errorsArray?.map((error) => (
        <Error
          error={error}
          remove={() => removeError(error.id)}
          key={error.id}
        />
      ))}
      {successArray?.map((success) => (
        <Success
          success={success}
          remove={() => removeSuccess(success.id)}
          key={success.id}
        />
      ))}
      {confirmMessage?.map((msgobj) => (
        <ConfirmMessage
          message={msgobj.msg}
          yesFun={msgobj.fun}
          type={msgobj.type}
          remove={() => removeConfirmMessage(msgobj.type)}
          key={msgobj.type}
        />
      ))}
    </div>
  );
};

export default MessageStack;
