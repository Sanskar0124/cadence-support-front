import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

import './UserInfo.scss';
import { useCompany } from '@cadence-support/data-access';
import { MessageContext } from '@cadence-support/context';

const UserInfo = ({ user }, ref) => {
  const navigate = useNavigate();
  const { getCompanyDetails } = useCompany(true, {});
  const { addError } = useContext(MessageContext);

  const handleUserClick = (user) => {
    getCompanyDetails(user?.Company?.company_id, {
      onSuccess: (data) => {
        if (!data?.integration_type) return;
        localStorage.removeItem('company');
        localStorage.setItem('company', JSON.stringify(data));
        navigate(`/company/${user?.Company?.company_id}`, {
          state: { user: { ...user, ...data }, search: 'search' },
        });
      },
      onError: (err) => addError(err?.response?.data?.msg),
    });
  };

  return (
    // <Link to={`/company/${user.company_id}`}>
    <div
      className="search-user"
      ref={ref}
      onClick={() => handleUserClick(user)}
    >
      <div className="dp">
        {user.first_name.slice(0, 1)}
        {user.last_name.slice(0, 1)}
      </div>
      <div className="info">
        <span className="name" title={`${user.first_name} ${user.last_name}`}>
          {user.first_name} {user.last_name}
        </span>
        {/* <span className="source" title={user?.Account?.name}>
            {user.Account.name}
          </span>
          <span className="size" title={user?.Account?.size}>
            {user.Account.size}
          </span> */}
      </div>
    </div>
    // </Link>
  );
};

export default React.forwardRef(UserInfo);
