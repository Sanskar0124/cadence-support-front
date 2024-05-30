import React, { useEffect, useState } from 'react';
import styles from './EndCadenceView.module.scss';
import { useCadenceSettings, useUsers } from '@cadence-support/data-access';
import { Cadence as CADENCE_TRANSLATION } from '@cadence-support/languages';

import { Label } from '@pipedrive/widgets';
import { Div } from '@pipedrive/components';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
const EndCadenceView = ({ data }) => {
  const [owner, setOwner] = useState();
  const user = useRecoilValue(userInfo);

  const { users, usersLoading } = useUsers(Boolean(data?.to_user_id.length));
  const {
    cadence: selectedCadence,
    cadenceLoading,
    allowedStatuses,
  } = useCadenceSettings(
    {
      cadence: Boolean(data?.cadence_id !== ''),
      allowedStatuses: Boolean(
        data?.account_status.length || data?.lead_status.length
      ),
    },
    data?.cadence_id
  );

  useEffect(() => {
    if (users)
      setOwner(users?.filter((item) => item.user_id === data?.to_user_id)?.[0]);
  }, [users]);

  return data?.lead_status?.length === 0 &&
    data?.account_status?.length === 0 &&
    data?.cadence_id?.length === 0 &&
    data?.to_user_id?.length === 0 ? (
    <div className={styles.noSelectionBox}>
      <div className={styles.noSelection}>
        <div className={styles.text}>No selections made</div>
        <div className={styles.text}>
          To make changes click on{' '}
          <span className={styles.bold}>
            {CADENCE_TRANSLATION.EDIT_STEPS[user?.language?.toUpperCase()]}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.endCadence}>
      {(data?.lead_status?.length !== 0 ||
        data?.account_status?.length !== 0) && (
        <div className={styles.box}>
          <div className={styles.heading}>Status change</div>
          <div className={styles.table}>
            {data?.lead_status?.length !== 0 && (
              <div className={styles.col}>
                <div className={styles.singleCol}>
                  <Label className={styles.label}>Change status for</Label>
                  <div className={styles.labelValue}>Lead</div>
                </div>
                <div className={styles.singleCol}>
                  <Label className={styles.label}>Status set to</Label>
                  <div className={styles.labelValue}>
                    {
                      allowedStatuses?.lead_integration_status?.picklist_values.find(
                        (item) => item.value === data?.lead_status
                      )?.label
                    }
                  </div>
                </div>
                {/* {LEAD_STAGES[data?.lead_status] === LEAD_STAGES.Unqualified && (
									<div className={styles.singleCol}>
										<Label className={styles.label}>Reason</Label>
										<div className={styles.labelValue}>
											{data?.lead_reason.length !== 0 ? data?.lead_reason : "--"}
										</div>
									</div>
								)} */}
              </div>
            )}
            {data?.account_status?.length !== 0 && (
              <div className={styles.col}>
                <div className={styles.singleCol}>
                  <Label className={styles.label}>Change status for</Label>
                  <div className={styles.labelValue}>Account</div>
                </div>
                <div className={styles.singleCol}>
                  <Label className={styles.label}>Status set to</Label>
                  <div className={styles.labelValue}>
                    {
                      allowedStatuses?.account_integration_status?.picklist_values.find(
                        (item) => item.value === data?.account_status
                      )?.label
                    }
                  </div>
                </div>

                {/* {ACCOUNT_STAGES[data?.account_status] === ACCOUNT_STAGES.fake && (
									<div className={styles.singleCol}>
										<Label className={styles.label}>Reason</Label>
										<div className={styles.labelValue}>
											{data?.account_reason.length !== 0
												? data?.account_reason
												: "--"}
										</div>
									</div>
								)} */}
              </div>
            )}
          </div>
        </div>
      )}
      {(data?.lead_status?.length !== 0 ||
        data?.account_status?.length !== 0) &&
        (data?.cadence_id?.length !== 0 || data?.to_user_id?.length !== 0) && (
          <div className={styles.division}></div>
        )}
      {data?.cadence_id?.length !== 0 && (
        <div className={styles.box}>
          <div className={styles.heading}>
            Move contacts/leads to another cadence
          </div>
          <div className={styles.table}>
            <div className={styles.col}>
              <div className={styles.singleCol}>
                <Label className={styles.label}>Selected Cadence</Label>
                <Div className={styles.labelValue} loading={cadenceLoading}>
                  {selectedCadence?.name}
                </Div>
              </div>
            </div>
          </div>
        </div>
      )}
      {data?.cadence_id?.length !== 0 && data?.to_user_id?.length !== 0 && (
        <div className={styles.division}></div>
      )}
      {data?.to_user_id?.length !== 0 && (
        <div className={styles.box}>
          <div className={styles.heading}>Change ownership</div>
          <div className={styles.table}>
            <div className={styles.col}>
              <div className={styles.singleCol}>
                <Label className={styles.label}>
                  {CADENCE_TRANSLATION.NEW_OWNER[user?.language?.toUpperCase()]}
                </Label>
                <Div className={styles.owner} loading={usersLoading}>
                  <img
                    src={
                      owner?.is_profile_picture_present
                        ? owner?.profile_picture
                        : 'https://cdn.ringover.com/img/users/default.jpg'
                    }
                    alt="img"
                  />
                  <div
                    className={styles.ownerName}
                  >{`${owner?.first_name} ${owner?.last_name}`}</div>
                </Div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndCadenceView;
