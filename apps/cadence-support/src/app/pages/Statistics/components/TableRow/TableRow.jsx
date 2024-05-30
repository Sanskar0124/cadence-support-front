import React from 'react';
import styles from './TableRow.module.scss';
import { ProfilePicture, Image, Tooltip } from '@cadence-support/components';
import { ArrowDown, ArrowUp, Company } from '@cadence-support/icons';
import { COMMON_HEADERS, getTooltipText } from '../../constants';

const TableRow = ({ tableFor, company, filter }) => {
  return (
    <div className={styles.card}>
      <div className={styles.indexzero}>
        <div className={styles.profile_img}>
          {tableFor === 'company' ? (
            <Company />
          ) : (
            <img
              src="https://cdn.ringover.com/img/users/default.jpg"
              alt="profile_picture"
              id="user-profile"
            />
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.name}>{company.name}</p>
          <p className={styles.users}>{company?.users} users</p>
        </div>
      </div>
      {COMMON_HEADERS?.map((header, index) => {
        return (
          <div
            className={`${styles.datavalue} ${styles[`datavalue_${index}`]}`}
          >
            <p className={styles.taskvalue}>{company[header?.value]}</p>
            <Tooltip
              text={getTooltipText(company?.profit, filter)}
              theme="LEFT"
            >
              <div
                className={` ${styles.percentagediv} ${
                  styles[
                    `percentagediv_${
                      company?.profit ? 'total_task' : 'avg_task'
                    }`
                  ]
                }`}
              >
                <p className={styles.percentage}>{company?.percentage}%</p>
                <span>
                  {company?.profit ? (
                    <ArrowUp size={11} />
                  ) : (
                    <ArrowDown size={11} />
                  )}
                </span>
              </div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
