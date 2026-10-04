# Rslib 构建迁移

## 构建契约

项目使用 Rslib 1.x 生成三套发布产物：

| 格式     | 目录                         | 模式            | 声明文件        |
| -------- | ---------------------------- | --------------- | --------------- |
| ESM      | `es`                         | bundleless      | TypeScript 7 Go |
| CommonJS | `lib`                        | bundleless      | TypeScript 7 Go |
| UMD      | `dist/pro-components.min.js` | bundle + minify | 不单独生成      |

`package.json` 中的 `module`、`main`、`types` 和 `unpkg` 保持原路径，消费方不需要修改导入方式。

## 性能基线

2026-10-04 在同一 Windows 工作区执行完整构建：

| 阶段                |  Rslib |
| ------------------- | -----: |
| ESM JavaScript      | 1.13 s |
| CommonJS JavaScript | 1.12 s |
| UMD                 | 1.08 s |
| 两套声明文件        | 2.77 s |
| 完整命令墙钟时间    | 3.90 s |

迁移前 Father 最近一次记录的三个 JavaScript 阶段合计约 50 秒。两套日志的输出口径不同，因此该数据用于本机工程反馈对比，不作为跨机器基准。

UMD 从 Father 构建的 761,644 B / gzip 234,281 B 降到 Rslib 的 735,309 B / gzip 229,605 B，原始体积降低 3.5%，gzip 降低 2.0%。新产物同时保留了此前会被 `sideEffects: false` 错误删除的 Day.js 初始化代码。

## 兼容性约束

- bundleless 产物保留源码目录结构，并给相对模块引用补 `.js` 扩展名。
- UMD 的 CommonJS/AMD 请求使用包名 `react`、`react-dom`、`antd`、`dayjs`。
- UMD 浏览器全局继续使用 `React`、`ReactDOM`、`antd`、`dayjs`。
- 发布专用 `tsconfig.build.json` 只包含 `src`，并显式加载 Node 类型供源码中的 `process.env` 声明使用。
- `package.json#sideEffects` 保留 `initDayjs`，避免消费方打包器删除 Day.js 插件注册。
- `pnpm run check:build-outputs` 检查每个源码模块的 JavaScript/声明文件、package.json 入口、UMD externals 和主要公共导出。

## 维护命令

```powershell
pnpm run build
pnpm run check:build-outputs
pnpm run analyze:bundle
```
