import ProFormDatePicker from './DatePicker';
import ProFormDatePickerWeek from './WeekPicker';

const ExportComponent = ProFormDatePicker as typeof ProFormDatePicker & {
  Week: typeof ProFormDatePickerWeek;
};

ExportComponent.Week = ProFormDatePickerWeek;

export default ExportComponent;
