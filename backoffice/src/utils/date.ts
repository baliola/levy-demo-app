export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatDateShort = (date: Date): string => {
  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};

export const formatDateRangeNew = (
  start: string,
  includeTime: boolean = true
): string => {
  const startDate = new Date(start);

  const formattedStartDate = startDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return includeTime
    ? `${formattedStartDate} ${formattedStartTime}`
    : `${formattedStartDate} `;
};

export const formatDateRange = (
  start: string,
  end?: string,
  includeTime: boolean = true
): string => {
  const startDate = new Date(start);

  const formattedStartDate = startDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (!end) {
    // If only a single date is provided
    return includeTime
      ? `${formattedStartDate} ${formattedStartTime}`
      : formattedStartDate;
  } else {
    const endDate = new Date(end);

    const formattedEndDate = endDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedEndTime = endDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return includeTime
      ? `${formattedStartDate} ${formattedStartTime} - ${formattedEndDate} ${formattedEndTime}`
      : `${formattedStartDate} - ${formattedEndDate}`;
  }
};

export const convertDateISOToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const convertDateISOToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
