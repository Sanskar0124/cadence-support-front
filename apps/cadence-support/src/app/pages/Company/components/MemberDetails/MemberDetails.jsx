import { useUser } from '@cadence-support/data-access';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Employee from './components/Employee/Employee';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Integrations from './components/Integrations/Integrations';
import styles from './MemberDetails.module.scss';
import { MessageContext } from '@cadence-support/context';

const MemberDetails = ({ memberID }) => {
  const { state: searchedUser } = useLocation();
  const {
    userData,
    userLoading,
    productTourStatus,
    productTourStatusLoading,
    fetchUserData,
  } = useUser({
    memberID: memberID ? memberID : searchedUser?.user?.user_id,
  });
  const { addError, addSuccess } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);

  const handleProductTourStatus = () => {
    productTourStatus(userData?.user_id, {
      onSuccess: (data) => {
        addSuccess('product tour status updated successfully');
        setLoading(true);
        fetchUserData();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      },
      onError: (err) => addError(err?.response?.data?.msg),
    });
  };

  return (
    <div className={styles.memberDetails}>
      <div className={styles.left}>
        <Employee
          userData={userData}
          userLoading={userLoading}
          tourStatusHandler={handleProductTourStatus}
          loading={loading}
        />
        <Integrations userData={userData} userLoading={userLoading} />
      </div>
      <div className={styles.right}>
        <EmployeeTable
          userData={userData}
          memberID={memberID}
          userLoading={userLoading}
        />
      </div>
    </div>
  );
};

export default MemberDetails;
