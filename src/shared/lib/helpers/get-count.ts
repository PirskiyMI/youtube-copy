export const getCount = (viewCount: string) => {
   if (+viewCount < 1000) return viewCount;

   const calculation = (+viewCount / 1000000).toFixed(1);

   if (+calculation >= 1) {
      return `${calculation} млн`;
   }
   return `${(+viewCount / 1000).toFixed(1)} тыс.`;
};
