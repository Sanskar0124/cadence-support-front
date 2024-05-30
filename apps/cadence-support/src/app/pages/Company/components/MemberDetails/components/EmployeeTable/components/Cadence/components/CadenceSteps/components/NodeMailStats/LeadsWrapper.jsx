import { userInfo } from '@cadence-support/atoms';
import { Pipedrive, RingoverBox } from '@cadence-support/icons';
import { getPipedriveUrl } from '@cadence-support/utils';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styles from './NodeMailStats.module.scss';

function LeadsWrapper({ lead }) {
  const instance_url = useRecoilValue(userInfo).instance_url;
  return (
    <div className={styles.leads}>
      <div className={styles.namesWrapper}>
        <span className={styles.username}>
          {lead.user_first_name} {lead.user_last_name}
        </span>
        <span className={styles.leadname}>
          {lead.lead_first_name} {lead.lead_last_name}
        </span>
      </div>
      <div className={styles.iconsWrapper}>
        <span style={{ marginRight: '5px' }}>
          {lead.integration_id && instance_url ? (
            <Pipedrive
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(
                  getPipedriveUrl(lead.integration_id, instance_url),
                  '_new'
                );
              }}
              className={styles.salesforcebox}
              color="#00A1E0"
            />
          ) : (
            <Pipedrive className={styles.disabled} />
          )}
        </span>
        <span>
          <RingoverBox
            size="2em"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(`/crm/pipedrive/leads/` + lead.lead_id, '_new');
            }}
            color="white"
          />
        </span>
      </div>
    </div>
  );
}

export default LeadsWrapper;
