import { MessageContext } from '@cadence-support/context';
import { useHomePage } from '@cadence-support/data-access';
import { Refresh } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import { useContext, useState, useEffect } from 'react';
import Placeholder from './components/Placeholder/Placeholder';
import ServicesHealth from './components/ServicesHealth/ServicesHealth';
import styles from './OngoingServices.module.scss';

const OngoingServices = () => {
  const {
    calendarServices,
    calendarServicesLoading,
    backendServices,
    backendServicesLoading,
    callServices,
    callServicesLoading,
    cadenceTrackingServices,
    cadencetrackingServicesLoading,
    cadencedevServices,
    cadenceDevServicesLoading,
    mailServices,
    mailServicesLoading,
    taskServices,
    taskServicesLoading,
    leadExtensionServices,
    leadExtensionServicesLoading,
    automatedWorkflowServices,
    automatedWorkflowServicesLoading,
  } = useHomePage();
  const { addError } = useContext(MessageContext);
  const [data, setData] = useState();

  const handleRefreshAll = () => {
    calendarServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, calendar: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    backendServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, backend: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    callServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, call: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    cadenceTrackingServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, cadenceTracking: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    mailServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, mail: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    taskServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, task: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    leadExtensionServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, leadExtension: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );




    cadencedevServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, cadenceDev: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );

    automatedWorkflowServices(
      {},
      {
        onSuccess: (data) => {
          setData((prev) => ({ ...prev, automatedWorkflow: data }));
        },
        onError: (err) => {
          addError(err?.response?.data?.msg);
        },
      }
    );
  };

  useEffect(() => {
    handleRefreshAll();
  }, []);

  return (
    <div className={styles.disconnectedUsers}>
      <div className={styles.disconnectedUsers_heading}>
        <div className={styles.text}>Ongoing Services</div>

        <div className={styles.search}>
          {/* <SearchBar placeholderText={'Search Services'} /> */}
          <ThemedButton
            theme={ThemedButtonThemes.GREY}
            width="fit-content"
            height="30px"
            loadingText="Refreshing"
            onClick={handleRefreshAll}
            className={styles.refreshBtn}
            loading={
              backendServicesLoading ||
              calendarServicesLoading ||
              callServicesLoading ||
              automatedWorkflowServicesLoading ||
              cadencetrackingServicesLoading ||
              cadencetrackingServicesLoading ||
              leadExtensionServicesLoading ||
              mailServicesLoading ||
              cadenceDevServicesLoading ||
              taskServicesLoading
            }
            spinnerClassName={styles.buttonLoader}
          >
            Refresh All <Refresh />
          </ThemedButton>
        </div>
      </div>
      {backendServicesLoading ||
      calendarServicesLoading ||
      callServicesLoading ||
      automatedWorkflowServicesLoading ||
      cadencetrackingServicesLoading ||
      cadencetrackingServicesLoading ||
      leadExtensionServicesLoading ||
      mailServicesLoading ||
      cadenceDevServicesLoading ||
      taskServicesLoading ? (
        <Placeholder rows={10} />
      ) : (
        <ServicesHealth data={data} setData={setData} />
      )}
    </div>
  );
};

export default OngoingServices;
