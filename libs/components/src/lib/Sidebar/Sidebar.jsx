import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Call, NineDots, RingoverLogo } from '@cadence-support/icons';
import Link from './components/Link/Link';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { userInfo } from '@cadence-support/atoms';

import { Button } from '@cadence-support/components';

import { useOutsideClickHandler } from '@cadence-support/utils';
import { useRingoverOAuth } from '@cadence-support/data-access';

import { handleLogoutRedirect } from '@cadence-support/utils';

import styles from './Sidebar.module.scss';

const Sidebar = ({ routes }) => {
  const resetUserInfo = useResetRecoilState(userInfo);
  const location = useLocation();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  useOutsideClickHandler(profileRef, () => setProfileDropdown(false));
  const { signOutFromRingover } = useRingoverOAuth();

	const logout = () => {
		signOutFromRingover(
			{},
			{
				onSettled: () => {
          resetUserInfo();
					sessionStorage.clear();
					handleLogoutRedirect();
				},
			}
		);
	};


  return (
    <div className={styles.sidebar} id="sidebar">
      <div className={styles.logo}>
        <RingoverLogo />
      </div>
      <div className={styles.links}>
        {routes
          .filter((route) => route.includedInSidebar)
          .map((link) => (
            <Link
              key={link.name}
              to={link.link}
              name={link.name}
              icon={link.icon}
              active={location.pathname.split('/')[1] === link.link.slice(1)}
            />
          ))}
      </div>
      <div className={styles.bottom}>
        <div
          //ref={profileRef}
          // onClick={() => {
          //   stepChangeable === true
          //     ? setProfileDropdown((curr) => !curr)
          //     : (() => {
          //         if (stepChangeable.type === 'unsubscribeError') {
          //           addConfirmMessage({
          //             msg: 'Unsubscribe Link is mandatory for automated mails',
          //             fun: stepChangeable.fun,
          //             type: stepChangeable.type,
          //           });
          //         }
          //         return false;
          //       })();
          // }}
          onClick={() => setProfileDropdown((prev) => !prev)}
          className={styles.profile}
        >
          <ProfilePicture showDefault />
          {profileDropdown && (
            <div className={styles.dropdown}>
              <Button onClick={logout}>
                Disconnect
                {/* {COMMON_TRANSLATION.DISCONNECT[user?.language?.toUpperCase()]} */}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
