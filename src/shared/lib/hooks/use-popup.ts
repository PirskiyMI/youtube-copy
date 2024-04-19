import { useState } from 'react';

interface ReturnResult {
   isPopupVisible: boolean;
   showPopup: () => void;
   hidePopup: () => void;
}

export const usePopup = (): ReturnResult => {
   const [isPopupVisible, setIsPopupVisible] = useState(false);

   const showPopup = () => setIsPopupVisible(true);
   const hidePopup = () => setIsPopupVisible(false);

   return { isPopupVisible, showPopup, hidePopup };
};
