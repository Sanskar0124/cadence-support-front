import { useEffect, useRef, useState } from 'react';
import TabNavBtn from './TabNavBtn/TabNavBtn';
import THEMES from './themes';

import styles from './TabNavSlider.module.scss';
import { TabNavThemes } from '@cadence-support/themes';

const TabNavSlider = ({
  width = '100%',
  theme,
  btnTheme,
  btnBordered,
  className,
  btnClassName,
  activeBtnClassName,
  activePillClassName,
  buttons,
  value,
  setValue,
  direction = 'row',
  btnHeight = '20px', // or column
}) => {
  const [activeButton, setActiveButton] = useState();
  const [btnWidth, setBtnWidth] = useState(0);

  const tabNavRef = useRef(null);

  useEffect(() => {
    let index;
    buttons.forEach((button, i) => {
      if (button.value === value) index = i;
    });
    setActiveButton(index);
  }, [value]);

  const setButtonWidth = () => {
    let tabNavWidth = tabNavRef.current?.clientWidth;
    setBtnWidth(tabNavWidth / buttons.length - 5);
  };

  useEffect(() => {
    window.addEventListener('resize', setButtonWidth);
    setButtonWidth();
  }, [buttons.length]);

  return (
    <div>
      <div
        ref={tabNavRef}
        className={`${styles.tabNavContainer} ${
          styles[THEMES[theme]]
        } ${className}`}
        style={{ width, flexDirection: direction }}
      >
        {buttons.map((button) => (
          <TabNavBtn
            className={`${btnClassName ?? ''}  ${
              value === button.value ? activeBtnClassName : ''
            }`}
            active={value === button.value}
            onClick={() => setValue(button.value)}
            width={`${direction === 'row' ? btnWidth + 'px' : '100%'}`}
            theme={btnTheme}
            key={button.value}
          >
            {button.label}
          </TabNavBtn>
        ))}
        <div
          className={`${styles.activePill} ${activePillClassName ?? ''}`}
          style={
            direction === 'row'
              ? {
                  left: `calc(0.35rem + ${activeButton * btnWidth}px)`,

                  width: `${btnWidth}px}`,
                }
              : {
                  top: `calc(0.35rem + ${activeButton * btnHeight}px)`,

                  width: `${direction === 'row' ? btnWidth + 'px' : '100%'}`,
                }
          }
        />
        {theme === TabNavThemes.SLIDER ? (
          <div
            className={`${styles.activePill} ${styles.inactivePill} ${
              activePillClassName ?? ''
            }`}
            style={{
              width: `calc(${tabNavRef.current?.clientWidth}px - 1.35rem)`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export { TabNavSlider, TabNavBtn };
