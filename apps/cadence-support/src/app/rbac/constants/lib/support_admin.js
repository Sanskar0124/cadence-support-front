import { Navigate } from 'react-router-dom';

import {
  Company as CompanyIcon,
  Settings,
  Tasks,
  HomeIcon,
  Leads,
  Statistics,
} from '@cadence-support/icons';

import Company from '../../../pages/Company/Company';
import CompanyDetails from '../../../pages/Company/components/CompanyDetails/CompanyDetails';
import Home from '../../../pages/Home/Home';
import TeamMembers from '../../../pages/Company/components/CompanyDetails/components/MemberList/TeamMembers/TeamMembers';
import MemberDetails from '../../../pages/Company/components/MemberDetails/MemberDetails';
import UserAccess from '../../../pages/UserAccess/UserAccess';
import StatisticsPage from '../../../pages/Statistics/Statistics';

const SUPPORT_ADMIN_ROUTES = [
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
    link: '/useraccess',
    name: 'User Access',
    component: <UserAccess />,
    icon: <Leads />,
  },
  {
    fullScreen: false,
    includedInSidebar: true,
    link: '/stats',
    name: 'Statistics',
    component: <StatisticsPage />,
    icon: <Statistics />,
  },
];

export default SUPPORT_ADMIN_ROUTES;
