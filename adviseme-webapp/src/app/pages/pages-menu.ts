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
    title: 'Request Classes',
    icon: 'nb-list',
    link: '/pages/advisement/request-classes',
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
      {
        title: 'Advisor Messaging',
        link: '/pages/advisement/chat',
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
    ],

  },
];

export const ADMIN_ITEMS: NbMenuItem[] = [
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
    title: 'Administration',
    icon: 'nb-locked',
    children: [
      {
        title: 'Edit Permissions',
        link: '/pages/administrator/permission',
      },
      {
        title: 'Edit Courses',
        link: '/pages/administrator/editcourses',
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
    ],

  },

];

export const ADVISOR_ITEMS: NbMenuItem[] = [
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
    title: 'Advisor',
    icon: 'nb-checkmark',
    children: [
      {
        title: 'View Appointments',
        link: '/pages/advisor/appointments',
      },
      {
        title: 'View Class Requests',
        link: '/pages/advisor/requests',
      },
    ],
  },
  {
    title: 'Classes',
    icon: 'nb-list',
    link: '/pages/class/courses',
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    children: [
      {
        title: 'Profile View',
        link: '/pages/profile/profile-view',
      },
    ],

  },

];
