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
        title: 'Request Classes (placeholder)',
        link: '/pages/advisement/request-classes',
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
    title: 'Classes',
    icon: 'nb-list',
    link: '/pages/classes/courses',
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
        title: 'Request Classes (placeholder)',
        link: '/pages/advisement/request-classes',
      },
    ],
  },
  {
    title: 'Advisor',
    icon: 'nb-plus',
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
      {
        title: 'Edit Profile',
        link: '/pages/profile/edit-profile',
      },
    ],

  },

];
