export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        routes: [
          {
            path: '/welcome',
            name: 'one',
            icon: '/favicon.png',
            routes: [
              {
                path: '/welcome/welcome',
                name: 'two',
                icon: 'smile',
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
