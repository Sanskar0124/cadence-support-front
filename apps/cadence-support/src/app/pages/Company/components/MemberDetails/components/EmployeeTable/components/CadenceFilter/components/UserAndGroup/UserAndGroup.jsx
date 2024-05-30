import { ROLES } from '@cadence-support/constants';
import {
  useFilterUsers,
  useSubDepartments,
  useUsers,
} from '@cadence-support/data-access';
import { Close, Tick } from '@cadence-support/icons';
import { TabNavThemes, ThemedButtonThemes } from '@cadence-support/themes';
import { Div, Image } from '@cadence-support/components';
import {
  SearchBar,
  TabNavSlider,
  ThemedButton,
} from '@cadence-support/widgets';
import { userInfo } from '@cadence-support/atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './UserAndGroup.module.scss';

const BUTTONS = [
  { label: 'Users', value: 'users' },
  { label: 'Groups', value: 'groups' },
];

const TABS = {
  USERS: 'users',
  GROUPS: 'groups',
};

const UserAndGroup = ({
  open,
  setOpen,
  filters,
  setFilters,
  resetFilter,

  memberID,
}) => {
  const user_id = useRecoilValue(userInfo).user_id;
  const [showOverlay, setShowOverlay] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState(TABS.USERS);

  const { users, usersLoading } = useFilterUsers(memberID);

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (open) setShowOverlay(true);
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) setShowOverlay(false);
  };

  return (
    showOverlay && (
      <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
        <div
          className={`${styles.container} ${open ? styles.open : styles.close}`}
          onAnimationEnd={onAnimationEnd}
        >
          <ThemedButton
            onClick={onClose}
            className={styles.closeBtn}
            theme={ThemedButtonThemes.ICON}
          >
            <Close color={'#000'} />
          </ThemedButton>
          <div className={styles.title}>
            <span>Select a {tab === TABS.GROUPS ? 'group' : 'user'}</span>
            {tab === TABS.GROUPS ? (
              <ThemedButton
                theme={ThemedButtonThemes.TRANSPARENT}
                width="fit-content"
                onClick={() => resetFilter('sd_id')}
                style={{ display: !filters.sd_id ? 'none' : 'block' }}
              >
                Reset
              </ThemedButton>
            ) : (
              <ThemedButton
                theme={ThemedButtonThemes.TRANSPARENT}
                width="fit-content"
                onClick={() => resetFilter('created_by')}
                style={{ display: !filters.created_by ? 'none' : 'block' }}
              >
                Reset
              </ThemedButton>
            )}
          </div>

          <SearchBar
            width="100%"
            height="40px"
            value={searchValue}
            setValue={setSearchValue}
          />
          {tab === TABS.USERS ? (
            <div className={styles.list}>
              {usersLoading ? (
                <Placeholder />
              ) : (
                users
                  ?.filter((user) =>
                    `${user.first_name} ${user.last_name}`
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  ?.sort((a, b) => a.first_name.localeCompare(b.first_name))

                  ?.map((user) => (
                    <div
                      key={user.user_id}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          created_by: prev.created_by ? '' : user.user_id,
                        }))
                      }
                      className={
                        filters.created_by === user.user_id
                          ? styles.selected
                          : ''
                      }
                    >
                      <div className={styles.info}>
                        <Image
                          src={
                            user.is_profile_picture_present
                              ? user.profile_picture
                              : 'https://cdn.ringover.com/img/users/default.jpg'
                          }
                        />
                        <div>
                          <span>
                            {user_id === user.user_id
                              ? 'You'
                              : `${user.first_name} ${user.last_name}`}
                          </span>
                        </div>
                      </div>
                      <div className={styles.tick}>
                        <Tick />
                      </div>
                    </div>
                  ))
              )}
            </div>
          ) : (
            <div className={`${styles.list} ${styles.admin}`}>
              {subDepartmentsLoading ? (
                <Placeholder />
              ) : (
                subDepartments
                  ?.filter((subd) =>
                    subd.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  ?.map((subd) => (
                    <div
                      key={subd.sd_id}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, sd_id: subd.sd_id }))
                      }
                      className={
                        filters.sd_id === subd.sd_id ? styles.selected : ''
                      }
                    >
                      <div className={styles.info}>
                        <Image
                          src={
                            subd.is_profile_picture_present
                              ? subd.profile_picture
                              : 'https://cdn.ringover.com/img/users/default.jpg'
                          }
                        />
                        <div>
                          <span>{subd.name}</span>
                        </div>
                      </div>
                      <div className={styles.tick}>
                        <Tick />
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default UserAndGroup;

const Placeholder = () => {
  return (
    <div className={styles.placeholder}>
      {[...Array(5).keys()].map(() => (
        <Div loading />
      ))}
    </div>
  );
};
