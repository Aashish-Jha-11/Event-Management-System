import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateForInput = (date, tz) => {
  if (!date) return '';
  return dayjs(date).tz(tz).format('YYYY-MM-DD');
};

export const formatTimeForInput = (date, tz) => {
  if (!date) return '09:00';
  return dayjs(date).tz(tz).format('HH:mm');
};

export const formatDateTime = (date, tz) => {
  if (!date) return '';
  return dayjs(date).tz(tz).format('MMM D, YYYY @ h:mm A');
};

export const formatDateTimeFull = (date, tz) => {
  if (!date) return '';
  return dayjs(date).tz(tz).format('MMMM D, YYYY @ h:mm A');
};

export const combineDateAndTime = (dateStr, timeStr, tz) => {
  const combined = `${dateStr} ${timeStr}`;
  return dayjs.tz(combined, tz).toISOString();
};

export const convertToTimezone = (date, fromTz, toTz) => {
  return dayjs(date).tz(fromTz).tz(toTz);
};

export const isValidDateRange = (startDate, endDate) => {
  return dayjs(endDate).isAfter(dayjs(startDate));
};

export { dayjs };
