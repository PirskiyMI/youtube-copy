import { Path } from 'src/shared';

import HomeIcon from './../assets/home-icon.svg?react';
import ShortsIcon from './../assets/shorts-icon.svg?react';
import SubscriptionIcon from './../assets/subscription-icon.svg?react';
import LibraryIcon from './../assets/library-icon.svg?react';

export const navList = [
   { title: 'Главная', icon: <HomeIcon />, path: Path.HOME_PAGE },
   { title: 'Shorts', icon: <ShortsIcon />, path: '#' },
   { title: 'Подписки', icon: <SubscriptionIcon />, path: '#' },
   { title: 'Вы', icon: <LibraryIcon />, path: '#' },
];
