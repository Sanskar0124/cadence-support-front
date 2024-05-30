import styles from './People.module.scss';
import { LeadsGradient, Leads } from '@cadence-support/icons';
import { Image, Skeleton } from '@cadence-support/components';

const PeopleAndUser = ({ stats, loading }) => {
  return (
    <div className={styles.peopleAndUsers}>
      {loading ? (
        [...Array(7).keys()].map((key) => (
          <Skeleton key={key} className={styles.placeholder} />
        ))
      ) : stats?.length ? (
        stats?.map((stat) => (
          <div key={stat?.user_id} className={styles.peopleAndUser}>
            <div className={styles.info}>
              <Image
                src={stat?.User?.profile_picture}
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
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default PeopleAndUser;

const Empty = () => {
  return (
    <div className={styles.emptySpaceWrapper}>
      <div className={styles.emptySpace}>
        <div className={styles.title}>No people are currently on this step</div>
        <div className={styles.subTitle}>
          <span>
            <Leads size="20px" />
          </span>
          <span>0 People</span>
        </div>
      </div>
    </div>
  );
};
