import React, { useState, useRef, useEffect } from 'react';
import styles from './MyAccount.module.scss';
import { USER_INTEGRATION_TYPES } from '@cadence-support/constants';
import Email from './components/Email/Email';
import CalendyLink from './components/CalendyLink/CalendyLink';
import Connections from './components/Connections/Connections';
import EmailSignature from './components/EmailSignature/EmailSignature';
import Language from './components/Language/Language';
import PrimaryPhone from './components/PrimaryPhone/PrimaryPhone';
import Timezone from './components/Timezone/Timezone';

const MyAccount = ({
  singleUserData,
  singleUserDataLoading,
  selectedSubTabs,
}) => {
  const emailRef = useRef(null);
  const signatureRef = useRef(null);
  const phoneRef = useRef(null);
  const connectionRef = useRef(null);
  const calendlyRef = useRef(null);
  const languageRef = useRef(null);
  const timezoneRef = useRef(null);

  useEffect(() => {
    if (selectedSubTabs.value === 'email') {
      emailRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'email_signature') {
      signatureRef.current.scrollTop = '500px';
      signatureRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'primary_phone') {
      phoneRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'connect_source') {
      connectionRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'calendly_link') {
      calendlyRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'language') {
      languageRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    if (selectedSubTabs.value === 'timezone') {
      timezoneRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedSubTabs]);

  return (
    <div className={styles.myAccount}>
      <Email
        setRef={emailRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />
      <EmailSignature
        setRef={signatureRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />

      <PrimaryPhone
        setRef={phoneRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />

      <Connections
        setRef={connectionRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />

      <CalendyLink
        setRef={calendlyRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />
      <Language
        setRef={languageRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />
      <Timezone
        setRef={timezoneRef}
        user={singleUserData}
        loading={singleUserDataLoading}
      />
    </div>
  );
};

export default MyAccount;
