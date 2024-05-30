import { useState, forwardRef } from 'react';
import THEMES from './themes';

import { TriangleArrow } from '@cadence-support/icons';

import styles from './CollapseContainer.module.scss';

const CollapseContainer = (
  { children, className, theme = 'PRIMARY', openByDefault = true, title },
  ref
) => {
  const [isOpen, setIsOpen] = useState(openByDefault ?? false);

  return (
    <div
      className={`${styles.collapseContainer} ${className ?? ''} ${
        styles[THEMES[theme]]
      } ${isOpen && styles.expanded}`}
    >
      <div
        ref={ref}
        className={styles.collapseHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        <button className={`${styles.arrow} ${isOpen && styles.arrowDown}`}>
          <TriangleArrow size="0.8rem" />
        </button>
      </div>
      <div className={`${styles.collapseChildren} ${isOpen && styles.open} `}>
        {children}
      </div>
    </div>
  );
};

export default forwardRef(CollapseContainer);
