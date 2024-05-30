import { useState } from 'react';
import styles from './Tooltip.module.scss';

const THEMES = {
  BOTTOM: 'bottom',
};

const Tooltip = ({ children, text, theme = 'BOTTOM' }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={styles.tooltipcontainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltipcard} ${styles[THEMES[theme]]}`}>
          <div className={styles.title}>{text.title}</div>
          <div className={styles.content}>{text.content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
