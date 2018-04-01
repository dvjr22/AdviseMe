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
    title: 'Advisement',
    icon: 'nb-compose',
    children: [
      {
        title: 'Make an Appointment',
        link: '/pages/student/appointment',
      },
      {
        title: 'View Appointments',
        link: '/pages/student/view-appointment',
      },
      {
        title: 'Advisor Messaging',
        link: '/pages/shared/chat',
      },
    ],
  },
  {
    title: 'Cart',
    icon: 'ion-ios-cart-outline',
    children: [
      {
        title: 'View Cart',
        link: '/pages/student/cart',
      },
    ],
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    children: [
      {
        title: 'Profile View',
        link: '/pages/shared/profile-view',
      },
    ],

  },
  {
    title: 'Request',
    icon: 'nb-list',
    children: [
      {
        title: 'Request Classes',
        link: '/pages/shared/request-classes',
      },
      {
        title: 'Request Status',
        link: '/pages/student/cart-progress',
      },
    ],
    },
    {
      title: 'Shared',
      icon: 'ion-ios-cart-outline',
      children: [
        {
          title: 'View Cart',
          link: '/pages/student/cart',
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
        link: '/pages/shared/profile-view',
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
      {
        title: 'Student Messaging',
        link: '/pages/advisor/advisor-chat-list',
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
