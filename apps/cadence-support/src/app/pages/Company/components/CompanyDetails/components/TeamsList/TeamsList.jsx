import React, { useEffect, useState, useCallback, useRef } from 'react';

import { useTeams } from '@cadence-support/data-access';

import { ProgressiveImg, Skeleton } from '@cadence-support/components';
import { Checkbox } from '@cadence-support/widgets';
import { VIEW_MODE } from '../../../../constants';

import styles from './TeamsList.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROLES } from '@cadence-support/constants';

const widthChangeHandler = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 1024 && windowWidth < 1366) return 10;
  else if (windowWidth >= 1366 && windowWidth < 1600) return 14;
  else if (windowWidth >= 1600 && windowWidth <= 1920) return 20;
  return 25;
};

const TeamsList = ({
  setViewMode,
  setTeamID,
  setSelectedTeam,
  searchValue,
}) => {
  const [checkedTeams, setCheckedTeams] = useState([]);

  const { companyID } = useParams();
  const navigate = useNavigate();
  const { state: searchedUser } = useLocation();

  const {
    teamsData: teamsList,
    teamsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useTeams(companyID, searchValue);

  const teamClickHandler = (team) => {
    setSelectedTeam(team);
    setTeamID(team?.sd_id);
    setViewMode(VIEW_MODE.MEMBERS);
  };

  const observerRef = useRef();

  const lastTeamRef = useCallback(
    (teamCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (teamCard) observerRef.current.observe(teamCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  useEffect(() => {
    if (searchedUser) {
      if (searchedUser.search === 'search') {
        setTimeout(() => {
          setViewMode(VIEW_MODE.MEMBERS);
          navigate(`.`, {
            state: { user: searchedUser.user, search: 'userDetails' },
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className={styles.teamsList}>
      <div className={styles.header}>
        <div className={styles.row}>
          {/* <div className={styles.col}>
            <Checkbox
              className={styles.checkBox}
              checked={
                teamsList?.length > 0 &&
                checkedTeams.length === teamsList?.length
              }
              onClick={() => {
                if (teamsList?.length > 0) {
                  checkedTeams.length !== teamsList?.length
                    ? setCheckedTeams(teamsList)
                    : setCheckedTeams([]);
                }
              }}
            />
          </div> */}
          {['Team name', 'Members', 'Manager', 'Created on'].map((col, i) => (
            <div key={i} className={styles.col}>
              <span>{col}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {!teamsLoading ? (
          teamsList?.map((team, index) => {
            const isLastTeam = index === teamsList.length - 1;
            return isLastTeam ? (
              <TeamRowCard
                key={index}
                ref={lastTeamRef}
                team={team}
                teamClickHandler={teamClickHandler}
                checkedTeams={checkedTeams}
                setCheckedTeam={setCheckedTeams}
              />
            ) : (
              <TeamRowCard
                key={index}
                team={team}
                teamClickHandler={teamClickHandler}
                checkedTeams={checkedTeams}
                setCheckedTeam={setCheckedTeams}
              />
            );
          })
        ) : (
          <Placeholder rows={7} />
        )}
        {isFetchingNextPage && <Placeholder />}
      </div>
    </div>
  );
};

const Placeholder = ({ rows = 1 }) => {
  return new Array(rows).fill(0).map((_, i) => (
    <div key={i} className={styles.row}>
      {[...Array(5)].map((_, j) => (
        <div key={j} className={styles.col}>
          <Skeleton className={styles.placeholder} />
        </div>
      ))}
    </div>
  ));
};

const TeamRowCard = React.forwardRef(
  ({ teamClickHandler, team, checkedTeams, setCheckedTeams }, ref) => {
    const [memberIconsCount, setMemberIconsCount] = useState(
      widthChangeHandler()
    );

    useEffect(() => {
      window.addEventListener('resize', () => {
        setMemberIconsCount(widthChangeHandler());
      });
    }, []);
    return (
      <div
        className={styles.row}
        onClick={() => teamClickHandler(team)}
        ref={ref}
      >
        {/* <div className={styles.col}>
          <Checkbox
            className={styles.checkBox}
            checked={checkedTeams.filter((m) => m.id === team.id).length === 1}
            onChange={() => {
              checkedTeams.filter((m) => m.id === team.id).length === 1
                ? setCheckedTeams((prevState) =>
                    prevState.filter((m) => m.id !== team.id)
                  )
                : setCheckedTeams((prevState) => [...prevState, team]);
            }}
          />
        </div> */}
        <div className={`${styles.col} ${styles.teamname}`}>
          <span>
            <ProgressiveImg
              className={styles.teamProfilePicture}
              src={
                team?.is_profile_picture_present
                  ? team?.profile_picture
                  : 'https://cdn.ringover.com/img/users/default.jpg'
              }
            />
          </span>
          <span>{team?.name}</span>
        </div>

        <div className={`${styles.col} ${styles.members}`}>
          <div className={styles.lengthInfo}>
            {team?.Users?.length === 0 ? 'No' : team?.Users?.length}{' '}
            {team?.Users?.length > 1 ? 'Members' : 'Member'}
          </div>
          <div className={styles.imageBox}>
            {team?.Users?.filter((item, index) => index < memberIconsCount).map(
              (memb) => (
                <ProgressiveImg
                  key={memb.user_id}
                  className={styles.image}
                  src={
                    memb.is_profile_picture_present
                      ? memb.profile_picture
                      : 'https://cdn.ringover.com/img/users/default.jpg'
                  }
                />
              )
            )}
            {team.members?.length > memberIconsCount && (
              <div className={styles.numberCircle}>
                +{team.members?.length - memberIconsCount}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.col} ${styles.manager}`}>
          {team?.Users?.filter(
            (user) => user.role === ROLES.SALES_MANAGER || ROLES.SUPER_ADMIN
          ).map((user, index) => {
            const islastItem = index === team?.Users?.length - 1;
            return (
              <>
                <span>{user.first_name}</span>
                <span style={{ marginLeft: '4px' }}>{user.last_name}</span>
                <span>
                  {!islastItem && team?.Users?.length > 1 && (
                    <span>,&nbsp;</span>
                  )}
                </span>
                <br />
              </>
            );
          })}
        </div>
        <div className={styles.col}>
          {new Date(team?.created_at).toLocaleDateString('en-GB', {
            //TODO: Add user time zone below and another timezone as fallback
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            year: 'numeric',
            month: 'long',
          })}
        </div>
      </div>
    );
  }
);

export default TeamsList;
