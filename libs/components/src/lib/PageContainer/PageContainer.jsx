import React from 'react';
import styles from './PageContainer.module.scss';

const PageContainer = ({ children, className, ...rest }) => {
  return (
    <div className={styles.pageContainer + ' ' + className ?? ''} {...rest}>
      {children}
    </div>
  );
};

export default PageContainer;
