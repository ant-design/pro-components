import ProFormDatePicker from './DatePicker';
import ProFormDatePickerMonth from './MonthPicker';
import ProFormDatePickerQuarter from './QuarterPicker';
import ProFormDatePickerWeek from './WeekPicker';
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

ExportComponent.displayName = 'ProFormComponent';

export default ExportComponent;
