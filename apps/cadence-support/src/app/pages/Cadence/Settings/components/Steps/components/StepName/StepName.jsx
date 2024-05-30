import { StripHtml } from '@cadence-support/utils';

const StepName = ({ step, cadence, name, setValue, disabled }) => {
  return (
    <p>
      {step?.type === 'mail' || step?.type === 'automated_mail'
        ? step?.data?.aBTestEnabled
          ? 'A/B test enabled'
          : `Sub : ${StripHtml(step?.data?.subject ?? '').slice(0, 50)}`
        : step?.type === 'reply_to' || step?.type === 'automated_reply_to'
        ? step?.data?.replied_node_id?.length !== 0
          ? cadence?.nodes?.find(
              (s) => s.step_number === step?.data?.replied_node_id
            )?.data?.aBTestEnabled
            ? 'Multiple Subjects'
            : `Sub : Re: ${StripHtml(
                cadence?.nodes?.find(
                  (s) => s.step_number === step?.data?.replied_node_id
                )?.data?.subject ?? ''
              ).slice(0, 50)}`
          : 'Sub :'
        : step?.type === 'message' ||
          step?.type === 'automated_message' ||
          step?.type === 'whatsapp'
        ? step?.data?.aBTestEnabled
          ? 'A/B test enabled'
          : `Message : ${StripHtml(step?.data?.message ?? '').slice(0, 50)}`
        : step?.type === 'call' || step?.type === 'callback'
        ? `Script : ${StripHtml(step?.data?.script ?? '').slice(0, 50)}`
        : `Instructions : ${StripHtml(step?.data?.message ?? '').slice(0, 50)}`}
    </p>
  );
};

export default StepName;
