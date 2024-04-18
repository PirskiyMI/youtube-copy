import { useEffect, useRef, useState } from 'react';

export const useShowMore = () => {
   const [isTextShow, setIsTextShow] = useState(false);
   const [isButtonShow, setIsButtonShow] = useState(false);
   const ref = useRef<HTMLParagraphElement | HTMLDivElement | null>(null);

   useEffect(() => {
      if (ref.current) setIsButtonShow(ref.current.clientHeight !== ref.current.scrollHeight);
   }, []);

   const toggleIsTextShow = () => setIsTextShow(!isTextShow);

   return { isTextShow, isButtonShow, ref, toggleIsTextShow };
};
