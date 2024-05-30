export default function () {
  // let url = '/crm/login?log_out=true',
  let url = '/login?log_out=true',
    port = '4200';

  if (window.location.origin.includes('localhost'))
    url = `http://localhost:${port}${url}`;

  return window.location.replace(url);
}
