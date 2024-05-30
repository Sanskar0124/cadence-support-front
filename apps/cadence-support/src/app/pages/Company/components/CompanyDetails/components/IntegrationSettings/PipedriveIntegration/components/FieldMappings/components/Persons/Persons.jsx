import styles from './Persons.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Persons({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'First name', value: fieldMappings?.person_map?.first_name },
    { title: 'Last name', value: fieldMappings?.person_map?.last_name },
    { title: 'Linkedin URL', value: fieldMappings?.person_map?.linkedin_url },
    { title: 'Job Position', value: fieldMappings?.person_map?.job_position },
    {
      title: 'Phone number',
      value: fieldMappings?.person_map?.phone_numbers,
    },

    { title: 'Primary Email', value: fieldMappings?.person_map?.emails },
    {
      title: 'Variable 1',
      value: fieldMappings?.person_map?.variables
        ? fieldMappings?.person_map?.variables[0]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.person_map?.variables
        ? fieldMappings?.person_map?.variables[1]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.person_map?.variables
        ? fieldMappings?.person_map?.variables[2]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.person_map?.variables
        ? fieldMappings?.person_map?.variables[3]?.target_value?.label
        : null,
    },
  ];
  return (
    <div className={styles.table}>
      <div className={styles.HeadConatiner}>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Ringover Cadence fields
        </div>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Pipedrive fields
        </div>
      </div>
      <div className={styles.leads}>
        {DATA.map((i) => {
          return (
            <>
              <div className={styles.rowTitle}>
                <h1>{i.title}</h1>
              </div>
              <div className={styles.rowValue}>
                {i.value ? (
                  <h3 className={styles.active}>{i.value}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Persons;
