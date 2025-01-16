# ProTable Statistics Feature

This document demonstrates the new statistics feature added to ProTable component.

## Usage

Add the `statistics` property to your column configuration:

```tsx
const columns: ProColumns<DataItem>[] = [
  {
    title: 'Age',
    dataIndex: 'age',
    statistics: {
      average: true,
      median: true,
      distribution: true,
      chartType: 'bar'
    }
  }
];
```

## Features

1. Statistics icon appears in column header
2. Click icon to view detailed statistics
3. Supports both numeric and categorical data
4. Multiple chart types (bar, pie, line)
5. Automatic data type detection
6. Performance optimized for large datasets

## Example Screenshots

### Table View
```
+-------+--------+-------------+
| Name  | Age ⚡ | Status ⚡   |
+-------+--------+-------------+
| User1 | 25     | Active      |
| User2 | 30     | Inactive    |
| User3 | 28     | Pending     |
+-------+--------+-------------+
```
The ⚡ icon indicates statistics are available for the column.

### Numeric Statistics Modal
```
+--------------------------------+
| Statistics for Age             |
+--------------------------------+
| Average: 27.67                 |
| Median: 28.00                 |
| Range: 25.00 - 30.00          |
| Sample size: 3                 |
|                               |
| [Bar Chart Distribution]      |
|  30 |     █                  |
|  28 |         █              |
|  25 |             █          |
|     +------------------      |
+--------------------------------+
```

### Categorical Statistics Modal
```
+--------------------------------+
| Statistics for Status          |
+--------------------------------+
| Most common: Active            |
| Total categories: 3            |
| Sample size: 3                 |
|                               |
| [Pie Chart Distribution]      |
|      ┌──────┐                 |
|    ╭─│Active│─╮              |
|   ╭│Inactive│╮│              |
|   ││Pending ││               |
|    ╰────────╯                |
+--------------------------------+
```

## Configuration Options

### StatisticsConfig Interface
```typescript
interface StatisticsConfig {
  /** Enable average calculation */
  average?: boolean;
  /** Enable median calculation */
  median?: boolean;
  /** Enable mode calculation */
  mode?: boolean;
  /** Enable distribution visualization */
  distribution?: boolean;
  /** Chart type for distribution visualization */
  chartType?: 'bar' | 'pie' | 'line';
}
```

### Column Configuration
```typescript
{
  title: string;
  dataIndex: string;
  statistics: boolean | StatisticsConfig;
}
```

## Notes

1. Statistics icon only appears for columns without custom render functions
2. Automatic data type detection determines appropriate statistics
3. Performance optimized for large datasets using memoization
4. Supports both simple (boolean) and detailed (StatisticsConfig) configuration
