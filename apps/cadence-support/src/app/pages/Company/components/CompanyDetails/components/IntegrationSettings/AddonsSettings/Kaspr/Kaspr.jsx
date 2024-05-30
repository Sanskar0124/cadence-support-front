import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LEAD_INTEGRATION_TYPE_MAP } from 'apps/cadence-support/src/app/pages/Company/constants';
import KasprAddon from './KasprAddons/KasprAddons';

const Kaspr = (props) => {
  const navigate = useNavigate();

  const getIntegrationtype = () => {
    let integration = localStorage.getItem('company');
    if (integration) integration = JSON.parse(integration);
    return integration;
  };
  const integration = getIntegrationtype();

  const integrationProps =
    LEAD_INTEGRATION_TYPE_MAP[integration?.integration_type];

  if (!integrationProps) navigate('/404');

  return <KasprAddon {...props} {...integrationProps} />;
};

export default Kaspr;
