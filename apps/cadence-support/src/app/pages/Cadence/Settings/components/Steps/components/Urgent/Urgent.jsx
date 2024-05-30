import { FlagTriangle, FlagTriangleGradient } from '@cadence-support/icons';
import { Button } from '@cadence-support/components';
import React, { useEffect, useState, useContext } from 'react';
import { Colors } from '@cadence-support/utils';
import { CadenceContext } from '../../../../Settings';

const Urgent = ({ step, setValue, activeStep }) => {
  const [isUrgent, setIsUrgent] = useState(step.is_urgent);
  const { steps, setSteps, setIsUpdated } = useContext(CadenceContext);

  useEffect(() => {
    setIsUrgent(step.is_urgent);
  }, [step]);

  useEffect(() => {
    setValue((prev) => ({ ...prev, [step.step_number]: isUrgent }));
    setIsUpdated((prev) => ({ ...prev, urgent: true }));
  }, [isUrgent]);

  useEffect(() => {
    if (step) {
      const updatedData = steps.map((item) =>
        item.step_number === activeStep && step.step_number === activeStep
          ? { ...item, is_urgent: isUrgent ?? false }
          : item
      );
      setSteps([...updatedData]);
    }
  }, [isUrgent]);

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setIsUrgent((curr) => !curr);
      }}
    >
      {isUrgent ? (
        activeStep === step.step_number ? (
          <FlagTriangle color={Colors.white} size="1.1rem" />
        ) : (
          <FlagTriangleGradient size="1.1rem" />
        )
      ) : (
        <FlagTriangle
          size="1.1rem"
          color={activeStep === step.step_number ? '#ffffff6a' : '#D7D8F7'}
        />
      )}
    </Button>
  );
};

export default Urgent;
