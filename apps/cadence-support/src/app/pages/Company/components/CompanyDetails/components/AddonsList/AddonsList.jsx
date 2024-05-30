import { useIntegrations } from '@cadence-support/data-access';
import { LushaLogo, Kaspr, LinkedinBox, Snov } from '@cadence-support/icons';
import React, { useState, useEffect } from 'react';
import { VIEW_MODE } from '../../../../constants';
import styles from './AddonsList.module.scss';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { Placeholder } from './component/Placeholder';

function AddonsList({
  companyID,
  setViewMode,
  setSelectedIntegration,
  setSelectedAddons,
}) {
  const { integrations, isIntegrationsFetching } = useIntegrations(companyID);

  const AddonsClickHandler = (e) => {
    switch (e) {
      case 'kaspr':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('kaspr');
        break;
      case 'lusha':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('lusha');
        break;
      case 'hunter':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('hunter');
        break;
      case 'dropcontact':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('dropcontact');
        break;
      case 'linkedin_extension':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('linkedin_extension');
        break;
      case 'snov':
        setViewMode(VIEW_MODE.ADDON);
        setSelectedAddons('snov');
        break;
    }
  };
  const INTEGRATION_DATA = {
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
      status: integrations?.Enrichment?.is_snov_activated,
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
      name: 'Linkedin',
      icon: <LinkedinBox color="#3275B3" />,
      subtitle: 'Extension',
      status: integrations?.is_linkedin_activated,
    },
  };

  return (
    <div className={styles.integrationsList}>
      <>
        {isIntegrationsFetching ? (
          <Placeholder />
        ) : (
          Object.keys(INTEGRATION_DATA)?.map((item) => {
            return (
              <div
                onClick={
                  (integrations?.integration_type ===
                    INTEGRATION_TYPE.GOOGLE_SHEETS &&
                    item === 'linkedin_extension') ||
                  (integrations?.integration_type === INTEGRATION_TYPE.EXCEL &&
                    item === 'linkedin_extension') ||
                  (integrations?.integration_type ===
                    INTEGRATION_TYPE.DYNAMICS &&
                    item === 'linkedin_extenstion')
                    ? () => null
                    : () => AddonsClickHandler(item)
                }
                key={item?.name}
              >
                <IntegrationCard {...INTEGRATION_DATA[item]} />
              </div>
            );
          })
        )}
      </>
    </div>
  );
}

function IntegrationCard({
  name,
  icon,
  subtitle,
  users,
  teams,
  status,
  loading,
}) {
  return (
    <div className={styles.card} key={name}>
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
          <h2>{teams || '--'}</h2>
          <h3>Teams</h3>
        </div>
        <div className="">
          <h2>{users || '--'}</h2>
          <h3>Users</h3>
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

export default AddonsList;
