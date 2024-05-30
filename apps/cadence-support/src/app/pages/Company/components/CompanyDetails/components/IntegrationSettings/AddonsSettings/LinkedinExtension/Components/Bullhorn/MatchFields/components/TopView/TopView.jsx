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
const TITLE_MAP = {
  lead: 'Account & Leads',
  contact: 'Account & Contacts',
  candidate: 'Candidates',
  account: 'Account & Contacts',
};

const TopView = ({
  currentView,
  setCurrentView,
  topViewData,
  prevCurrentView,
  setPreviousCurrentView,
  companyID,
}) => {
  const current_view = currentView;
  return (
    <div className={styles.topView}>
      <div className={styles.left}>
        <Title size="1.4rem">
          {current_view && prevCurrentView && currentView === VIEWS.LEAD
            ? TITLE_MAP['lead']
            : currentView === VIEWS.CONTACT
            ? TITLE_MAP['contact']
            : currentView === VIEWS.ACCOUNT && prevCurrentView === VIEWS.LEAD
            ? TITLE_MAP['lead']
            : currentView === VIEWS.ACCOUNT && prevCurrentView === VIEWS.CONTACT
            ? TITLE_MAP['contact']
            : TITLE_MAP[current_view]}
        </Title>
      </div>
      {true ? (
        <div className={styles.right}>
          <div
            onClick={() => setCurrentView(VIEWS.LEAD)}
            className={`${styles.option} ${
              currentView === VIEWS.LEAD || prevCurrentView === VIEWS.LEAD
                ? styles.active
                : ''
            }`}
          >
            <div>
              {currentView === VIEWS.LEAD || prevCurrentView === VIEWS.LEAD ? (
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
              <div className={styles.title}>Accounts & Leads</div>
              <div className={styles.matchFieldsResult}>
                {'('}
                {topViewData[VIEWS.LEAD] + topViewData[VIEWS.ACCOUNT]}/
                {RINGOVER_FIELDS[VIEWS.LEAD].length +
                  RINGOVER_FIELDS[VIEWS.ACCOUNT].length}{' '}
                Fields Matched
                {')'}
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setCurrentView(VIEWS.CANDIDATE);
              setPreviousCurrentView(VIEWS.CANDIDATE);
            }}
            className={`${styles.option} ${
              currentView === VIEWS.CANDIDATE ? styles.active : ''
            }`}
          >
            <div>
              {currentView === VIEWS.CANDIDATE ? (
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
              <div className={styles.title}>Candidate</div>
              <div className={styles.matchFieldsResult}>
                {'('}
                {topViewData[VIEWS.CANDIDATE]}/{' '}
                {RINGOVER_FIELDS[VIEWS.CANDIDATE]?.length} Fields Matched
                {')'}
              </div>
            </div>
          </div>

          <div
            onClick={() => setCurrentView(VIEWS.CONTACT)}
            className={`${styles.option} ${
              currentView === VIEWS.CONTACT ? styles.active : ''
            }`}
          >
            <div>
              {currentView === VIEWS.CONTACT ? (
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
              <div className={styles.title}>Account & Contacts</div>
              <div className={styles.matchFieldsResult}>
                {'('}
                {topViewData[VIEWS.ACCOUNT] + topViewData[VIEWS.CONTACT]}/
                {RINGOVER_FIELDS[VIEWS.ACCOUNT].length +
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
								{formCount}/3{")"}
							</div>
						</div>
					</div> */}
        </div>
      ) : (
        // <div className={styles.right}>
        // 	<TabNavSlider
        // 		theme={TabNavThemes.SLIDER}
        // 		buttons={TAB_OPTIONS.map(op => ({
        // 			label: op.label[user?.language?.toUpperCase()],
        // 			value: op.value,
        // 		}))}
        // 		value={currentView}
        // 		setValue={setCurrentView}
        // 		className={styles.tabNav}
        // 		activeBtnClassName={styles.activeTab}
        // 		btnClassName={styles.tabBtn}
        // 		noAnimation
        // 	/>
        // </div>
        <></>
      )}
    </div>
  );
};

export default TopView;
