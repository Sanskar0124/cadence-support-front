import { ENUMS, ACTIVITY_TYPES } from '@cadence-support/constants';

const isMissedCall = (activity) =>
  activity.type === ACTIVITY_TYPES.CALL &&
  activity.incoming &&
  activity.status.startsWith('Missed call');

const renderActivityIcon = (activity, read) => {
  if (isMissedCall(activity)) return ENUMS[activity.type]?.icon?.missed;
  else {
    if (
      activity.type === 'clicked_mail' ||
      activity.type === 'viewed_mail' ||
      activity.type === 'unsubscribe'
    ) {
      return ENUMS[activity.type]?.icon?.default;
    }
    if ('incoming' in activity && activity.incoming !== null) {
      if (activity.incoming) {
        if (read) return ENUMS[activity.type]?.icon?.incoming;
        else {
          if (activity.type === ACTIVITY_TYPES.CALL)
            return ENUMS[activity.type]?.icon?.incoming;
          else return ENUMS[activity.type]?.icon?.unread;
        }
      } else return ENUMS[activity.type]?.icon?.outgoing;
    } else return ENUMS[activity.type]?.icon?.default;
  }
};

export default renderActivityIcon;
