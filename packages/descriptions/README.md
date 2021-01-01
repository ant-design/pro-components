# @ant-design/pro-descriptions

> Advanced description list component, providing a more convenient and faster solution to build description lists.

See our website [@ant-design/pro-descriptions](https://procomponent.ant.design/) for more information.

ProDescriptions was created to solve the problem of having to write a lot of sample code for Descriptions in a project, so it encapsulates a lot of common logic in it. Writing a Descriptions in React inevitably requires defining some of the same properties. So ProDescriptions by default encapsulates the logic of requesting network, columns display.

For example, if ProDescriptions encapsulates the behavior of the request network, ProDescriptions will bring the data in props.params into the request by default, and if the interface happens to be the same as our definition, it will be very easy to implement a query.

```tsx | pure
import request from 'umi-request';

const fetchData = (params) =>
  request<{
    data: T{};
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });

const keyWords = "Ant Design"

<ProDescriptions<T,U> request={fetchData} />;
```

We agree that request has one parameter and `params` will take its own `params` in props. The type is as follows:

```tsx | pure
(params: U) => RequestData;
```

There are also conventions for ProDescriptions with the results of the request back, of the following type.

```tsx | pure
interface RequestData {
  data: Datum{};
  success: boolean;
}
```

## Install

Using npm:

```bash
$ npm install --save  @ant-design/pro-descriptions
```

or using yarn:

```bash
$ yarn add @ant-design/pro-descriptions
```
