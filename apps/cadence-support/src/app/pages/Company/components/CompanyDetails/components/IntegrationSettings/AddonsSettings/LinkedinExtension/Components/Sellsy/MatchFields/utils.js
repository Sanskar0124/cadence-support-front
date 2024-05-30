//unparse Ringover fields to respective states

import { deepEqual } from '@cadence-support/utils';
import { RINGOVER_FIELDS, VIEWS } from './constants';

//Unparse
export const UnParseRingoverFields = (fieldsInFrontend) => {
  //convert array to diff objects
  const sobject_values = {};
  fieldsInFrontend.forEach((field) => {
    if (!field.isArray) {
      if (field.value.name !== '') {
        //an exception for integration status,company size
        if (field.type.includes('enumeration')) {
          sobject_values[field.backendField] = {};
          sobject_values[field.backendField].name = field.value.name;
          sobject_values[field.backendField].picklist_values =
            field.value.picklist_values;
        } else {
          sobject_values[field.backendField] = field.value.name;
        }
      }
    } else {
      if (!sobject_values[field.backendField]) {
        sobject_values[field.backendField] = [];
      }
      if (field.value.name !== '')
        sobject_values[field.backendField].push(field.value.name);
    }
  });
  return sobject_values;
};

export const ParseRingoverFields = (fieldsFromServer) => {
  return {
    [VIEWS.COMPANY]: RINGOVER_FIELDS[VIEWS.COMPANY].map((field) => {
      if (fieldsFromServer['company_map']?.[field.backendField]) {
        if (!field.isArray) {
          if (field.type.includes('enumeration')) {
            field.value.name =
              fieldsFromServer['company_map']?.[field.backendField].name;
            field.value.picklist_values =
              fieldsFromServer['company_map'][field.backendField]
                ?.picklist_values ?? [];
          } else {
            field.value.name =
              fieldsFromServer['company_map']?.[field.backendField] ?? '';
          }
        } else {
          const index = field.index;
          if (
            index < fieldsFromServer['company_map'][field.backendField].length
          ) {
            field.value.name =
              fieldsFromServer['company_map'][field.backendField][index] ?? '';
          }
        }
      }
      return field;
    }),
    [VIEWS.CONTACT]: RINGOVER_FIELDS[VIEWS.CONTACT].map((field) => {
      if (fieldsFromServer['contact_map']?.[field.backendField]) {
        if (!field.isArray) {
          if (field.type.includes('enumeration')) {
            field.value.name =
              fieldsFromServer['contact_map']?.[field.backendField].name;
            field.value.picklist_values =
              fieldsFromServer['contact_map'][field.backendField]
                ?.picklist_values ?? [];
          } else {
            field.value.name =
              fieldsFromServer['contact_map']?.[field.backendField] ?? '';
          }
        } else {
          const index = field.index;
          if (
            index < fieldsFromServer['contact_map'][field.backendField].length
          ) {
            field.value.name =
              fieldsFromServer['contact_map'][field.backendField][index] ?? '';
          }
        }
      }
      return field;
    }),
  };
};

export const validateFields = (ringoverFields) => {
  //validate fields and return all error messages
  const warnings = {
    [VIEWS.CONTACT]: [],
    [VIEWS.COMPANY]: [],
  };
  ringoverFields[VIEWS.CONTACT].forEach((item) => {
    if (item.backendField === 'first_name' && item.value.name === '') {
      warnings[VIEWS.CONTACT].push(item.label);
    }
  });
  ringoverFields[VIEWS.COMPANY].forEach((item) => {
    if (item.backendField === 'name' && item.value.name === '') {
      warnings[VIEWS.COMPANY].push(item.label);
    }
  });
  return warnings;
};

//returns TRUE if there are changes
export const checkIfChanges = (
  localRingoverFields,
  originalFieldsFromServer
) => {
  if (
    !originalFieldsFromServer?.contact_map ||
    !originalFieldsFromServer?.company_map
  )
    return false;
  const fieldsFromServer = {
    contact_map: originalFieldsFromServer?.contact_map,
    company_map: originalFieldsFromServer?.company_map,
  };

  const localFields = {
    contact_map: UnParseRingoverFields(localRingoverFields[VIEWS.CONTACT]),
    company_map: UnParseRingoverFields(localRingoverFields[VIEWS.COMPANY]),
  };

  if (!deepEqual(localFields, fieldsFromServer)) {
    return true;
  }

  return false;
};
