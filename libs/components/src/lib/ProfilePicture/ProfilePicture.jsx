import React, { forwardRef, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import Image from '../Image/Image';

const ProfilePicture = (
  { className, alt = 'user', showDefault, ...rest },
  ref
) => {
  const user = useRecoilValue(userInfo);
  const [imageURL, setImageURL] = useState(user.profile_picture);
  const [errorOccured, setErrorOccured] = useState(false);

  const onError = () => {
    if (!errorOccured) {
      setImageURL('https://cdn.ringover.com/img/users/default.jpg');
      setErrorOccured(true);
    }
  };

  return (
    <Image
      src={
        showDefault
          ? 'https://cdn.ringover.com/img/users/default.jpg'
          : imageURL
      }
      className={className}
      ref={ref}
      alt={alt}
      {...rest}
      onError={onError}
    />
  );
};

export default forwardRef(ProfilePicture);
