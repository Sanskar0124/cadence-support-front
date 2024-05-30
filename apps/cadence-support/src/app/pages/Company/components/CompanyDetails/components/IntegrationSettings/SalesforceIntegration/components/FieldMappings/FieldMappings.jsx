import { useState } from 'react';
import styles from './FieldMappings.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';
import { SearchBar, Select } from '@cadence-support/widgets';
import Leads from './components/Leads/Leads';
import CustomObjects from './components/CustomObjects/CustomObjects';
import moment from 'moment';
import Contact from './components/Contact/Contact';
import Account from './components/Account/Account';
import { Skeleton } from '@cadence-support/components';

function FieldMappings({ companyID }) {
  const [view, setView] = useState('leads');
  const setSelect = (e) => {
    setView(e);
  };
  const { fieldMappings, isFieldMappingsLoading } = useFieldMappings(companyID);
  const updatedOn = moment(fieldMappings?.updated_at).format('DD MMM YYYY');
  const PAGE = {
    leads: <Leads companyID={companyID} />,
    account: <Account companyID={companyID} />,
    contact: <Contact companyID={companyID} />,
    objects: <CustomObjects companyID={companyID} />,
  };
  return (
    <>
      {isFieldMappingsLoading ? (
        <div className={styles.linePlaceholders}>
          {[...Array(5).keys()].map((key) => (
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
                  leads: 'Leads',
                  account: 'Account',
                  contact: 'Contact',
                  objects: 'Custom Objects',
                }}
                className={styles.selectField}
                numberOfOptionsVisible="6"
              />
            </div>
          </div>{' '}
          <div className={styles.pageview}>{PAGE[view]}</div>
        </div>
      )}
    </>
  );
}

export default FieldMappings;
