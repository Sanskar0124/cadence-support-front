import { Container, Title } from '@cadence-support/components';
import { NoLeads, Plus, PlusOutline } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { SearchBar, ThemedButton } from '@cadence-support/widgets';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Useraccess.module.scss';
import { ADMIN_HEADERS } from './constants';
import Placeholder from './components/Placeholder/Placeholder';
import UserCard from './components/UserCard/UserCard';
import AddMembers from './components/AddMemberModal/AddMembers';
import { useUserAccess } from '@cadence-support/data-access';

const UserAccess = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState({ addingusers: false });
  const [companyId, setCompanyId] = useState(null);

  const {
    supportUsers,
    isfetchuserLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
    fetchSupportUsers,
    removeUserLoading,
    addUsersLoading,
    changeAccessLoading,
  } = useUserAccess({ enabled: true }, searchValue);
  const observer = useRef();

  //search
  const handleSearch = () => setSearchValue(search);

  useEffect(() => {
    if (!search) setSearchValue('');
  }, [search]);

  useEffect(() => {
    if (supportUsers) {
      const isAdmin = supportUsers.find(
        (item) => item.support_role === 'support_admin'
      );
      setCompanyId(isAdmin?.company_id);
    }
  }, [supportUsers]);

  const lastUserRef = useCallback(
    (user) => {
      if (isFetchingNextPage || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (user) observer.current.observe(user);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  useEffect(() => {
    if (isLoading.addingusers) {
      fetchSupportUsers();
      setTimeout(() => {
        setIsLoading((prev) => ({ ...prev, addingusers: false }));
      }, 1000);
    }
  }, [isLoading]);
  return (
    <Container>
      <div className={styles.cadencePage}>
        <div className={styles.header}>
          <div>
            <Title size="28px">User access</Title>
          </div>
          <div className={styles.right}>
            <SearchBar
              height="44px"
              width="342px"
              value={search}
              setValue={setSearch}
              onSearch={handleSearch}
              placeholderText="Search by name or email"
            />

            <ThemedButton
              theme={ThemedButtonThemes.WHITE}
              width="fit-content"
              height="40px"
              onClick={() => setModal(true)}
            >
              <PlusOutline />
              <div>Add members</div>
            </ThemedButton>
          </div>
        </div>

        <div className={`${styles.main}`}>
          <div className={`${styles.cadenceHeader} `}>
            {supportUsers?.length > 0 &&
              ADMIN_HEADERS.map((header) => (
                <div className={`${styles[header.value]} `}>{header.label}</div>
              ))}
          </div>
          <div className={styles.body}>
            <div className={styles.cadencesContainer}>
              {isfetchuserLoading || isLoading.addingusers ? (
                <Placeholder rows={10} />
              ) : supportUsers?.length > 0 ? (
                <>
                  {supportUsers?.map((user, index) => {
                    const isLastCadence = index === supportUsers.length - 1;
                    return isLastCadence ? (
                      <>
                        <UserCard
                          user={user}
                          userNo={index + 1}
                          totalUsers={supportUsers?.length}
                          key={user.user_id}
                          ref={supportUsers?.length > 9 ? lastUserRef : null}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                        />
                        {isFetchingNextPage && <Placeholder rows={1} />}
                      </>
                    ) : (
                      <UserCard
                        user={user}
                        userNo={index + 1}
                        totalUsers={supportUsers?.length}
                        key={user.user_id}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    );
                  })}
                </>
              ) : (
                <div className={styles.noCadence}>
                  <NoLeads />
                  <div>
                    <h4>No Members Found</h4>
                    <ThemedButton
                      theme={ThemedButtonThemes.GREY}
                      width="fit-content"
                      style={{ fontWeight: '600' }}
                      onClick={() => setModal(true)}
                    >
                      <PlusOutline />
                      <div>Add Members</div>
                    </ThemedButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {modal && (
          <AddMembers
            modal={modal}
            setModal={setModal}
            companyId={companyId}
            supportUsers={supportUsers}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </Container>
  );
};

export default UserAccess;
