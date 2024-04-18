import { useCallback, useEffect, useState } from 'react';

export const useScrollObserver = (initial: boolean) => {
   const [isFetching, setIsFetching] = useState<boolean>(initial);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const scrollHandler = useCallback((e: any) => {
      if (
         e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) <
         100
      )
         setIsFetching(true);
   }, []);

   useEffect(() => {
      document.addEventListener('scroll', scrollHandler);
      return () => document.removeEventListener('scroll', scrollHandler);
   }, [scrollHandler]);

   return { isFetching, setIsFetching };
};
