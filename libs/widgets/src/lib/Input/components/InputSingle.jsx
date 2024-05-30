import THEMES from '../themes';

import styles from '../Input.module.scss';
import { isWholeNumStr } from '../utils';
import { TriangleArrow } from '@cadence-support/icons';

const InputSingle = ({
  type,
  value,
  setValue,
  name,
  width = '100%',
  height = '40px',
  className,
  showArrows = false,
  theme = 'WHITE',
  maxValue = 2147483647,
  minValue = 0,
  ...rest
}) => {
  const onChange = (e) => {
    let value = e.target.value;
    if (type === 'number') {
      if (value === '') {
        value = '';
      } else if (isWholeNumStr(value)) {
        value = parseInt(value);
      } else {
        return;
      }

      if (value > maxValue) value = maxValue;
      else if (value < minValue) value = minValue;
    }
    setValue(value);
  };

  switch (type) {
    case 'textarea':
      return (
        <textarea
          value={value}
          onChange={onChange}
          style={{ width, height }}
          name={name}
          className={`${styles.input} ${styles[THEMES[theme]]} ${
            className ?? ''
          }`}
          {...rest}
        />
      );
    case 'number':
      return (
        <div className={styles.numberBox}>
          <div
            className={`${styles.changeCount}  ${
              showArrows ? '' : styles.hide
            }`}
          >
            <TriangleArrow onClick={() => setValue(value + 1)} />
            <TriangleArrow
              style={{ transform: 'rotate(180deg)' }}
              onClick={() => setValue(value > 0 ? value - 1 : 0)}
            />
          </div>

          <input
            value={value}
            onChange={onChange}
            style={{ width, height }}
            name={name}
            type={'text'}
            onBlur={(e) => {
              if (value === '') {
                setValue(0);
              }
            }}
            className={`${styles.input} ${styles[THEMES[theme]]} ${
              className ?? ''
            }`}
            {...rest}
          />
        </div>
      );
    default:
      return (
        <input
          value={value}
          onChange={onChange}
          name={name}
          style={{ width, height }}
          type={type}
          className={`${styles.input} ${styles[THEMES[theme]]}  ${
            className ?? ''
          }  `}
          {...rest}
        />
      );
  }
};

export default InputSingle;
