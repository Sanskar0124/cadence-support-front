export const TIMERANGEFILTER_OPTIONS = {
  today: 'Today',
  this_week: 'This week',
  this_month: 'This month',
  this_year: 'This year',
  last_3_months: 'Last 3 months',
  last_6_months: 'Last 6 months',
};
export const SELECT_COMPANY_OPTION = {
  all_companies: 'Select all companies',
};

export const SORTING_OPTIONS = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
};

export const OVERALL_TASK_COMPLETION_TOOLTIP = {
  title: 'Overall task completion',
  content: (
    <p>
      The graph depicts the total task completion and the average task
      completion values for all the companies.
    </p>
  ),
};

export const COMPANY_TASK_COMPLETION_TOOLTIP = {
  title: 'Company task completion',
  content: (
    <p>
      This shows the total task completion and the average task completion
      values for each company, along with the number of users.
    </p>
  ),
};
export const SPECIFIC_COMPANY_TASK_TOOLTIP = {
  title: 'Overall task completion',
  content: (
    <p>
      The graph depicts the total task completion and the average task
      completion values for the specific company.
    </p>
  ),
};
export const SPECIFIC_COMPANY_USERS_TOOLTIP = {
  title: 'Company task completion',
  content: (
    <p>
      This shows the total task completion and the average task completion
      values for each user of the company.
    </p>
  ),
};

export const getTooltipText = (profit, timerangefilter) => {
  if (timerangefilter === 'today')
    return `${
      profit
        ? `Percentage growth from the previous day`
        : `Percentage decline from the previous day`
    }`;
  else if (timerangefilter === 'this_week')
    return `${
      profit
        ? `Percentage growth from the previous week`
        : `Percentage decline from the previous week`
    }`;
  else if (timerangefilter === 'this_month')
    return `${
      profit
        ? `Percentage growth from the previous month`
        : `Percentage decline from the previous month`
    }`;
  else if (timerangefilter === 'this_year')
    return `${
      profit
        ? `Percentage growth from the previous year`
        : `Percentage decline from the previous year`
    }`;
  else if (timerangefilter === 'last_3_months')
    return `${
      profit
        ? `Percentage growth from the previous 3 months`
        : `Percentage decline from the previous 3 months`
    }`;
  else
    return `${
      profit
        ? `Percentage growth from the previous 6 months`
        : `Percentage decline from the previous 6 months`
    }`;
};

export const TASK_DETAILS = [
  {
    value: 'total_tasks',
    label: 'Total task',
    count: 256,
    profit: true,
  },
  {
    value: 'avg_tasks',
    label: 'Average task',
    count: 25,
    profit: false,
  },
];
export const getHeaders = (tablefor) => {
  const common_headers = [
    { value: 'total_task', name: 'total tasks completion' },
    { value: 'avg_task', name: 'average tasks completion ' },
  ];
  if (tablefor === 'company') {
    return [{ value: 'company', name: 'company' }, ...common_headers];
  } else return [{ value: 'users', name: 'users' }, ...common_headers];
};

export const COMMON_HEADERS = [
  { value: 'total_task', name: 'total tasks completion' },
  { value: 'avg_task', name: 'average tasks completion ' },
];

export const COMPANY_DATA = [
  {
    name: 'dell',
    users: 8,
    total_task: 10,
    avg_task: 20,
    percentage: 40,
    profit: true,
  },
  {
    name: 'salesforce',
    users: 18,
    total_task: 12,
    avg_task: 23,
    percentage: 34,
    profit: false,
  },
  {
    name: 'hubspot',
    users: 10,
    total_task: 30,
    avg_task: 15,
    percentage: 54,
    profit: true,
  },
  {
    name: 'bullhorn',
    users: 256,
    total_task: 2,
    avg_task: 10,
    percentage: 32,
    profit: false,
  },
  {
    name: 'zendesk',
    users: 30,
    total_task: 10,
    avg_task: 30,
    percentage: 16,
    profit: false,
  },
  {
    name: 'pipedrive',
    users: 180,
    total_task: 120,
    avg_task: 200,
    percentage: 8,
    profit: true,
  },
  {
    name: 'kaspr',
    users: 108,
    total_task: 102,
    avg_task: 300,
    percentage: 20,
    profit: false,
  },
  {
    name: 'lusha',
    users: 9,
    total_task: 12,
    avg_task: 130,
    percentage: 22,
    profit: false,
  },
  {
    name: 'zoho',
    users: 67,
    total_task: 76,
    avg_task: 86,
    percentage: 10,
    profit: false,
  },
];
