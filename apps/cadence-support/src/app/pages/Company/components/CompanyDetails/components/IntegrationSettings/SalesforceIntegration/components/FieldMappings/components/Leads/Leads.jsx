import styles from './Leads.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function FieldMappings({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'First Name', value: fieldMappings?.lead_map?.first_name },
    { title: 'Last Name', value: fieldMappings?.lead_map?.last_name },
    { title: 'Linkedin URL', value: fieldMappings?.lead_map?.linkedin_url },
    { title: 'Job position', value: fieldMappings?.lead_map?.job_position },
    { title: 'Company Name', value: fieldMappings?.lead_map?.name },
    {
      title: 'Company Phone',
      value: fieldMappings?.lead_map?.company_phone_number,
    },
    { title: 'Company URL', value: fieldMappings?.lead_map?.url },
    { title: 'Zipcode', value: fieldMappings?.lead_map?.zip_code },
    { title: 'Country', value: fieldMappings?.lead_map?.country },
    {
      title: 'Primary Phone number',
      value: fieldMappings?.lead_map?.phone_numbers[0],
    },
    {
      title: 'Alternative Phone Number 2',
      value: fieldMappings?.lead_map?.phone_numbers[1],
    },
    {
      title: 'Alternative Phone Number 3',
      value: fieldMappings?.lead_map?.phone_numbers[2],
    },
    {
      title: 'Alternative Phone Number 4',
      value: null,
    },
    { title: 'Primary Email', value: fieldMappings?.lead_map?.emails[0] },
    { title: 'Alternative Email 2', value: fieldMappings?.lead_map?.emails[1] },
    { title: 'Alternative Email 3', value: fieldMappings?.lead_map?.emails[2] },
    { title: 'Alternative Email 4', value: fieldMappings?.lead_map?.emails[3] },
    {
      title: 'Variable 1',
      value: fieldMappings?.lead_map?.variables[0]?.target_value?.label,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.lead_map?.variables[1]?.target_value?.label,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.lead_map?.variables[2]?.target_value?.label,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.lead_map?.variables[3]?.target_value?.label,
    },
    {
      title: 'Variable 5',
      value: fieldMappings?.lead_map?.variables[4]?.target_value?.label,
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
      </div>
    </div>
  );
}

export default FieldMappings;
