import { MessageContext } from '@cadence-support/context';
import { useHomePage } from '@cadence-support/data-access';
import { CadencesGradient, Refresh } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { ThemedButton } from '@cadence-support/widgets';
import { useContext, useEffect, useState } from 'react';
import Placeholder from '../Placeholder/Placeholder';
import { ALL_SERVICES, AVAILABLE_SERVICES } from './constants';
import styles from './ServicesHealth.module.scss';
const ServicesHealth = ({ data, setData }) => {
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
  const { addError, addSuccess } = useContext(MessageContext);

  const servicesHandler = (service) => {
    if (service === 'calendar') {
      return calendarServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, calendar: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'backend') {
      return backendServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, backend: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'call') {
      return callServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, call: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'cadenceTracking') {
      return cadenceTrackingServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, cadenceTracking: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'mail') {
      return mailServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, mail: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'task') {
      return taskServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, task: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'leadExtension') {
      return leadExtensionServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, leadExtension: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'cadenceDev') {
      return cadencedevServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, cadenceDev: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    } else if (service === 'automatedWorkflow') {
      return automatedWorkflowServices(
        {},
        {
          onSuccess: (data) => {
            setData((prev) => ({ ...prev, automatedWorkflow: data }));
            addSuccess('Refetched Service');
          },
          onError: (err) => {
            addError(err?.response?.data?.msg);
          },
        }
      );
    }
  };

  return (
    <div className={styles.servicesHealth}>
      {backendServicesLoading &&
      calendarServicesLoading &&
      callServicesLoading &&
      automatedWorkflowServicesLoading &&
      cadencetrackingServicesLoading &&

      cadencetrackingServicesLoading &&
      leadExtensionServicesLoading &&
      mailServicesLoading &&
      cadenceDevServicesLoading &&
      taskServicesLoading ? (
        <Placeholder rows={10} />
      ) : (
        ALL_SERVICES.map((service, index) => (
          <div className={styles.left} key={index}>
            <div className={styles.icon}>
              <CadencesGradient />
            </div>

            <div className={styles.servicesDetails}>
              <p>{service?.label}</p>
            </div>
            <div className={styles.right}>
              {data?.[service?.value]?.msg !==
              'Service Health checked successfully.' ? (
                <div className={`${styles.status} ${styles.col}`}>
                  <span className={styles.down}>Down</span>
                </div>
              ) : (
                <div className={`${styles.status} ${styles.col}`}>
                  <span className={styles.active}>Active</span>
                </div>
              )}

              <ThemedButton
                theme={ThemedButtonThemes.GREY}
                width="fit-content"
                height="30px"
                onClick={() => servicesHandler(service?.value)}
                className={styles.refreshBtn}
                spinnerClassName={styles.buttonLoader}
                loading={
                  service?.value === 'backend'
                    ? backendServicesLoading
                    : service?.value === 'calendar'
                    ? calendarServicesLoading
                    : service?.value === 'call'
                    ? callServicesLoading
                    : service?.value === 'cadenceTracking'
                    ? cadencetrackingServicesLoading
                    : service?.value === 'mail'
                    ? mailServicesLoading
                    : service?.value === 'task'
                    ? taskServicesLoading
                    : service?.value === 'leadExtension'
                    ? leadExtensionServicesLoading
                    : service?.value === 'cadenceDev'
                    ? cadenceDevServicesLoading
                    : service?.value === 'automatedWorkflow'
                    ? automatedWorkflowServicesLoading
                    : ''
                }
              >
                <Refresh />
              </ThemedButton>
            </div>
          </div>
        ))
      )}

      {/* <div className={styles.noActivities}>
      <NoActivities />
      <h4>No Activity</h4>
    </div> */}
    </div>
  );
};

export default ServicesHealth;
