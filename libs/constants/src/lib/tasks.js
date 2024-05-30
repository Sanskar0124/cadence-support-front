import React from 'react';
import {
  AtrManualEmail,
  AtrAutoEmail,
  AtrAutoEmailGradient,
  PhoneGradient,
  LinkedinGradient,
  Call,
  AutoSms,
  Voicemail,
  Linkedin,
  Message,
  MailOutgoing,
  CallOutgoing,
  MailGradient,
  MessageGradient,
  Note,
  AtrEmailIncoming,
  AtrEmailIncomingUnread,
  CallIncoming,
  CallMissed,
  MessageSent,
  MessageReceived,
  MessageReceivedUnread,
  Cadences,
  Leads,
  LeadDisqualified,
  Unsubscribe,
  Meeting,
  Wrench,
  DataCheck,
  MoveCadence,
  LinkedinInteract,
  LinkedinProfile,
  LinkedinMessage,
  LinkedinConnection,
  LinkedinConnectionIndividual,
  LinkedinProfileIndividual,
  LinkedinMessageIndividual,
  LinkedinInteractIndividual,
  CurvedArrowRight,
  EndCadence,
  Pause,
  Play,
  RoundedTick,
  Rocket,
  Person,
  ClickGradient,
  Click,
  MailClick,
  View,
  Bounced,
  Caution2,
  AutoSmsGradient,
  Whatsapp,
  WhatsappGradient,
  Callback,
  CallbackGradient,
  AutomatedReply,
  AutomatedReplyGradient,
  Reply,
  ReplyGradient,
} from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';

export const MANUAL_EMAIL = 'Semi Automatic Email';
export const AUTOMATED_EMAIL = 'Automatic Email';
export const REPLY_TO = 'Send Reply';
export const LINKED_IN = 'Linkedin';
export const LINKEDIN_CONNECTION = 'Linkedin connection request';
export const LINKEDIN_PROFILE = 'Linkedin view profile';
export const LINKEDIN_INTERACT = 'Linkedin interact with post';
export const LINKEDIN_MESSAGE = 'Linkedin message';
export const CALL = 'Call ';
export const AUTOMATED_SMS = 'Automatic SMS';
export const MANUAL_SMS = 'Semi Automatic SMS';
export const VOICEMAIL = 'Voicemail Drop';
export const NOTE = 'Note';
export const CADENCE_CUSTOM = 'Custom Task';
export const DATA_CHECK = 'Data Check';
export const END = 'End';
export const OUT_OF_OFFICE = 'Out of Office';
export const BOUNCED_MAIL = 'Bounced mail';
export const WHATSAPP = 'Whatsapp';
export const CALLBACK = 'Callback';
//here keys in ENUMS are as same as in backend

const LINKEDIN_TYPES = {
  linkedin_connection: {
    name: 'Linkedin Connection',
    task_name: 'Send Connection Request',
    task_name_in_quickview: 'Linkedin Connection Request',
  },
  linkedin_message: {
    name: 'Linkedin Message',
    task_name: 'Send Linkedin message',
    task_name_in_quickview: 'Linkedin Message',
  },
  linkedin_profile: {
    name: 'Linkedin Profile',
    task_name: 'View Profile',
    task_name_in_quickview: 'Linkedin View Profile',
  },
  linkedin_interact: {
    name: 'Linkedin interact with post',
    task_name: 'Interact with post',
    task_name_in_quickview: 'Linkedin Interact with Post',
  },
  default: {
    name: 'Linkedin unknown',
    task_name: 'Unknown Linkedin task',
    task_name_in_quickview: 'Linkedin Task',
  },
};

