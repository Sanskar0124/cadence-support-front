import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

import { Company, ProgressClock, Settings } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { ThemedButton } from '@cadence-support/widgets';

import styles from './CompanyActivity.module.scss';

import { useOutsideClickHandler } from '@cadence-support/utils';

const ActivityCard = (activity) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Settings />
      </div>
      <div className={styles.details}>
        <div className={styles.activityType}>New company added</div>
        <div className={styles.activityDesc}>
          Dribbble has upgraded license from license1 to license2
        </div>
      </div>
      <div className={styles.createdAt}>
        <p>{moment(new Date()).format('h:mm A, ')}</p>

        <p>{moment(new Date()).format('D MMMM')}</p>
      </div>
    </div>
  );
};

const CompanyActivity = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef();
  useOutsideClickHandler(dropdownRef, () => setIsDropdown(false));

  return (
    <div className={styles.companyActivity}>
      {/* // ADD ICON */}
      <ThemedButton
        theme={
          isDropdown ? ThemedButtonThemes.PRIMARY : ThemedButtonThemes.WHITE
        }
        width={'fit-content'}
        className={styles.progressClockButton}
        onClick={() => setIsDropdown((prevState) => !prevState)}
      >
        <ProgressClock />
      </ThemedButton>

      {isDropdown && (
        <div
          className={`${styles.dropdown} ${isDropdown && styles.open}`}
          ref={dropdownRef}
        >
          <div className={styles.header}>
            <h3>Company Activity</h3>
          </div>
          <div className={styles.list}>
            {new Array(10).fill(0).map((activity, index) => {
              return <ActivityCard />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyActivity;
