import { FC } from 'react';

import { PopularVideoList } from 'src/widgets/popular-video';

export const HomePage: FC = () => {
   return (
      <div>
         <PopularVideoList />
      </div>
   );
};
