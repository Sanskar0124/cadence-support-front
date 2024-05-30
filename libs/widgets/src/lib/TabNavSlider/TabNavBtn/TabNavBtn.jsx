import { Button } from '@cadence-support/components';
import THEMES from './themes';

import styles from './TabNavBtn.module.scss';

const TabNavBtn = ({
  width,
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
      className={`${styles.tabNavBtn} ${styles[THEMES[theme]]} ${
        active ? styles.active : ''
      } ${bordered && styles.bordered} ${className ?? ''}`}
      style={{ width }}
    >
      {children}
    </Button>
  );
};

export default TabNavBtn;
