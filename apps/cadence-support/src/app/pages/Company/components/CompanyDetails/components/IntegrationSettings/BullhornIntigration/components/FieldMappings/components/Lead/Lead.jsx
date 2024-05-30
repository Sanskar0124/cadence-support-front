import styles from './Leads.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Lead({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'First Name', value: fieldMappings?.lead_map?.first_name },
    { title: 'Last Name', value: fieldMappings?.lead_map?.last_name },
    {
      title: 'Linkedin URL',
      value: fieldMappings?.lead_map?.linkedin_url,
    },
    { title: 'Source Site', value: fieldMappings?.lead_map?.source_site },
    { title: 'Job Position', value: fieldMappings?.lead_map?.job_position },

    {
      title: 'Primary Phone Number',
      value: fieldMappings?.lead_map?.phone_numbers[0],
    },
    {
      title: 'Alternative Phone Number 1',
      value: fieldMappings?.lead_map?.phone_numbers[1],
    },
    {
      title: 'Alternative Phone Number 2',
      value: fieldMappings?.lead_map?.phone_numbers[2],
    },
    { title: 'Primary Email', value: fieldMappings?.lead_map?.emails[0] },
    { title: 'Alternative Email 1', value: fieldMappings?.lead_map?.emails[1] },
    { title: 'Alternative Email 2', value: fieldMappings?.lead_map?.emails[2] },
    { title: 'Alternative Email 3', value: fieldMappings?.lead_map?.emails[3] },
    { title: 'Alternative Email 4', value: fieldMappings?.lead_map?.emails[4] },
    {
      title: 'Variable 1',
      value: fieldMappings?.lead_map?.variables
        ? fieldMappings?.lead_map?.variables[0]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.lead_map?.variables
        ? fieldMappings?.lead_map?.variables[1]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.lead_map?.variables
        ? fieldMappings?.lead_map?.variables[2]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.lead_map?.variables
        ? fieldMappings?.lead_map?.variables[3]?.target_value?.label
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
          Bullhorn fields
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
        {/* <div className={`${styles.rowTitle} ${styles.lastRow}`}>
          <h1>Integration status</h1>
          <h3>Disqualification Status</h3>
          <h3>Conversion status</h3>
        </div> */}
        {/* <div
          className={`${styles.rowTitle} ${styles.lastRow} ${styles.lastValue}`}
        >
          <h1>Status</h1>
          <h3>1.Disqualified</h3>
          <h3>2.Converted</h3>
        </div> */}
      </div>
    </div>
  );
}

export default Lead;
