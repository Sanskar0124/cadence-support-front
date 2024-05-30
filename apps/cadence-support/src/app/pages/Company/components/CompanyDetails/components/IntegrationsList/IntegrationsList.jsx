import { Skeleton, ProgressiveImg } from '@cadence-support/components';
import { useIntegrations } from '@cadence-support/data-access';
import {
  SalesforceBox,
  Hubspot,
  LushaLogo,
  Kaspr,
  Pipedrive,
  GoogleSheets,
  Excel,
  LinkedinBox,
  Bullhorn,
  Sellsy,
  Zoho,
  KasprLogo,
  Dynamics,
  Snov,
} from '@cadence-support/icons';
import React, { useState, useEffect } from 'react';
import { VIEW_MODE } from '../../../../constants';
import styles from './IntegrationsList.module.scss';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

function IntegrationsList({
  companyID,
  setViewMode,
  setSelectedIntegration,
  setSelectedAddons,
}) {
  const { integrations, isIntegrationsFetching } = useIntegrations(companyID);
  const [addons, setAddOns] = useState([]);
  const primaryCardClick = (e) => {
    switch (e) {
      case 'salesforce':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('salesforce');
        break;
      case 'pipedrive':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('pipedrive');
        break;
      case 'google_sheets':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('google_sheets');
        break;
      case 'hubspot':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('hubspot');
        break;
      case 'bullhorn':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('bullhorn');
        break;
      case 'sellsy':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('sellsy');
        break;
      case 'zoho':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('zoho');
        break;
      case 'excel':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('excel');
        break;
      case 'dynamics':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedIntegration('dynamics');
        break;
    }
  };
  const AddonsClickHandler = (e) => {
    switch (e) {
      case 'kaspr':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('kaspr');
        break;
      case 'lusha':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('lusha');
        break;
      case 'hunter':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('hunter');
        break;
      case 'dropcontact':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('dropcontact');
        break;
      case 'linkedin_extension':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('linkedin_extension');
        break;
      case 'snov':
        setViewMode(VIEW_MODE.INTEGRATION);
        setSelectedAddons('snov');
        break;
    }
  };
  const INTEGRATION_DATA = {
    salesforce: {
      name: 'Salesforce',
      icon: <SalesforceBox height={35} className={styles.salesforceIcon} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Salesforce_Token?.is_logged_out,
    },
    pipedrive: {
      name: 'Pipedrive',
      icon: <Pipedrive height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Pipedrive_Token?.is_logged_out,
    },
    google_sheets: {
      name: 'Google Sheets',
      icon: <GoogleSheets height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.GoogleSheets_Token?.is_logged_out,
    },
    excel: {
      name: 'Excel',
      icon: <Excel height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: integrations?.company_id,
    },
    hubspot: {
      name: 'Hubspot',
      icon: <Hubspot height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Hubspot_Token?.is_logged_out,
    },
    lusha: {
      name: 'Lusha',
      icon: <LushaLogo height={35} />,
      subtitle: 'Add-ons , Enrichment',
      users: integrations?.lusha_user_count,
      teams: integrations?.lusha_team_count,
      status: integrations?.Enrichment?.is_lusha_configured,
    },
    kaspr: {
      name: 'Kaspr',
      icon: <Kaspr height={35} />,
      subtitle: 'Add-ons , Enrichment',
      users: integrations?.kaspr_user_count,
      teams: integrations?.kaspr_team_count,
      status: integrations?.Enrichment?.is_kaspr_configured,
    },
    hunter: {
      name: 'Hunter',
      icon: (
        <img
          src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/hunter_logo.png"
          alt=""
        />
      ),
      subtitle: 'Add-ons , Enrichment',
      users: integrations?.hunter_user_count,
      teams: integrations?.hunter_team_count,
      status: integrations?.Enrichment?.is_hunter_configured,
    },
    snov: {
      name: 'Snov',
      icon: <Snov height={35} />,
      subtitle: 'Add-ons , Enrichment',
      users: integrations?.snov_user_count,
      teams: integrations?.snov_team_count,
      status: integrations?.Enrichment?.is_snov_configured,
    },
    dropcontact: {
      name: 'Dropcontact',
      icon: (
        <img
          src="https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/assets/dropcontact_logo.png"
          alt=""
        />
      ),
      subtitle: 'Add-ons , Enrichment',
      users: integrations?.dropcontact_user_count,
      teams: integrations?.dropcontact_team_count,
      status: integrations?.Enrichment?.is_dropcontact_configured,
    },
    linkedin_extension: {
      name: 'Extension',
      icon: <LinkedinBox color="#3275B3" />,
      subtitle: 'Add-ons , Enrichment',
      status: integrations?.Enrichment?.is_linkedin_activated,
    },
    bullhorn: {
      name: 'Bullhorn',
      icon: <Bullhorn height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Bullhorn_Token?.is_logged_out,
    },
    sellsy: {
      name: 'Sellsy',
      icon: <Sellsy height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Sellsy_Token?.is_logged_out,
    },
    zoho: {
      name: 'Zoho',
      icon: <Zoho height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.Zoho_Token?.is_logged_out,
    },
    dynamics: {
      name: 'Dynamics',
      icon: <Dynamics height={35} />,
      subtitle: 'CRM',
      users: integrations?.user_count,
      teams: integrations?.sd_count,
      status: !integrations?.active_status?.dynamics_Token?.is_logged_out,
    },
  };
  useEffect(() => {
    let addonsData = Object.keys(INTEGRATION_DATA).filter(
      (item) =>
        [
          'lusha',
          'kaspr',
          'hunter',
          'dropcontact',
          'linkedin_extension',
          'snov',
        ].includes(item) && item
    );
    setAddOns(addonsData);
  }, [INTEGRATION_DATA]);

  return (
    <div className={styles.integrationsList}>
      {isIntegrationsFetching ? (
        <>
          {Array(6)
            .fill(null)
            .map((item) => (
              <Skeleton className={styles.cardSkeleton} />
            ))}
        </>
      ) : (
        <>
          {
            <div
              onClick={() => primaryCardClick(integrations?.integration_type)}
            >
              <IntegrationCard
                {...INTEGRATION_DATA[integrations?.integration_type]}
              />
            </div>
          }
          {addons.map((item) => {
            return (
              <div
                onClick={
                  (integrations?.integration_type ===
                    INTEGRATION_TYPE.GOOGLE_SHEETS &&
                    item === 'linkedin_extension') ||
                  (integrations?.integration_type === INTEGRATION_TYPE.EXCEL &&
                    item === 'linkedin_extension')
                    ? () => null
                    : () => AddonsClickHandler(item)
                }
              >
                <IntegrationCard {...INTEGRATION_DATA[item]} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

function IntegrationCard({ name, icon, subtitle, users, teams, status }) {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <div
          className={styles.icon}
          style={{ width: name === 'Zoho' && 'fit-content' }}
        >
          {icon}
        </div>
        <div className="">
          <h1>{name}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
      <div className={styles.stats}>
        <div className="">
          <h2>{users || '--'}</h2>
          <h3>Users</h3>
        </div>
        <div className="">
          <h2>{teams || '--'}</h2>
          <h3>Teams</h3>
        </div>
        <div
          className={`${status ? styles.Active : styles.Inactive} ${
            styles.tag
          }`}
        >
          {status ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
  );
}

export default IntegrationsList;
