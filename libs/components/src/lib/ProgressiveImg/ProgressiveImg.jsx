import { useState, useEffect, forwardRef } from 'react';
import styles from './ProgressiveImg.module.scss';
import Skeleton from '../Skeleton/Skeleton';

const ProgressiveImg = ({ src, alt, className, ...rest }, ref) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setTimeout(() => {
        setLoading(false);
      }, 50);
    };
  }, [src]);

  return (
    <div className={styles.wrapper}>
      {loading && (
        <Skeleton className={`${styles.placeholder} ${className ?? ''}`} />
      )}
      <img
        ref={ref}
        src={src}
        alt={alt ?? ''}
        className={`${className ?? ''}`}
        style={{ display: 'block' }}
        {...rest}
      />
    </div>
  );
};

export default forwardRef(ProgressiveImg);
