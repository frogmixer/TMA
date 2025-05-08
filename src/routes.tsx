import React from 'react';

// Admin Imports

// Icon Imports
import { FaBridge } from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { TbBrandGithub } from "react-icons/tb";
const routes = [
  {
    name: 'Frog-Bridge',
    layout: '/home',
    path: 'bridge',
    icon: <FaBridge className="h-6 w-6" />,
  },
  {
    name: 'Frog-Mixer',
    layout: '/home',
    path: 'dev',
    icon: <GiWashingMachine className="h-6 w-6" />,

    secondary: true,
  },
  {
    name: 'History',
    layout: '/home',
    icon: <FaHistory className="h-6 w-6" />,
    path: 'dev',
  },
  {
    name: 'Support',
    layout: '/links',
    path: "http://t.me/TonspaySupport_bot",
    icon: <MdContactSupport className="h-6 w-6" />,
  },
  {
    name: 'Community',
    layout: '/links',
    path: "https://t.me/+4JUfM1MgH5UyNzQ1",
    icon: <MdContactSupport className="h-6 w-6" />,
  },
  {
    name: 'Source-Code',
    layout: '/links',
    path: 'https://github.com/frogmixer',
    icon: <TbBrandGithub className="h-6 w-6" />,
  }
];
export default routes;
