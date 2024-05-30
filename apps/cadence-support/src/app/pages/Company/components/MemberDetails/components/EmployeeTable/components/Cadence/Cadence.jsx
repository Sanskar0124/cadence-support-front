import { CADENCE_STATUS } from '@cadence-support/constants';
import {
  CadenceEmpty,
  CadencesGradient,
  Leads,
  Paused,
  Search,
} from '@cadence-support/icons';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { STATUS_LABELS_CL_NAMES, VIEW_MODES } from './constants';

import styles from './Cadence.module.scss';
import { ProgressiveImg } from '@cadence-support/components';
import { getLabelFromEnum } from '@cadence-support/utils';
import { useCadences } from '@cadence-support/data-access';
import Placeholder from './components/Placeholder/Placeholder';
import moment from 'moment';
import CadenceView from './components/CadenceView/CadenceView';
import CadenceFilter from '../CadenceFilter/CadenceFilter';
import { DEFAULT_FILTER_OPTIONS } from '@cadence-support/constants';

const Cadence = ({
  memberID,
  userData,
  searchValue,
  selectedCadence,
  setSelectedCadence,
  filterMode,
  setFilterMode,
  setFiltersCount,
  setCadenceFilters,
  cadenceFilters,
}) => {
  const [viewMode, setViewMode] = useState(null);

  const [selectedCadenceID, setSelectedCadenceID] = useState(null);

  useEffect(() => {
    if (selectedCadence) {
      setSelectedCadenceID(selectedCadence['cadence_id']);
    } else {
      setSelectedCadenceID(null);
    }
  }, [selectedCadence]);

  const cadenceDataAccess = useCadences({
    memberID,
    searchValue,
    userData,
  });

  const { filters } = cadenceDataAccess;

  useEffect(() => {
    if (filters) {
      let count = 0;
      for (const filter of Object.keys(filters))
        if (filters[filter]?.length !== 0) count++;
      setFiltersCount(count);
    }
  }, [filters]);

  useEffect(() => {
    cadenceDataAccess.setFilters(cadenceFilters);
  }, [cadenceFilters]);

  const renderComponent = (
    viewMode,
    searchValue,
    memberID,
    selectedCadenceID,
    userData,
    filterMode
  ) => {
    switch (viewMode) {
      case VIEW_MODES.CADENCE_STEP:
        return (
          selectedCadenceID && (
            <CadenceView
              memberID={memberID}
              cadenceID={selectedCadenceID}
              viewMode={viewMode}
              searchValue={searchValue}
              userData={userData}
              setViewMode={setViewMode}
              setSelectedCadence={setSelectedCadence}
            />
          )
        );
      case VIEW_MODES.CADENCE_PEOPLE:
        return (
          <CadenceView
            memberID={memberID}
            viewMode={viewMode}
            searchValue={searchValue}
            setViewMode={setViewMode}
            setSelectedCadence={setSelectedCadence}
          />
        );

      default:
        return (
          <CadenceList
            cadenceDataAccess={cadenceDataAccess}
            setSelectedCadence={setSelectedCadence}
            setViewMode={setViewMode}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            memberID={memberID}
          />
        );
    }
  };

  return (
    <div className={styles.cadence}>
      {renderComponent(
        viewMode,
        userData,
        memberID,
        selectedCadenceID,
        userData,
        filterMode
      )}
    </div>
  );
};

