export const GenerateCompanyOptionsFromSfMap = (sfMap) => {
  const lead_company_size = sfMap?.lead_map?.size?.picklist_values;
  const account_company_size = sfMap?.account_map?.size?.picklist_values;
  console.log(lead_company_size, account_company_size, 'kc');

  let allPicklistValues = [];
  if (lead_company_size?.length > 0) allPicklistValues = lead_company_size;

  if (account_company_size.length > 0) {
    console.log('ran');
    account_company_size.forEach((obj1) => {
      if (
        allPicklistValues.filter(
          (obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)
        ).length < 1
      )
        allPicklistValues.push(obj1);
    });
  }

  allPicklistValues.sort((a, b) => a.value < b.value);

  let newCompanySizeOptions = {};

  allPicklistValues.forEach(({ label, value }, _) => {
    newCompanySizeOptions[value] = label;
  });

  return newCompanySizeOptions;
};
