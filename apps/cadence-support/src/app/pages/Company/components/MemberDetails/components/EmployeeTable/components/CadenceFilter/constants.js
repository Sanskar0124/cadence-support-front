import { Cadence as CADENCE_TRANSLATION } from '@cadence-support/languages';
export { CADENCE_FILTER_DEFAULTS } from '@cadence-support/constants';

export const CADENCE_STATUS_ENUMS = {
  paused: CADENCE_TRANSLATION.PAUSED,
  in_progress: CADENCE_TRANSLATION.IN_PROGRESS,
  completed: CADENCE_TRANSLATION.COMPLETED,
  not_started: CADENCE_TRANSLATION.NOT_STARTED,
};

export const CADENCE_TYPES = {
  personal: CADENCE_TRANSLATION.PERSONAL,
  team: CADENCE_TRANSLATION.GROUP,
  company: CADENCE_TRANSLATION.COMPANY,
};
