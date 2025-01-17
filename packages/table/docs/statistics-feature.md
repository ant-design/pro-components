# ProTable Statistics Feature

This document demonstrates the enhanced ProTable component with integrated statistics, filtering, and sorting capabilities.

## 🔗 Live Demo

Try out the feature at our deployed demo:
[ProTable Statistics Demo](https://antd-pro-table-app-4bsubyvg.devinapps.com)

## Usage

Configure columns with statistics, filtering, and sorting capabilities:

```tsx
const columns: ProColumns<DataItem>[] = [
  {
    title: 'Age',
    dataIndex: 'age',
    valueType: 'digit',
    sorter: (a, b) => a.age - b.age,
    filters: [
      { text: '20-30', value: '20-30' },
      { text: '31-40', value: '31-40' },
    ],
    onFilter: (value, record) => {
      if (typeof value === 'string') {
        const [min, max] = value.split('-').map(Number);
        return record.age >= min && record.age <= max;
      }
      return true;
    },
    statistics: {
      average: true,
      median: true,
      distribution: true,
      chartType: 'bar',
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    statistics: {
      mode: true,
      distribution: true,
      chartType: 'pie',
    },
    valueEnum: {
      active: { text: 'Active', status: 'Success' },
      inactive: { text: 'Inactive', status: 'Error' },
    },
  },
];

// Enable toolbar features
<ProTable<DataItem>
  columns={columns}
  search={{
    filterType: 'query',
    labelWidth: 'auto',
  }}
  options={{
    search: true,
    fullScreen: true,
    reload: true,
    setting: true,
    density: true,
  }}
/>
```

## Features

1. Statistical Analysis
   - Column-specific statistics with distribution visualization
   - Automatic data type detection (numeric/categorical)
   - Multiple chart types (bar, pie, line)
   - Performance optimized for large datasets

2. Advanced Filtering
   - Range filters for numeric columns
   - Categorical filters with tags
   - Date range filtering
   - Text search capabilities

3. Sorting Capabilities
   - Numeric column sorting
   - Date-based sorting
   - Multi-column sort support

4. Interactive UI
   - Statistics icons in column headers
   - Filter dropdowns
   - Sort indicators
   - Full-screen mode
   - Density controls

## Interactive Features

### Column Controls

Each column header contains multiple interactive elements:
- Sort indicators (↑↓) - Click to sort by column
- Filter icon (🔍) - Opens filter menu
- Statistics icon (📊) - Shows statistical analysis

### Filter Types

1. **Numeric Columns (Age, Score)**
   - Range filters (e.g., "20-30", "31-40")
   - Custom range input
   - Sort ascending/descending

2. **Categorical Columns (Status)**
   - Checkbox selection
   - Multiple value support
   - Tag-based display

3. **Date Columns**
   - Date range picker
   - Relative date options
   - Calendar view

### Statistics Analysis

Click the statistics icon (📊) in any column header to view:

**For Numeric Data:**
- Average and median values
- Min/max range
- Distribution chart
- Sample size

**For Categorical Data:**
- Frequency distribution
- Most common values
- Category breakdown
- Percentage analysis

### Toolbar Features

The toolbar provides:
- Global search
- Full-screen toggle
- Column visibility settings
- Table density control
- Data refresh button

## Configuration Guide

### Column Configuration Options

```typescript
interface ProColumnType<T> {
  // Basic column configuration
  title: string;
  dataIndex: string;
  valueType?: 'text' | 'digit' | 'date' | 'select';
  
  // Statistics configuration
  statistics?: boolean | {
    average?: boolean;    // Show average for numeric data
    median?: boolean;     // Show median for numeric data
    mode?: boolean;       // Show mode for categorical data
    distribution?: boolean; // Show distribution chart
    chartType?: 'bar' | 'pie' | 'line';
  };
  
  // Sorting configuration
  sorter?: boolean | ((a: T, b: T) => number);
  
  // Filtering configuration
  filters?: { text: string; value: string | number }[];
  onFilter?: (value: boolean | React.Key, record: T) => boolean;
  
  // Value enumeration for categorical data
  valueEnum?: Record<string, { text: string; status: string }>;
}
```

### ProTable Configuration

```typescript
<ProTable<DataItem>
  // Enable search form
  search={{
    filterType: 'query',  // Use query filter type
    labelWidth: 'auto',   // Auto-adjust label width
  }}
  
  // Enable toolbar features
  options={{
    search: true,         // Enable global search
    fullScreen: true,     // Enable full screen mode
    reload: true,         // Enable data reload
    setting: true,        // Enable column settings
    density: true,        // Enable density control
  }}
  
  // Other configurations
  rowKey="id"            // Unique row identifier
  pagination={{          // Pagination settings
    pageSize: 10,
  }}
  dateFormatter="string" // Date format
/>
```

## Implementation Notes

1. Data Type Support
   - Numeric columns: Support full statistics (average, median, distribution)
   - Categorical columns: Support frequency analysis and distribution
   - Date columns: Support range analysis and timeline distribution
   - Text columns: Support basic statistics and search

2. Performance Optimizations
   - Memoized calculations for large datasets
   - Lazy loading of statistics modal
   - Efficient data type detection
   - Optimized filtering implementation

3. Feature Compatibility
   - Statistics work with both server-side and client-side sorting
   - Filtering supports both simple and complex data types
   - All features work with responsive layout
   - Compatible with existing ProTable features

4. Best Practices
   - Use appropriate valueType for columns
   - Configure proper filter options for better UX
   - Enable relevant toolbar options
   - Implement proper sorting for better performance
