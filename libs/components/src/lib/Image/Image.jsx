import React, { forwardRef } from 'react';

const Image = ({ ...rest }, ref) => {
  return <img alt="img" ref={ref} {...rest} />;
};

export default forwardRef(Image);
