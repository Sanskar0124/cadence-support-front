import { Navigate } from 'react-router-dom';

import {
  Company as CompanyIcon,
  Tasks,
  HomeIcon,
  Statistics,
  Cadences,
} from '@cadence-support/icons';

import Company from '../../../pages/Company/Company';
import CompanyDetails from '../../../pages/Company/components/CompanyDetails/CompanyDetails';
import Home from '../../../pages/Home/Home';
import TeamMembers from '../../../pages/Company/components/CompanyDetails/components/MemberList/TeamMembers/TeamMembers';
import MemberDetails from '../../../pages/Company/components/MemberDetails/MemberDetails';
import StatisticsPage from '../../../pages/Statistics/Statistics';
import Cadence from '../../../pages/Cadence/Cadence';
import Settings from '../../../pages/Cadence/Settings/Settings';

const SUPPORT_AGENT_ROUTES = [
  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/home',
    name: 'Home',
    component: <Home />,
    icon: <HomeIcon />,
  },

  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/company',
    name: 'Company',
    component: <Company />,
    icon: <CompanyIcon />,
  },

  {
    fullScreen: true,
    includedInSidebar: false,
    link: '/company/:companyID',
    name: 'Company Details',
    component: <CompanyDetails />,
  },
  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/stats',
    name: 'Statistics',
    component: <StatisticsPage />,
    icon: <Statistics />,
  },
  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/cadence',
    name: 'Cadences',
    component: <Cadence />,
    icon: <Cadences />,
  },
  {
    fullScreen: false,
    includedInSidebar: false,
    link: 'cadence/edit/:id',
    name: 'Cadences',
    component: <Settings />,
  },
];

export default SUPPORT_AGENT_ROUTES;
