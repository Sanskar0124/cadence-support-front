import { ROLES } from '@cadence-support/constants';
import SALES_AGENT_ROUTES from './lib/sales_agent';
import SUPPORT_AGENT_ROUTES from './lib/support_agent';
import SUPPORT_ADMIN_ROUTES from './lib/support_admin';

export const ROLE_ROUTES = {
  [ROLES.SUPPORT_AGENT]: SUPPORT_AGENT_ROUTES,
  [ROLES.CADENCE_SALES]: SALES_AGENT_ROUTES,
  [ROLES.SUPPORT_ADMIN]: SUPPORT_ADMIN_ROUTES,
  [ROLES.SALES_MANAGER]: SUPPORT_AGENT_ROUTES,
};
