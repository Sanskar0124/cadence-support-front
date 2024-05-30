import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ProgressiveImg, Skeleton } from '@cadence-support/components';
import { Checkbox, TabNav, TabNavSlider } from '@cadence-support/widgets';
import styles from './TeamMembers.module.scss';
import {
  Bullhorn,
  Dynamics,
  DynamicsDisabled,
  Excel,
  Flatchr,
  GoogleBox,
  GoogleBoxNew,
  GoogleSheets,
  Hubspot,
  HubspotFull,
  KasprLogo,
  LushaLogo,
  MinusOutline,
  Pipedrive,
  SalesforceBox,
  Sellsy,
  SellsyDisabled,
  Snov,
  Zendesk,
  ZendeskRound,
  Zoho,
} from '@cadence-support/icons';
import { useMembers } from '@cadence-support/data-access';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { VIEW_MODE, getMailStatus } from '../../../../../constants';
import { INTEGRATION_TYPE } from '@cadence-support/constants';
import { TabNavThemes } from '@cadence-support/themes';
import {
  getIntegrationIdLabel,
  getTabOptions,
  TABS,
  getAddonIcons,
} from './constants';
import { useLocation, useNavigate } from 'react-router-dom';
import AddonModal from './component/AddonModal/AddonModal';
import Tooltip from './component/Tooltip/Tooltip';

