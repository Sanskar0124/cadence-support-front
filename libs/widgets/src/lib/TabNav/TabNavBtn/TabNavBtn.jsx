import { Button } from '@cadence-support/components';
import THEMES from './themes';

import styles from './TabNavBtn.module.scss';

const TabNavBtn = ({
  onClick,
  active,
  children,
  className,
  bordered,
  theme = 'PRIMARY_GRADIENT',
}) => {
  return (
    <Button
      onClick={onClick}
      yarn
      className={`${styles.tabNavBtn} ${styles[THEMES[theme]]} ${
        active ? styles.active : ''
      } ${bordered ? styles.bordered : ''} ${className ?? ''}`}
    >
      {children}
    </Button>
  );
};

export default TabNavBtn;
