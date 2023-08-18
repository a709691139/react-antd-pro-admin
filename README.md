# react-antd-pro-admin

- 配套后端：node nestjs： https://github.com/a709691139/nest-admin

## 相关文档

- ant-design-pro: https://github.com/ant-design/ant-design-pro
- antd: https://ant.design/components/overview-cn/
- amis: https://aisuda.bce.baidu.com/amis/zh-CN/components/form/select
- umijs max: https://umijs.org/docs/max/valtio

## Start project

- install: `yarn install`
- start mock: `npm start`
- build: `npm run build`
- lint: `npm run lint`
- lint:fix `npm run lint:fix`
- test `npm rtest`

## amis 组件

- 渲染 component: AmisPage
- 编辑器 component: AmisEditorPage
- 本地 json, url 规则: /amis/:pageId, 根据 pageId 去读取对应 json
- 权限控制, { visibleOn: "${ permissionKeys['todo'] }" }

## 权限控制

hooks 或者 window.checkPermission('todo')

```tsx
import { useAccess } from 'umi';

const PageA = (props) => {
  const { foo } = props;
  const access = useAccess();

  if (access.canReadFoo) {
    // 如果可以读取 Foo，则...
  }

  return <>TODO</>;
};

export default PageA;
```
