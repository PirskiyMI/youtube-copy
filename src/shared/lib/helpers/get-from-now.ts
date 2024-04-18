export const getFromNow = (date: string) => {
   const timeMs = Date.parse(date);

   const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

   const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365];
   const units: Intl.RelativeTimeFormatUnit[] = [
      'seconds',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'year',
   ];

   const unitIndex =
      Math.abs(deltaSeconds) > cutoffs[5]
         ? 6
         : cutoffs.findIndex((el) => el > Math.abs(deltaSeconds));
   const division = unitIndex ? cutoffs[unitIndex - 1] : 1;

   const rtf = new Intl.RelativeTimeFormat(navigator.language);

   const res = rtf.format(
      Math.floor(deltaSeconds / division),
      units[unitIndex] ? units[unitIndex] : units[6],
   );

   return res;
};
