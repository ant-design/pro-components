---
title: ProComponents - Page-level Front-end Components
hero:
  title: ProComponents
  description: 🏆 Making Middle and Back-end Development Easier
  actions:
    - text: 🚀 Quick Start →
      link: /components
footer: Open-source MIT Licensed | © 2017-present
---

## 📚 Migration Guide

If you are upgrading from ProComponents 2.0 to 3.0, we have prepared a detailed migration guide for you:

- [📋 API Changes Summary](./api-changes.md) - Quickly view all changes
- [🚀 Detailed Migration Guide](./migration-guide.md) - Complete migration steps and examples
- [📋 API Changes Summary (EN)](./docs/api-changes.en-US.md) - API changes in English
- [🚀 Migration Guide (EN)](./docs/migration-guide.en-US.md) - Complete migration guide in English

## 🎯 What is ProComponents?

ProComponents is a React UI component library specifically built for enterprise-level applications. We understand the pain points of middle and back-end development, so we have carefully designed a series of out-of-the-box components, allowing you to focus on business logic rather than reinventing the wheel.

### ✨ Why Choose ProComponents?

**🎨 Rich Component Ecosystem**
From tables and forms to charts and maps, we provide 50+ carefully designed components. Whether you are building a data management system, an operations dashboard, or an enterprise portal, you can find the right components.

**⚡ Powerful Business Capabilities**
Our components are not just for UI display; they also have built-in complex data processing logic. For example, ProTable supports enterprise-level features like column state management, data export, and batch operations, allowing you to achieve more with less effort.

**🚀 Minimalist Development Experience**
Simple and easy-to-use API design, perfect TypeScript support, coupled with detailed documentation and examples, allow you to get started quickly and develop efficiently.

**🎛️ Flexible Visual Configuration**
Many components support visual configuration. You can implement complex functions with simple configurations, greatly reducing the barrier to entry for development.

**🎨 Highly Customizable**
Based on the Ant Design design system, it supports theme customization and style overrides, perfectly integrating into your design system.

### 🤔 Things to Note

We believe transparency is the best policy, so we also want to talk about some limitations of ProComponents:

**📚 Learning Curve**
Due to the richness of component functions, it may take some time to get familiar with them at first. But don't worry, we have detailed documentation and active community support.

**🎨 Style Customization**
Although customization is supported, deep customization may require some CSS skills. The style system of Ant Design is relatively complex, and it is recommended to be familiar with its design philosophy first.

**📦 Bundle Size**
To provide complete functions, we rely on some third-party libraries. If your project has extremely high requirements for bundle size, consider importing on demand.

**🌐 Browser Support**
We focus on modern browsers and no longer support old browsers like IE8. If your user base is still using these browsers, you may need to consider compatibility solutions.

**🔄 Update Cadence**
We will continue to update components, but the addition of new features will be fully tested. If you need the latest experimental features, you can follow our beta versions.

## 📊 Component Kanban

Check out how popular our components are:

| Components       | Downloads                                                                                                                             | Versions                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pro-components   | [![layout](https://img.shields.io/npm/dw/@ant-design/pro-components.svg)](https://www.npmjs.com/package/@ant-design/pro-components)   | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-components.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-components)     |
| pro-layout       | [![layout](https://img.shields.io/npm/dw/@ant-design/pro-layout.svg)](https://www.npmjs.com/package/@ant-design/pro-layout)           | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-layout.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-layout)             |
| pro-table        | [![table](https://img.shields.io/npm/dw/@ant-design/pro-table.svg)](https://www.npmjs.com/package/@ant-design/pro-table)              | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-table.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-table)               |
| pro-field        | [![field](https://img.shields.io/npm/dw/@ant-design/pro-field.svg)](https://www.npmjs.com/package/@ant-design/pro-field)              | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-field.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-field)               |
| pro-form         | [![form](https://img.shields.io/npm/dw/@ant-design/pro-form.svg)](https://www.npmjs.com/package/@ant-design/pro-form)                 | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-form.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-form)                 |
| pro-skeleton     | [![skeleton](https://img.shields.io/npm/dw/@ant-design/pro-skeleton.svg)](https://www.npmjs.com/package/@ant-design/pro-skeleton)     | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-skeleton.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-skeleton)         |
| pro-list         | [![list](https://img.shields.io/npm/dw/@ant-design/pro-list.svg)](https://www.npmjs.com/package/@ant-design/pro-list)                 | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-list.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-list)                 |
| pro-card         | [![card](https://img.shields.io/npm/dw/@ant-design/pro-card.svg)](https://www.npmjs.com/package/@ant-design/pro-card)                 | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-card.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-card)                 |
| pro-descriptions | [![descriptions](https://img.shields.io/npm/dw/@ant-design/pro-card.svg)](https://www.npmjs.com/package/@ant-design/pro-descriptions) | [![npm package](https://img.shields.io/npm/v/@ant-design/pro-descriptions.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-descriptions) |

## 🖥 Browser Compatibility

We support all modern browsers, ensuring your application runs stably in various environments:

- 🌐 Modern Browsers (Chrome, Firefox, Safari, Edge)
- ⚡ [Electron](https://www.electronjs.org/) Desktop Applications

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                              | last 2 versions                                                                                                                                         | last 2 versions                                                                                                                                         | last 2 versions                                                                                                                                         | last 2 versions                                                                                                                                                     |

## 🤝 Join Us

ProComponents is an open-source project, and we welcome all forms of contribution:

- 🐛 [Report Bug](https://github.com/ant-design/pro-components/issues)
- 💡 [Feature Request](https://github.com/ant-design/pro-components/issues)
- 📝 [Contribute Code](https://github.com/ant-design/pro-components/pulls)
- 📖 [Improve Documentation](https://github.com/ant-design/pro-components/pulls)

Let's make middle and back-end development easier together! 🚀
