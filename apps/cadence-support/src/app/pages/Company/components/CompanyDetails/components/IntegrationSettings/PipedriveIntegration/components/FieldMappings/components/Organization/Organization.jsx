import styles from './Organization.module.scss';
import { useFieldMappings } from '@cadence-support/data-access';

function Organization({ companyID }) {
  const { fieldMappings } = useFieldMappings(companyID);
  const DATA = [
    { title: 'Company Name', value: fieldMappings?.organization_map?.name },
    {
      title: 'Company Phone',
      value: fieldMappings?.organization_map?.phone_number,
    },
    // { title: 'Company Size', value: fieldMappings?.organization_map?.size },
    { title: 'Company Website', value: fieldMappings?.organization_map?.url },
    {
      title: 'Country',
      value: fieldMappings?.organization_map?.country,
    },
    {
      title: 'Linkedin URL',
      value: fieldMappings?.organization_map?.linkedin_url,
    },
    {
      title: 'Zip Code',
      value: fieldMappings?.organization_map?.zip_code,
    },
    {
      title: 'Variable 1',
      value: fieldMappings?.organization_map?.variables
        ? fieldMappings?.organization_map?.variables[0]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 2',
      value: fieldMappings?.organization_map?.variables
        ? fieldMappings?.organization_map?.variables[1]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 3',
      value: fieldMappings?.organization_map?.variables
        ? fieldMappings?.organization_map?.variables[2]?.target_value?.label
        : null,
    },
    {
      title: 'Variable 4',
      value: fieldMappings?.organization_map?.variables
        ? fieldMappings?.organization_map?.variables[3]?.target_value?.label
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

export default Organization;
