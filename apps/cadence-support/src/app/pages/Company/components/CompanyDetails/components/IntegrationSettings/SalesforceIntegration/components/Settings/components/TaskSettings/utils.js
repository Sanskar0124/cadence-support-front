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
export const getDuration = (seconds) => {
  seconds = seconds / 1000;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days') : '00 days';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '00 hours';
  const mDisplay =
    m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '00 minutes';

  return `${dDisplay}: ${hDisplay}: ${mDisplay} `;
};
