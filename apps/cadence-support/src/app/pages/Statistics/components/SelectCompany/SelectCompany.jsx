import { useOutsideClickHandler } from '@cadence-support/utils';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import React, { useState, useRef } from 'react';
import styles from './SelectCompany.module.scss';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { Company, TriangleDown } from '@cadence-support/icons';
import { SELECT_COMPANY_OPTION } from '../../constants';
import { Skeleton } from '@cadence-support/components';

const SelectCompany = ({ selectedCompany, setSelectedCompany }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef();
  useOutsideClickHandler(dropdownRef, () => setIsDropdown(false));

  const getHeight = () => {
    const screenWidth = window?.innerWidth;
    if (screenWidth === 1920 || screenWidth === 1660 || screenWidth === 1440) {
      return `calc(100vh - 800px)`;
    } else if (screenWidth === 1366) return `calc(100vh - 460px)`;
    else return `calc(100vh - 450px)`;
  };

  return (
    <div className={styles.selectCompany} ref={dropdownRef}>
      <ThemedButton
        theme={ThemedButtonThemes.WHITE}
        className={styles.selectCompanyBtn}
        onClick={(event) => setIsDropdown((curr) => !curr)}
      >
        <p className={selectedCompany ? '' : styles.capitalize}>
          {selectedCompany === 'all_companies'
            ? 'All companies'
            : selectedCompany}
        </p>
        <TriangleDown />
      </ThemedButton>
      {isDropdown && (
        <div className={`${styles.dropdown} ${isDropdown ? styles.open : ''}`}>
          <div className={styles.allCompaniesDiv}>
            <div
              className={
                selectedCompany === 'all_companies'
                  ? `${styles.allCompanybtn} ${styles.active}`
                  : styles.allCompanybtn
              }
              onClick={() => setSelectedCompany('all_companies')}
            >
              {SELECT_COMPANY_OPTION['all_companies']}
            </div>
          </div>
          <SearchBar
            width="100%"
            height="40px"
            value={searchValue}
            setValue={setSearchValue}
            className={styles.searchBar}
            placeholderText={'Search'}
          />
          <div className={styles.container} style={{ height: getHeight() }}>
            {false ? (
              <div className={styles.linePlaceholders}>
                {[...Array(5).keys()].map((key) => (
                  <Skeleton className={styles.linePlaceholder} />
                ))}
              </div>
            ) : (
              [1, 2, 3, 4, 5, 8, 9].map((company) => (
                <CompanyCard
                  key={company}
                  setSelectedCompany={setSelectedCompany}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCompany;

export const CompanyCard = ({ setSelectedCompany }) => {
  return (
    <div
      className={
        false ? `${styles.companyCard} ${styles.active}` : styles.companyCard
      }
      onClick={() => setSelectedCompany('Dell')}
    >
      <div>
        <Company />
      </div>{' '}
      <div>Dell</div>
    </div>
  );
};
