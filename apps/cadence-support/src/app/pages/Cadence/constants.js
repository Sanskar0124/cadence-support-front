import { UkFlag, FranceFlag, SpainFlag } from '@cadence-support/icons';
export const HEADERS = [
  {
    label: 'Cadence name',
    value: 'cadence_name',
  },
  {
    label: 'Steps',
    value: 'steps',
  },

  {
    label: 'Created by',
    value: 'created_by',
  },

  {
    label: 'Type',
    value: 'type',
  },
  {
    label: 'Language',
    value: 'language',
  },
  {
    label: 'Actions',
    value: 'actions',
  },
];
export const STEPS_OPTIONS = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
};

export const TYPES = [
  { label: 'Inbound', value: 'inbound' },
  { label: 'Outbound', value: 'outbound' },
];
export const LANGUAGE_OPTIONS = [
  {
    label: (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <UkFlag size={28} /> English
      </div>
    ),
    value: 'english',
  },
  {
    label: (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <FranceFlag size={28} /> French
      </div>
    ),
    value: 'french',
  },
  {
    label: (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <SpainFlag size={28} /> Spanish
      </div>
    ),
    value: 'spanish',
  },
];
