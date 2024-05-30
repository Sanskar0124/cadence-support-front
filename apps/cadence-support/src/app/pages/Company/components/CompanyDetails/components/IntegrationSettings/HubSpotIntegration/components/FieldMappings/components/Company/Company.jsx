import styles from './Company.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Company({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'Company Name', value: fieldMappings?.company_map?.name },
    { title: 'Country', value: fieldMappings?.company_map?.country },
    {
      title: 'Linkedin URL',
      value: fieldMappings?.company_map?.linkedin_url,
    },
    {
      title: 'Name',
      value: fieldMappings?.company_map?.name,
    },
    {
      title: 'Phone Number',
      value: fieldMappings?.company_map?.phone_number,
    },
    { title: 'Zip Code', value: fieldMappings?.company_map?.zip_code },
    {
      title: 'Variable 1',
      value: fieldMappings?.company_map?.variables[0]?.target_value?.label,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.company_map?.variables[1]?.target_value?.label,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.company_map?.variables[2]?.target_value?.label,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.company_map?.variables[3]?.target_value?.label,
    },
  ];
  return (
    <div className={styles.table}>
      <div className={styles.HeadConatiner}>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Ringover Cadence fields
        </div>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Hubspot fields
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

export default Company;
