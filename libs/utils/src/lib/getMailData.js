export default function ({
  body,
  subject,
  from,
  cc,
  bcc,
  to,
  lead, //should contain first_name, last_name, LeadEmails(if to isnot there)
  cadence_id,
  node_id,
  from_full_name,
  timeStamp,
}) {
  return {
    subject: subject ?? '',
    body: body ?? '',
    cc: cc ?? '',
    bcc: bcc ?? '',
    timeStamp,
    lead_id: lead?.lead_id ?? '',
    from: from,
    from_full_name: from_full_name,
    to:
      to ??
      lead?.Lead_emails?.filter((em) => em?.is_primary)[0]?.email_id ??
      lead?.email,
    cadence_id: cadence_id ?? 0,
    node_id: node_id ?? 0,
  };
}
