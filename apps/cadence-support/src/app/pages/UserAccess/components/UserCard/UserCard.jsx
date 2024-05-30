import { forwardRef, useContext, useEffect, useState } from 'react';
import { Tooltip, Image } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import { Delete, Key, Trash } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { DropDown, ThemedButton } from '@cadence-support/widgets';
import { Colors } from '@cadence-support/utils';
import { useRecoilValue } from 'recoil';
import styles from './Usercard.module.scss';
import { useUserAccess } from '@cadence-support/data-access';

const ICON_SIZE = '18px';

const UserCard = (
  { user, userNo, totalUsers, isLoading, setIsLoading },
  ref
) => {
  const { addError, addSuccess } = useContext(MessageContext);
  const {
    removeUser,
    removeUserLoading,
    fetchSupportUsers,
    changeAccess,
    changeAccessLoading,
  } = useUserAccess({
    enabled: true,
  });
  const [error, setError] = useState('');

  const positionProps = (() => {
    const props = { right: '10px' };
    if (totalUsers > 4 && userNo > totalUsers - 2) props.bottom = '50px';
    else props.top = '50px';
    return props;
  })();

  const handleDelete = (user) => {
    removeUser(
      { id: user?.user_id },
      {
        onSuccess: (data) => {
          setIsLoading((prev) => ({ ...prev, addingusers: true }));
          addSuccess('successfully user deleted');
        },
        onerror: (err) => {
          setError('something went wrong', err);
        },
      }
    );
  };

  const handleChangeAccessAs = (value, supportUser) => {
    const user = {
      id: supportUser?.user_id,
      role: value === 'Admin' ? 'support_admin' : 'support_agent',
    };
    changeAccess(user, {
      onSuccess: (data) => {
        addSuccess('successfully user role updated');
        setIsLoading((prev) => ({ ...prev, addingusers: true }));
        fetchSupportUsers();
      },
      onerror: (err) => {
        setError('something went wrong', err);
      },
    });
  };

  return (
    <div ref={ref} className={styles.cadenceCard}>
      <div className={styles.user_id}>{user?.user_id}</div>
      <div className={styles.username} title={user?.name}>
        <Image
          src={
            user?.is_profile_picture_present
              ? user?.profile_picture.replace('v2/public/download/types/', '')
              : 'https://cdn.ringover.com/img/users/default.jpg'
          }
        />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </div>

      <div className={styles.email}>{user?.email}</div>

      <div className={styles.role}>
        <p>{user?.support_role === 'support_agent' ? ' Agent' : ' Admin'}</p>
      </div>
      <div className={styles.actions}>
        <div>
          <DropDown
            btn={
              <ThemedButton
                height="40px"
                width="60px"
                className={styles.dropdown}
                theme={ThemedButtonThemes.GREY}
              >
                <Key size={16} />
              </ThemedButton>
            }
            tooltipText={'Get Access as'}
            width={'174px'}
            {...positionProps}
          >
            <button
              className={
                user?.support_role === 'support_admin'
                  ? styles.dropdownActive
                  : styles.dropdownBtn
              }
              onClick={
                user?.support_role === 'support_admin'
                  ? () => null
                  : () => handleChangeAccessAs('Admin', user)
              }
            >
              <div>Admin</div>
            </button>
            <button
              className={
                user?.support_role === 'support_agent'
                  ? styles.dropdownActive
                  : styles.dropdownBtn
              }
              onClick={
                user?.support_role === 'support_agent'
                  ? () => null
                  : () => handleChangeAccessAs('Agent', user)
              }
            >
              <div>Agent</div>
            </button>
          </DropDown>

          <Tooltip text={'Delete User'}>
            <ThemedButton
              height="40px"
              width="60px"
              className={styles.actionBtn}
              theme={ThemedButtonThemes.GREY}
              onClick={() => handleDelete(user)}
            >
              <Delete size={15} />
            </ThemedButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(UserCard);
