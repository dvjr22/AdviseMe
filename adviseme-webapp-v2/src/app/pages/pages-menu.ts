import { NbMenuItem } from '@nebular/theme';

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
    title: 'Profile',
    icon: 'nb-person',
    children: [
      {
        title: 'Profile',
        link: '/pages/profile/profile',
      },
      {
        title: 'Edit Profile',
        link: '/pages/profile/edit-profile',
      },
    ],

  },
  {
    title: 'Classes',
    icon: 'nb-list',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/classes/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/classes/ckeditor',
      },
    ],
  },
  {
    title: 'Test-Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Logout',
        link: '/auth/logout',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
    ],
  },
];
