/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Select } from '@cadence-support/widgets';
import { DateData } from './utils';

import './InputDate.scss';
import { DATE_TYPE_OPTIONS } from '@cadence-support/constants';

const InputDate = ({
  value,
  setValue,
  aheadOfDate = false,
  className,
  ...rest
}) => {
  const aheadDateOptions = [];
  const currentDate = new Date().getDate();
  for (let i = 0; i < DATE_TYPE_OPTIONS.length; i++) {
    if (DATE_TYPE_OPTIONS[i].value > currentDate) {
      aheadDateOptions.push(DATE_TYPE_OPTIONS[i]);
    }
  }

  return (
    <div className={`input-date ${className}`} {...rest}>
      <div className="input-fields">
        {DateData.map((obj) => {
          return (
            <div className={obj.name} key={obj.name}>
              <Select
                name={obj.name}
                options={aheadOfDate ? aheadDateOptions : obj.options}
                value={value}
                setValue={setValue}
                placeholder={obj.name}
                {...rest}
              />
            </div>
          );
        })}
      </div>{' '}
    </div>
  );
};

export default InputDate;
