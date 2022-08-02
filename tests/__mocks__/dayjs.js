const mock = jest.genMockFromModule('dayjs');

const dayjs = jest.requireActual('dayjs');
const utc = jest.requireActual('dayjs/plugin/utc');
dayjs.extend(utc);

mock.utc = jest.fn().mockReturnValue(dayjs.utc(new Date('1995-12-17T03:24:00')));

module.exports = dayjs;
