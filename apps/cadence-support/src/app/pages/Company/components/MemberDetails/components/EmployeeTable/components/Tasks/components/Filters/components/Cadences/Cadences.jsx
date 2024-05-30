import { Close, Tick } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { Button } from '@cadence-support/components';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import React, { useEffect, useState } from 'react';
import styles from './Cadences.module.scss';
import { Tasks as TASKS_TRANSLATION } from '@cadence-support/languages';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';

const Cadences = ({ open, setOpen, filters, cadences, handleMultiSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    if (open) setShowOverlay(true);
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) setShowOverlay(false);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    showOverlay && (
      <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
        <div
          className={`${styles.container} ${open ? styles.open : styles.close}`}
          onAnimationEnd={onAnimationEnd}
        >
          <ThemedButton
            onClick={onClose}
            className={styles.closeBtn}
            theme={ThemedButtonThemes.ICON}
          >
            <Close color={'#000'} />
          </ThemedButton>
          <div className={styles.title}>
            {TASKS_TRANSLATION.SELECT_A_CADENCE[user?.language?.toUpperCase()]}
          </div>
          <SearchBar
            width="100%"
            height="40px"
            value={searchValue}
            setValue={setSearchValue}
          />
          <div className={styles.list}>
            {cadences
              ?.filter((cadence) =>
                cadence.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((cadence) => (
                <div
                  title={cadence.name}
                  key={cadence.cadence_id}
                  onClick={() =>
                    handleMultiSelect(cadence.cadence_id, 'task_cadences')
                  }
                  className={
                    filters.task_cadences.includes(cadence.cadence_id)
                      ? styles.selected
                      : ''
                  }
                >
                  <div className={styles.info}>{cadence.name}</div>
                  <div className={styles.tick}>
                    <Tick />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Cadences;
