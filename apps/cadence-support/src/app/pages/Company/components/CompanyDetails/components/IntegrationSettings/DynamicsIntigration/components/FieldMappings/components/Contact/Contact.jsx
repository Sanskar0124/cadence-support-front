import styles from './Contact.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Contact({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'First Name', value: fieldMappings?.contact_map?.first_name },
    { title: 'Last Name', value: fieldMappings?.contact_map?.last_name },
    { title: 'Linkedin URL', value: fieldMappings?.contact_map?.linkedin_url },
    { title: 'Job Position', value: fieldMappings?.contact_map?.job_position },
    {
      title: 'Primary Phone Number',
      value: fieldMappings?.contact_map?.phone_numbers[0],
    },
    {
      title: 'Alternative Phone Number 1',
      value: fieldMappings?.contact_map?.phone_numbers[1],
    },
    {
      title: 'Alternative Phone Number 2',
      value: fieldMappings?.contact_map?.phone_numbers[2],
    },
    {
      title: 'Alternative Phone Number 3',
      value: fieldMappings?.contact_map?.phone_numbers[3],
    },
    {
      title: 'Alternative Phone Number 4',
      value: fieldMappings?.contact_map?.phone_numbers[4],
    },
    { title: 'Primary Email', value: fieldMappings?.contact_map?.emails[0] },
    {
      title: 'Alternative Email 1',
      value: fieldMappings?.contact_map?.emails[1],
    },
    {
      title: 'Alternative Email 2',
      value: fieldMappings?.contact_map?.emails[2],
    },
    {
      title: 'Alternative Email 3',
      value: fieldMappings?.contact_map?.emails[3],
    },
    {
      title: 'Alternative Email 4',
      value: fieldMappings?.contact_map?.emails[4],
    },
  ];
  return (
    <div className={styles.table}>
      <div className={styles.HeadConatiner}>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Ringover Cadence fields
        </div>
        <div className={`${styles.rowTitle} ${styles.tableHead}`}>
          Dynamics fields
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

export default Contact;
