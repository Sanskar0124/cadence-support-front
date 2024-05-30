import { ENUMS } from '@cadence-support/constants';
import {
  Bounced,
  CheckCircle,
  ClickGradient,
  DataCheckGradient,
  EndCadence,
  LeadsGradient,
  MessageGradient2,
  MinusGradient2,
  Refresh,
  ReplyGradient,
  SkipGradient,
  TimeGradient,
  UnsubscribeRed,
  ViewGradient,
  WrenchGradient,
  Callback,
} from '@cadence-support/icons';

export const STEP_ICONS = {
  mail: ENUMS.mail.icon.gradient,
  automated_mail: ENUMS.automated_mail.icon.gradient,
  message: <MessageGradient2 />,
  automated_message: ENUMS.automated_message.icon.default,
  call: ENUMS.call.icon.gradient,
  linkedin_connection: ENUMS.linkedin_connection.icon.default,
  linkedin_message: ENUMS.linkedin_message.icon.default,
  linkedin_profile: ENUMS.linkedin_profile.icon.default,
  linkedin_interact: ENUMS.linkedin_interact.icon.default,
  cadence_custom: <WrenchGradient />,
  data_check: <DataCheckGradient />,
  end: <EndCadence />,
  reply_to: ENUMS.reply_to.icon.gradient,
  automated_reply_to: ENUMS.reply_to.icon.gradient,
  whatsapp: ENUMS.whatsapp.icon.gradient,
  callback: ENUMS.callback.icon.gradient,
};
export const ALPHABETS = ['A', 'B', 'C', 'D'];

export const STEP_NAME_MAP = {
  mail: 'Semi Automated Mail',
  automated_mail: 'Automated Mail',
  reply_to: 'Reply to',
  message: 'Semi Automated Message',
  automated_message: 'Automated Message',
  call: 'Call',
  linkedin: 'Linkedin',
  linkedin_connection: 'Linkedin Connection Request',
  linkedin_message: 'Linkedin Message',
  linkedin_profile: 'Linkedin View Profile',
  linkedin_interact: 'Linkedin Interact with Post',
  cadence_custom: 'Custom Task',
  data_check: 'Data Check',
  end: 'End Cadence',
  whatsapp: 'Whatsapp',
  automated_reply_to: 'Reply to',
};

export const CADENCE_STATUS = {
  NOT_STARTED: 'not_started',
  PROCESSING: 'processing',
  PAUSED: 'paused',
  IN_PROGRESS: 'in_progress',
  STOPPED: 'stopped',
};

export const CADENCE_STATUS_MAP = {
  not_started: 'Not Started',
  processing: 'Processing',
  paused: 'Paused',
  in_progress: 'In Progress',
  stopped: 'Stopped',
  completed: 'Completed',
};

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  DUPLICATE: 'duplicate',
  SHARE: 'share',
};

export const getMailStats = (mailStats) => {
  const totalSent =
    mailStats?.delivered_count ?? 0 + mailStats?.bounced_count ?? 0;
  return [
    {
      label: 'Bounced',
      value: 'BOUNCED',
      icon: <Bounced />,
      count: mailStats?.bounced_count ?? 0,
      total_sent: totalSent,
      percentage:
        totalSent > 0
          ? Math.round((mailStats?.bounced_count * 100) / totalSent)
          : 0,
    },
    {
      label: 'Unsubscribed',
      value: 'UNSUBSCRIBED',
      icon: <UnsubscribeRed />,
      count: mailStats?.unsubscribed_count ?? 0,
      total_sent: totalSent,
      percentage:
        totalSent > 0
          ? Math.round((mailStats?.unsubscribed_count * 100) / totalSent)
          : 0,
    },
    {
      label: 'Replied',
      value: 'REPLIED',
      icon: <ReplyGradient />,
      count: mailStats?.replied_count ?? 0,
      total_sent: totalSent,
      percentage:
        totalSent > 0
          ? Math.round((mailStats?.replied_count * 100) / totalSent)
          : 0,
    },
    {
      label: 'Opened',
      value: 'OPENED',
      icon: <ViewGradient />,
      count: mailStats?.opened_count ?? 0,
      total_sent: totalSent,
      percentage:
        totalSent > 0
          ? Math.round((mailStats?.opened_count * 100) / totalSent)
          : 0,
    },
    {
      label: 'Clicked',
      value: 'CLICKED',
      icon: <ClickGradient />,
      count: mailStats?.clicked_count ?? 0,
      total_sent: totalSent,
      percentage:
        totalSent > 0
          ? Math.round((mailStats?.clicked_count * 100) / totalSent)
          : 0,
    },
  ];
};

export const getStepStats = (stats) => {
  return [
    {
      className: 'red',
      label: 'Disqualified leads',
      value: 'DISQUALIFIEDLEADS',
      icon: <MinusGradient2 size={16} />,
      count: stats?.disqualifiedLeadsCount,
    },
    {
      className: 'pink',
      label: 'Skipped tasks',
      value: 'SKIPPEDTASKS',
      icon: <SkipGradient size={18} />,
      count: stats?.skippedTasksCount,
      percentage:
        stats?.skippedTasksCount + stats?.doneTasksCount > 0
          ? Math.round(
              (stats?.skippedTasksCount * 100) /
                (stats?.skippedTasksCount + stats?.doneTasksCount)
            )
          : 0,
    },
    {
      className: 'orange',
      label: 'Scheduled tasks',
      value: 'SCHEDULEDTASKS',
      icon: <TimeGradient size={16} />,
      count: stats?.scheduledLeadsCount,
    },
    {
      className: 'green',
      label: 'Converted leads',
      value: 'CONVERTEDLEADS',
      icon: <Refresh size={16} color="#00B3A8" />,
      count: stats?.convertedLeadsCount,
    },
    {
      className: 'green',
      label: 'Done tasks',
      value: 'DONETASKS',
      icon: <CheckCircle size={16} color="#00B3A8" />,
      count: stats?.doneTasksCount,
    },
    {
      label: 'Active people',
      value: 'PEOPLE',
      icon: <LeadsGradient size={18} />,
      count: stats?.currentLeadsCount,
    },
  ];
};
