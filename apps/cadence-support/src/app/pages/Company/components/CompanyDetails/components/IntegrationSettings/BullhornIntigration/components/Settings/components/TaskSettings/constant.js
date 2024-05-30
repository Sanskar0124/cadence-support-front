import { getDuration } from './utils';
import {
  AtrManualEmail,
  Linkedin,
  Message,
  Call,
  DataCheck,
  Whatsapp,
  Wrench,
  Minus,
  HotLead,
  Hot,
} from '@cadence-support/icons';

export const getLateTaskDetails = (exceptionobj) => {
  return [
    {
      title: 'Manual Emails',
      value: getDuration(exceptionobj?.mail),
      icon: <AtrManualEmail height={20} />,
    },
    {
      title: 'Manual SMS',
      value: getDuration(exceptionobj?.message),
      icon: <Message height={20} />,
    },
    {
      title: 'Linkedin',
      value: getDuration(exceptionobj?.linkedin_message),
      icon: <Linkedin height={20} />,
    },
    {
      title: 'Call',
      value: getDuration(exceptionobj?.call),
      icon: <Call height={20} />,
    },
    {
      title: 'Custom',
      value: getDuration(exceptionobj?.cadence_custom),
      icon: <Wrench height={20} />,
    },
    {
      title: 'Data check',
      value: getDuration(exceptionobj?.data_check),
      icon: <DataCheck height={20} />,
    },
    {
      title: 'Whatsapp',
      value: getDuration(exceptionobj?.whatsapp),
      icon: <Whatsapp height={20} />,
    },
  ];
};
export const LEAD_SCORING_DATA = {
  bounced_mail: 'Bounced Mail',
  demo_booked: 'Demo Booked',
  email_clicked: 'Email Clicked',
  email_opened: 'Email Opened',
  email_replied: 'Email Replied',
  incoming_call_received: 'Incoming Call Received',
  outgoing_call: 'Outgoing Call',
  outgoing_call_duration: 'Outgoing Call Duration',
  sms_clicked: 'SMS Clicked',
};

export const getLeadScoreData = (exceptionObj) => {
  return [
    {
      title: 'Email Clicked',
      icon: '',
      value: exceptionObj?.email_clicked,
    },
    {
      title: 'Email Opened',
      icon: '',
      value: exceptionObj?.email_opened,
    },
    {
      title: 'Email Replied',
      icon: '',
      value: exceptionObj?.email_replied,
    },
    {
      title: 'Incoming Call Received',
      icon: '',
      value: exceptionObj?.incoming_call_received,
    },
    {
      title: 'SMS Link Clicked',
      icon: '',
      value: exceptionObj?.sms_clicked,
    },
    {
      title: 'Lead Unsubscribed To Cadence',
      icon: '',
      value: exceptionObj?.unsubscribe,
    },
    {
      title: 'Mail Sent To Lead Has Bounced',
      icon: '',
      value: exceptionObj?.bounced_mail,
    },

    {
      title: 'Demo Booked',
      icon: '',
      value: exceptionObj?.demo_booked,
    },
    {
      title: 'Lead Score Reset Period',
      icon: '',
      value: exceptionObj?.reset_period,
    },
    {
      title: 'Set As Hot Lead If Points >=',
      icon: <Hot />,
      value: exceptionObj?.score_threshold,
    },
    {
      title: 'If Outgoing Call Duration >=',
      icon: '',
      value: exceptionObj?.outgoing_call,
      duration: exceptionObj?.outgoing_call_duration,
    },
  ];
};
export const getStatusUpdate = (exceptionObj) => [
  {
    title: 'Contact Status Updated',
    icon: '',
    value: exceptionObj?.status_update?.picklist_values_lead,
  },
  {
    title: 'Account Status Updated',
    icon: '',
    value: exceptionObj?.status_update?.picklist_values_account,
  },
];
