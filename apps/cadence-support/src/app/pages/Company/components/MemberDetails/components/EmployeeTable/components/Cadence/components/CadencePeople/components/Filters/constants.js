import { Cadence as CADENCE_TRANSLATION } from '@cadence-support/languages';

export const DEFAULT_FILTER_OPTIONS = {
  status: null,
};

// export const CADENCE_STATUS_ENUMS = {
//   paused: {
//     ENGLISH: 'Paused',
//     FRENCH: 'En pause',
//     SPANISH: 'En pausa',
//   },
//   in_progress: {
//     ENGLISH: 'In progress',
//     FRENCH: 'En cours',
//     SPANISH: 'En curso',
//   },
//   stopped: {
//     ENGLISH: 'Stopped',
//     FRENCH: 'Arrêté',
//     SPANISH: 'Detenida',
//   },
//   completed: {
//     ENGLISH: 'Completed',
//     FRENCH: 'Fini',
//     SPANISH: 'Terminado',
//   },
// };

export const CADENCE_STATUS_ENUMS = {
  paused: CADENCE_TRANSLATION.PAUSED,
  in_progress: CADENCE_TRANSLATION.IN_PROGRESS,
  completed: CADENCE_TRANSLATION.COMPLETED,
  not_started: CADENCE_TRANSLATION.NOT_STARTED,
};
