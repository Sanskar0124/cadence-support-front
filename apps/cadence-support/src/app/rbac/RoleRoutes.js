import { ROLE_ROUTES } from './constants/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import SocketProvider from '../../../../../libs/context/src/lib/SocketContext';

//components

import { Sidebar, Spinner } from '@cadence-support/components';
import { useRingoverOAuth } from '@cadence-support/data-access';
import styles from './RoleRoutes.module.scss';
import { useRecoilState } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { handleLogoutRedirect } from '@cadence-support/utils';
import { useEffect, useState } from 'react';

const RoleRoutes = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const { updateAccessToken } = useRingoverOAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //set a timeout to update the access token before it expires
    setTimeout(() => {
      updateAccessToken(
        {
          body: {
            id_token: user?.ringover_tokens?.id_token,
            refresh_token: user?.ringover_tokens?.refresh_token,
          },
        },
        {
          onSuccess: (data) => {
            setUser((prev) => ({
              ...prev,
              ringover_tokens: data,
              token_expires_at: Date.now() + (data.expires_in - 300) * 1000,
            }));
          },
          onError: () => setUser((prev) => ({ language: prev.language })),
        }
      );
    }, Math.max(user?.token_expires_at - Date.now(), 0));

    //set loading to false when the token is updated, with a delay 1 sec so that the accessToken is updated in localstorage
    if (user?.token_expires_at > Date.now())
      setTimeout(() => setLoading(false), 1000);
  }, [user?.token_expires_at]);

  const checkAuthentication = () => {
    // console.log('USER', user?.ringover_tokens?.id_token);
    // console.log(
    //   'ROLES ',
    //   Object.keys(ROLE_ROUTES).includes(user?.support_role)
    // );
    if (
      user?.ringover_tokens?.id_token &&
      Object.keys(ROLE_ROUTES).includes(user?.support_role)
    )
      return true;
    return false;
  };

  const handleLogout = () => {
    handleLogoutRedirect();
    return (
      <div className={styles.loader}>
        <Spinner className={styles.spinner} />
      </div>
    );
  };

  return checkAuthentication() ? (
    <SocketProvider>
      <div className={styles.routePageContainer}>
        <div className={styles.sidebar}>
          <Sidebar routes={ROLE_ROUTES[user?.support_role]} />
        </div>

        <div className={styles.routeContainer}>
          <Routes>
            {ROLE_ROUTES[user?.support_role].map((route) => (
              <Route
                key={route.name}
                path={route.link}
                exact
                element={route.component}
              />
            ))}

            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </div>
      </div>
    </SocketProvider>
  ) : (
    handleLogout()
  );
};

export default RoleRoutes;
