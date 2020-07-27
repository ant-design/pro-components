export default {
  route: {
    path: '/',
    routes: [
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
    ],
  },
  location: {
    pathname: '/',
  },
};
