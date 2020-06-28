module.exports = {
  moduleNameMapper(memo) {
    return Object.assign(memo, {
      '^react$': require.resolve('react'),
      '^react-dom$': require.resolve('react-dom'),
    });
  },
};
