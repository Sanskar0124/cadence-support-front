import { Skeleton } from '@cadence-support/components';
import { ChevronRight } from '@cadence-support/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NavigateStatus.module.scss';

const NavigateStatus = ({
  navigateStatus,
  setViewMode,
  searchedUser,
  setSelectedAddons,
  setSelectedIntegration,
  selectedAddons,
  companyDetails,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState();

  useEffect(() => {
    if (navigateStatus) {
      let tempItems = [];
      for (let i in navigateStatus) {
        tempItems.push(navigateStatus[i]);
      }
      setItems(tempItems);
    }
  }, [navigateStatus]);

  // useEffect(() => {
  //   if (items) {
  //     if (selectedAddons && navigateStatus) {
  //       const newItems = items?.map((item) =>
  //         item.name === null ? { ...item, name: selectedAddons } : item
  //       );

  //       setUpdatedData(newItems);
  //     }
  //   }
  // }, [items]);

  const itemClickHandler = (item) => {
    setViewMode(item.view_mode);
    if (item.handler) {
      item.handler(item.activeID);
    } else {
      if (item?.navigationObj.hasOwnProperty('search')) {
        return;
      } else {
        navigate(item.activeID, { state: item?.navigationObj });
        setSelectedAddons(null);
        setSelectedIntegration(null);
      }
    }
  };

  return (
    <div className={styles.navigateStatus}>
      <>
        {
          // selectedAddons
          //   ? updatedData?.map((item, index) => {
          //       const isLastItem = index === items.length - 1;

          //       return !isLastItem ? (
          //         <p
          //           key={index}
          //           className={styles.inactiveItem}
          //           onClick={() => itemClickHandler(item)}
          //         >
          //           {item?.name ?? searchedUser?.user?.Sub_Department?.name}
          //           <span>
          //             <ChevronRight />
          //           </span>
          //         </p>
          //       ) : (
          //         <p
          //           key={index}
          //           className={styles.activeItem}
          //           onClick={() => itemClickHandler(item)}
          //         >
          //           {item?.name ?? searchedUser?.user?.Sub_Department?.name}
          //         </p>
          //       );
          //     })
          //   :
          items?.map((item, index) => {
            const isLastItem = index === items.length - 1;

            return !isLastItem ? (
              <p
                key={index}
                className={styles.inactiveItem}
                onClick={() => itemClickHandler(item)}
              >
                {item?.name ?? searchedUser?.user?.Sub_Department?.name}
                <span>
                  <ChevronRight />
                </span>
              </p>
            ) : (
              <p
                key={index}
                className={styles.activeItem}
                onClick={() => itemClickHandler(item)}
                style={{ cursor: 'pointer' }}
              >
                {item?.name ?? searchedUser?.user?.Sub_Department?.name}
              </p>
            );
          })
        }
      </>
    </div>
  );
};

export default NavigateStatus;
