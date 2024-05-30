import { getLabelFromEnum } from '@cadence-support/utils';
import styles from './Content.module.scss';
import { Editor, Label } from '@cadence-support/widgets';

import { CADENCE_NODE_TYPES } from '@cadence-support/constants';

import ReactHtmlParser from 'html-react-parser';
import { useEffect, useState } from 'react';
import { userInfo } from '@cadence-support/atoms';
import { useRecoilValue } from 'recoil';
import { Download, Leads } from '@cadence-support/icons';
import { STEP_FIELD_NAME } from '../constant';

const Content = ({ step, templateIndex, cadence }) => {
  const user = useRecoilValue(userInfo);
  const renderBody = () => {
    const value = step?.data?.aBTestEnabled
      ? step?.data?.templates?.[
          templateIndex < step?.data?.templates?.length ? templateIndex : 0
        ]?.[STEP_FIELD_NAME[step?.type]]
      : step?.data?.[STEP_FIELD_NAME[step?.type]];

    return value;
  };

  const renderAttachments = () => {
    const attachments = step?.data?.aBTestEnabled
      ? step?.data?.templates?.[
          templateIndex < step?.data?.templates?.length ? templateIndex : 0
        ]?.['attachments']
      : step?.data?.['attachments'];
    return attachments;
  };
  const [content, setContent] = useState(renderBody());
  const [attachments, setAttachments] = useState(renderAttachments());
  const renderSubject = () => {
    if (
      step?.type === CADENCE_NODE_TYPES.REPLY_TO ||
      step?.type === CADENCE_NODE_TYPES.AUTOMATED_REPLY_TO
    ) {
      let orignal = cadence?.sequence?.find(
        (st) => st.node_id === step?.data.replied_node_id
      );
      if (!orignal) return;
      if (orignal?.data.aBTestEnabled) return;
      return `Re: ${orignal?.data.subject}`;
    }
    if (step?.data?.aBTestEnabled)
      return step?.data?.templates?.[
        templateIndex < step?.data?.templates?.length ? templateIndex : 0
      ]?.subject;
    else return step?.data?.subject;
  };

  useEffect(() => {
    setContent(renderBody());
    setAttachments(renderAttachments());
  }, [step, templateIndex]);

  const renderComponent = (stepType) => {
    switch (stepType) {
      case 'reply_to':
        return content ? (
          <div
            className={`${styles.content} ${
              step?.data?.aBTestEnabled ? styles.isAbTestEnabled : ''
            }`}
          >
            {renderSubject() && (
              <div className={styles.subject}>
                <Label>Subject</Label>
                <p>{renderSubject()}</p>
              </div>
            )}

            <div className={styles.body}>
              {content && (
                <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>
              )}
              {step && ReactHtmlParser(content)}
            </div>

            <div className={styles.attachment}>
              {attachments?.length > 0 && <Label>Attachments</Label>}
              {attachments?.length > 0 &&
                attachments?.map((attachment) => (
                  <div className={styles.attachmentContainer}>
                    <p>{attachment?.original_name}</p>
                    <Download />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <Empty user={user} />
        );

      case 'automated_mail':
      case 'mail':
        return renderSubject() || content ? (
          <div
            className={`${styles.content} ${
              step?.data?.aBTestEnabled ? styles.isAbTestEnabled : ''
            }`}
          >
            {renderSubject() && (
              <div className={styles.subject}>
                <Label>Subject</Label>
                <p>{renderSubject()}</p>
              </div>
            )}
            <div className={styles.body}>
              {content && (
                <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>
              )}
              {step && ReactHtmlParser(content)}
            </div>

            <div className={styles.attachment}>
              {attachments?.length > 0 && <Label>Attachments</Label>}
              {attachments?.length > 0 &&
                attachments?.map((attachment) => (
                  <div className={styles.attachmentContainer}>
                    <p>{attachment?.original_name}</p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <Empty user={user} />
        );

      case CADENCE_NODE_TYPES.MESSAGE:
      case CADENCE_NODE_TYPES.AUTOMATED_MESSAGE:
        return content ? (
          <div
            className={`${styles.content} ${
              step?.data?.aBTestEnabled ? styles.isAbTestEnabled : ''
            }`}
          >
            <div className={styles.body}>
              {step && ReactHtmlParser(content)}
            </div>
          </div>
        ) : (
          <Empty user={user} />
        );

      default:
        return (
          <div
            className={`${styles.content} ${
              step?.data?.aBTestEnabled ? styles.isAbTestEnabled : ''
            }`}
          >
            {renderSubject() && (
              <div className={styles.subject}>
                <Label>Subject</Label>
                <p>{renderSubject()}</p>
              </div>
            )}
            <div className={styles.body}>
              {content && (
                <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>
              )}
              {step && content ? (
                ReactHtmlParser(content)
              ) : (
                <Empty user={user} />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* {renderSubject() && (
				<div className={styles.subject}>
					<Label>{COMMON_TRANSLATION.SUBJECT[user?.language?.toUpperCase()]}</Label>
					<p>{renderSubject()}</p>
				</div>
			)}
			<div className={styles.body}>
				{content && <Label>{getLabelFromEnum(STEP_FIELD_NAME[step?.type])}</Label>}
				{step && content ? (
					ReactHtmlParser(
						step?.type === CADENCE_NODE_TYPES.AUTOMATED_MAIL ||
							step?.type === CADENCE_NODE_TYPES.MAIL ||
							step?.type === CADENCE_NODE_TYPES.REPLY_TO ||
							step?.type === CADENCE_NODE_TYPES.AUTOMATED_REPLY_TO
							? step?.data?.aBTestEnabled
								? step?.data?.templates?.[
										templateIndex < step?.data?.templates?.length ? templateIndex : 0
								  ]?.[STEP_FIELD_NAME[step?.type]]
								: step?.data?.[STEP_FIELD_NAME[step?.type]]
							: step?.data[STEP_FIELD_NAME[step?.type]]
					)
				) : (
					<Empty />
				)}
			</div> */}

      {renderComponent(step?.type)}
    </>
  );
};

export default Content;

const Empty = (user) => {
  return (
    <div className={styles.emptySpaceWrapper}>
      <div className={styles.emptySpace}>
        <div className={styles.title}>No Selection made</div>
      </div>
    </div>
  );
};
