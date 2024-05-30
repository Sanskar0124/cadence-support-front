import { Title } from '@cadence-support/components';
import { useWebhook } from '@cadence-support/data-access';
import { CollapseContainer } from '@cadence-support/widgets';
import styles from './Webhook.module.scss';

const Webhook = ({ companyID }) => {
  const { webhookSettings } = useWebhook(companyID);
  return webhookSettings?.map((webhook, index) => (
    <CollapseContainer
      openByDefault={false}
      className={styles.collapsibleContainer}
      title={
        <div className={styles.header}>
          <Title className={styles.title} size="14px">
            Webhook {index + 1}
          </Title>
        </div>
      }
    >
      <div className={`${styles.TriggerSetting}`}>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            Select Type
          </Title>
          <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
            {webhook?.webhook_type}
          </div>
        </div>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            HTTP Method
          </Title>
          <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
            {webhook?.http_method}
          </div>
        </div>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            Enter webhook URL
          </Title>
          <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
            {' '}
            {webhook?.url}
          </div>
        </div>
        <div className={styles.setting}>
          <Title className={styles.title} size="14px">
            Enter auth token
          </Title>
          <div className={`${styles.inputDisplay} ${styles.triggerStatus}`}>
            {' '}
            {webhook?.auth_token}
          </div>
        </div>
      </div>
    </CollapseContainer>
  ));
};

export default Webhook;
