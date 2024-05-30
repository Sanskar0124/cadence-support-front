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
    if (user?.accessToken && !isLoggedOut)
      return handleLoginRedirect(user.accessToken);
  }, [user]);

  const saveUser = (usr) => {
    setUser(usr);
    return handleLoginRedirect(usr.accessToken);
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
    <PageContainer
      onKeyDown={(e) => e.key === 'Enter' && onSubmit(e)}
      className={styles.loginContainer}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <RingoverLogo />
          <div>
            <span>
              Cadence Support
              {/* {COMMON_TRANSLATION.CADENCE[user?.language?.toUpperCase()]} */}
            </span>
            <span>
              {/* {COMMON_TRANSLATION.BY_RINGOVER[user?.language?.toUpperCase()]} */}
              By Ringover
            </span>
          </div>
        </div>
        <Title>Sign in</Title>
        {forgetPasswordView && (
          <span className={styles.instructions}>
            An email will be sent to you along with a reset password link.
            Please visit that link to reset your password
          </span>
        )}
        <div className={styles.inputBox}>
          <Label>Email</Label>
          <Input
            theme={InputThemes.WHITE}
            height="53px"
            type="text"
            value={input}
            setValue={setInput}
            name="email"
            placeholder="Email"
          />
        </div>
        {!forgetPasswordView && (
          <div className={styles.inputBox}>
            <Label>Password</Label>
            <Input
              theme={InputThemes.WHITE}
              height="53px"
              type={hidePass ? 'password' : 'text'}
              value={input}
              setValue={setInput}
              name="password"
              placeholder="Password"
            />
            <div className={styles.hidePassword}>
              {hidePass ? (
                <View
                  size={18}
                  color={Colors.lightBlue}
                  onClick={() => setHidePass((curr) => !curr)}
                />
              ) : (
                <ViewGradient
                  size={18}
                  onClick={() => setHidePass((curr) => !curr)}
                />
              )}
            </div>
          </div>
        )}
        {!forgetPasswordView && (
          <span
            className={styles.forgetPassword}
            onClick={() => setForgetPasswordView(true)}
          >
            Forgot Password
          </span>
        )}
        <span className={styles.error}>{error}</span>
        {!forgetPasswordView ? (
          <ThemedButton
            theme={ThemedButtonThemes.PRIMARY}
            onClick={(e) => {
              onSubmit(e);
            }}
            loading={loading}
          >
            Sign in
          </ThemedButton>
        ) : (
          <ThemedButton
            theme={ThemedButtonThemes.PRIMARY}
            onClick={(e) => {
              onSubmit(e);
            }}
            loading={sendResetPasswordLinkLoading}
          >
            {linkSentCount ? 'Resend' : 'Send'}
            <div>Password Reset Link</div>
          </ThemedButton>
        )}
        {forgetPasswordView && (
          <span
            className={styles.backToLogin}
            onClick={() => setForgetPasswordView(false)}
          >
            Back to Login
          </span>
        )}
      </div>
    </PageContainer>
  );
};

export default Login;
