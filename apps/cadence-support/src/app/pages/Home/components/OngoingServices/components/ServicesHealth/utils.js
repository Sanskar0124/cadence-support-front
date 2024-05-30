export const handleCalendarServices = (calendarServices, addError, setData) => {
  calendarServices(
    {},
    {
      onSuccess: (data) => {
        setData((prev) => ({ ...prev, calendar: data }));
      },
      onError: (err) => {
        addError(err?.response?.data?.msg);
      },
    }
  );
};
