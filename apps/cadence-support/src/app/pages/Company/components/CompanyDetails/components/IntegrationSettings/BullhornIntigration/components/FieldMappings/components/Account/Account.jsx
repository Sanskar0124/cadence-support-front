import styles from './Account.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Account({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'Name', value: fieldMappings?.account_map?.name },
    { title: 'Size', value: fieldMappings?.account_map?.size },
    {
      title: 'URL',
      value: fieldMappings?.account_map?.url,
    },
    { title: 'Country', value: fieldMappings?.account_map?.country },
    {
      title: 'Linkedin URL',
      value: fieldMappings?.account_map?.linkedin_url,
    },

    {
      title: 'Phone Number',
      value: fieldMappings?.account_map?.phone_number,
    },
    { title: 'Zip Code', value: fieldMappings?.account_map?.zip_code },
    {
      title: 'Variable 1',
      value: fieldMappings?.account_map?.variables
        ? fieldMappings?.account_map?.variables[0]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.account_map?.variables
        ? fieldMappings?.account_map?.variables[1]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.account_map?.variables
        ? fieldMappings?.account_map?.variables[2]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.account_map?.variables
        ? fieldMappings?.account_map?.variables[3]?.target_value?.label
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

export default Account;
