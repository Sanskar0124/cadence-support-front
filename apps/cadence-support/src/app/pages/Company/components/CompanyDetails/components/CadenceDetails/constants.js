export const CADENCE_VIEW = {
  STEPS: 'steps',
  PEOPLE: 'people',
};

export const getTabOptions = () => {
  return [
    {
      // label: `Steps (${stepsData?.sequence?.length ?? 0})`,
      label: 'Steps',
      value: CADENCE_VIEW.STEPS,
    },
    {
      // label: `People (${data?.length ?? 0})`,
      label: 'People',
      value: CADENCE_VIEW.PEOPLE,
    },
  ];
};
