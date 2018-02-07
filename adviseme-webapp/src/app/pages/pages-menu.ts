import { NbMenuItem } from '@nebular/theme';

/**
  Navigation menu items
*/
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Classes',
    icon: 'nb-list',
    link: '/pages/classes/courses',
  },
  {
    title: 'Class (placeholder)',
    icon: 'nb-list',
    link: '/pages/class/class-view',
  },
  {
    title: 'Advisement',
    icon: 'nb-compose',
    children: [
      {
        title: 'Make an Appointment',
        link: '/pages/advisement/appointment',
      },
      {
        title: 'View Appointments',
        link: '/pages/advisement/view-appointment',
      },
    ],
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    children: [
      {
        title: 'Profile View',
        link: '/pages/profile/profile-view',
      },
      {
        title: 'Edit Profile',
        link: '/pages/profile/edit-profile',
      },
    ],

  },
];
