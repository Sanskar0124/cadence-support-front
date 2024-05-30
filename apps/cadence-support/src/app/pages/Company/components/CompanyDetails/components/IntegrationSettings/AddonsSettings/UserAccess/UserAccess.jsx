import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Image, Title, Div } from '@cadence-support/components';
import {
  Label,
  ThemedButton,
  Checkbox,
  Toggle,
} from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import styles from './UserAccess.module.scss';
import { getAddonsUsers } from '@cadence-support/data-access';

const UsersAccess = ({ companyID, userAccessField }) => {
  const { usersData, isuserDataLoading } = getAddonsUsers(companyID);
  const [subDepartmentsData, setSubDepartmentsData] = useState([]);
  const [selectedSDIndex, setSelectedSDIndex] = useState(0);

  useEffect(() => {
    if (usersData) setSubDepartmentsData(usersData);
  }, [usersData]);

  const isSDChecked = (index) => {
    if (!subDepartmentsData[index].Users.length) return false;

    for (const user of subDepartmentsData[index].Users)
      if (user.User_Token?.[userAccessField]) return true;

    return false;
  };
  const handleSDCheck = (e, index) => {
    if (!subDepartmentsData[index].Users.length) return false;

    const isChecked = isSDChecked(index);
    const sds = [...subDepartmentsData];
    const users = subDepartmentsData[index].Users.map((user) => ({
      ...user,
      User_Token: { ...user.User_Token, [userAccessField]: !isChecked },
    }));
    sds[selectedSDIndex].Users = users;
    setSubDepartmentsData(sds);
  };

  return (
    <div className={styles.teamsSettings}>
      <Title size="1.1rem">Group and Members</Title>
      <div className={styles.divider} />
      <div className={styles.teamsContainer}>
        <div className={styles.teams}>
          {isuserDataLoading && <Placeholder number={6} width="230px" />}
          {subDepartmentsData?.map((sd, index) => (
            <div
              className={`${styles.team} ${
                index === selectedSDIndex ? styles.active : ''
              }`}
              onClick={() => setSelectedSDIndex(index)}
              key={sd.sd_id}
            >
              {isSDChecked(index) ? (
                <Checkbox checked={true} onChange={() => null} />
              ) : (
                <Checkbox checked={false} onChange={() => null} />
              )}

              <Image
                src={
                  sd.name === 'Admin'
                    ? 'https://storage.googleapis.com/apt-cubist-307713.appspot.com/admins-icon.png'
                    : sd.profile_picture
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    'https://cdn.ringover.com/img/users/default.jpg';
                }}
              />
              <h4>{sd.name}</h4>
            </div>
          ))}
        </div>
        <div className={styles.users}>
          {!!subDepartmentsData[selectedSDIndex]?.Users.length && (
            <div className={styles.user}>
              <div className={styles.left}>
                <Label className={styles.label}>Members</Label>
              </div>
              <div className={styles.right}>
                <Label>Access</Label>
              </div>
            </div>
          )}
          {isuserDataLoading && <Placeholder number={9} width="250px" />}
          {subDepartmentsData &&
            subDepartmentsData[selectedSDIndex]?.Users?.map((user) => (
              <div className={styles.user} key={user.user_id}>
                <div className={styles.left}>
                  <Image
                    src={user.profile_picture}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        'https://cdn.ringover.com/img/users/default.jpg';
                    }}
                  />
                  <h4>{`${user.first_name} ${user.last_name}`}</h4>
                </div>
                <div className={styles.right}>
                  {user.User_Token?.[userAccessField] ? (
                    <Checkbox
                      checked={user.User_Token?.[userAccessField]}
                      onChange={() => null}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>{' '}
    </div>
  );
};

export default UsersAccess;
export const Placeholder = ({
  width = '100%',
  number = 1,
  height = '40px',
}) => {
  return (
    <>
      {[...Array(number)].map((_, j) => (
        <Div style={{ height, width }} loading></Div>
      ))}
    </>
  );
};
