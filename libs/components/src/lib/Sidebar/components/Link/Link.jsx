import { TooltipThemes } from '@cadence-support/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../../Tooltip/Tooltip';
import styles from './Link.module.scss';

const Link = ({ icon, name, active, to, onClick }) => {
  const navigate = useNavigate();
  return (
    <Tooltip
      theme={TooltipThemes.RIGHT}
      text={name}
      className={`${styles.link} ${active ? styles.active : ''}`}
      onClick={() => {
        if (onClick && typeof onClick === 'function') onClick();
        else navigate(to);
      }}
    >
      {icon}
    </Tooltip>
  );
};

export default Link;
