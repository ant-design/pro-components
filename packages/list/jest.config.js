const { join } = require('path');

module.exports = {
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  moduleNameMapper: {
    '@ant-design/pro-list': join(__dirname, '/src/index.tsx'),
  },
};
