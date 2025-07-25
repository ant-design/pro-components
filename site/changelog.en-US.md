# Changelog

## [3.0.0-beta.3] - 2025-01-XX

### 🚀 New Features

- **ProComponents 3.0 Major Upgrade**: Completely restructured component library architecture
- **Remove Antd@4 Compatibility**: Focus on Antd@5 support, significantly reduce bundle size
- **Optimize Tree Shaking**: Solve the issue of ProForm default binding all components
- **Performance Optimization**: ProTable performance significantly improved, on par with Antd

### 🔧 Technical Improvements

- **Bundle Size Optimization**: Remove compatibility code, reduce at least 700k gzip size
- **Code Refactoring**: Delete all `compareVersions` compatibility code
- **CSS Optimization**: Remove `antd/lib/*/style` compatibility imports
- **New Component Support**: Support Antd@5 new features like ColorPicker and Flex components

### 🐛 Bug Fixes

- Fix Helmet error when `pageTitleRender` returns non-string values in `useDocumentTitle`
- Fix deprecated `--loglevel` option in Prettier configuration
- Fix documentation path structure, unify component documentation organization

### 📦 Dependency Updates

- Upgrade to latest Antd@5 version
- Remove all Antd@4 related dependencies
- Update Prettier to latest version

### 📚 Documentation

- Reorganize component documentation structure with flat directory
- Create complete Chinese and English documentation for all components
- Add documentation writing guidelines

---

## [3.0.0-beta.2] - 2024-XX-XX

### 🔧 Technical Improvements

- Continue optimizing bundle size and performance
- Improve Tree Shaking functionality
- Enhance component stability

### 🐛 Bug Fixes

- Fix known compatibility issues
- Improve error handling mechanisms

---

## [3.0.0-beta.1] - 2024-XX-XX

### 🚀 Initial Release

- **ProComponents 3.0 First Beta Version**
- Remove Antd@4 compatibility support
- Restructure core component architecture
- Optimize bundle size and performance

### ✨ Core Changes

- Focus on Antd@5 support
- Delete all compatibility code
- Redesign component APIs
- Improve development experience

---

## Migration Guide

### Upgrading from 2.x to 3.0

#### Major Changes

1. **Remove Antd@4 Compatibility**: Ensure project uses Antd@5
2. **Bundle Size Optimization**: Remove compatibility code, reduce bundle size
3. **Tree Shaking**: Optimize on-demand loading, reduce unnecessary code

#### Upgrade Steps

1. Upgrade Antd to 5.x version
2. Check and remove Antd@4 related compatibility code
3. Update component import methods to leverage Tree Shaking
4. Test all functionality to ensure compatibility

#### Breaking Changes

- No longer supports Antd@4
- Some APIs may have changed
- Certain compatibility configurations have been removed

---

## Version Support

| Version | Status                | Support Period |
| ------- | --------------------- | -------------- |
| 3.0.x   | 🟢 Active Development | 2025+          |

---

## License

MIT License
