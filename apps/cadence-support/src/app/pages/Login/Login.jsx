/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useContext, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { userInfo } from '@cadence-support/atoms';
import styles from './Login.module.scss';

//components
import { PageContainer, Title } from '@cadence-support/components';

//data-access
import { useLogin } from '@cadence-support/data-access';
import { Input, Label, ThemedButton } from '@cadence-support/widgets';
import { InputThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { RingoverLogo, View, ViewGradient } from '@cadence-support/icons';
import { MessageContext } from '@cadence-support/context';
import { Colors, handleLoginRedirect } from '@cadence-support/utils';
import ConnectRingover from './ConnectRingover/ConnectRingover';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useRecoilState(userInfo);
  const resetUser = useResetRecoilState(userInfo);
  const { addError, addSuccess } = useContext(MessageContext);

  const {
    login,
    loading,
    error,
    sendResetPasswordLink,
    sendResetPasswordLinkLoading,
  } = useLogin();

  const [input, setInput] = useState({ email: '', password: '' });
  const [forgetPasswordView, setForgetPasswordView] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [linkSentCount, setLinkSentCount] = useState(0);

  useEffect(() => {
    const isLoggedOut = searchParams.get('log_out');
    if (isLoggedOut && window.location.origin.includes('localhost'))
      return resetUser();
    if (user.ringover_tokens?.id_token && !isLoggedOut)
      return handleLoginRedirect();
  }, [user]);

  useEffect(() => {
		//temp remove old user
		localStorage.removeItem("recoil-persist");
	}, []);

  const saveUser = (usr) => {
    setUser(usr);
    return handleLoginRedirect();
  };

  const onSubmit = async (e) => {
    if (!forgetPasswordView) {
      e.preventDefault();
      await login(input, (usr) => saveUser(usr));
    } else {
      sendResetPasswordLink(input.email, {
        onError: (err) => addError(err.response?.data?.msg),
        onSuccess: () => {
          setLinkSentCount((prev) => prev + 1);
          addSuccess('Link sent successfully!!');
        },
      });
    }
  };

  return (
		<PageContainer className={styles.loginContainer}>
			<div className={styles.container2}>
				<div className={styles.logo}>
					<RingoverLogo size="38px" />
					<div>
						<span>Cadence</span>
						<span>By Ringover</span>
					</div>
				</div>
				<div className={styles.content}>
					<h2>Welcome back</h2>
					<p>Connect seamlessly to Cadence Support with your Ringover account</p>
					<ConnectRingover />
				</div>
				<div className={styles.bgLogo1}>
					<RingoverLogo size="180px" />
				</div>
				<div className={styles.bgLogo2}>
					<RingoverLogo size="170px" />
				</div>
				<div className={styles.bgLogo3}>
					<RingoverLogo size="400px" />
				</div>
			</div>
		</PageContainer>
  );
};

export default Login;