const TeamMembers = ({
  setViewMode,
  setSelectedMember,
  teamID,
  search,
  setMemberID,
}) => {
  const company = localStorage.getItem('company');
  const companyData = JSON.parse(company);
  const { state: searchedUser } = useLocation();

  const {
    members,
    membersLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useMembers({
    search: search,
    teamID: teamID ? teamID : searchedUser?.user?.Sub_Department?.sd_id,
    integration_type: companyData?.integration_type,
    companyID: companyData?.company_id,
  });
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.USER_ID);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({
    show: false,
    rowindex: 0,
    google: false,
  });
  const [modal, setModal] = useState({ isVisible: false, data: null });

  const memberClickHandler = (member) => {
    setSelectedMember(member);
    setMemberID(member.user_id);
    setViewMode(VIEW_MODE.MEMBER);
  };

  // useEffect(() => {
  //   if (searchedUser) {
  //     if (searchedUser.search === 'userDetails') {
  //         setViewMode(VIEW_MODE.MEMBER);
  //     }
  //   }
  // }, []);

  const observerRef = useRef();

  const lastItemRef = useCallback(
    (userCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (userCard) observerRef.current.observe(userCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return (
    <div className={styles.membersList}>
      <div className={styles.header}>
        <div className={styles.row}>
          {[
            'User ID',
            'Name',
            'Email ID',
            'Add ons',
            getIntegrationIdLabel(companyData?.integration_type),
            'Role',
            ' Status',
          ].map((col) => (
            <div key={col} className={styles.col}>
              <span>{col}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {!membersLoading ? (
          members?.length > 0 ? (
            members?.map((member, index) => {
              const isLastUser = index === members?.length - 1;
              return isLastUser ? (
                <>
                  <MemberCard
                    memberClickHandler={memberClickHandler}
                    checkedMembers={checkedMembers}
                    setCheckedMembers={setCheckedMembers}
                    member={member}
                    companyData={companyData}
                    ref={lastItemRef}
                    setViewMode={setViewMode}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setModal={setModal}
                    modal={modal}
                    setMemberID={setMemberID}
                    index={index}
                  />
                  {isFetchingNextPage && <Placeholder rows={1} />}
                </>
              ) : (
                <MemberCard
                  memberClickHandler={memberClickHandler}
                  checkedMembers={checkedMembers}
                  setCheckedMembers={setCheckedMembers}
                  member={member}
                  companyData={companyData}
                  setViewMode={setViewMode}
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  setModal={setModal}
                  modal={modal}
                  setMemberID={setMemberID}
                  index={index}
                />
              );
            })
          ) : (
            <div className={styles.noMembers}>
              {' '}
              <h4> No Member Present </h4>
            </div>
          )
        ) : (
          <Placeholder />
        )}
      </div>
      {modal?.isVisible && <AddonModal modal={modal} setModal={setModal} />}
    </div>
  );
};

const Placeholder = ({ rows = 10 }) => {
  return new Array(rows).fill(0).map((_, i) => (
    <div key={i} className={styles.row}>
      {[...Array(7)].map((_, j) => (
        <div key={i} className={styles.col}>
          <Skeleton className={styles.placeholder} />
        </div>
      ))}
    </div>
  ));
};

const MemberCard = React.forwardRef(
  (
    {
      memberClickHandler,
      checkedMembers,
      setCheckedMembers,
      member,
      companyData,
      setViewMode,
      isVisible,
      setIsVisible,
      setModal,
      modal,
      index,
    },
    ref
  ) => {
    const user = useRecoilValue(userInfo);
    const { state: searchedUser } = useLocation();
    // useEffect(() => {
    //   if (searchedUser) {
    //     if (searchedUser === 'search') {
    //       setViewMode(VIEW_MODE.MEMBER);
    //     }
    //   }
    // }, [searchedUser]);
    const onHover = (member, token, type) => {
      if (member && token === false) {
        if (type === 'google') {
          setIsVisible((prev) => ({
            ...prev,
            rowindex: index,
            google: true,
          }));
        } else {
          setIsVisible((prev) => ({
            ...prev,
            show: true,
            rowindex: index,
          }));
        }
      }
    };

    const handleClick = (e, member) => {
      const screenWidth = window.innerWidth;
      if (
        e.clientX > 790 ||
        (e.clientX > 790 && screenWidth === 1280) ||
        (e.clientX > 980 && screenWidth === 1440) ||
        (e.clientX > 950 && screenWidth === 1366)
      ) {
        setModal((prev) => ({ ...prev, isVisible: true, data: member }));
        e.stopPropagation();
      } else {
        setModal((prev) => ({ ...prev, isVisible: false, data: null }));
      }
    };

    return (
      <>
        <div
          className={styles.row}
          ref={ref}
          onClick={(e) => memberClickHandler(member)}
        >
          <div
            className={`${styles.col} ${styles.userID}`}
            title={member?.user_id}
          >
            {member.user_id}
          </div>
          <div className={`${styles.col} ${styles.name}`}>
            <div className={styles.userInfo}>
              <span>
                <ProgressiveImg
                  className={styles.memberProfilePicture}
                  src={
                    member?.is_profile_picture_present
                      ? member?.profile_picture
                      : 'https://cdn.ringover.com/img/users/default.jpg'
                  }
                />
                {Math.round(Math.random() * 100) % 2 === 1 ? (
                  <span className={styles.statusGreen}></span>
                ) : (
                  <span className={styles.statusRed}></span>
                )}
              </span>
              <span title={` ${member.first_name} ${member.last_name}`}>
                {member.first_name} {member.last_name}
              </span>
            </div>
            <div className={styles.accounts}>
              {(member?.Salesforce_Token ||
                member?.Salesforce_Token === null) && (
                  <Tooltip
                    icon={<SalesforceBox color="#00a1e0" />}
                    token={!member?.Salesforce_Token?.is_logged_out}
                    tooltipFor="crm"
                  >
                    <div>
                      {' '}
                      <SalesforceBox
                        className={`${styles.salesforceIcon} ${styles.icon} ${member &&
                          (member?.Salesforce_Token?.is_logged_out ||
                            member?.Salesforce_Token === null) &&
                          styles.Disabled
                          }`}
                        size={28}
                      />
                      {(member?.Salesforce_Token?.is_logged_out ||
                        member?.Salesforce_Token === null) && (
                          <MinusOutline className={styles.minusRedGradient} />
                        )}
                    </div>
                  </Tooltip>
                )}

              {(member?.Hubspot_Token || member?.Hubspot_Token === null) && (
                <Tooltip
                  icon={<HubspotFull color="#ff7a59" />}
                  token={!member?.Hubspot_Token?.is_logged_out}
                  tooltipFor="crm"
                >
                  <div>
                    <HubspotFull
                      className={`${member &&
                        (member?.Hubspot_Token?.is_logged_out ||
                          member?.Hubspot_Token === null) &&
                        styles.Disabled
                        } ${styles.icon} ${styles.hubspotIcon}`}
                      size={28}
                    />
                    {(member?.Hubspot_Token?.is_logged_out ||
                      member?.Hubspot_Token === null) && (
                        <MinusOutline className={styles.minusRedGradient} />
                      )}
                  </div>
                </Tooltip>
              )}

              {(member?.Pipedrive_Token ||
                member?.Pipedrive_Token === null) && (
                  <Tooltip
                    icon={<Pipedrive />}
                    token={!member?.Pipedrive_Token?.is_logged_out}
                    tooltipFor="crm"
                  >
                    <div>
                      <Pipedrive
                        className={`${member &&
                          (member?.Pipedrive_Token?.is_logged_out ||
                            member?.Pipedrive_Token === null) &&
                          styles.Disabled
                          } ${styles.icon}`}
                        size={28}
                      />
                      {(member?.Pipedrive_Token?.is_logged_out ||
                        member?.Pipedrive_Token === null) && (
                          <MinusOutline className={styles.minusRedGradient} />
                        )}
                    </div>
                  </Tooltip>
                )}

              {(member?.Sellsy_Token || member?.Sellsy_Token === null) && (
                <Tooltip
                  icon={<Sellsy />}
                  token={!member?.Sellsy_Token?.is_logged_out}
                  tooltipFor="crm"
                >
                  <SellsyDisabled
                    className={`${member &&
                      (member?.Sellsy_Token?.is_logged_out ||
                        member?.Sellsy_Token === null) &&
                      styles.Disabled
                      } ${styles.icon} ${styles.sellysIcon} `}
                    size={28}
                  />
                  {(member?.Sellsy_Token?.is_logged_out ||
                    member?.Sellsy_Token === null) && (
                      <MinusOutline className={styles.minusRedGradient} />
                    )}
                </Tooltip>
              )}
              {(member?.Bullhorn_Token || member?.Bullhorn_Token === null) && (
                <Tooltip
                  icon={<Bullhorn />}
                  token={!member?.Bullhorn_Token?.is_logged_out}
                  tooltipFor="crm"
                >
                  <Bullhorn
                    className={`${member &&
                      (member?.Bullhorn_Token?.is_logged_out ||
                        member?.Bullhorn_Token === null) &&
                      styles.Disabled
                      } ${styles.icon}`}
                    size={28}
                  />
                  {(member?.Bullhorn_Token?.is_logged_out ||
                    member?.Bullhorn_Token === null) && (
                      <MinusOutline className={styles.minusRedGradient} />
                    )}
                </Tooltip>
              )}
              {(member?.Dynamics_Token || member?.Dynamics_Token === null) && (
                <Tooltip
                  icon={<Dynamics />}
                  token={!member?.Dynamics_Token?.is_logged_out}
                  tooltipFor="crm"
                >
                  <Dynamics
                    className={`${member &&
                      (member?.Dynamics_Token?.is_logged_out ||
                        member?.Dynamics_Token === null) &&
                      styles.Disabled
                      } ${styles.icon}`}
                    size={28}
                  />
                  {(member?.Dynamics_Token?.is_logged_out ||
                    member?.Dynamics_Token === null) && (
                      <MinusOutline className={styles.minusRedGradient} />
                    )}
                </Tooltip>
              )}
              {(member?.Zoho_Token || member?.Zoho_Token === null) && (
                <Tooltip
                  icon={<Zoho />}
                  token={!member?.Zoho_Token?.is_logged_out}
                  tooltipFor="crm"
                >
                  <Zoho
                    className={`${member &&
                      (member?.Zoho_Token?.is_logged_out ||
                        member?.Zoho_Token) === null &&
                      styles.Disabled
                      } ${styles.icon} ${styles.hubspotIcon}`}
                    size={28}
                  />
                  {(member?.Zoho_Token?.is_logged_out ||
                    member?.Zoho_Token) && (
                      <MinusOutline className={styles.minusRedGradient} />
                    )}
                </Tooltip>
              )}

              {(companyData?.integration_type ===
                INTEGRATION_TYPE.GOOGLE_SHEETS ||
                companyData?.integration_type === INTEGRATION_TYPE.EXCEL) && (
                  <p>
                    <GoogleSheets className={styles.icon} />
                  </p>
                )}

              <Tooltip
                icon={<GoogleBox color="#4285f4" />}
                token={!member?.User_Token?.is_google_token_expired}
                date={member?.Trackings}
                tooltipFor="google"
              >
                <div>
                  <GoogleBoxNew
                    size={28}
                    className={`${styles.googleIcon} ${styles.icon} ${member?.User_Token?.is_google_token_expired &&
                      styles.Disabled
                      }`}
                  />
                  {member?.User_Token?.is_google_token_expired && (
                    <MinusOutline className={styles.minusRedGradient} />
                  )}
                </div>
              </Tooltip>
            </div>
          </div>

          <div
            className={`${styles.col}  ${styles.emailID}`}
            title={member?.email}
          >
            {member?.email}
          </div>
          <div
            className={`${styles.col} ${styles.addon} `}
            onClick={
              getAddonIcons(member?.Enrichment)?.length > 0
                ? (e) => handleClick(e, member)
                : () => null
            }
            id="addon"
            style={{
              cursor:
                getAddonIcons(member?.Enrichment)?.length === 0 &&
                'not-allowed',
            }}
          >
            {getAddonIcons(member?.Enrichment)?.length !== 0 ? (
              getAddonIcons(member?.Enrichment)
                .slice(0, 2)
                ?.map((item, index) => {
                  return (
                    <div
                      className={
                        index === 0 ? styles.firstIcon : styles.secondIcon
                      }
                    >
                      {item}
                    </div>
                  );
                })
            ) : (
              <div style={{ marginLeft: '10px' }}>0</div>
            )}
            {getAddonIcons(member?.Enrichment)?.length > 2 && <span>+{2}</span>}
          </div>

          {/* <div className={styles.col}>{member?.employeeID}</div> */}
          <div
            className={`${styles.col} ${styles.salesforceID}`}
            title={member?.integration_id}
          >
            {member?.integration_id ? member?.integration_id : 'Not Available'}
          </div>
          <div
            className={`${styles.col} ${styles.memberRole}`}
            title={member?.role}
          >
            {member?.role?.split('_')}
          </div>
          <div className={`${styles.col} ${styles.status}`}>
            <span
              className={
                member?.User_Token?.onboarding_mail_status === 'Opened'
                  ? styles.configured
                  : member?.User_Token?.onboarding_mail_status === 'Bounced' ||
                    member?.User_Token?.onboarding_mail_status === 'Failed'
                    ? styles.notconfigured
                    : member?.User_Token?.onboarding_mail_status === 'Sent'
                      ? styles.mailsent
                      : styles.common
              }
            >
              Mail: {getMailStatus(member?.User_Token?.onboarding_mail_status)}
            </span>
            <span
              className={
                member?.is_onboarding_complete
                  ? styles.configured
                  : styles.notconfigured
              }
            >
              {member?.is_onboarding_complete ? 'Onboared' : 'Not onboarded'}
            </span>
          </div>
        </div>
      </>
    );
  }
);

export default TeamMembers;
