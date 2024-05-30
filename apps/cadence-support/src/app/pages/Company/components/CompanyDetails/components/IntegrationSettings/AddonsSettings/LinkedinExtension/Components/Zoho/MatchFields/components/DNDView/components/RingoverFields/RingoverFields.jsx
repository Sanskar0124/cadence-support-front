import { Title, Tooltip } from '@cadence-support/components';
import { ThemedButtonThemes, TooltipThemes } from '@cadence-support/themes';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import { useState, useRef, useEffect } from 'react';
import styles from './RingoverFields.module.scss';
import { EditGradientCircle } from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';

import {
  RFFieldPlaceholder,
  SingleSkeleton,
} from '../Placeholders/Placeholders';
// import IntegrationStatusModal from '../IntegrationStatusModal/IntegrationStatusModal';
import {
  CUSTOM_FIELDS_HEADING,
  VIEWS,
  CUSTOM_VARIABLES_HEADING,
} from '../../../../constants';
import HoverContainer from '../../../HoverContainer/HoverContainer';

//components

//constants

const RingoverFields = ({
  currentView,
  integrationType,
  fields,
  originalSFFieldsForCurrentView,
  loading,
}) => {
  return (
    <div className={styles.ringoverFields}>
      <div className={styles.header}>
        <Title className={styles.title} size="1.2rem">
          Ringover Cadence
        </Title>
        <SearchBar width="100%" height={'40px'} disabled={true} />
      </div>
      <div className={styles.body}>
        <div className={styles.rf}>
          <div className={styles.row + ' ' + styles.title}>
            <div className={styles.col1}> Ringover Cadence Fields</div>
            <div className={styles.col2}>Zoho Fields</div>
            <br />

            {fields?.map((field, i) => (
              <>
                {i === CUSTOM_VARIABLES_HEADING[currentView] &&
                  currentView !== VIEWS.ACCOUNT && (
                    <div className={styles.row + ' ' + styles.title}>
                      <div className={styles.col1}>
                        <span>Custom Variable Field&nbsp;&nbsp;</span>
                        <Tooltip
                          text="You can customise LinkedIn fields to sync with CRM"
                          theme={TooltipThemes.TOP}
                          className={styles.customVarTooltip}
                          span
                        >
                          {/* <Info2 size={13} color={Colors.lightBlue} /> */}
                        </Tooltip>
                      </div>
                      <div className={styles.col2}>Zoho Field</div>
                    </div>
                  )}
                <div className={styles.row}>
                  <div className={styles.col1}>
                    <div className={styles.ringoverBracket}>
                      {!loading &&
                        field.uid === '__integration_status' &&
                        field.value.name && <EditGradientCircle />}
                      <span>{field.label}</span>
                    </div>
                  </div>
                  <div>
                    <div className={`${styles.col2}`}>
                      {loading ? (
                        <RFFieldPlaceholder />
                      ) : (
                        field.value.name !== '' && (
                          <div className={styles.fieldDiv}>
                            <div className={`${styles.field}`}>
                              {originalSFFieldsForCurrentView.filter(
                                (sf) => sf.name === field.value.name
                              )[0]?.label ?? ''}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingoverFields;
