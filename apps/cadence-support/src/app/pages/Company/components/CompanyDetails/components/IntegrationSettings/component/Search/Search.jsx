import { useOutsideClickHandler } from '@cadence-support/utils';
import { SearchBar } from '@cadence-support/widgets';
import { useEffect, useRef, useState } from 'react';
import { getSearchCategoryLabel, getSearchOptions } from './constants';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
import { getSettingpageTabOptions } from '../../../constants';
import { Div } from '@cadence-support/components';
import SearchPlaceholder from 'libs/widgets/src/lib/SearchResults/Placeholder/Placeholder';

const Search = ({
  setSelectedSubTabs,
  setSelectedInnerTab,
  setSelectedTab,
  isTaskLoading,
}) => {
  const searchRef = useRef();
  const [value, setValue] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const onFocus = () => setOptionsVisible(true);
  const onBlur = () => setOptionsVisible(false);
  const [companyItem, setCompanyItem] = useState(
    JSON.parse(localStorage.getItem('company'))
  );
  const TABS_OPTIONS = getSettingpageTabOptions(companyItem?.integration_type);
  const [loading, setLoading] = useState(false);

  useOutsideClickHandler(searchRef, onBlur);

  useEffect(() => {
    if (value.length) {
      const filteredOptions = getSearchOptions()
        //filter options available for the integration
        .filter(
          (option) =>
            !option.integration_not_available?.includes(
              companyItem?.integration_type
            )
        )
        .filter((option) =>
          option.keywords.some((keyword) =>
            keyword?.toLowerCase().includes(value.toLowerCase())
          )
        );
      let categorizedOptions = {};
      filteredOptions.forEach((op) => {
        categorizedOptions[op.category] = [
          ...(categorizedOptions[op.category] || []),
          op,
        ];
      });
      setSearchOptions(categorizedOptions);
    } else {
      setSearchOptions([]);
    }
  }, [value]);

  const searchMenuHandler = (e, key, option) => {
    setSelectedTab(TABS_OPTIONS?.find((item) => item?.title === 'Settings'));
    const subTabSelected = TABS_OPTIONS?.find(
      (item) => item?.title === 'Settings'
    )?.subTabs?.find((item) => item?.name === key);
    setSelectedSubTabs(subTabSelected);
    setSelectedInnerTab(option?.label);
    const sidebar = document.getElementById('tabscontainer');
    sidebar.scrollTop = sidebar.scrollHeight;
  };

  return (
    <div className={styles.searchBar} ref={searchRef}>
      <SearchBar
        width="300px"
        value={value}
        setValue={setValue}
        onFocus={onFocus}
        placeholderText={'Search'}
      />

      <div
        className={`${styles.results} ${optionsVisible ? styles.visible : ''}`}
      >
        {Object.keys(searchOptions).map((key) => (
          <div>
            <span>{getSearchCategoryLabel(key)}</span>
            {loading ? (
              <SearchPlaceholder />
            ) : (
              searchOptions[key].map((option) => (
                <div>
                  <span
                    onClick={(e) => {
                      searchMenuHandler(e, key, option);
                      setOptionsVisible(false);
                      e.stopPropagation();
                    }}
                  >
                    {option.label}
                  </span>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
