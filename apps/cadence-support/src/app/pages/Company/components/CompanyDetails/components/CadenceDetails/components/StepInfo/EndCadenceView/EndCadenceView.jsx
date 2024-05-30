import React, { useEffect, useState } from 'react';
import styles from './EndCadence.module.scss';

import { Label } from '@cadence-support/widgets';
import { Div } from '@cadence-support/components';

const EndCadenceView = ({ data, movedLeads, loading, cadence }) => {
  const [owner, setOwner] = useState();

  return data?.lead_status?.length === 0 &&
    data?.account_status?.length === 0 &&
    data?.cadence_id?.length === 0 &&
    data?.to_user_id?.length === 0 ? (
    <div className={styles.noSelectionBox}>
      <div className={styles.noSelection}>
        <div className={styles.text}>No selection made</div>
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
                    {/* {
                      allowedStatuses?.lead_integration_status?.picklist_values.find(
                        (item) => item.value === data?.lead_status
                      )?.label
                    } */}
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
                    {/* {
                      allowedStatuses?.account_integration_status?.picklist_values.find(
                        (item) => item.value === data?.account_status
                      )?.label
                    } */}
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
                <Div className={styles.labelValue} loading={loading}>
                  {cadence?.name}
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
                <Label className={styles.label}>New owner</Label>
                <Div className={styles.owner} loading={loading}>
                  <img src={owner?.profile_picture} alt="img" />
                  <div
                    className={styles.ownerName}
                  >{`${owner?.first_name} ${owner?.last_name}`}</div>
                </Div>
              </div>
            </div>
          </div>
        </div>
      )}
      {movedLeads?.length > 0 && movedLeads[0]?.moved_count > 0 && (
        <>
          <div className={styles.division}></div>
          <div className={styles.box}>
            <div className={styles.heading}>No. of leads moved</div>
            <div className={styles.movedLeadsWrapper}>
              <Label className={styles.label}>Leads</Label>
              <span>{movedLeads[0]?.moved_count}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EndCadenceView;
