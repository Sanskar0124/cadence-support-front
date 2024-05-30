/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';

import Input from '../Input/Input';
import { Tabs, Select } from '@cadence-support/widgets';
import { convertFrom24Hour, convertTo24Hour } from './utils';

import { MERIDIAN_TYPE_OPTIONS } from '@cadence-support/constants';
import { TYPES } from './constants';

import styles from './InputTime.module.scss';

const InputTime = ({
  input,
  setInput,
  name,
  className,
  reRender,
  theme,
  height = '40px',
  hideMinutes = false,
  type = 'slider',
  justify = 'center',
  ...rest
}) => {
  const [internalState, setInternalState] = useState({
    hh: '',
    mm: '',
    a: 'AM',
  });
  useEffect(() => {
    if (internalState.hh === '' && internalState.mm === '') {
      const converted = convertFrom24Hour(
        typeof input === 'object' && name ? input[name] : input
      );
      if (converted) {
        const { hh, mm, a } = converted;
        setInternalState({ hh, mm, a });
      }
    }
  }, [input]);

  // useEffect(() => {
  // 	// setInternalState({ hh, mm, a });
  // }, [reRender]);

  useEffect(() => {
    const { hh, mm, a } = internalState;
    const converted = convertTo24Hour(`${hh}:${mm} ${a}`);
    if (converted)
      if (typeof input === 'object') {
        setInput((prev) => {
          return { ...prev, [name]: converted };
        });
      } else {
        setInput(converted);
      }
  }, [internalState]);

  const renderComponent = () => {
    switch (type) {
      case TYPES.SLIDER:
        return (
          <Tabs
            className={styles.tabNav}
            theme={theme}
            btnTheme={
              theme === 'WHITE' ? 'PRIMARY_AND_WHITE' : 'PRIMARY_AND_GREY'
            }
            radio="true"
            tabs={MERIDIAN_TYPE_OPTIONS}
            name={'a'}
            value={internalState}
            setValue={setInternalState}
            width="150px"
          />
        );

      case TYPES.SELECT:
        return (
          <Select
            options={MERIDIAN_TYPE_OPTIONS}
            value={internalState}
            setValue={setInternalState}
            name="a"
            height={height}
            className={className}
          />
        );

      default:
        break;
    }
  };

  return (
    <div className={`${styles.inputTime}`} {...rest}>
      <div className={styles.inputFields} style={{ justifyContent: justify }}>
        <div className="hh">
          <Input
            name="hh"
            width="50px"
            theme={theme}
            value={internalState}
            className={className}
            setValue={setInternalState}
            type="number"
            placeholder="00"
            maxValue={12}
            height={height}
          />
        </div>
        {!hideMinutes && (
          <>
            <div className={styles.colon}>:</div>
            <div className="mm">
              <Input
                name="mm"
                width="50px"
                theme={theme}
                type="number"
                className={className}
                value={internalState}
                setValue={setInternalState}
                placeholder="00"
                maxValue={59}
                height={height}
              />
            </div>
          </>
        )}
        <div className={styles.a}>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default InputTime;
