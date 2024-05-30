import { Checkbox, Label, Select, Toggle } from '@cadence-support/widgets';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MessageContext } from '@cadence-support/context';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { CadenceContext } from '../../../../Settings';
import styles from './EndCadence.module.scss';
// import SelectCadence from './SelectCadence/SelectCadence';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

import {
  CHANGE_LEAD_STATUS_DISABLED,
  CHANGE_OWNER_DISABLED,
} from './constants';

const EndCadence = ({ node }) => {
  const { activeStep, setActiveStep, setSaveVisible, onSaveRef, onSuccess } =
    useContext(CadenceContext);

  const { id: cadence_id } = useParams();
  const queryClient = useQueryClient();
  const user = useRecoilValue(userInfo);
  const { addError } = useContext(MessageContext);
  //refs
  const dataRef = useRef(null);
  const toggleRef = useRef(null);

  //data states
  const [cadence, setCadence] = useState(node.data.cadence_id);
  const [accountStatus, setAccountStatus] = useState(node.data.account_status);
  const [allowedStatusOptions, setAllowedStatusOptions] = useState({
    lead: [],
    account: [],
  });
  const [accountReason, setAccountReason] = useState(node.data.account_reason);
  const [leadStatus, setLeadStatus] = useState(node.data.lead_status);
  const [leadReason, setLeadReason] = useState(node.data.lead_reason);
  const [ownership, setOwnership] = useState('');
  const [toggle, setToggle] = useState({
    status: false,
    move: false,
    ownership: false,
  });
  //options states
  const [cadenceOptions, setCadenceOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  // disqualification reasons for lead and account
  const [leadDisqualificatonReason, setLeadDisqualificatonReason] = useState(
    []
  );
  const [accountDisqualificatonReason, setAccountDisqualificatonReason] =
    useState([]);

  //   useEffect(() => {
  //     setLeadDisqualificatonReason(
  //       allowedStatuses?.lead_disqualification_reasons?.picklist_values
  //     );
  //     setAccountDisqualificatonReason(
  //       allowedStatuses?.account_disqualification_reasons?.picklist_values
  //     );
  //   }, []);

  //side effects
  //   useEffect(() => {
  //     setCadenceOptions(
  //       cadenceDropdown
  //         ?.filter((c) => c.cadence_id != cadence_id)
  //         ?.map((op) => ({ label: op.name, value: op.cadence_id }))
  //     );
  //     setEmployeeOptions(
  //       employees
  //         ?.sort((a, b) => a.first_name.localeCompare(b.first_name))
  //         ?.map((op) => ({
  //           label: `${op.first_name} ${op.last_name}`,
  //           value: op.user_id,
  //         }))
  //     );
  //     if (node.data.cadence_id) setToggle((prev) => ({ ...prev, move: true }));
  //     if (node.data.lead_status || node.data.account_status)
  //       setToggle((prev) => ({ ...prev, status: true }));
  //     if (node.data.to_user_id)
  //       setToggle((prev) => ({ ...prev, ownership: true }));
  //     return () => onSave();
  //   }, []);

  //   useEffect(() => {
  //     dataRef.current = {
  //       cadence_id: cadence,
  //       account_status: accountStatus,
  //       lead_status: leadStatus,
  //       lead_reason: leadReason,
  //       account_reason: accountReason,
  //       to_user_id: ownership,
  //       moved_leads: node.data.moved_leads,
  //     };
  //     toggleRef.current = toggle;
  //   }, [
  //     node,
  //     cadence,
  //     accountStatus,
  //     leadStatus,
  //     leadReason,
  //     accountReason,
  //     ownership,
  //     toggle,
  //   ]);

  //   useEffect(() => {
  //     let leadStatuses =
  //       allowedStatuses?.lead_integration_status?.picklist_values;
  //     let accountStatuses =
  //       allowedStatuses?.account_integration_status?.picklist_values;
  //     setAllowedStatusOptions({ lead: leadStatuses, account: accountStatuses });
  //   }, [allowedStatuses]);

  //   useEffect(() => {
  //     setOwnership(node.data.to_user_id);
  //   }, [employeeOptions]);

  //   //functions

  //   const onSave = () => {
  //     if (!toggleRef.current.status) {
  //       dataRef.current.account_status = '';
  //       dataRef.current.lead_status = '';
  //     }
  //     if (!toggleRef.current.move) dataRef.current.cadence_id = '';
  //     if (!toggleRef.current.ownership) dataRef.current.to_user_id = '';
  //     if (
  //       dataRef.current.lead_status !==
  //       allowedStatuses?.lead_integration_status?.disqualified?.value
  //     )
  //       dataRef.current.lead_reason = '';
  //     if (
  //       dataRef.current.account_status !==
  //       allowedStatuses?.account_integration_status?.disqualified?.value
  //     )
  //       dataRef.current.account_reason = '';

  //     if (dataRef.current === node.data) return;
  //     let data = {
  //       step_number: node.step_number,
  //       body: {
  //         data: dataRef.current,
  //       },
  //     };

  //     updateNode(data, {
  //       onError: (err, updatedData, context) => {
  //         setActiveStep(updatedData?.node_id);
  //         setSaveVisible(true);
  //         addError('Error updating End cadence, please try again');
  //         queryClient.setQueryData(
  //           ['cadence', cadence_id],
  //           context.previousCadence
  //         );
  //         onSaveRef.current.onclick = () => onSave();
  //       },
  //       onSuccess,
  //     });
  //   };

  return (
    <div className={styles.endCadence}>
      {/* <div className={styles.header}>
          <h2 className={styles.title}>
            {CADENCE_TRANSLATION.END_CADENCE[user?.language?.toUpperCase()]}
          </h2>
        </div>
        <div className={styles.box}>
          <Label>Create a workflow {'(optional)'}</Label>
        </div>
        {!CHANGE_LEAD_STATUS_DISABLED.includes(user?.integration_type) && (
          <div
            className={`${styles.container} ${
              toggle.status ? styles.open : ''
            }`}
          >
            <div className={styles.top}>
              <Checkbox
                className={styles.checkbox}
                checked={toggle.status}
                value="status"
                onChange={() =>
                  setToggle((prev) => ({ ...prev, status: !prev.status }))
                }
              />
              <span>Change status for lead/account</span>
            </div>
            <div className={styles.box}>
              <Label>Change status for lead</Label>
              <Select
                placeholder={
                  COMMON_TRANSLATION.SELECT_HERE[user?.language?.toUpperCase()]
                }
                options={allowedStatusOptions.lead}
                value={leadStatus}
                setValue={setLeadStatus}
                isSearchable
              />
            </div>
            {leadStatus ===
              allowedStatuses?.lead_integration_status?.disqualified?.value && (
              <div className={styles.box}>
                <Label>Select Reason for Disqualification</Label>
                <Select
                  placeholder={
                    COMMON_TRANSLATION.SELECT_HERE[
                      user?.language?.toUpperCase()
                    ]
                  }
                  options={leadDisqualificatonReason}
                  value={leadReason}
                  setValue={setLeadReason}
                  isSearchable
                />
              </div>
            )}
            <div className={styles.box}>
              <Label>Change status for account</Label>
              <Select
                placeholder={
                  COMMON_TRANSLATION.SELECT_HERE[user?.language?.toUpperCase()]
                }
                options={allowedStatusOptions.account}
                value={accountStatus}
                setValue={setAccountStatus}
                isSearchable
              />
            </div>
            {accountStatus ===
              allowedStatuses?.account_integration_status?.disqualified
                ?.value && (
              <div className={styles.box}>
                <Label>Select Reason for fake</Label>
                <Select
                  placeholder={
                    COMMON_TRANSLATION.SELECT_HERE[
                      user?.language?.toUpperCase()
                    ]
                  }
                  options={accountDisqualificatonReason}
                  value={accountReason}
                  setValue={setAccountReason}
                  isSearchable
                />
              </div>
            )}
          </div>
        )}
        <div
          className={`${styles.container} ${toggle.move ? styles.open : ''}`}
        >
          <div className={styles.top}>
            <Checkbox
              className={styles.checkbox}
              checked={toggle.move}
              value="move"
              onChange={() =>
                setToggle((prev) => ({ ...prev, move: !prev.move }))
              }
            />
            <span>
              {
                CADENCE_TRANSLATION?.MOVE_CONTACTS_LEADS_TO_ANOTHER_CADENCE?.[
                  user?.language?.toUpperCase()
                ]
              }
            </span>
          </div>
          <div className={styles.box}>
            <SelectCadence
              isOpen={toggle.move}
              cadenceSelected={cadence}
              setCadenceSelected={setCadence}
            />
            <Label>Move contacts/leads to another cadence</Label>
					<Select
						placeholder="Select here"
						options={cadenceOptions}
						value={cadence}
						setValue={setCadence}
						isSearchable
					/> 
          </div>
        </div>
        {!CHANGE_OWNER_DISABLED.includes(user?.integration_type) && (
          <div
            className={`${styles.container} ${
              toggle.ownership ? styles.open : ''
            }`}
          >
            <div className={styles.top}>
              <Checkbox
                className={styles.checkbox}
                checked={toggle.ownership}
                value="ownership"
                onChange={() =>
                  setToggle((prev) => ({ ...prev, ownership: !prev.ownership }))
                }
              />
              <span>
                {
                  CADENCE_TRANSLATION?.CHANGE_OWNERSHIP?.[
                    user?.language?.toUpperCase()
                  ]
                }{' '}
                <span>
                  *Workflow settings will overwrite this ownership change
                </span>
              </span>
            </div>
            <div className={styles.box}>
              <Label>Change ownership</Label>
              <Select
                placeholder={
                  COMMON_TRANSLATION.SELECT_HERE[user?.language?.toUpperCase()]
                }
                options={employeeOptions}
                value={ownership}
                setValue={setOwnership}
                isSearchable
                menuOnTop
              />
            </div>
          </div>
        )} */}
    </div>
  );
};

export default EndCadence;
