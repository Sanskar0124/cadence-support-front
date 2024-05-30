import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@cadence-support/icons';

import styles from './BackButton.module.scss';

const BackButton = ({ link, text, onClick, className, disabled }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (disabled) return;
    if (onClick && typeof onClick === 'function') onClick();
    else if (link) navigate(link);
    else navigate(-1);
  };

  return (
    <div
      className={`${styles.backBtn} ${disabled ? styles.disabled : ''} ${
        className ?? ''
      }`}
      onClick={handleOnClick}
    >
      <span>
        <ArrowLeft />
      </span>
      <span>{text ?? 'Go Back'}</span>
    </div>
  );
};

export default BackButton;
