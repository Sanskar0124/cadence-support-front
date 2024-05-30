export const getUserName = (users, user_id) => {
  if (!users?.length || !user_id) return '';

  return (
    users?.filter((user) => user.value === user_id)[0]?.label ?? 'Deleted User'
  );
};

export const getTeamName = (teams, sd_id) => {
  if (!teams?.length || !sd_id) return '';

  return (
    teams.filter((team) => team.value === sd_id)[0]?.label ?? 'Deleted Group'
  );
};

export const getWorkingDays = (data) => {
  return WEEKDAYS.filter((i) => {
    return data?.includes(i);
  });
};
