import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdRocketLaunch,
  MdWash,
  MdChangeHistory
} from 'react-icons/md';

const routes = [
  {
    name: 'Frog-Bridge',
    layout: '/home',
    path: 'bridge',
    icon: <MdRocketLaunch className="h-6 w-6" />,
  },
  {
    name: 'Frog-Mixer',
    layout: '/home',
    path: 'mixer',
    icon: <MdWash className="h-6 w-6" />,

    secondary: true,
  },
  {
    name: 'History',
    layout: '/home',
    icon: <MdChangeHistory className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Support',
    layout: '/home',
    path: 'support',
    icon: <MdPerson className="h-6 w-6" />,
  }
];
export default routes;
