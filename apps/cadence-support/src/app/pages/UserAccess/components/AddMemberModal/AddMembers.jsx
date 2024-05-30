import {
  Div,
  Modal,
  Tooltip,
  ProfilePicture,
  Image,
} from '@cadence-support/components';
import { Input, SearchBar, ThemedButton } from '@cadence-support/widgets';
import React, { useState, useEffect, forwardRef, useContext } from 'react';
import styles from './AddMembers.module.scss';
import { Close, Tick, NoActivities, User } from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';
import { users } from '../../constants';
import { useUserAccess } from '@cadence-support/data-access';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { MessageContext } from '@cadence-support/context';

const AddMembers = ({
  modal,
  setModal,
  supportUsers,
  companyId,
  isLoading,
  setIsLoading,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const {
    ringoverUsers,
    ringoverUsersLoading,
    addUsers,
    addUsersLoading,
    fetchSupportUsers,
  } = useUserAccess({
    enabled: true,
  });
  const [selectedMember, setSelectedMember] = useState([]);
  const { addSuccess, addError } = useContext(MessageContext);
  const [error, setError] = useState('');
  const [filteredRingoverUsers, setFilteredRingoverUsers] = useState([]);

  //close modal
  const closeModal = () => {
    setModal(false);
  };

  const addUserstoSupport = (members) => {
    const updatedData = members?.map((item) => ({
      ringover_user_id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      company_id: companyId,
    }));

    addUsers(updatedData, {
      onSuccess: (data) => {
        setModal(false);
        setIsLoading((prev) => ({ ...prev, addingusers: true }));
        addSuccess('successfully users added');
      },
      onError: (err) => {
        addError('something went wrong', err);
      },
    });
  };
  useEffect(() => {
    if (ringoverUsers) {
      let supportUsersID = supportUsers?.map((item) => item.ringover_user_id);
      let checkIfUserPresent = ringoverUsers.some((item) =>
        supportUsersID.includes(item.id)
      );
      if (checkIfUserPresent) {
        let filteredData = ringoverUsers?.filter(
          (user) => !supportUsersID.includes(user?.id)
        );
        setFilteredRingoverUsers(filteredData);
      } else {
        setFilteredRingoverUsers(ringoverUsers);
      }
    }
  }, [ringoverUsers]);

  return (
    <Modal
      isModal={Boolean(modal)}
      onClose={closeModal}
      className={styles.container}
    >
      <div className={styles.titlecontainer}>
        <Tooltip text="Close">
          <span onClick={closeModal}>
            <Close color={Colors.lightBlue} />
          </span>
        </Tooltip>
        <span className={styles.title}>Add member</span>
      </div>
      <Input
        width="100%"
        height="40px"
        value={searchValue}
        setValue={setSearchValue}
        className={styles.searchbar}
        placeholder={'Search'}
      />
      <div className={styles.list}>
        {ringoverUsersLoading ? (
          <Placeholder rows={7} />
        ) : filteredRingoverUsers?.filter((user) =>
            user.concat_name.toLowerCase().includes(searchValue.toLowerCase())
          )?.length > 0 ? (
          filteredRingoverUsers
            ?.filter((user) =>
              user.concat_name.toLowerCase().includes(searchValue.toLowerCase())
            )
            ?.sort((a, b) => a.concat_name.localeCompare(b.concat_name))
            ?.map((user, index) => (
              <UserRow
                user={user}
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
              />
            ))
        ) : (
          <div className={styles.noUsers}>
            <NoActivities /> No user found
          </div>
        )}
      </div>
      <ThemedButton
        theme={ThemedButtonThemes.PRIMARY}
        onClick={() => addUserstoSupport(selectedMember)}
        loading={addUsersLoading}
      >
        Add
      </ThemedButton>
    </Modal>
  );
};

export default AddMembers;

const Placeholder = ({ rows }) => {
  return (
    <div>
      {[...Array(rows).keys()].map(() => (
        <Div loading className={styles.placeholder} />
      ))}
    </div>
  );
};

const UserRow = forwardRef(
  ({ user, setSelectedMember, selectedMember }, ref) => {
    const addUser = (user) => {
      setSelectedMember((prev) => [...prev, user]);
    };

    const deleteUser = (user) => {
      setSelectedMember((prev) =>
        prev.filter((member) => member.id !== user?.id)
      );
    };

    return (
      <div
        className={
          selectedMember?.map((member) => member?.id)?.includes(user?.id)
            ? `${styles.userdetails} ${styles.selecteduser}`
            : styles.userdetails
        }
        onClick={
          selectedMember?.map((member) => member?.id)?.includes(user?.id)
            ? () => deleteUser(user)
            : () => addUser(user)
        }
      >
        <div className={styles.imgcontainer}>
          <Image
            src={user.profile_picture.replace('v2/public/download/types/', '')}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.name}>{user?.concat_name}</p>
          <p className={styles.role}>{user?.jobtitle ?? ''}</p>
        </div>

        {selectedMember?.map((member) => member?.id)?.includes(user?.id) && (
          <div className={styles.tickgradient}>
            <Tick color={Colors.white} />
          </div>
        )}
      </div>
    );
  }
);
