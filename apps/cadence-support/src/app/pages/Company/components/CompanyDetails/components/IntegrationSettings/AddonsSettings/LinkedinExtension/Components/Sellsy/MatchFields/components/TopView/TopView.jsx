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
          <Title size="1.4rem">Match Fields</Title>
        </div>
        <div className={styles.subtitle}>
          Here you can match your Sellsy fields to our exisiting Cadence fields
        </div>
      </div>
      <div className={styles.right}>
        <div
          onClick={() => setCurrentView(VIEWS.CONTACT)}
          className={`${styles.option} ${
            currentView === VIEWS.CONTACT || currentView === VIEWS.COMPANY
              ? styles.active
              : ''
          }`}
        >
          <div>
            {currentView === VIEWS.COMPANY || currentView === VIEWS.CONTACT ? (
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
            <div className={styles.title}>Contact & Company</div>
            <div className={styles.matchFieldsResult}>
              {'('}
              {topViewData[VIEWS.COMPANY] + topViewData[VIEWS.CONTACT]}/
              {RINGOVER_FIELDS[VIEWS.COMPANY].length +
                RINGOVER_FIELDS[VIEWS.CONTACT].length}{' '}
              Fields Matched
              {')'}
            </div>
          </div>
        </div>
        {/* <div
					onClick={() => setCurrentView(VIEWS.CUSTOM_OBJECTS)}
					className={`${styles.option} ${
						currentView === VIEWS.CUSTOM_OBJECTS ? styles.active : ""
					}`}
				>
					<div>
						{currentView === VIEWS.CUSTOM_OBJECTS ? (
							<span className={styles.active}>
								<Wrench color={Colors.white} />
							</span>
						) : (
							<span className={styles.inactive}>
								<WrenchGradient />
							</span>
						)}
					</div>
					<div>
						<div className={styles.title}>
							{SETTINGS_TRANSLATION.CUSTOM_FORM_BUILDER[user?.language?.toUpperCase()]}
						</div>
						<div className={styles.matchFieldsResult}>
							{"("}
							{formCount}/1{")"}
						</div>
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default TopView;
