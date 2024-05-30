import { Button, Tooltip } from '@pipedrive/components';
import { Close } from '@cadence-support/icons';

import { Editor, Label } from '@pipedrive/widgets';
import { getLabelFromEnum } from '@cadence-support/utils';

import { CADENCE_NODE_TYPES } from '@cadence-support/constants';
import { STEP_FIELD_NAME } from './constants';

import styles from './StepInfo.module.scss';
import { Common as COMMON_TRANSLATION } from '@cadence-support/languages';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';

const StepInfo = ({ step, onClose }) => {
  const user = useRecoilValue(userInfo);
  return (
    <div className={styles.stepInfo}>
      <div className={styles.header}>
        <Button className={styles.closeBtn} onClick={onClose}>
          <Tooltip text="Close">
            <Close color={'#567191'} />
          </Tooltip>
        </Button>
        <h3>
          <span>
            {COMMON_TRANSLATION.STEP[user?.language?.toUpperCase()]}{' '}
            {step?.step_number}:
          </span>
          {step?.name}
        </h3>
      </div>
      <div className={styles.main}>
        {(step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL ||
          step?.type === CADENCE_NODE_TYPES.MAIL ||
          step?.type === CADENCE_NODE_TYPES.REPLY_TO) && (
          <div>
            <Label>
              {COMMON_TRANSLATION.SUBJECT[user?.language?.toUpperCase()]}
            </Label>
            <p>
              {step?.type === 'automated_mail'
                ? step?.data[0]?.subject
                : step?.data?.subject}
            </p>
          </div>
        )}
        <div className={styles.body}>
          <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>
          <Editor
            value={
              step?.type === 'automated_mail'
                ? step?.data[0]?.[STEP_FIELD_NAME[step?.type]]
                : step?.data[STEP_FIELD_NAME[step?.type]]
            }
            setValue={() => null}
            className={styles.editor}
            disabled
            height="calc(100vh-100px)"
          />
        </div>
      </div>
    </div>
  );
};

export default StepInfo;
