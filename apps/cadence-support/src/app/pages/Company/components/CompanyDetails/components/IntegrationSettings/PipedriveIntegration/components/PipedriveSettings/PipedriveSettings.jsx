import styles from './PipedriveSettings.module.scss';
import moment from 'moment';
import { useIntegrationSettings } from '@cadence-support/data-access';
import { ProgressiveImg, Skeleton } from '@cadence-support/components';
import { RoundedTick, CopyBlank } from '@cadence-support/icons';

function PipedriveSettings({ companyID }) {
  const { salesforceSettings, isSalesforceSettingsLoading } =
    useIntegrationSettings(companyID);
  const handleCopy = (e) => {
    navigator.clipboard.writeText(e);
  };
  return (
    <>
      {isSalesforceSettingsLoading ? (
        <div className={styles.linePlaceholders}>
          {[...Array(5).keys()].map((key) => (
            <Skeleton className={styles.linePlaceholder} />
          ))}
        </div>
      ) : (
        <div className={styles.salesforceSettings}>
          <div className={styles.rowTitle}>
            <h1>Pipedrive Login</h1>
          </div>

          <div className={`${styles.rowValue} ${styles.connected}`}>
            {!salesforceSettings?.User?.Pipedrive_Token?.is_logged_out ? (
              <>
                <h2>
                  <RoundedTick height={32} width={32} />
                  Connected to Pipedrive
                </h2>
                <h3>
                  Activated on{' '}
                  {moment(
                    salesforceSettings?.User?.Pipedrive_Token?.created_at
                  ).format('DD MMM YYYY')}
                </h3>
              </>
            ) : (
              <h2 className={styles.notConnected}>
                Not Connected to Pipedrive
              </h2>
            )}
          </div>

          <div className={styles.rowTitle}>
            <h1>Pipedrive Package</h1>
          </div>
          <div
            className={`${styles.rowValue} ${
              salesforceSettings?.User?.Pipedrive_Token?.instance_url
                ? styles.url
                : ''
            }`}
          >
            {salesforceSettings?.User?.Pipedrive_Token?.instance_url && (
              <>
                <h2>
                  {salesforceSettings?.User?.Pipedrive_Token?.instance_url}
                </h2>
                <button
                  onClick={() =>
                    handleCopy(
                      salesforceSettings?.User?.Pipedrive_Token?.instance_url
                    )
                  }
                >
                  <CopyBlank />
                </button>
              </>
            )}
          </div>
          <div className={styles.rowTitle}>
            <h1>Company API token</h1>
          </div>
          <div className={`${styles.rowValue} rowValue ${styles.connected}`}>
            {salesforceSettings?.Company_Token.api_token && (
              <h2>
                <RoundedTick height={32} width={32} />
                API is present
              </h2>
            )}
          </div>
          <div className={styles.rowTitle}>
            <h1>Pipedrive administrator</h1>
          </div>
          <div className={`${styles.rowValue} ${styles.administrator}`}>
            <div className={styles.adminDetails}>
              <ProgressiveImg
                className={styles.adminImg}
                alt={salesforceSettings?.User?.first_name}
                src={
                  salesforceSettings?.User?.is_profile_picture_present
                    ? salesforceSettings?.User?.profile_picture
                    : 'https://cdn.ringover.com/img/users/default.jpg'
                }
              />

              <div className="">
                <h1>
                  {salesforceSettings?.User?.first_name}{' '}
                  {salesforceSettings?.User?.last_name}
                </h1>
                <div className={styles.tag}>
                  {salesforceSettings?.Integration?.status && (
                    <span className={styles.status}>
                      {salesforceSettings?.Integration?.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <h3>
              Activated on{' '}
              {moment(salesforceSettings?.User?.created_at).format(
                'DD MMM YYYY'
              )}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default PipedriveSettings;
