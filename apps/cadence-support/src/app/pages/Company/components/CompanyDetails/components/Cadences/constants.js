export const CADENCES_SLIDER_OPTIONS = [
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Team',
    value: 'team',
  },
  {
    label: 'Company',
    value: 'company',
  },
];

export const TABS = {
  PERSONAL: 'personal',
  TEAM: 'team',
  COMPANY: 'company',
};

export const getTabOptions = (cadences, cadenceType) => {
  return [
    {
      label: `Personal` ,
      //`${ cadenceType === TABS.PERSONAL ? `(${cadences?.length ?? 0})` : ''}`,
      value: TABS.PERSONAL,
    },
    {
      label: `Team `,
      //`${ cadenceType === TABS.TEAM ? `(${cadences?.length ?? 0})` : ''}`,
      value: TABS.TEAM,
    },
    {
      label: `Company`, 
      //`${ cadenceType === TABS.COMPANY ? `(${cadences?.length ?? 0})` : ''}`,
      value: TABS.COMPANY,
    },
  ];
};
