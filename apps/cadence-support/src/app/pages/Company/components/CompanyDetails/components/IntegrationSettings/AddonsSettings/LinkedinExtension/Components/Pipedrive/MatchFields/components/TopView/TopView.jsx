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
          <Title size="1.4rem">Match Fields</Title>
        </div>
        <div className={styles.subtitle}>
          Here you can match your Pipedrive fields to our exisiting Cadence
          fields
        </div>
      </div>
      <div className={styles.right}>
        <div
          onClick={() => setCurrentView(VIEWS.ORGANIZATION)}
          className={`${styles.option} ${
            currentView === VIEWS.PERSON || currentView === VIEWS.ORGANIZATION
              ? styles.active
              : ''
          }`}
        >
          <div>
            {currentView === VIEWS.ORGANIZATION ||
            currentView === VIEWS.PERSON ? (
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
            <div className={styles.title}> Person & Organization</div>
            <div className={styles.matchFieldsResult}>
              {'('}
              {topViewData[VIEWS.ORGANIZATION] + topViewData[VIEWS.PERSON]}/
              {RINGOVER_FIELDS[VIEWS.ORGANIZATION].length +
                RINGOVER_FIELDS[VIEWS.PERSON].length}{' '}
              fields matched{')'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopView;
