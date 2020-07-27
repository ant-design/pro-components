export default [
  {
    path: '/',
    name: 'welcome',
    children: [
      {
        path: '/welcome',
        name: 'one',
        children: [
          {
            path: '/welcome/welcome',
            name: 'two',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
  },
];
