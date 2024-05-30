/* eslint-disable no-self-assign */
/* eslint-disable no-console */
import { Calendar, DateTime, TriangleArrow } from '@cadence-support/icons';
import { Colors, useOutsideClickHandler } from '@cadence-support/utils';
import {
  InputDateCalendar,
  InputDateTimeCalendar,
} from '@cadence-support/widgets';
import moment from 'moment';
import { useRef, useState } from 'react';
import styles from '../Input.module.scss';
import THEMES from '../themes';
import { isWholeNumStr, isDecimal } from '../utils';

const InputMultiple = ({
  type,
  value,
  setValue,
  onClick,
  name,
  top = false,
  left = false,
  width = '100%',
  height = '40px',
  className,
  isDecimalAllowed = false,
  theme = 'WHITE',
  maxValue = 2147483647,
  minValue = 0,
  disabled,
  showArrows = false,
  ...rest
}) => {
  const [calendarDisplay, setCalendarDisplay] = useState(false);
  const modalRef = useRef();
  useOutsideClickHandler(
    modalRef,
    () => {
      setCalendarDisplay(false);
    },
    false
  );
  const onChange = (e) => {
    let value = e.target.value;
    if (type === 'number') {
      if (value === '') {
        value = '';
      } else if (isDecimalAllowed && isDecimal(value)) {
        value = value;
      } else if (!isDecimalAllowed && isWholeNumStr(value)) {
        value = parseInt(value);
      } else {
        return;
      }

      if (value > maxValue) value = maxValue;
      else if (value < minValue) value = minValue;
    }
    setValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  switch (type) {
    case 'textarea':
      return (
        <textarea
          value={value[name] || ''}
          onChange={onChange}
          style={{ width, height }}
          name={name}
          disabled={disabled}
          className={`${styles.input} ${styles[THEMES[theme]]} ${
            className ?? ''
          }`}
          {...rest}
        />
      );
    case 'datetime':
      return (
        <div className={styles.dateContainer} ref={modalRef}>
          {calendarDisplay && (
            <InputDateTimeCalendar
              className={`${styles.calendar} ${
                top ? styles.top : styles.bottom
              } ${left && styles.left} `}
              theme={'arrowMonthYear'}
              calendarDisplay={calendarDisplay}
              setCalendarDisplay={setCalendarDisplay}
              value={value}
              setValue={setValue}
              name={name}
            />
          )}
          <input
            value={
              value[name]?.DD !== 'dd'
                ? `${(value && value[name]?.DD) || moment().format('DD')}` +
                  ' ' +
                  `${
                    (value &&
                      value[name]?.MM &&
                      moment(value[name]?.MM?.toString(), 'MM').format(
                        'MMMM'
                      )) ||
                    moment().format('MMMM')
                  }` +
                  ' ' +
                  `${(value && value[name]?.YYYY) || moment().format('YYYY')}` +
                  ',' +
                  `${(value && value[name]?.time) || '00:00'}  `
                : ''
            }
            style={{ width, height }}
            name={name}
            onChange={() => null}
            type={'text'}
            className={`${styles.input} ${styles[THEMES[theme]]} ${
              className ?? ''
            }`}
            onClick={() => {
              setCalendarDisplay((prev) => !prev);
            }}
            disabled={disabled}
            {...rest}
          />
          <div
            className={styles.calendarIcon}
            onClick={() => {
              !disabled && setCalendarDisplay((prev) => !prev);
            }}
          >
            <DateTime color={Colors.lightBlue} size="1.3rem" />
          </div>
        </div>
      );
    case 'number':
      return (
        <div className={styles.numberBox}>
          <div
            className={`${styles.changeCount} ${
              showArrows ? '' : styles.hide
            } `}
          >
            <TriangleArrow onClick={() => setValue(value + 1)} />
            <TriangleArrow
              style={{ transform: 'rotate(180deg)' }}
              onClick={() => setValue(value > 0 ? value - 1 : 0)}
            />
          </div>
          <input
            value={value[name]}
            onChange={onChange}
            style={{ width, height }}
            name={name}
            type={'text'}
            onBlur={(e) => {
              if (value === '') {
                setValue(0);
              }
            }}
            disabled={disabled}
            className={`${styles.input} ${styles[THEMES[theme]]} ${
              className ?? ''
            }`}
            {...rest}
          />
        </div>
      );
    case 'date':
      return (
        <div className={styles.dateContainer} ref={modalRef}>
          {calendarDisplay && (
            <InputDateCalendar
              className={`${styles.calendar} ${
                top ? styles.top : styles.bottom
              } ${left && styles.left} `}
              theme={'arrowMonthYear'}
              calendarDisplay={calendarDisplay}
              setCalendarDisplay={setCalendarDisplay}
              value={value}
              setValue={setValue}
              name={name}
            />
          )}
          <input
            // value={`${value[name]?.DD}-${value[name]?.MM}-${value[name]?.YYYY}`}
            value={
              value[name]?.DD !== 'dd'
                ? `${value[name]?.DD || moment().format('DD')}` +
                  ' ' +
                  `${
                    (value[name]?.MM &&
                      moment(value[name]?.MM?.toString(), 'MM').format(
                        'MMMM'
                      )) ||
                    moment().format('MMMM')
                  }` +
                  ' ' +
                  `${value[name]?.YYYY || moment().format('YYYY')}`
                : ''
            }
            style={{ width, height }}
            name={name}
            onChange={() => null}
            type={'text'}
            className={`${styles.input} ${styles[THEMES[theme]]} ${
              className ?? ''
            }`}
            onClick={() => {
              setCalendarDisplay((prev) => !prev);
            }}
            disabled={disabled}
            {...rest}
          />
          <div
            className={styles.calendarIcon}
            onClick={() => {
              !disabled && setCalendarDisplay((prev) => !prev);
            }}
          >
            <Calendar color={Colors.lightBlue} size="1.3rem" />
          </div>
        </div>
      );

    default:
      return (
        <input
          value={value[name] || ''}
          onChange={onChange}
          style={{ width, height }}
          name={name}
          type={type}
          disabled={disabled}
          className={`${styles.input} ${styles[THEMES[theme]]} ${
            className ?? ''
          }`}
          {...rest}
        />
      );
  }
};

export default InputMultiple;
