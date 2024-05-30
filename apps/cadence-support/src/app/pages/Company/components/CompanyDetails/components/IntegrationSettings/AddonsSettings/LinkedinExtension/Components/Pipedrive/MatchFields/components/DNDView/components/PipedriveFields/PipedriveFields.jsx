import { Title } from '@cadence-support/components';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import { useState, useEffect, useRef } from 'react';
import styles from './PipedriveFields.module.scss';
import { ALPHABETS, ALPHA_OBJECT } from './constants';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { SFFieldsPlaceholder } from '../Placeholders/Placeholders';

const PipedriveFields = ({ availableSFFields, loading }) => {
  const generatePossibleAlphabets = () => {
    return [
      ...new Set(availableSFFields.map((avf) => avf.label[0].toUpperCase())),
    ].sort();
  };

  return (
    <div className={styles.salesforceFields}>
      <div className={styles.header}>
        <Title className={styles.title} size="1.2rem">
          Pipedrive{' '}
          <ThemedButton
            theme={ThemedButtonThemes.PRIMARY}
            className={styles.sfCount}
            height="18px"
            width="10px"
          >
            {availableSFFields.length}
          </ThemedButton>
        </Title>
        <SearchBar disabled={true} width="95%" height="40px" />
      </div>
      <div className={styles.body}>
        {loading ? (
          <SFFieldsPlaceholder />
        ) : (
          <div>
            <div className={styles.sf}>
              {generatePossibleAlphabets().map((alph, j) => {
                return availableSFFields.filter(
                  (field) => field.label[0] === alph
                ).length > 0 ? (
                  <div className={styles.subSection}>
                    <div className={styles.subSectionHeader}>{alph}</div>
                    <div className={styles.subSectionFields}>
                      {availableSFFields
                        //search functionality
                        .filter(
                          (field) => field.label[0].toUpperCase() === alph
                        )
                        .map((item, i) => {
                          return (
                            <div key={item.name}>
                              <div className={styles.field}>{item.label}</div>
                            </div>
                          );
                        })}
                      {/* {provided.placeholder} */}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PipedriveFields;
