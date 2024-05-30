import { useState } from 'react';
import styles from './FieldMappings.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';
import { SearchBar, Select } from '@cadence-support/widgets';
import Persons from './components/Persons/Persons';
import CustomObjects from './components/CustomObjects/CustomObjects';
import moment from 'moment';
import Organization from './components/Organization/Organization';
import { Skeleton } from '@cadence-support/components';

function FieldMappings({ companyID }) {
  const [view, setView] = useState('persons');
  const setSelect = (e) => {
    setView(e);
  };
  const { fieldMappings, isFieldMappingsLoading } = useFieldMappings(companyID);
  const updatedOn = moment(fieldMappings?.updated_at).format('DD MMM YYYY');
  const PAGE = {
    persons: <Persons companyID={companyID} />,
    organization: <Organization companyID={companyID} />,
    objects: <CustomObjects companyID={companyID} />,
  };
  return (
    <>
      {isFieldMappingsLoading ? (
        <div className={styles.linePlaceholders}>
          {[...Array(4).keys()].map((key) => (
            <Skeleton className={styles.linePlaceholder} />
          ))}
        </div>
      ) : (
        <div className={styles.fieldMappings}>
          <div className={styles.header}>
            <SearchBar
              disabled
              width={250}
              height={44}
              placeholderText="Search"
            />
            <div className="">
              <h3>Last updated on {updatedOn} </h3>
              <Select
                width={174}
                value={view}
                setValue={(e) => setSelect(e)}
                options={{
                  persons: 'Person',
                  organization: 'Organization',
                  objects: 'Custom Objects',
                }}
                numberOfOptionsVisible="4"
              />
            </div>
          </div>{' '}
          <div className="">{PAGE[view]}</div>
        </div>
      )}
    </>
  );
}

export default FieldMappings;
