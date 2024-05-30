import { useIntegrations } from '@cadence-support/data-access';

import styles from './WorkingDaysSettings.module.scss';

const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
export const getNonWorkingDays = (data) => {
  return WEEKDAYS.filter((i) => {
    return !data?.includes(i);
  });
};

function WorkingDaysSettings({ companyID }) {
  const { emailSettings } = useIntegrations(companyID);
  const NON_WORKINGS_DAYS = getNonWorkingDays(
    emailSettings?.Automated_Task_Settings?.working_days
  );
  return (
    <div className={styles.WorkingDaysSettings}>
      <h1>Working days</h1>
      <h2>Closed days</h2>
      <h3>Set the non working days</h3>
      <div className={styles.days}>
        {NON_WORKINGS_DAYS.map((item, index) => (
          <span>{(index ? ' - ' : '') + item}</span>
        ))}
      </div>
    </div>
  );
}

export default WorkingDaysSettings;
