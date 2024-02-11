---
title: 简介
order: 1

nav:
  title: 文档
  order: 1
  path: /docs
---

![banner](https://gw.alipayobjects.com/zos/antfincdn/7VBnGHwjaW/bianzu%2525202.svg)

## ProComponents 的理念

Ant Design 定义了基础的设计规范，对应也提供了大量的基础组件。但是对于中后台类应用，我们希望提供更高程度的抽象，提供更上层的设计规范，并且提供相应的组件使得开发者可以快速搭建出高质量的页面。

在 ProComponents 中我们内置了一系列的设计规范，预设了常用的逻辑。在这个基础上我们同样提供了灵活的支持，比如对于 ProTable 来说你也可以把它完全当做 Ant Design 的 Table 来用，对于 ProForm 来说你也可以直接使用 Ant Design 的基础组件或者你的自定义组件。我们希望通过 Pro 系列组件提供快速高效搭建高质量中后台应用的能力，进一步扩展 Ant Design 的能力，欢迎使用并提出宝贵的意见。

## 设计思路

对于几乎所有的业务来说，我们做的其实就是根据一个状态定义一系列的行为，以上面的 table 为例，首先我们需要一个状态 `dataSource` 用于存储从服务器请求的数据，为了优化体验，我们还需要一个 `loading`。于是我们就有了一系列的行为，我们需要先设置 `loading=true`，然后发起网络请求，网络请求完成之后就设置 `dataSource` 为请求回来的数据，`loading=false`，一个网络请求就完成了，虽然非常简单，但是一个业务系统有相当多的表格，每个表格都定义这么一次，这个工作量就非常大了。

如果要重新请求网络，我们就需要封装一下行为，将以上的行为封装成一个方法，点击一下重新加载数据，如果你有分页，那么就需要新的变量 page，我们在重新请求之前需要去根据需要来判断一下是否将页面重置为第一页，这又引入了一个变量。如果你的表格还要控制每页的数量，那么将会更加繁杂。这种重复性的劳动会浪费掉我们的很多时间。

### 一个状态加一系列行为

以上的逻辑几乎存在于所有中后台开发中，每增加一个状态我们就需要一系列的行为来进行管理，每个行为如果耦合了太多的状态也会复杂到无以复加。

碰上这种情况，几乎所有程序员都会想办法进行分层，基于同样的思路，ProTable 希望抽象出一层来解决掉复杂状态的问题，table 中最常用的状态就是 `loading` 和 `dataSource`，包括扩展的 `page`,`pageSize` 其实都是服务于网络状态，于是 table 抽象出了一个 `request` 的 api，在其中封装了 `loading` 和 `dataSource` 状态以及他们所有的行为，如上一页、下一页、重新刷新、修改每页大小等。

这种封装模式可以让前端从各种状态管理中脱身出来，专注于业务开发，也不需要 dva，redux 等数据流的方案，更加符合直觉。开发者只需要定义一个状态，重型组件会自动生成一系列行为。

> 为了渐进式使用我们也提供了与 Ant Design 相同的 api，完全可以降级成为一个 Ant Design 的 table 使用。

### 一个组件 ≈ 一个页面

重型组件区别于传统组件有个很大的不同，重型组件在抽象时是将其当成一个页面来进行处理，所以 ProTable 会支持网络请求和自动生成查询表单，而 ProLayout 会支持自动生成菜单，两者都基于同样的思想也就是提供页面级别的抽象。

一个列表页应该可以用 ProLayout + ProTable 完成，一个编辑页应该使用 ProLayout + ProForm 完成，详情页可以用 ProLayout + ProDescriptions 完成。 一个页面在开发过程中只需要关注几个重型组件，降低心智负担，专注于更核心的业务逻辑。

### 设计与样式

在实际开发中我们也经常会碰到一些设计问题，比如经典的按钮应该放在左面还是右面，查询表单怎么布局，日期怎么格式化，数字的对齐问题，在重型组件中都进行了抽象，对于各种行为与样式我们都经过了设计师的讨论与设计，可以达到默认好看及好用。

如果你还是想自定义相关渲染，可以通过自定义 valueType 的方式来实现。默认的不一定是最好的，但是一定不差。如果你要自定义，最好考虑一下投入产出比，毛坯房里雕花真的好吗？

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😊 ：

- 在你的公司或个人项目中使用 Ant Design Pro，umi 和 ProComponents。
- 通过 [Issue](http://github.com/ant-design/pro-components/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/pro-components/pulls) 改进 ProComponents 的代码。

### 脚手架概览

当我们 clone 完项目之后会看到如下的目录结构。

```bash
- .dumi              * dumi 的相关配置，主要是主题等
- .github            * github 的 action 和相关的 issue 配置
- docs               * 存放公用的文档
- packages           * 我们维护的包, 如果你想贡献代码，这里是你最需要关注的
- README.md          * 展示在 github 主页的代码
- tests              * 编写测试用例的地方
- public             * 部署官网所用的静态文件
- scripts            * 开发或者部署所用的脚本
- .prettierrc.js     * prettier 的相关配置
- .eslintrc.js       * eslint 的配置
- .fatherrc.ts       * 编译脚手架的配置
- .umirc.js          * dumi 的核心配置
- webpack.config.js  * 编译 umd 包的配置文件
- vitest.config.js     * 测试环境的配置
- lerna.json         * 多包的配置
- package.json       * 项目的配置
- tsconfig.json      * typescript 的配置
- pnpm-lock.yaml     * 依赖 lock 文件
```

`coverage` 和 `.umi` 这两个文件夹比较特殊，`coverage` 是测试覆盖率文件，在跑完测试覆盖率后才会出现，`.umi` 是运行时的一些临时文件，在执行 `npm run start` 时生成。

### 源码概览

在 packages 文件夹中包含了我们所有的组件，每个组件一般都有一个 `src`，`package.json` 和 `README.md`。`package.json` 和 `README.md` 可以在新建文件夹后通过执行 `npm run bootstrap` 来生成。

`src` 中就是我们真正的源码，我们约定 `src` 下会有 demos 文件夹里面会存储所有的 demo，并且 `${包名}.md` 的文件用于介绍这个组件，同时引入 demo 和 API 文档。

> 我们使用了 dumi 的语法，要求全部使用外置组件，用 code 引入，调试起来会更加方便。

### 风格指南

我们使用自动化代码格式化软件 [`Prettier`](https://prettier.io/)。 对代码做出更改后，运行 `npm run prettier`。当然我们更推荐 prettier 的插件，随时格式化代码。

> 我们的 CI 会检查代码是否被 prettier，在提交代码前最好执行一下 `npm run prettier`。

之后，`linter` 会捕获代码中可能出现的多数问题。 你可以运行 `npm run lint` 来检查代码风格状态。

不过，`linter` 也有不能搞定的一些风格。如果有些东西不确定，请查看 [Airbnb’s Style Guide](https://github.com/airbnb/javascript) 来指导自己。

### 开发工作流

我们使用了 [monorepo](https://danluu.com/monorepo/) 的方式来管理我们的仓库，仓库中包含多个独立的包，以便于更改可以一起联调，这样可以一起跑测试用例，如果变更出现问题，我们可以很快地定位到问题。

[`pnpm-workspace.yaml`](https://pnpm.io/zh/pnpm-workspace_yaml) 可以帮助我们在多个包中共享依赖。

安装完成后你可以使用以下命令：

- `pnpm start` 预览你的改动
- `pnpm lint` 检查代码风格
- `pnpm tsc` 检查 TypeScript 是否符合规范
- `pnpm test` 测试代码是否可以通过测试用例
- `pnpm test:coverage` 测试仓库的测试覆盖率
- `pnpm build` 编译当前组件库

我们建议运行 `pnpm test` 或前文提及的 linter 以确保你的代码变更有没有影响原有功能，同时保证你写的每行代码都被正确地测试到，不管怎样这样都会提升组件库的整体质量。

如果你增加了一个新功能，请添加测试后再提交 pr，这样我们能确保以后你的代码不出问题。

### 一些约定

ProComponents 基于 Ant Design 来开发，为了与 Ant Design 的生态保持兼容性，我们要求覆盖 Ant Design 的样式必须要使用 `${token.antCls}` 变量来生成类名，在 js 中使用如下代码来配置实现。

```tsx | pure
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
```
