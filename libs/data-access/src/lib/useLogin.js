import { ENV } from '@cadence-support/environments';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { AuthorizedApi } from './api';

const useLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const url = `${ENV.BACKEND}/v1/agent/auth/login`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendResetPasswordLinkApi = (email) =>
    AuthorizedApi.post(`/v2/user/forgot-password`, { email }).then(
      (res) => res.data
    );

  const {
    mutate: sendResetPasswordLink,
    isLoading: sendResetPasswordLinkLoading,
  } = useMutation(sendResetPasswordLinkApi, {});

  return {
    error,
    loading,
    login,
    sendResetPasswordLink,
    sendResetPasswordLinkLoading,
  };
};

export default useLogin;
