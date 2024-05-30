import { useCallback, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Container, ProgressiveImg } from '@cadence-support/components';
import { Div, Title, Button } from '@cadence-support/components';

import moment from 'moment';
import { Cadence as CADENCE_TRANSLATION } from '@cadence-support/languages';

import { BackButton, SearchBar, ThemedButton } from '@cadence-support/widgets';

import { TabNavSlider } from '@cadence-support/widgets';

import { userInfo } from '@cadence-support/atoms';

import styles from './CompanyDetails.module.scss';
import { useRecoilValue } from 'recoil';
import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';

import {
  SLIDER_OPTIONS,
  TEAMS_SLIDER_OPTIONS,
  VIEW_MODE,
  getIntegrationtype,
  getStatus,
  getMailStatus,
} from '../../constants';
import TeamsList from './components/TeamsList/TeamsList';
import CompanyActivity from './components/CompanyActivity/CompanyActivity';
import MemberList from './components/MemberList/MemberList';
import MemberDetails from '../MemberDetails/MemberDetails';
import NavigateStatus from './components/NavigateStatus/NavigateStatus';
import Cadences from './components/Cadences/Cadences';
import CadenceDetails from './components/CadenceDetails/CadenceDetails';
import PipedriveIntegration from './components/IntegrationSettings/PipedriveIntegration/PipedriveIntegration';
import GoogleSheetsIntegration from './components/IntegrationSettings/GoogleSheetsIntegration/GoogleSheetsIntegration';
import HubspotIntegration from './components/IntegrationSettings/HubSpotIntegration/HubspotIntegration';
import BullhornIntegration from './components/IntegrationSettings/BullhornIntigration/BullhornIntegration';
import SellsyIntegration from './components/IntegrationSettings/SellsyIntigration/SellsyIntegration';
import ZohoIntegration from './components/IntegrationSettings/ZohoIntegration/ZohoIntegration';
import ExcelIntegration from './components/IntegrationSettings/ExcelIntegration/ExcelIntegration';
import {
  Company,
  Email,
  MailClick,
  ResendEmail,
  Zoho,
} from '@cadence-support/icons';

import { useCompany } from '@cadence-support/data-access';
import Kaspr from './components/IntegrationSettings/AddonsSettings/Kaspr/Kaspr';
import Lusha from './components/IntegrationSettings/AddonsSettings/Lusha/Lusha';
import Hunter from './components/IntegrationSettings/AddonsSettings/Hunter/Hunter';
import Snov from './components/IntegrationSettings/AddonsSettings/Snov/Snov';
import DropContact from './components/IntegrationSettings/AddonsSettings/Dropcontact/Dropcontact';
import DynamicsIntegration from './components/IntegrationSettings/DynamicsIntigration/DynamicsIntegration';
import LinkedinExtenstion from './components/IntegrationSettings/AddonsSettings/LinkedinExtension/LinkedinExtenstion';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import AddonsList from './components/AddonsList/AddonsList';
import SalesforceIntegrationV2 from './components/IntegrationSettings/SalesforceIntegration/SalesforceIntegrationv2';
import ResendEmailModal from './components/ResendEmailModal/ResendEmailModal';
import CompanyDetailsModalV2 from './components/CompanyDetailsModalV2/CompanyDetailsModalV2';
import { COMPANY_STATUS } from '../CompanyCard/constants';
import LicenseManagement from './components/LicenseManagement/LicenseManagement';

const getSubscriptionDetails = ({
  is_subscription_active,
  is_trial_active,
}) => {
  if (is_subscription_active)
    return <div className={styles.subscribed}>Active Subscription</div>;
  else if (is_trial_active)
    return <div className={styles.trial}>Trial Period</div>;
  else return <div className={styles.expired}>Term has expired</div>;
};

const getLicenseDetails = ({
  number_of_licences,
  trial_valid_until,
  is_trial_active,
  is_subscription_active,
}) => {
  if (is_subscription_active && number_of_licences >= 1)
    return (
      <div className={styles.subscribed}>Licenses: {number_of_licences}</div>
    );
  else if (is_trial_active && trial_valid_until)
    return (
      <div className={styles.trial}>
        Active till: {moment(trial_valid_until)?.format('MMMM Do YYYY')}
      </div>
    );
  else return <div className={styles.expired}>Term has expired</div>;
};

