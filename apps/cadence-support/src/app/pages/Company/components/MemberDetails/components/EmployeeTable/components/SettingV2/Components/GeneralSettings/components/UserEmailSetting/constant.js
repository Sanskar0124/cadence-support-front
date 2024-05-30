import {
  AtrManualEmail,
  Message,
  Call,
  AutoSms,
  AtrAutoEmail,
  LinkedinMessage,
  LinkedinInteract,
  LinkedinConnection,
  LinkedinProfile,
  DataCheck,
  Whatsapp,
  Callback,
  CustomTask,
} from '@cadence-support/icons';

export const getunsuscribeList = (exceptionobj) => {
  return [
    {
      title: 'Manual Emails',
      icon: <AtrManualEmail height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.mail,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.mail,
    },
    {
      title: 'Automatic Emails',
      icon: <AtrAutoEmail height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.automated_mail,
      bounced: exceptionobj?.semi_automatic_bounced_data?.automated_mail,
    },
    {
      title: 'Call',
      icon: <Call height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.call,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.call,
    },
    {
      title: 'Linkedin Message',
      icon: <LinkedinMessage height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_message,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_message,
    },
    {
      title: 'Linkedin Interact',
      icon: <LinkedinInteract height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_interact,
      bounced:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_interact,
    },
    {
      title: 'Linkedin Connection',
      icon: <LinkedinConnection height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_connection,
      bounced:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_connection,
    },
    {
      title: 'Linkedin View Profile',
      icon: <LinkedinProfile height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_view_profile,
      bounced:
        exceptionobj?.semi_automatic_unsubscribed_data?.linkedin_view_profile,
    },
    {
      title: 'Data Check',
      icon: <DataCheck height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.data_check,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.data_check,
    },
    {
      title: 'WhatsApp',
      icon: <Whatsapp height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.whatsapp,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.whatsapp,
    },
    {
      title: 'Callback',
      icon: <Callback height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.callback,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.callback,
    },
    {
      title: 'Custom Task',
      icon: <CustomTask height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.cadence_custom,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.cadence_custom,
    },
    {
      title: 'Automatic SMS',
      icon: <AutoSms height={18} />,
      unsubscribed:
        exceptionobj?.semi_automatic_unsubscribed_data?.automated_message,
      bounced:
        exceptionobj?.semi_automatic_unsubscribed_data?.automated_message,
    },
    {
      title: 'Manual SMS',
      icon: <Message height={18} />,
      unsubscribed: exceptionobj?.semi_automatic_unsubscribed_data?.message,
      bounced: exceptionobj?.semi_automatic_unsubscribed_data?.message,
    },
  ];
};
