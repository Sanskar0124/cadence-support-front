import React from 'react';
import { useState, useEffect, forwardRef } from 'react';
import moment from 'moment';

//components
import { Div } from '@cadence-support/components';

import styles from './SingleFeed.module.scss';
import { renderActivityIcon } from '@cadence-support/utils';
//constants

import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import { Pause } from '@cadence-support/icons';
import RenderFeedPreview from './components/RenderFeedPreview/RenderFeedPreview';

const SingleFeed = ({ activity, loading }, ref) => {
  const [read, setRead] = useState(activity?.read);

  const user = useRecoilValue(userInfo);
  return (
    <div className={styles.Activity} ref={ref}>
      <Div
        className={`${styles.singleActivity} ${loading ? styles.loading : ''}`}
        loading={loading}
        onClick={() => {}}
      >
        <div className={styles.left}>
          <div className={`${styles.icon}`}>
            {renderActivityIcon(activity, read)}
          </div>
          <RenderFeedPreview
            activity={activity}
            cadence={
              activity?.Lead?.LeadToCadences?.filter(
                (cadence) =>
                  cadence?.Cadences?.[0]?.cadence_id === activity?.cadence_id
              )?.[0]
            }
          />
        </div>

        <div className={`${styles.date}`}>
          <div>{moment(activity?.created_at).format('MMMM DD, HH:mm')}</div>
        </div>
      </Div>
    </div>
  );
};

export default React.forwardRef(SingleFeed);
