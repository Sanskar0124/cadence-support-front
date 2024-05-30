import moment from 'moment';

const processCustomVariables = (body, lead, user) => {
  let text = body || '';
  const { Account } = lead;

  const VALUES = {
    //sender
    sender_phone_number: user?.primary_phone_number,
    sender_email: user?.primary_email,
    sender_name: `${user?.first_name} ${user?.last_name}`,
    sender_first_name: user?.first_name,
    sender_last_name: user?.last_name,
    sender_company: user?.Company.name,
    calendly_link: user?.calendly_url,

    //account
    country: Account?.country,
    zipcode: Account?.zipcode,
    size: Account?.size,
    website: Account?.url,
    account_linkedin_url: Account?.linkedin_url,

    //prospect
    full_name: lead.full_name,
    first_name: lead.first_name,
    last_name: lead.last_name,
    company_name: Account?.name,
    owner: `${user?.first_name} ${user?.last_name}`,
    phone:
      lead.Lead_phone_numbers.find((ph) => ph.is_primary)?.phone_number ||
      lead.Lead_phone_numbers[0]?.phone_number,
    email:
      lead.Lead_emails.find((em) => em.is_primary)?.email_id ||
      lead.Lead_emails[0]?.email_id,
  };

  //replace text variables
  Object.keys(CUSTOM_VARIABLES_TEXT_OPTIONS).forEach((custom_v) => {
    text = text.replaceAll(
      custom_v,
      VALUES[CUSTOM_VARIABLES_TEXT_OPTIONS[custom_v]] ?? ''
    );
  });

  //replate date variables
  text = text.replaceAll('{{today}}', moment().format('DD/MM/YYYY'));
  text = text.replaceAll(
    '{{tomorrow}}',
    moment().add(1, 'days').format('DD/MM/YYYY')
  );

  const digits = /\d+/;
  //replace N_days variable
  const nDaysRegex = /\{\{\d+_days\}\}/g;
  let nDaysVariables = text.match(nDaysRegex);

  nDaysVariables?.forEach((n) => {
    let n_days = parseInt(n.match(digits));
    text = text.replaceAll(
      n,
      moment().add(n_days, 'days').format('DD/MM/YYYY')
    );
  });

  //replace N_week_days_from_now
  const nWeekDaysRegex = /\{\{\d+_week_days_from_now\}\}/g;
  let nWeekDaysVariables = text.match(nWeekDaysRegex);

  function addWeekdays(date, days) {
    date = moment(date); // use a clone
    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date.format('DD/MM/YYYY');
  }

  nWeekDaysVariables?.forEach((n) => {
    let n_days = parseInt(n.match(digits));
    text = text.replaceAll(n, addWeekdays(moment(), n_days));
  });

  return text;
};

const CUSTOM_VARIABLES_TEXT_OPTIONS = {
  '{{first_name}}': 'first_name',
  '{{last_name}}': 'last_name',
  '{{company_name}}': 'company_name',
  '{{full_name}}': 'full_name',
  '{{email}}': 'email',
  '{{phone}}': 'phone',
  '{{owner}}': 'owner',
  '{{account_linkedin_url}}': 'account_linkedin_url',
  '{{website}}': 'website',
  '{{size}}': 'size',
  '{{zipcode}}': 'zipcode',
  '{{country}}': 'country',
  '{{sender_first_name}}': 'sender_first_name',
  '{{sender_last_name}}': 'sender_last_name',
  '{{sender_name}}': 'sender_name',
  '{{sender_email}}': 'sender_email',
  '{{sender_phone_number}}': 'sender_phone_number',
  '{{sender_company}}': 'sender_company',
  '{{calendly_link}}': 'calendly_link',
};

export default processCustomVariables;