export const ENUMS = {
  automated_mail: {
    is_task: true,
    name: AUTOMATED_EMAIL,
    task_name_in_quickview: 'Automated Mail',
    activity_name: 'You sent an email',
    icon: {
      default: <AtrAutoEmail />,
      white: <AtrAutoEmail color={Colors.white} />,
      gradient: <AtrAutoEmailGradient />,
      outgoing: <MailOutgoing />,
      incoming: <AtrEmailIncoming />,
      unread: <AtrEmailIncomingUnread />,
      ongoing: <AtrAutoEmail color={Colors.greenShade1} />,
      notdone: <AtrAutoEmail color={Colors.veryLightBlue} />,
    },
  },
  mail: {
    is_task: true,
    name: MANUAL_EMAIL,
    task_name_in_quickview: 'Mail',
    activity_name: 'You sent an email',
    icon: {
      default: <AtrManualEmail />,
      white: <AtrManualEmail color={Colors.white} />,
      outgoing: <MailOutgoing />,
      gradient: <MailGradient />,
      incoming: <AtrEmailIncoming />,
      unread: <AtrEmailIncomingUnread />,
      ongoing: <AtrManualEmail color={Colors.greenShade1} />,
      notdone: <AtrManualEmail color={Colors.veryLightBlue} />,
    },
  },
  bounced_mail: {
    is_task: false,
    name: BOUNCED_MAIL,
    icon: {
      default: <Caution2 />,
      white: <Caution2 color={Colors.white} />,
    },
  },
  whatsapp: {
    is_task: true,
    name: WHATSAPP,
    icon: {
      default: <Whatsapp />,
      gradient: <WhatsappGradient />,
      white: <Whatsapp color={Colors.white} />,
    },
  },
  out_of_office: {
    is_task: false,
    name: OUT_OF_OFFICE,
    activity_name: 'Out Of Office',
    icon: {
      default: <AtrEmailIncoming />,
      white: <AtrEmailIncoming color={Colors.white} />,
      outgoing: <AtrEmailIncoming />,
      gradient: <AtrEmailIncoming />,
      incoming: <AtrEmailIncoming />,
      unread: <AtrEmailIncomingUnread />,
      ongoing: <AtrEmailIncoming color={Colors.greenShade1} />,
      notdone: <AtrEmailIncoming color={Colors.veryLightBlue} />,
    },
  },
  reply_to: {
    is_task: false,
    name: REPLY_TO,
    task_name_in_quickview: 'Reply Mail',
    activity_name: 'You replied to a message',
    icon: {
      default: <Reply />,
      white: <Reply color={Colors.white} />,
      outgoing: <Reply />,
      gradient: <ReplyGradient />,
      incoming: <Reply />,
      unread: <Reply />,
      ongoing: <Reply color={Colors.mainPurple} />,
      notdone: <Reply color={Colors.veryLightBlue} />,
    },
  },
  linkedin: {
    is_task: false,
    name: LINKED_IN,
    type: LINKEDIN_TYPES,
    icon: {
      default: <Linkedin />,
      gradient: <LinkedinGradient />,
      white: <Linkedin color={Colors.white} />,
      ongoing: <Linkedin color={Colors.greenShade1} />,
      notdone: <Linkedin color={Colors.veryLightBlue} />,
    },
  },
  call: {
    is_task: true,
    name: CALL,
    task_name_in_quickview: 'Call',
    activity_name: 'You made a call',
    icon: {
      default: <Call />,
      gradient: <PhoneGradient />,
      white: <Call color={Colors.white} />,
      outgoing: <CallOutgoing />,
      incoming: <CallIncoming />,
      missed: <CallMissed />,
      ongoing: <Call color={Colors.greenShade1} />,
      notdone: <Call color={Colors.veryLightBlue} />,
    },
  },
  callback: {
    is_task: true,
    name: CALLBACK,
    task_name_in_quickview: 'Callback',
    activity_name: 'You made a callback',
    icon: {
      default: <Callback />,
      gradient: <CallbackGradient />,
      white: <Callback color={Colors.white} />,
      ongoing: <Callback color={Colors.mainPurple} />,
      notdone: <Callback color={Colors.veryLightBlue} />,
    },
  },
  automated_message: {
    is_task: true,
    name: AUTOMATED_SMS,
    task_name_in_quickview: 'Automated Message',
    activity_name: 'You sent a message',
    icon: {
      default: <AutoSms />,
      white: <AutoSms color={Colors.white} />,
      outgoing: <MessageSent />,
      incoming: <MessageReceived />,
      unread: <MessageReceivedUnread />,
      ongoing: <AutoSms color={Colors.greenShade1} />,
      notdone: <AutoSms color={Colors.veryLightBlue} />,
      gradient: <AutoSmsGradient />,
    },
  },
  message: {
    is_task: true,
    name: MANUAL_SMS,
    task_name_in_quickview: 'Message',
    activity_name: 'You sent a message',
    icon: {
      default: <Message />,
      white: <Message color={Colors.white} />,
      gradient: <MessageGradient />,
      outgoing: <MessageSent />,
      incoming: <MessageReceived />,
      unread: <MessageReceivedUnread />,
      ongoing: <Message color={Colors.greenShade1} />,
      notdone: <Message color={Colors.veryLightBlue} />,
    },
  },
  cadence_custom: {
    is_task: true,
    name: CADENCE_CUSTOM,
    task_name_in_quickview: 'Cadence Custom task',
    activity_name: 'You completed a custom task',
    icon: {
      default: <Wrench />,
      white: <Wrench color={Colors.white} />,
      ongoing: <Wrench color={Colors.greenShade1} />,
      notdone: <Wrench color={Colors.veryLightBlue} />,
    },
  },
  custom_task_for_other: {
    is_task: false,
    icon: {
      default: <Person />,
    },
  },
  data_check: {
    is_task: true,
    name: DATA_CHECK,
    task_name_in_quickview: 'Data Check',
    activity_name: 'You completed a custom task',
    icon: {
      default: <DataCheck />,
      white: <DataCheck color={Colors.white} />,
      ongoing: <DataCheck color={Colors.greenShade1} />,
      notdone: <DataCheck color={Colors.veryLightBlue} />,
    },
  },
  end: {
    is_task: false,
    name: END,
    activity_name: 'You ended a custom task',
    icon: {
      default: <EndCadence />,
      notdone: <EndCadence color={Colors.veryLightBlue} />,
      white: <EndCadence color={Colors.white} />,
    },
  },
  // voicemail: {
  // 	is_task: true,
  // 	name: VOICEMAIL,
  // 	activity_name: "You dropped a voicemail",
  // 	icon: {
  // 		default: <Voicemail color={Colors.lightBlue} />,
  // 	},
  // },
  note: {
    is_task: false,
    name: NOTE,
    activity_name: 'You left a note',
    icon: {
      default: <Note />,
    },
  },
  meeting: {
    is_task: false,
    activity_name: 'You attended a meeting',
    icon: {
      default: <Meeting />,
    },
  },
  pause_cadence: {
    is_task: false,
    activity_name: 'You paused Cadence',
    icon: {
      default: <Pause />,
    },
  },
  stop_cadence: {
    is_task: false,
    activity_name: 'You stopped Cadence',
    icon: {
      default: <Cadences />,
    },
  },
  resume_cadence: {
    is_task: false,
    activity_name: 'You resumed Cadence',
    icon: {
      default: <Play />,
    },
  },
  completed_cadence: {
    is_task: false,
    activity: 'Cadence completed',
    icon: {
      default: <RoundedTick />,
    },
  },
  lead_converted: {
    is_task: false,
    activity_name: 'You converted a lead',
    icon: {
      default: <Leads />,
    },
  },
  lead_disqualified: {
    is_task: false,
    activity_name: 'You disqualified a lead',
    icon: {
      default: <LeadDisqualified />,
    },
  },
  contact_disqualified: {
    is_task: false,
    activity_name: 'You disqualified a contact',
    icon: {
      default: <LeadDisqualified />,
    },
  },
  launch_cadence: {
    is_task: false,
    activity_name: 'You launched Cadence',
    icon: {
      default: <Rocket />,
    },
  },
  unsubscribe: {
    is_task: false,
    activity_name: 'Lead Unsubscribed',
    icon: {
      default: <Unsubscribe color={Colors.red} />,
    },
  },
  clicked_mail: {
    is_task: false,
    activity_name: 'You clicked mail',
    icon: {
      default: <MailClick />,
    },
  },
  viewed_mail: {
    is_task: false,
    activity_name: 'You viewed mail',
    icon: {
      default: <View />,
    },
  },
  move_cadence: {
    is_task: false,
    activity_name: 'You moved Cadence',
    icon: {
      default: <MoveCadence />,
    },
  },
  task_skipped: {
    is_task: false,
    activity_name: 'You skipped a task',
    icon: {
      default: <CurvedArrowRight />,
      red: <CurvedArrowRight color={Colors.redShade3} />,
    },
  },
  linkedin_connection: {
    is_task: true,
    name: LINKEDIN_CONNECTION,
    task_name_in_quickview: 'Linkedin Connection Request',
    icon: {
      default: <LinkedinConnection />,
      white: <LinkedinConnection color={Colors.white} />,
      individual: <LinkedinConnectionIndividual />,
      ongoing: <LinkedinConnection color={Colors.greenShade1} />,
      notdone: <LinkedinConnection color={Colors.veryLightBlue} />,
      gradient: <LinkedinGradient />,
    },
  },
  linkedin_message: {
    is_task: true,
    name: LINKEDIN_MESSAGE,
    task_name_in_quickview: 'Linkedin Message',
    icon: {
      default: <LinkedinMessage />,
      white: <LinkedinMessage color={Colors.white} />,
      individual: <LinkedinMessageIndividual />,
      ongoing: <LinkedinMessage color={Colors.greenShade1} />,
      notdone: <LinkedinMessage color={Colors.veryLightBlue} />,
      gradient: <LinkedinGradient />,
    },
  },
  linkedin_profile: {
    is_task: true,
    name: LINKEDIN_PROFILE,
    task_name_in_quickview: 'Linkedin View Profile',
    icon: {
      default: <LinkedinProfile />,
      white: <LinkedinProfile color={Colors.white} />,
      individual: <LinkedinProfileIndividual />,
      ongoing: <LinkedinProfile color={Colors.greenShade1} />,
      notdone: <LinkedinProfile color={Colors.veryLightBlue} />,
      gradient: <LinkedinGradient />,
    },
  },
  linkedin_interact: {
    is_task: true,
    name: LINKEDIN_INTERACT,
    task_name_in_quickview: 'Linkedin Interact with Post',
    icon: {
      default: <LinkedinInteract />,
      white: <LinkedinInteract color={Colors.white} />,
      individual: <LinkedinInteractIndividual />,
      ongoing: <LinkedinInteract color={Colors.greenShade1} />,
      notdone: <LinkedinInteract color={Colors.veryLightBlue} />,
      gradient: <LinkedinGradient />,
    },
  },
  owner_change: {
    is_task: false,
    icon: {
      default: <Cadences />,
      white: <Cadences color={Colors.white} />,
    },
  },
  automated_reply_to: {
    is_task: false,
    name: REPLY_TO,
    task_name_in_quickview: 'Automated Reply Mail',
    activity_name: 'You replied to a message',
    icon: {
      default: <AutomatedReply />,
      white: <AutomatedReply color={Colors.white} />,
      outgoing: <AutomatedReply />,
      gradient: <AutomatedReplyGradient />,
      incoming: <AutomatedReply />,
      unread: <AutomatedReply />,
      ongoing: <AutomatedReply color={Colors.mainPurple} />,
      notdone: <AutomatedReply color={Colors.veryLightBlue} />,
    },
  },
};
