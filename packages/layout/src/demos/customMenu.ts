export default [
  {
    path: '/',
    name: 'welcome',
    routes: [
      {
        path: '/welcome',
        name: 'one',
        routes: [
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