const CadenceList = ({
  filterMode,
  setFilterMode,
  cadenceDataAccess,
  setViewMode,
  setSelectedCadence,
  memberID,
}) => {
  const {
    cadences,
    cadencesLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    filters,
    setFilters,
  } = cadenceDataAccess;
  const observerRef = useRef();

  const lastCardRef = useCallback(
    (cadenceCard) => {
      if (isFetchingNextPage || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (cadenceCard) observerRef.current.observe(cadenceCard);
    },
    [isFetchingNextPage, isFetching, hasNextPage]
  );

  return cadencesLoading ? (
    <Placeholder />
  ) : (
    <>
      {cadences?.length > 0 && (
        <div className={styles.header}>
          <div className={styles.row}>
            {['Cadence', 'Created by', 'Created on', 'People', 'Status'].map(
              (col) => (
                <div key={col} className={styles.col}>
                  <span>{col}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className={styles.body}>
        {cadences?.length ? (
          cadences?.map((cadence, index) => {
            const isLastItem = index === cadences.length - 1;
            return isLastItem ? (
              <>
                <CadenceCard
                  ref={lastCardRef}
                  cadence={cadence}
                  setSelectedCadence={setSelectedCadence}
                  setViewMode={setViewMode}
                />
                {isFetchingNextPage && <Placeholder rows={1} />}
              </>
            ) : (
              <CadenceCard
                cadence={cadence}
                setSelectedCadence={setSelectedCadence}
                setViewMode={setViewMode}
              />
            );
          })
        ) : (
          <div className={styles.noCadences}>
            <CadenceEmpty />
            <h4>No cadence found</h4>
          </div>
        )}
      </div>
    </>
  );
};

const CadenceCard = React.forwardRef(
  ({ cadence, setSelectedCadence, setViewMode }, ref) => {
    const cardClickHandler = (cadence) => {
      setSelectedCadence(cadence);
      setViewMode(VIEW_MODES.CADENCE_STEP);
    };

    return (
      <div
        className={`${styles.row} ${styles.cadenceCard}`}
        ref={ref}
        onClick={() => cardClickHandler(cadence)}
      >
        <div className={styles.col}>
          <div>
            <CadencesGradient />
          </div>
          <div className={styles.cadenceInfo}>
            <div className={styles.top}>
              <span>{cadence?.type}</span>
              <i>•</i>
              <span>{cadence?.Nodes?.length ?? '0'} steps</span>
              <i>•</i>
              <span>{moment(cadence?.created_at).fromNow(true)}</span>
            </div>
            <div className={styles.bottom}>{cadence?.name}</div>
          </div>
        </div>
        <div className={`${styles.col} ${styles.templateCardCreatedBy}`}>
          <span className={styles.profile}>
            <ProgressiveImg
              className={styles.userProfilePicture}
              src={
                cadence?.User?.is_profile_picture_present
                  ? cadence?.User?.profile_picture
                  : 'https://cdn.ringover.com/img/users/default.jpg'
              }
            />
            <ProgressiveImg
              className={styles.subdepartmentProfilePicture}
              src={
                cadence?.User?.Sub_Department?.is_profile_picture_present
                  ? cadence?.User?.Sub_Department?.profile_picture
                  : 'https://cdn.ringover.com/img/users/default.jpg'
              }
            />
          </span>
          <div className={styles.createdByDetails}>
            <span>
              {cadence?.User?.first_name} {cadence?.User?.last_name}{' '}
            </span>
            <span>{cadence?.User?.Sub_Department?.name}</span>
          </div>
        </div>
        <div className={styles.col}>
          {moment(cadence.created_at).format('DD/MM/YY')}
        </div>
        <div className={`${styles.col} ${styles.leads}`}>
          <span className={styles.capsule}>
            {' '}
            <Leads size="16px" />
            <span>{cadence.LeadToCadences?.length}</span>
          </span>
        </div>
        <div className={`${styles.status} ${styles.col}`}>
          <span className={`${styles[STATUS_LABELS_CL_NAMES[cadence.status]]}`}>
            {getLabelFromEnum(cadence.status)}
            {cadence?.status === CADENCE_STATUS.PAUSED && (
              <span
                className={styles.pausedIcon}
                tooltip={`Until ${moment(cadence.unix_resume_at).format(
                  'LLL'
                )}`}
              >
                <Paused height="12" />
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }
);

export default Cadence;
