import { useState, useEffect } from 'react';
import styles from './Topview.module.scss';
import {
  Company,
  CompanyGradient,
  Connection,
  Leads,
  LeadsGradient,
  Wrench,
  WrenchGradient,
} from '@cadence-support/icons';
import { Title } from '@cadence-support/components';
import { RINGOVER_FIELDS, VIEWS } from '../../constants';
import { Colors } from '@cadence-support/utils';
import { fetchFieldmappingFields } from '@cadence-support/data-access';

//components

//constants

const TopView = ({ currentView, setCurrentView, topViewData, companyID }) => {
  return (
    <div className={styles.topView}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>
            <Connection color={Colors.white} size="1.45rem" />
          </span>
          <Title size="1.1rem">Match Fields</Title>
        </div>
        <div className={styles.subtitle}>
          Match your Zoho fields to our exisiting Cadence fields.
        </div>
      </div>
      <div className={styles.right}>
        <div
          onClick={() => setCurrentView(VIEWS.LEAD)}
          className={`${styles.option} ${
            currentView === VIEWS.LEAD ? styles.active : ''
          }`}
        >
          <div>
            {currentView === VIEWS.LEAD ? (
              <span className={styles.active}>
                <Leads color={Colors.white} />
              </span>
            ) : (
              <span className={styles.inactive}>
                <LeadsGradient />
              </span>
            )}
          </div>
          <div>
            <div className={styles.title}>Leads</div>
            <div className={styles.matchFieldsResult}>
              {'('}
              {topViewData[VIEWS.LEAD]}/{RINGOVER_FIELDS[VIEWS.LEAD].length}{' '}
              Fields Matched
              {')'}
            </div>
          </div>
        </div>
        <div
          onClick={() => setCurrentView(VIEWS.ACCOUNT)}
          className={`${styles.option} ${
            currentView === VIEWS.CONTACT || currentView === VIEWS.ACCOUNT
              ? styles.active
              : ''
          }`}
        >
          <div>
            {currentView === VIEWS.ACCOUNT || currentView === VIEWS.CONTACT ? (
              <span className={styles.active}>
                <Company color={Colors.white} />
              </span>
            ) : (
              <span className={styles.inactive}>
                <CompanyGradient />
              </span>
            )}
          </div>
          <div>
            <div className={styles.title}>Account & contacts</div>
            <div className={styles.matchFieldsResult}>
              {'('}
              {topViewData[VIEWS.ACCOUNT] + topViewData[VIEWS.CONTACT]}/
              {RINGOVER_FIELDS[VIEWS.ACCOUNT].length +
                RINGOVER_FIELDS[VIEWS.CONTACT].length}{' '}
              Fields matched
              {')'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopView;
