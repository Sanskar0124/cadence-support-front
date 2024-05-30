import React from 'react';
import { ENUMS } from '@cadence-support/constants';
import {
  AtrAutoEmail,
  AtrAutoEmailGradient,
  MessageGradient2,
} from '@cadence-support/icons';
import { Colors } from '@cadence-support/utils';

export const STEP_TYPES = {
  mail: 'mail',
  automated_mail: 'automated_mail',
  reply_to: 'reply_to',
  message: 'message',
  automated_message: 'automated_message',
  call: 'call',
  callback: 'callback',
  linkedin_connection: 'linkedin_connection',
  linkedin_message: 'linkedin_message',
  linkedin_profile: 'linkedin_profile',
  linkedin_interact: 'linkedin_interact',
  whatsapp: 'whatsapp',
  cadence_custom: 'cadence_custom',
  data_check: 'data_check',
  end: 'end',
};

export const STEP_NAME_MAP = {
  mail: 'Mail',
  automated_mail: 'Mail',
  reply_to: 'Reply to',
  automated_reply_to: 'Reply to',
  message: 'SMS',
  automated_message: 'SMS',
  call: 'Call',
  callback: 'Callback',
  linkedin: 'Linkedin',
  linkedin_connection: 'Connection Request',
  linkedin_message: 'Linkedin Message',
  linkedin_profile: 'View Profile',
  linkedin_interact: 'Interact with Post',
  whatsapp: 'Whatsapp',
  cadence_custom: 'Custom Task',
  data_check: 'Data Check',
  end: 'End Cadence',
};

export const ELONGATED_STEP_NAME_MAP = {
  mail: 'Semi-automated Mail',
  automated_mail: 'Automated Mail',
  reply_to: 'Reply to (Semi-automated)',
  automated_reply_to: 'Reply to (Automated)',
  message: 'Semi-automated SMS',
  automated_message: 'Automated SMS',
  call: 'Call',
  callback: 'Callback',
  linkedin: 'Linkedin',
  linkedin_connection: 'Linkedin Connection Request',
  linkedin_message: 'Linkedin Message',
  linkedin_profile: 'Linkedin View Profile',
  linkedin_interact: 'Linkedin Interact with Post',
  whatsapp: 'Whatsapp',
  cadence_custom: 'Custom Task',
  data_check: 'Data Check',
  end: 'End Cadence',
};

export const STEP_ICONS = {
  mail: ENUMS.mail.icon.white,
  automated_mail: <AtrAutoEmail size={19} color={Colors.white} />,
  reply_to: ENUMS.reply_to.icon.white,
  automated_reply_to: ENUMS.automated_reply_to.icon.white,
  message: ENUMS.message.icon.white,
  automated_message: ENUMS.automated_message.icon.white,
  call: ENUMS.call.icon.white,
  callback: ENUMS.callback.icon.white,
  linkedin: ENUMS.linkedin.icon.white,
  linkedin_connection: ENUMS.linkedin_connection.icon.white,
  linkedin_message: ENUMS.linkedin_message.icon.white,
  linkedin_profile: ENUMS.linkedin_profile.icon.white,
  linkedin_interact: ENUMS.linkedin_interact.icon.white,
  whatsapp: ENUMS.whatsapp.icon.white,
  cadence_custom: ENUMS.cadence_custom.icon.white,
  data_check: ENUMS.data_check.icon.white,
  // end: ENUMS.end.icon.white,
};

export const STEP_ICONS_GRADIENT = {
  mail: ENUMS.mail.icon.gradient,
  automated_mail: <AtrAutoEmailGradient size={19} />,
  reply_to: ENUMS.reply_to.icon.gradient,
  automated_reply_to: ENUMS.automated_reply_to.icon.gradient,
  message: <MessageGradient2 />,
  automated_message: ENUMS.automated_message.icon.gradient,
  call: ENUMS.call.icon.gradient,
  callback: ENUMS.callback.icon.gradient,
  linkedin: ENUMS.linkedin.icon.gradient,
  linkedin_connection: ENUMS.linkedin_connection.icon.gradient,
  linkedin_message: ENUMS.linkedin_message.icon.gradient,
  linkedin_profile: ENUMS.linkedin_profile.icon.gradient,
  linkedin_interact: ENUMS.linkedin_interact.icon.gradient,
  whatsapp: ENUMS.whatsapp.icon.gradient,
  cadence_custom: ENUMS.cadence_custom.icon.gradient,
  data_check: ENUMS.data_check.icon.gradient,
  // end: ENUMS.end.icon.gradient,
};

export const STEP_DATA = {
  mail: {
    subject: '',
    body: '',
    attachments: [],
    aBTestEnabled: false,
    templates: [],
  },
  automated_mail: [
    {
      id: Math.floor(Math.random() * 100 + 1),
      name: 'New mail',
      subject: '',
      body: '',
      attachments: [],
      aBTestEnabled: false,
      templates: [],
    },
  ],
  reply_to: {
    replied_node_id: '',
    body: '',
    attachments: [],
    subject: 'Re: ',
    aBTestEnabled: false,
    templates: [],
  },

  call: {
    script: '',
  },
  callback: {
    duration: 60,
    retries: 2,
    retry_after: 60,
    script: '',
  },
  message: {
    message: '',
    aBTestEnabled: false,
    templates: [],
    tcpa_policy_check: true,
  },
  automated_message: {
    aBTestEnabled: false,
    templates: [],
    message: '',
  },
  data_check: {
    message: '',
  },
  cadence_custom: {
    message: '',
  },
  linkedin_connection: { message: '' },
  linkedin_message: { message: '' },
  linkedin_profile: { message: '' },
  linkedin_interact: { message: '' },
  whatsapp: { message: '' },
  end: {
    cadence_id: '',
    account_status: '',
    lead_status: '',
    lead_reason: '',
    account_reason: '',
    to_user_id: '',
    moved_leads: [],
  },
};

export const WAIT_TIME_OPTIONS = {
  mins: 'min(s)',
  hours: 'hour(s)',
  days: 'Day(s)',
};

export const ADD_STEP_TYPES = [
  'mail',
  'reply_to',
  'message',
  'call',
  'callback',
  'linkedin',
  'whatsapp',
  'cadence_custom',
  'data_check',
  // 'end',
];

export const ADD_LINKEDIN_STEP_TYPES = [
  'linkedin_connection',
  'linkedin_message',
  'linkedin_profile',
  'linkedin_interact',
];
