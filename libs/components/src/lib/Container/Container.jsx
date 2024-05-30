import styles from './Container.module.scss';

const Container = ({ children, className, ...rest }) => {
  return (
    <div className={styles.container + ' ' + className ?? ''} {...rest}>
      {children}
    </div>
  );
};

export default Container;
