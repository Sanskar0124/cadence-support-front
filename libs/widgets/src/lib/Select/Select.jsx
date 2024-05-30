/* eslint-disable no-console */
import ReactSelect, { components } from 'react-select';
import { Close2, Tick, TriangleDown } from '@cadence-support/icons';
import { themeStyles } from './ThemeStyles';
import styles from './Select.module.scss';
import { Colors } from '@cadence-support/utils';
import { Spinner } from '@cadence-support/components';
const themes = {
  rounded: '',
};

/**
 * This component is used to render a Select Option Component.
 *
 * @component
 * @example
 * const [value, setValue] = useState("option 1")
 *
 * return (
 * 	<Select
 *  	options={{
 *      option_1: "Option 1",
 *      option_2: "Option 2",
 *      option_3: "Option 3"
 *    }}
 *		value={value}
 *		setValue={setValue}
 *	/>
 * )
 */

const Select = ({
  options,
  value,
  setValue,
  theme = 'rounded',
  width,
  height,
  borderRadius,
  borderColor,
  iconIsRotatable = 'true',
  border,
  background,
  placeholder,
  menuOnTop,
  disabled,
  icon,
  isSearchable,
  isClearable,
  isMulti,
  name,
  numberOfOptionsVisible = '5',
  color,
  font_weight,
  ...rest
}) => {
  const { roundedStyles } = themeStyles({
    width,
    height,
    menuOnTop,
    borderRadius,
    borderColor,
    border,
    background,
    iconIsRotatable,
    numberOfOptionsVisible,
    color,
    font_weight,
    rest,
  });
  themes.rounded = roundedStyles;
  const setSelected = (selected) => {
    if (rest.isMulti && typeof value === 'object' && !Array.isArray(value))
      setValue((prev) => ({
        ...prev,
        [name]: selected?.map((opt) => opt.value),
      }));
    else if (rest.isMulti) {
      setValue(selected?.map((opt) => opt.value));
    } else if (name !== null) {
      setValue((prev) => ({ ...prev, [name]: selected?.value }));
    } else {
      setValue(selected?.value);
    }
  };

  let selectedOption;
  if (!Array.isArray(options)) {
    options = Object.keys(options ?? {})?.map((op) => ({
      label: options[op],
      value: op,
    }));

    options?.forEach((option) => {
      const val = name ? value[name] : value;
      if (option.value === val) selectedOption = option;
    });
  } else if (
    rest.isMulti &&
    typeof value === 'object' &&
    !Array.isArray(value)
  ) {
    selectedOption = value[name]?.map((val) =>
      options.find((option) => option.value === val)
    );
  } else if (rest.isMulti) {
    selectedOption = value?.map((val) =>
      options.find((option) => option.value === val)
    );
  } else {
    options?.forEach((option) => {
      const val = name ? value[name] : value;
      if (option.value === val) selectedOption = option;
    });
  }
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {icon ? (
          icon
        ) : (
          <TriangleDown color={color ? color : Colors.lightBlue} />
        )}
      </components.DropdownIndicator>
    );
  };
  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove {...props}>
        <Close2 color={Colors.lightBlue} size="0.8rem" />
      </components.MultiValueRemove>
    );
  };
  const ClearIndicator = (props) => {
    return (
      <components.ClearIndicator {...props}>
        {isMulti && <Close2 color={Colors.lightBlue} size="0.914rem" />}
      </components.ClearIndicator>
    );
  };
  const LoadingIndicator = (props) => {
    return <Spinner {...props} className={styles.loader} />;
  };
  const Option = (props) => {
    return isMulti ? (
      <components.Option {...props}>
        <div
          style={{
            width: '84%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '30px',
            display: 'flex',
            alignSelf: 'center',
            color: '#5B6BE1',
          }}
          title={props.label}
        >
          {props.label}
        </div>
        {props.isSelected && (
          <div
            style={{
              background:
                'linear-gradient(106.52deg, #A282E8 -11.57%, #7E8EE7 50.39%, #4499E9 116.35%)',
              width: '30px',
              height: '30px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            <Tick
              style={{
                display: 'flex',
                alignSelf: 'center',
                fontWeight: '400',
              }}
              color={Colors.white}
            />
          </div>
        )}
      </components.Option>
    ) : (
      <components.Option {...props} />
    );
  };
  return (
    <ReactSelect
      options={options}
      value={selectedOption}
      onChange={setSelected}
      components={{
        DropdownIndicator,
        MultiValueRemove,
        ClearIndicator,
        Option,
        LoadingIndicator,
      }}
      styles={themes[theme]}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={disabled}
      classNamePrefix="cadence-select"
      isMulti={isMulti}
      closeMenuOnSelect={isMulti && false}
      hideSelectedOptions={false}
      // menuIsOpen={true}

      {...rest}
    />
  );
};

Select.defaultProps = {
  theme: 'rounded',
  width: '100%',
  height: '40px',
  menuOnTop: false,
  disabled: false,
  isSearchable: false,
  name: null,
};

export default Select;
