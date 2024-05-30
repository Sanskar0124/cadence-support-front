import styles from './Account.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Account({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'Country', value: fieldMappings?.account_map?.country },
    {
      title: 'Linkedin URL',
      value: fieldMappings?.account_map?.linkedin_url,
    },
    {
      title: 'Name',
      value: fieldMappings?.account_map?.name,
    },
    {
      title: 'Phone Number',
      value: fieldMappings?.account_map?.phone_number,
    },
    { title: 'URL', value: fieldMappings?.account_map?.url },
    { title: 'Zip Code', value: fieldMappings?.account_map?.zip_code },
    {
      title: 'Variable 1',
      value: fieldMappings?.account_map?.variables[0]?.target_value?.label,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.account_map?.variables[1]?.target_value?.label,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.account_map?.variables[2]?.target_value?.label,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.account_map?.variables[3]?.target_value?.label,
    },
    {
      title: 'Variable 5',
      value: fieldMappings?.account_map?.variables[4]?.target_value?.label,
    },
  ];
  return (
    <div className={styles.table}>
      <div className={styles.HeadConatiner}>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Ringover Cadence fields
        </div>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Salesforce fields
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
        <div className={`${styles.rowTitle} ${styles.lastRow}`}>
          <h1>Integration status</h1>
          <h3>Disqualification Status</h3>
        </div>
        <div
          className={`${styles.rowTitle} ${styles.lastRow} ${styles.lastValue}`}
        >
          <h3>
            {fieldMappings?.account_map?.integration_status?.name
              ? fieldMappings?.account_map?.integration_status?.name
              : 'Empty'}
          </h3>
          <h3>
            1.
            {fieldMappings?.account_map?.disqualification_reason?.name
              ? fieldMappings?.account_map?.disqualification_reason?.name
              : 'Empty'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Account;
