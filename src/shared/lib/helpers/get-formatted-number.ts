export const getFormattedNumber = (num: string) =>
   num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
