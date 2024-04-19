import { Path } from 'src/shared';

import HomeIcon from './../assets/home-icon.svg?react';
import LikeIcon from './../assets/like-icon.svg?react';

export const navList = [
   { title: 'Главная', icon: <HomeIcon />, path: Path.HOME_PAGE },
   { title: 'Понравившиеся', icon: <LikeIcon />, path: Path.FAVORITES_PAGE },
];
