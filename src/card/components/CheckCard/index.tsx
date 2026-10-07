import CheckCard from './Core';
import CheckCardGroup from './Group';

const CheckCardWithGroup = Object.assign(CheckCard, { Group: CheckCardGroup });

export type { CheckCardProps } from './Core';
export type { CheckCardGroupProps } from './Group';
export default CheckCardWithGroup;
