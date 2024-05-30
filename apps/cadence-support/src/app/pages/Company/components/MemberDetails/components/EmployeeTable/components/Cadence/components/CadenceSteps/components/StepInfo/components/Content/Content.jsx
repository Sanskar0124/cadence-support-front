import { getLabelFromEnum } from '@cadence-support/utils';

import styles from './Content.module.scss';
import { Editor, Label } from '@pipedrive/widgets';

import { CADENCE_NODE_TYPES } from '@cadence-support/constants';
import { STEP_FIELD_NAME } from '../../constants';
import ReactHtmlParser from 'html-react-parser';
import { useEffect } from 'react';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const Content = ({ step, mailIndex }) => {
  const user = useRecoilValue(userInfo);

  return (
    <div className={styles.content}>
      {(step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL ||
        step?.type === CADENCE_NODE_TYPES.MAIL ||
        step?.type === CADENCE_NODE_TYPES.REPLY_TO) && (
        <div className={styles.subject}>
          <Label>
            {COMMON_TRANSLATION.SUBJECT[user?.language?.toUpperCase()]}
          </Label>
          <p>
            {step?.type === 'automated_mail'
              ? step?.data?.[0]?.aBTestEnabled
                ? step?.data?.[0]?.templates?.[
                    mailIndex < step?.data?.[0]?.templates?.length
                      ? mailIndex
                      : 0
                  ]?.subject
                : step?.data?.[0]?.subject
              : step?.data?.aBTestEnabled
              ? step?.data?.templates?.[
                  mailIndex < step?.data?.templates?.length ? mailIndex : 0
                ]?.subject
              : step?.data?.subject}
          </p>
        </div>
      )}
      <div className={styles.body}>
        <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>
        {step &&
          ReactHtmlParser(
            step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL
              ? step?.data?.[0]?.aBTestEnabled
                ? step?.data?.[0]?.templates?.[
                    mailIndex < step?.data?.[0]?.templates?.length
                      ? mailIndex
                      : 0
                  ]?.[STEP_FIELD_NAME[step?.type]]
                : step?.data?.[0]?.[STEP_FIELD_NAME[step?.type]]
              : step?.type === CADENCE_NODE_TYPES.MAIL ||
                step?.type === CADENCE_NODE_TYPES.REPLY_TO
              ? step?.data?.aBTestEnabled
                ? step?.data?.templates?.[
                    mailIndex < step?.data?.templates?.length ? mailIndex : 0
                  ]?.[STEP_FIELD_NAME[step?.type]]
                : step?.data?.[STEP_FIELD_NAME[step?.type]]
              : step?.data[STEP_FIELD_NAME[step?.type]]
          )}
      </div>
    </div>
  );
};

export default Content;
