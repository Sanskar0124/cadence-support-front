import styles from './CadenceDetails.module.scss';
import { useState } from 'react';
import { SearchBar, TabNavSlider } from '@cadence-support/widgets';
import StepViewCadence from './components/StepViewCadence/StepViewCadence';
import PeopleViewCadence from './components/PeopleViewCadence/PeopleViewCadence';
import { CADENCE_VIEW, getTabOptions } from './constants';
import { TabNavThemes } from '@cadence-support/themes';

function CadenceDetails({ memberID, selectedCadenceID, integrationType }) {
  const [cadenceView, setCadenceView] = useState(CADENCE_VIEW.STEPS);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className={styles.cadenceDetails}>
      {' '}
      <div className={styles.header}>
        <div className={styles.tabs}>
          <TabNavSlider
            theme={TabNavThemes.WHITE}
            className={styles.buttonSliderClassName}
            btnClassName={styles.buttonClassName}
            activeBtnClassName={styles.activeBtnClassName}
            activePillClassName={styles.activePillClassName}
            buttons={getTabOptions()}
            value={cadenceView}
            setValue={setCadenceView}
            width="230px"
          />
        </div>
        {cadenceView === CADENCE_VIEW.PEOPLE && (
          <div>
            <SearchBar
              onSearch={() => {
                setSearchValue(search);
              }}
              value={search}
              setValue={setSearch}
              onClick={() => setIsSearchFocused(true)}
              placeholderText={'Search by lead id'}
            />
          </div>
        )}
      </div>
      {cadenceView === CADENCE_VIEW.STEPS && (
        <StepViewCadence
          memberID={memberID}
          selectedCadenceID={selectedCadenceID}
          integrationType={integrationType}
        />
      )}
      {cadenceView === CADENCE_VIEW.PEOPLE && (
        <PeopleViewCadence
          selectedCadenceID={selectedCadenceID}
          memberID={memberID}
          searchValue={searchValue}
        />
      )}
    </div>
  );
}
export default CadenceDetails;
