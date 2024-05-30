import { useState, useEffect } from 'react';
import { useUserProfile } from '@cadence-support/data-access';
import styles from './Settings.module.scss';
import { Container } from '@cadence-support/components';
import { TabNavSlider } from '@cadence-support/widgets';
import { TabNavThemes } from '@cadence-support/themes';
import Email from './components/Email/Email';
import CalendyLink from './components/CalendyLink/CalendyLink';
import Connections from './components/Connections/Connections';
import EmailSignature from './components/EmailSignature/EmailSignature';
import Language from './components/Language/Language';
import PrimaryPhone from './components/PrimaryPhone/PrimaryPhone';
import RingoverIframe from './components/RingoverIframe/RingoverIframe';
import SalesforceAuth from './components/SalesforceAuth/SalesforceAuth';
import Timezone from './components/Timezone/Timezone';
import { SETTINGS_TABS, TABS } from './constants';

const Settings = ({ memberID, integrationType }) => {
  const { userData, userLoading } = useUserProfile(memberID, integrationType);
  const [activeTab, setActiveTab] = useState(TABS.EMAIL);

  const [rootRef, setRootRef] = useState(null);
  const [emailRef, setEmailRef] = useState(null);
  const [signRef, setSignRef] = useState(null);
  const [phoneRef, setPhoneRef] = useState(null);
  const [iframeRef, setIframeRef] = useState(null);
  const [connectRef, setConnectRef] = useState(null);
  const [salesforceRef, setSalesforceRef] = useState(null);
  const [calendyRef, setCalendyRef] = useState(null);
  const [langRef, setLangRef] = useState(null);
  const [timezoneRef, setTimezoneRef] = useState(null);

  // const valueToRef = {};

  useEffect(() => {
    // valueToRef[[TABS.EMAIL]] = emailRef;
    // valueToRef[[TABS.EMAIL_SIGNATURE]] = signRef;
    // valueToRef[[TABS.PRIMARY_PHONE]] = phoneRef;
    // valueToRef[[TABS.RINGOVER_IFRAME]] = iframeRef;
    // valueToRef[[TABS.CONNECT_SOURCE]] = connectRef;
    // valueToRef[[TABS.CONNECT_INTEGRATION]] = salesforceRef;
    // valueToRef[[TABS.CALENDLY_LINK]] = calendyRef;
    // valueToRef[[TABS.LANGUAGE]] = langRef;
    // valueToRef[[TABS.TIMEZONE]] = timezoneRef;

    const refs = [
      emailRef,
      signRef,
      phoneRef,
      iframeRef,
      connectRef,
      salesforceRef,
      calendyRef,
      langRef,
      timezoneRef,
    ];
    const options = {
      rootMargin: '0px 0px -90% 0px',
    };
    if (rootRef) {
      options.root = rootRef;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveTab(entry.target.id);
      }
    }, options);
    refs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [
    // valueToRef,
    rootRef,
    emailRef,
    signRef,
    phoneRef,
    iframeRef,
    connectRef,
    salesforceRef,
    calendyRef,
    langRef,
    timezoneRef,
  ]);

  return (
    <Container className={styles.settings}>
      <div className={styles.sidebar}>
        <TabNavSlider
          theme={TabNavThemes.WHITE}
          buttons={SETTINGS_TABS}
          value={activeTab}
          setValue={(value) => {
            setActiveTab(value);
            // const rootRect = rootRef.getBoundingClientRect();
            // const elemRect = valueToRef[value].getBoundingClientRect();
            // rootRef.scrollTop = elemRect.top - rootRect.top;

            // valueToRef[value].scrollIntoView({
            //   behavior: 'smooth',
            //   block: 'start',
            // });
          }}
          className={styles.tabs}
          btnClassName={styles.tabBtns}
          activeBtnClassName={styles.tabBtnActive}
          activePillClassName={styles.activePill}
          width="220px"
          btnHeight="40px"
          direction="column"
        />
      </div>
      <div ref={setRootRef} className={styles.component}>
        <div className={styles.body}>
          <Email setRef={setEmailRef} user={userData} loading={userLoading} />
          <div className={styles.divider}></div>
          <EmailSignature
            setRef={setSignRef}
            user={userData}
            loading={userLoading}
          />
          <div className={styles.divider}></div>
          <PrimaryPhone
            setRef={setPhoneRef}
            user={userData}
            loading={userLoading}
          />
          <div className={styles.divider}></div>
          {/* <RingoverIframe setRef={setIframeRef} user={userData} /> */}
          {/* <div className={styles.divider}></div> */}
          <Connections setRef={setConnectRef} user={userData} />
          <div className={styles.divider}></div>
          <SalesforceAuth
            setRef={setSalesforceRef}
            user={userData}
            integrationType={integrationType}
          />
          <div className={styles.divider}></div>
          <CalendyLink setRef={setCalendyRef} user={userData} />
          <div className={styles.divider}></div>
          <Language setRef={setLangRef} user={userData} />
          <div className={styles.divider}></div>
          <Timezone setRef={setTimezoneRef} user={userData} />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
