import { Navigate } from 'react-router-dom';

import { Company as CompanyIcon } from '@cadence-support/icons';
import AddComapny from '../../../pages/AddCompany/AddCompany';

const SALES_AGENT_ROUTES = [
  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/addCompany',
    name: 'Add Company',
    component: <AddComapny />,
    icon: <CompanyIcon />,
  },
];

export default SALES_AGENT_ROUTES;
