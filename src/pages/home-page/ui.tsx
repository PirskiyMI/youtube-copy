import { FC } from 'react';

import { PopularVideoList } from 'src/widgets/popular-video-list';

export const HomePage: FC = () => {
   return (
      <div>
         <PopularVideoList />
      </div>
   );
};
