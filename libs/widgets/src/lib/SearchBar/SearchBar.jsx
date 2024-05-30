import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';

import Input from '../Input/Input';
import { CloseGradient, Company, Search, User } from '@cadence-support/icons';
import { InputThemes } from '@cadence-support/themes';
import { Colors } from '@cadence-support/utils';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const SearchBar = ({
  value,
  setValue,
  width = '100%',
  height,
  minLength = 0,
  onSearch,
  onFocus = () => null,
  className,
  placeholderText,
  companySearch,
  userSearch,
  maxLength,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);

  const user = useRecoilValue(userInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onSearch === 'function') {
        onSearch(value);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div
      className={`${styles.searchBarContainer} ${className ?? ''} ${
        focus ? styles.focus : ''
      }`}
      style={{ width: width, height: height }}
    >
      <div className={styles.searchIcon}>
        {companySearch ? (
          <Company />
        ) : userSearch ? (
          <User size={17} />
        ) : (
          <Search />
        )}
      </div>
      <div className={styles.searchInput}>
        <Input
          type="text"
          value={value}
          setValue={setValue}
          className={styles.inputField}
          onFocus={(e) => {
            onFocus(e);
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          placeholder={
            placeholderText
              ? placeholderText
              : COMMON_TRANSLATION.SEARCH[user?.language?.toUpperCase()]
          }
          theme={InputThemes.TRANSPARENT}
          maxLength={maxLength ?? 30}
          {...rest}
        />

        <div
          className={`${styles.close} ${
            value?.length > 0 ? styles.activeClose : ''
          }`}
          onClick={() => {
            setValue('');
          }}
        >
          <CloseGradient size="1.2rem" color={Colors.white} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
