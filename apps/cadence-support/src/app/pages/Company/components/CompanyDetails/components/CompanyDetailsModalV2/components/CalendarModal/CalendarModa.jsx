import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Modal } from '@cadence-support/components';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useEffect } from 'react';

const CalendarModal = ({
  isModal,
  setShowCalendar,
  value,
  setValue,
  todaysDate,
  licenseActiveDate,
}) => {
  return (
    <Modal
      isModal={isModal}
      onClose={() => setShowCalendar(!isModal)}
      showCloseButton
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem>
          <DateCalendar
            value={value.selectedDate}
            onChange={(newValue) =>
              setValue((prev) => ({
                ...prev,
                selectedDate: newValue,
              }))
            }
            minDate={
              value.expiryDate ? dayjs(value.expiryDate) : dayjs(todaysDate)
            }
          />
        </DemoItem>
      </LocalizationProvider>
    </Modal>
  );
};

export default CalendarModal;
