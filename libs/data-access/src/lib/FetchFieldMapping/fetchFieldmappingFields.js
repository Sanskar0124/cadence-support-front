import { AuthorizedApi } from '../api';
import { useMutation, useQuery } from 'react-query';
import { fetchIntegrationObjectStrategy } from './useSettings.strategy';
import { INTEGRATION_TYPE } from '@cadence-support/constants';

const fetchFieldmappingFields = (companyID, integrationType) => {
  const PATH = `/v1/company/enrichments/describe`;

  const getContactFields = async (type) => {
    return AuthorizedApi.get(`${PATH}/${companyID}/contact`).then((res) => {
      return fetchIntegrationObjectStrategy({
        integration_type: integrationType,
        res,
      });
    });
  };

  const { mutate: contactFields, isLoading: iscontactfieldsLoading } =
    useMutation(getContactFields);

  const getAccountFields = async (type) => {
    return AuthorizedApi.get(`${PATH}/${companyID}/account`).then((res) => {
      return fetchIntegrationObjectStrategy({
        integration_type: integrationType,
        res,
      });
    });
  };

  const { mutate: accountFields, isLoading: isaccountfieldsLoading } =
    useMutation(getAccountFields);

  const getLeadFields = async () => {
    return AuthorizedApi.get(`${PATH}/${companyID}/lead`).then((res) => {
      return fetchIntegrationObjectStrategy({
        integration_type: integrationType,
        res,
      });
    });
  };

  const { mutate: leadFields, isLoading: isleadfieldsLoading } =
    useMutation(getLeadFields);

  const getCandidateFields = async () => {
    return integrationType === INTEGRATION_TYPE.BULLHORN
      ? AuthorizedApi.get(`${PATH}/${companyID}/candidate`).then((res) => {
          return fetchIntegrationObjectStrategy({
            integration_type: integrationType,
            res,
          });
        })
      : null;
  };

  const { mutate: candidateFields, isLoading: iscandidatefieldsLoading } =
    useMutation(getCandidateFields);

  const getCompanyFields = async () => {
    return integrationType === INTEGRATION_TYPE.HUBSPOT ||
      integrationType === INTEGRATION_TYPE.SELLSY
      ? AuthorizedApi.get(`${PATH}/${companyID}/company`).then((res) => {
          return fetchIntegrationObjectStrategy({
            integration_type: integrationType,
            res,
          });
        })
      : null;
  };

  const { mutate: companyFields, isLoading: iscompanyfieldsLoading } =
    useMutation(getCompanyFields);

  const getPersonFields = async () => {
    return integrationType === INTEGRATION_TYPE.PIPEDRIVE
      ? AuthorizedApi.get(`${PATH}/${companyID}/person`).then((res) => {
          return fetchIntegrationObjectStrategy({
            integration_type: integrationType,
            res,
          });
        })
      : null;
  };

  const { mutate: personFields, isLoading: ispersonfieldsLoading } =
    useMutation(getPersonFields);

  const getOrganizationFields = async () => {
    return integrationType === INTEGRATION_TYPE.PIPEDRIVE
      ? AuthorizedApi.get(`${PATH}/${companyID}/organization`).then((res) => {
          return fetchIntegrationObjectStrategy({
            integration_type: integrationType,
            res,
          });
        })
      : null;
  };

  const { mutate: organizationFields, isLoading: isorganizationfieldsLoading } =
    useMutation(getOrganizationFields);

  return {
    contactFields,
    iscontactfieldsLoading,
    accountFields,
    isaccountfieldsLoading,
    leadFields,
    isleadfieldsLoading,
    candidateFields,
    iscandidatefieldsLoading,
    companyFields,
    iscompanyfieldsLoading,
    personFields,
    ispersonfieldsLoading,
    organizationFields,
    isorganizationfieldsLoading,
  };
};

export default fetchFieldmappingFields;
