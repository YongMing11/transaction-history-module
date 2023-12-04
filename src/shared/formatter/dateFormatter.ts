
// e.g. 1 Jan 2023, 3:30 PM
export const formatDateToFullDateTimeString = (date: Date): string => {
    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  };

// e.g. 1 Jan, 3:30 PM
export const formatDateToDateTimeStringWithoutYear = (date: Date): string => {
    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  };

// e.g. Jan 2023
export const formatDateToMonthYearString = (date: Date): string => {
    return date.toLocaleString("en-GB", {
        month: "short",
        year: "numeric",
      });
  };