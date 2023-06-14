export const formatDate = (dateFrom: string) => {
  const date = new Date(dateFrom);

  // Get the day of the week
  const optionsDay: Intl.DateTimeFormatOptions = { weekday: "long" };
  const dayOfWeek = date.toLocaleDateString("en-US", optionsDay);

  // Get the date
  const optionsDate: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  // Concatenate the day and date
  return `${dayOfWeek} ${formattedDate}`;
};
