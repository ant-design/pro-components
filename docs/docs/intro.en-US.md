---
title: Introduction
order: 1

nav:
  title: Documentation
  order: 1
  path: /docs
---

![banner](https://gw.alipayobjects.com/zos/antfincdn/7VBnGHwjaW/bianzu%2525202.svg)

## The concept of #ProComponents

Ant Design defines the basic design specification and provides a large number of basic components. However, for middle and backend applications, we want to provide a higher level of abstraction, provide higher level design specifications, and provide corresponding components so that developers can quickly build high quality pages.

In ProComponents, we have a series of built-in design specifications and pre-defined common logic. For example, you can use ProTable as an Ant Design Table, and ProForm as a base component of Ant Design or as a custom component. We hope to further extend the capabilities of Ant Design by providing the ability to build high quality middle and backend applications quickly and efficiently with the Pro series components.

## Design Ideas

For almost any business, what we do is actually define a series of behaviors based on a state, take the table above as an example, first we need a state `dataSource` for storing the data requested from the server, and for optimizing the experience, we also need a `loading`. So we have a series of behaviors, we need to set `loading=true` first, then launch a network request, after the network request is completed, set `dataSource` for the requested data, `loading=false`, a network request is completed, although very simple, but a business system has a considerable number of tables, and each table is defined so once, the workload is very large.

If you want to re-request the network, we need to encapsulate the behavior, the above behavior into a method, click to reload the data, if you have paging, then you need a new variable page, we need to go before the re-request according to the need to determine whether to reset the page to the first page, which introduces another variable. If your form also has to control the number of pages per page, then it will be even more cumbersome. This kind of repetitive work can waste a lot of our time.

### One state plus a series of behaviors

The above logic exists in almost all middle and backend development, each added state requires a series of behaviors to manage, and each behavior can be complex if coupled with too many states.

Based on the same idea, ProTable wants to abstract a layer to solve the problem of complex state. The most common states in table are `loading` and `dataSource`, including the extended `page`, `pageSize`, which are actually So table abstracts a `request` api that encapsulates the loading and dataSource states and all their behaviors, such as previous page, next page, refresh, modify per-page size, and so on.

This wrapping pattern allows the front-end to get away from all kinds of state management and focus on business development, and is more intuitive without the need for data flow solutions like dva, redux, etc. The developer only needs to define a state and the heavy component will automatically generate a set of behaviors.

> For incremental use we also provide the same api as Ant Design, which can be completely downgraded to an Ant Design table.

### A component ≈ a page

Heavy components differ from traditional components in that they are abstracted as a page, so ProTable supports network requests and automatic query form generation, while ProLayout supports automatic menu generation, both based on the same idea of providing page-level abstraction.

A list page should be done with ProLayout + ProTable, an edit page should be done with ProLayout + ProForm, and a detail page can be done with ProLayout + ProDescriptions. A page only needs to focus on a few heavy components in the development project, reducing the mental load and focusing on the more core business logic.

### Design and style

In actual development we often encounter design issues, such as whether the classic button should be placed on the left or right, how to layout the query form, how to format the date, and how to align the numbers, all of which are abstracted in the heavy component. For various behaviors and styles we have discussed and designed by designers, the default looks good and works well.

## Contribute

We welcome your contributions, and you can build with us by in the following ways 😊 :

- Using Ant Design Pro, umi and ProComponents in your company or personal projects.
- Report bugs or make inquiries via [Issue](http://github.com/ant-design/pro-components/issues).
- Submit a [Pull Request](http://github.com/ant-design/pro-components/pulls) to improve the code of ProComponents.

### Scaffolding overview

When we clone the project we will see the following directory structure.

```bash
- .dumi             * Configuration for dumi, mainly themes, etc.
- .github           * github actions and related issue configuration
- docs              * the public documentation
- packages          * The packages we maintain, if you want to contribute code, this is where you need to focus most
- README.md         * The code that is displayed on the github homepage
- tests             * The place to write test cases
- public            * static files used to deploy the website
- scripts           * scripts used for development or deployment
- .prettierrc.js    * Configuration for prettier
- .eslintrc.js      * configuration for eslint
- .fatherrc.ts      * configuration for compile scaffolding
- .umirc.js         * core configuration for dumi
- webpack.config.js * configuration file for compiling the umd package
- vitest.config.js    * configuration for the test environment
- lerna.json        * configuration for multiple packages
- package.json      * configuration for the project
- tsconfig.json     * configuration for typescript
- pnpm-lock.yaml    * dependency lock file

```

The `coverage` and `.umi` folders are special in that `coverage` is a test coverage file that appears after running test coverage, and `.umi` is some temporary files at runtime that are generated when `npm run start` is executed.

### Source code overview

The packages folder contains all our components, each of which generally has a `src`, `package.json` and `README.md`. `package.json` and `README.md` can be generated by running `npm run bootstrap` after creating a new folder.

The real source code is in `src`, and we have agreed that the demos folder under `src` will store all the demos, and the `${package name}.md` file will be used to introduce the component and introduce the demos and API documentation.

> We use the dumi syntax and require all external components to be introduced in code, which makes debugging easier.

### Style Guide

We use the automated code formatting software [`Prettier`](https://prettier.io/). After making changes to the code, run `npm run prettier`. Of course we recommend the prettier plugin to format the code whenever you want.

> Our CI will check if the code is prettier, so it's a good idea to run `npm run prettier` before committing the code.

After that, `linter` will catch most of the problems that may occur in the code. You can run `npm run lint` to check the code style status.

However, there are some styles that `linter` can't handle. If you're not sure about something, check out [Airbnb's Style Guide](https://github.com/airbnb/javascript) to guide yourself.

### Developing workflows

We use [monorepo](https://danluu.com/monorepo/) to manage our repository in a way that the repository contains multiple separate packages so that changes can be co-located together, so that we can run test cases together, and if there is a problem with a change, we can quickly pinpoint the problem.

The [`pnpm-workspace.yaml`](https://pnpm.io/pnpm-workspace_yaml) can help us share dependencies across multiple packages.

After the installation is complete you can use the following command.

- `pnpm start` to preview your changes
- `pnpm lint` to check the code style
- `pnpm tsc` to check if TypeScript conforms to the specification
- `pnpm test` Test if the code passes the test case
- `pnpm test:coverage` Test the test coverage of the repository
- `pnpm build` Compile the current component library

We recommend running `pnpm test` or the aforementioned linter to make sure that your code changes do not affect the original functionality and that every line of code you write is tested correctly, which will improve the overall quality of the component library anyway.

If you add a new feature, please add tests before committing pr, so we can make sure your code doesn't have problems in the future.

### Some conventions

ProComponents is developed on top of antd. In order to maintain compatibility with antd's ecosystem, we require that styles that override antd must use `. @{ant-prefix}` variable to generate class names, which is configured in the js with the following code.

```tsx | pure
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${package name}');
```