const CompanyDetails = ({ company }) => {
  const user = useRecoilValue(userInfo);
  const [activeTab, setActiveTab] = useState('teams');
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [companyLoading, setCompanyLoading] = useState(true);
  const [viewMode, setViewMode] = useState(VIEW_MODE.TEAMS);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [memberID, setMemberID] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedCadenceID, setSelectedCadenceID] = useState(null);
  const [teamID, setTeamID] = useState(null);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState(null);
  const [selectedCadence, setSelectedCadence] = useState(null);
  const [showTabSlider, setShowTabSlider] = useState(true);
  const [integrationType, setIntegrationType] = useState(null);
  const [companyDetailsModal, setCompanyDetailsModal] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const { state: companyDetails, state: searchedUser } = useLocation();
  if (!companyDetails) {
    navigate('/');
  }

  const [companyItem, setCompanyItem] = useState(
    JSON.parse(localStorage.getItem('company'))
  );
  const { companyID } = useParams();

  const [navigateStatus, setNavigateStatus] = useState({
    company: {
      name: 'Teams',
      view_mode: VIEW_MODE.TEAMS,
      activeID: `/company/${companyID}`,
      navigationObj: companyDetails,
    },
  });
  const [resendMailModal, setResendMailModal] = useState(false);
  const [isCompanyDetailsUpdated, setIsCompanyDetailsUpdated] = useState(false);

  useEffect(() => {
    switch (activeTab) {
      case 'teams':
        setViewMode(VIEW_MODE.TEAMS);
        break;
      case `integrations`:
        setViewMode(VIEW_MODE.INTEGRATIONS);
        break;
      case 'addons':
        setViewMode(VIEW_MODE.ADDONS);
        break;
      case 'cadences':
        setViewMode(VIEW_MODE.CADENCES);
      case 'license_management':
        setViewMode(VIEW_MODE.LICENSE_MANAGEMENT);
    }
  }, [activeTab]);

  useEffect(() => {
    switch (viewMode) {
      case VIEW_MODE.INTEGRATIONS:
        setShowTabSlider(true);
        break;
      case VIEW_MODE.ADDONS:
        setShowTabSlider(true);
        break;
      case VIEW_MODE.TEAMS:
        setShowTabSlider(true);
        break;
      case VIEW_MODE.CADENCES:
        setShowTabSlider(true);
        break;
      case VIEW_MODE.LICENSE_MANAGEMENT:
        setShowTabSlider(true);
        break;

      default:
        setShowTabSlider(false);
        break;
    }
  }, [viewMode]);
  useEffect(() => {
    if (viewMode === VIEW_MODE.MEMBERS) {
      const currentStatus = { ...navigateStatus };

      currentStatus['team'] = {
        name: selectedTeam?.name,
        view_mode: VIEW_MODE.MEMBERS,
        activeID: teamID,
        handler: setTeamID,
      };

      setNavigateStatus(currentStatus);
    }
  }, [teamID, viewMode]);

  useEffect(() => {
    switch (viewMode) {
      case VIEW_MODE.TEAMS: {
        setNavigateStatus({
          company: {
            name: 'Teams',
            view_mode: VIEW_MODE.TEAMS,
            activeID: `/company/${companyID}`,
            navigationObj: companyDetails,
          },
        });
        break;
      }

      case VIEW_MODE.ADDONS: {
        setNavigateStatus({
          company: {
            name: 'Addons',
            view_mode: VIEW_MODE.ADDONS,
            activeID: `/company/${companyID}`,
            navigationObj: companyDetails,
          },
        });
        break;
      }
      case VIEW_MODE.CADENCES: {
        setNavigateStatus({
          company: {
            name: 'Cadences',
            view_mode: VIEW_MODE.CADENCES,
            activeID: `/company/${companyID}`,
            navigationObj: companyDetails,
          },
        });
        break;
      }
      case VIEW_MODE.MEMBERS: {
        setNavigateStatus((prevState) => {
          let tempState = {
            ...prevState,
          };
          delete tempState['member'];
          return tempState;
        });
        break;
      }
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === VIEW_MODE.MEMBER) {
      const currentStatus = { ...navigateStatus };

      currentStatus['member'] = {
        name: selectedMember?.first_name + ' ' + selectedMember?.last_name,
        view_mode: VIEW_MODE.MEMBER,
        activeID: selectedMember?.user_id,
        handler: setMemberID,
      };
      setNavigateStatus(currentStatus);
    }
  }, [memberID, viewMode]);

  useEffect(() => {
    switch (viewMode) {
      case VIEW_MODE.MEMBERS: {
        setNavigateStatus((prevState) => {
          let tempState = {
            ...prevState,
          };
          delete tempState['member'];
          return tempState;
        });
        break;
      }
    }
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === VIEW_MODE.CADENCE) {
      const currentStatus = { ...navigateStatus };

      currentStatus['cadence'] = {
        name: selectedCadence,
        view_mode: VIEW_MODE.CADENCE,
        activeID: selectedMember?.user_id,
        handler: setMemberID,
      };
      setNavigateStatus(currentStatus);
    }
  }, [selectedCadence, viewMode]);

  //  set navigate status for addons
  useEffect(() => {
    if (viewMode === VIEW_MODE.ADDON) {
      if (selectedAddons) {
        const currentStatus = { ...navigateStatus };

        currentStatus['addon'] = {
          name: selectedAddons,
          view_mode: VIEW_MODE.ADDON,
          activeID: selectedMember?.user_id,
          handler: setMemberID,
        };
        setNavigateStatus(currentStatus);
      }
    }
  }, [viewMode, selectedAddons]);

  const renderComponent = useCallback(
    (team) => {
      switch (activeTab) {
        case 'teams':
          if (viewMode === VIEW_MODE.MEMBERS) {
            return (
              <MemberList
                team={selectedTeam}
                setViewMode={setViewMode}
                setMemberID={setMemberID}
                setSelectedMember={setSelectedMember}
              />
            );
          } else if (memberID && viewMode === VIEW_MODE.MEMBER) {
            return <MemberDetails memberID={memberID} />;
          }
          return (
            <TeamsList
              setSelectedTeam={setSelectedTeam}
              setViewMode={setViewMode}
              searchValue={searchValue}
              setTeamID={setTeamID}
            />
          );
        case `integrations`:
          if (viewMode === VIEW_MODE.INTEGRATIONS) {
            switch (companyItem?.integration_type) {
              case 'salesforce':
                return <SalesforceIntegrationV2 companyID={companyID} />;
              case 'pipedrive':
                return <PipedriveIntegration companyID={companyID} />;
              //  sheet integration type is used for both googlesheets and excel
              case 'sheets':
                return <GoogleSheetsIntegration companyID={companyID} />;
              case 'hubspot':
                return <HubspotIntegration companyID={companyID} />;
              case 'bullhorn':
                return <BullhornIntegration companyID={companyID} />;
              case 'sellsy':
                return <SellsyIntegration companyID={companyID} />;
              case 'zoho':
                return <ZohoIntegration companyID={companyID} />;
              case 'dynamics':
                return <DynamicsIntegration companyID={companyID} />;
            }
          } else return;
          break;

        case 'addons':
          if (viewMode === VIEW_MODE.ADDON) {
            if (selectedAddons) {
              switch (selectedAddons) {
                case 'kaspr':
                  return <Kaspr companyID={companyID} />;
                case 'lusha':
                  return <Lusha companyID={companyID} />;
                case 'hunter':
                  return <Hunter companyID={companyID} />;
                case 'snov':
                  return <Snov companyID={companyID} />;
                case 'dropcontact':
                  return <DropContact companyID={companyID} />;
                case 'linkedin_extension':
                  return <LinkedinExtenstion companyID={companyID} />;
              }
            }
          } else {
            return (
              <AddonsList
                companyID={companyID}
                setViewMode={setViewMode}
                setSelectedAddons={setSelectedAddons}
              />
            );
          }
          break;
        case 'cadences':
          if (viewMode === VIEW_MODE.CADENCE) {
            return (
              <CadenceDetails
                memberID={memberID}
                selectedCadenceID={selectedCadenceID}
                integrationType={integrationType}
              />
            );
          } else {
            return (
              <Cadences
                companyID={companyID}
                setViewMode={setViewMode}
                setSelectedCadence={setSelectedCadence}
                setSelectedCadenceID={setSelectedCadenceID}
                setMemberID={setMemberID}
                memberID={memberID}
                setIntegrationType={setIntegrationType}
              />
            );
          }

        case 'license_management':
          return <LicenseManagement companyID={companyID} />;

        default:
          return '';
      }
    },
    [activeTab, viewMode, memberID]
  );

  return (
    <Container className={styles.companyDetails}>
      <div className={styles.header}>
        <div className={styles.left}>
          <BackButton text="Company list" link="/company" />

          <div className={styles.info}>
            <ProgressiveImg
              src={
                companyDetails?.is_profile_picture_present
                  ? companyDetails?.profile_picture
                  : 'https://cdn.cdnlogo.com/logos/w/85/webpack-icon.svg'
              }
              className={styles.companyProfilePicture}
            />
            <Div className={styles.details}>
              <Title size={20}>
                {companyDetails?.name ?? searchedUser?.user?.Company?.name}
              </Title>
              <Div className={styles.createdAt}>
                <div>Created on :</div>
                {moment(
                  companyDetails?.created_at ?? searchedUser?.user?.created_at
                ).format('LL')}
              </Div>
            </Div>
          </div>
        </div>
        <div className={styles.right}>
          <SearchBar
            width="350px"
            value={search}
            setValue={setSearch}
            onSearch={() => {
              setSearchValue(search);
            }}
            placeholderText={'Search'}
          />

          <CompanyActivity />
          <ThemedButton
            theme={
              companyDetailsModal
                ? ThemedButtonThemes.PRIMARY
                : ThemedButtonThemes.WHITE
            }
            width={'fit-content'}
            className={styles.progressClockButton}
            onClick={() => setCompanyDetailsModal((prev) => !prev)}
          >
            <Company />
          </ThemedButton>

          <ThemedButton
            theme={
              resendMailModal
                ? ThemedButtonThemes.PRIMARY
                : ThemedButtonThemes.WHITE
            }
            width={'fit-content'}
            className={styles.progressClockButton}
            onClick={() => setResendMailModal((prev) => !prev)}
          >
            <ResendEmail />
          </ThemedButton>

          <CompanyDetailsModalV2
            setModal={setCompanyDetailsModal}
            modal={companyDetailsModal}
            companyID={companyID}
            companyDetails={companyDetails}
            companyItem={companyItem}
            setCompanyItem={setCompanyItem}
            setResendMailModal={setResendMailModal}
            setAdminData={setAdminData}
            setIsUpdated={setIsCompanyDetailsUpdated}
          />

          <Div className={styles.companyInfo}>
            <h2>{getSubscriptionDetails({ ...companyItem })}</h2>
            <div className={styles.status}>
              <p
                className={
                  companyItem?.onboarding_mail_status === 'Opened'
                    ? styles.opened
                    : companyItem?.onboarding_mail_status === 'Bounced' ||
                      companyItem?.onboarding_mail_status === 'Failed'
                      ? styles.notconfigured
                      : companyItem?.onboarding_mail_status === 'Sent'
                        ? styles.mailsent
                        : styles.common
                }
              >
                Mail: {getMailStatus(companyItem?.onboarding_mail_status)}
              </p>
              <p
                className={
                  getStatus(companyItem) === 'configured'
                    ? styles.configured
                    : getStatus(companyItem) === 'onboarding_pending'
                      ? styles.pending
                      : styles.notconfigured
                }
              >
                {COMPANY_STATUS[getStatus(companyItem)]}
              </p>
            </div>
          </Div>
        </div>
      </div>

      {showTabSlider ? (
        <div className={styles.subHeader}>
          <div className={styles.detailTypeSliderWrapper}>
            <TabNavSlider
              theme={TabNavThemes.SLIDER}
              buttons={SLIDER_OPTIONS(companyItem?.integration_type)}
              value={activeTab}
              setValue={setActiveTab}
              className={styles.tabs}
              btnClassName={styles.tabBtns}
              activeBtnClassName={styles.tabBtnActive}
              activePillClassName={styles.activePill}
              width="750px"
            />
          </div>
        </div>
      ) : (
        <div className={styles.navigateStatus}>
          <NavigateStatus
            navigateStatus={navigateStatus}
            setViewMode={setViewMode}
            searchedUser={searchedUser}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
            setSelectedIntegration={setSelectedIntegration}
            companyDetails={companyDetails}
          />
        </div>
      )}

      <div className={styles.listContainer}>{renderComponent(activeTab)}</div>
      {resendMailModal && (
        <ResendEmailModal
          resendMailModal={resendMailModal}
          setResendMailModal={setResendMailModal}
          adminData={adminData}
          companyID={companyID}
          setAdminData={setAdminData}
          isDetailsUpdated={isCompanyDetailsUpdated}
        />
      )}
    </Container>
  );
};

export default CompanyDetails;
