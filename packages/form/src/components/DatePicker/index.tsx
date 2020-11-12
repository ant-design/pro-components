import ProFormDatePicker from './DatePicker';
import ProFormDatePickerWeek from './WeekPicker';
import ProFormDatePickerMonth from './MonthPicker';
import ProFormDatePickerQuarter from './QuarterPicker';
import ProFormDatePickerYear from './YearPicker';

const ExportComponent = ProFormDatePicker as typeof ProFormDatePicker & {
  Week: typeof ProFormDatePickerWeek;
  Month: typeof ProFormDatePickerMonth;
  Quarter: typeof ProFormDatePickerQuarter;
  Year: typeof ProFormDatePickerYear;
};

ExportComponent.Week = ProFormDatePickerWeek;
ExportComponent.Month = ProFormDatePickerMonth;
ExportComponent.Quarter = ProFormDatePickerQuarter;
ExportComponent.Year = ProFormDatePickerYear;

export default ExportComponent;
