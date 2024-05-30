import React, { useState, useEffect } from 'react';

import moment from 'moment';
import {
  Container,
  ProgressiveImg,
  Skeleton,
  Title,
} from '@cadence-support/components';
import { BackButton, Checkbox, SearchBar } from '@cadence-support/widgets';

import styles from './MemberList.module.scss';

import { VIEW_MODE } from '../../../../constants';
import TeamMembers from './TeamMembers/TeamMembers';
import NavigateStatus from '../NavigateStatus/NavigateStatus';
import { useLocation, useParams } from 'react-router-dom';

const MemberList = ({
  setViewMode,
  setSelectedMember,
  setTeamID,
  setMemberID,
  team,
}) => {
  const goBack = () => {
    setSelectedMember();
    setViewMode(VIEW_MODE.TEAMS);
    setTeamID(null);
  };

  const teamLoading = false;
  const { sd_id: teamID, name } = team || {};

  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { state: searchedUser } = useLocation();

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.info}>
            {teamLoading ? (
              <Skeleton className={styles.logoPlaceholder} />
            ) : (
              <ProgressiveImg
                className={styles.logo}
                src={
                  team?.is_profile_picture_present
                    ? team?.profile_picture
                    : 'https://storage.googleapis.com/apt-cubist-307713.appspot.com/crm/sub-department-images/earth.svg'
                }
              />
            )}

            <div className={styles.details}>
              {teamLoading ? (
                <>
                  <Skeleton className={styles.titlePlaceholder} />
                  <Skeleton className={styles.textPlaceholder} />
                </>
              ) : (
                <>
                  <h2>
                    {team?.name ?? searchedUser?.user?.Sub_Department?.name}
                  </h2>

                  <ul>
                    {team?.created_at ? (
                      <li>
                        <span>
                          {`Created on ${moment(team?.created_at).format(
                            'MMM DD, YYYY'
                          )}`}
                        </span>
                      </li>
                    ) : (
                      <li>
                        <span>
                          {searchedUser
                            ? `Created on ${moment(
                                searchedUser?.user?.Sub_Department?.created_at
                              ).format('MMM DD, YYYY')}`
                            : `Created on ${moment(new Date()).format(
                                'MMM DD, YYYY'
                              )}`}
                        </span>
                      </li>
                    )}
                    {team?.members && (
                      <li>
                        <span>{`${team?.members.length} ${
                          team?.members.length === 1 ? 'member' : 'members'
                        }`}</span>
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <SearchBar
            value={search}
            setValue={setSearch}
            onSearch={() => setSearchValue(search)}
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <TeamMembers
          setViewMode={setViewMode}
          search={searchValue}
          teamID={teamID}
          setMemberID={setMemberID}
          setSelectedMember={setSelectedMember}
        />
      </div>
    </Container>
  );
};

export default MemberList;
