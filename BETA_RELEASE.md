# Beta 版本发布说明

## 当前 Beta 版本

- **版本**: 3.0.0-beta.1
- **Git 标签**: `3.0.0-beta.1`
- **提交**: `c1ff1fe0f`

## 主要变更

### 移除 antd 低版本兼容性代码

- 删除了 `compareVersions` 工具函数
- 删除了 `coverToNewToken` 兼容性函数
- 简化了消息警告兼容性代码
- 移除了版本检查警告
- 更新了文档中的版本要求说明

### 版本要求

- 现在要求 antd >= 5.11.2
- 移除了对 antd@4 的兼容性支持

## 发布流程

### 1. 设置 npm 标签

```bash
npm config set tag beta
```

### 2. 发布 beta 版本

```bash
npm run publish:beta
```

### 3. 验证发布

```bash
npm view @ant-design/pro-components@beta
```

## 安装 beta 版本

```bash
npm install @ant-design/pro-components@beta
```

或者

```bash
yarn add @ant-design/pro-components@beta
```

或者

```bash
pnpm add @ant-design/pro-components@beta
```

## 注意事项

- Beta 版本可能包含不稳定的功能
- 建议在测试环境中使用
- 如果发现问题，请及时反馈
- 正式版本发布前会进行充分测试
