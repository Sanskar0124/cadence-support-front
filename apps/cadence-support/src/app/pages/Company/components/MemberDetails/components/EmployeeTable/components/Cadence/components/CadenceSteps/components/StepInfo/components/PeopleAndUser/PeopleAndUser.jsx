import { useNodeStats } from '@cadence-support/data-access';

import styles from './PeopleAndUser.module.scss';
import { LeadsGradient } from '@cadence-support/icons';
import { Image, Skeleton } from '@pipedrive/components';

const PeopleAndUser = ({ stats, loading }) => {
  return (
    <div className={styles.peopleAndUsers}>
      {loading
        ? [...Array(7).keys()].map((key) => (
            <Skeleton key={key} className={styles.placeholder} />
          ))
        : stats?.map((stat) => (
            <div key={stat?.user_id} className={styles.peopleAndUser}>
              <div className={styles.info}>
                <Image
                  src={
                    stat?.User?.is_profile_picture_present
                      ? stat?.User?.profile_picture
                      : 'https://cdn.ringover.com/img/users/default.jpg'
                  }
                  className={styles.image}
                />
                <div
                  className={styles.name}
                  title={`${stat?.User?.first_name} ${stat?.User?.last_name}`}
                >{`${stat?.User?.first_name} ${stat?.User?.last_name}`}</div>
              </div>
              <div className={styles.connects}></div>
              <div className={styles.statistics}>
                <LeadsGradient size={18} />
                <span>{stat?.count}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PeopleAndUser;
