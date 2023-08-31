# react-antd-pro-admin

根据 umijs-max 改造

- 配套后端：node nestjs： https://github.com/a709691139/nest-admin

## 相关文档

- ant-design-pro: https://github.com/ant-design/ant-design-pro
- antd: https://ant.design/components/overview-cn/
- amis: https://aisuda.bce.baidu.com/amis/zh-CN/components/form/select
- umijs max: https://umijs.org/docs/max/valtio

## TODO

- 配置 prod 的请求 url, amis+requestConfig
- 或者干脆生产用 nginx 代理转发

## Start project

- install: `yarn install`
- start mock: `npm start`
- build: `npm run build`
- lint: `npm run lint`
- lint:fix `npm run lint:fix`
- test `npm rtest`

## 系统字典

```ts
const { dictMaps, dicts } = useModel('dict');
```

## amis 组件

- 渲染 component: AmisPage
- 编辑器 component: AmisEditorPage
- 本地 json, url 规则: /amis/:pageId, 根据 pageId 去读取对应 json
- 权限控制, { visibleOn: "${ permissionKeys['todo'] }" }

### 常用 amis 写法

-api

```json
"api": "get:/amis/api/initData",
"api": {
  "method": "post",
  "url": "http://mydomain.com/api/xxx",
  "data": {
    "skip": "${(page - 1) * perPage}",
    "take": "${perPage}",
    "&": "${c}", // 展开c变量
  },
	"sendOn": "this.a === 2", // 触发就调用一次
  "responseData": {
    // {"status":0,"msg":"","data":{"items":[{"myLabel":1,"myValue":2}]}}
    "&": "$$", // 平铺返回数据
    "first": "${items|first}", // 获取第一条
    "options": "${items|pick:label~myLabel,value~myValue}" // 转化数据
  }
},
"api": {
  "method": "post",
  "url": "/api/sys_permission/createButtons",
  "data": {
    "&": "$$",
    // 转化列表item
    "buttons": "${ ARRAYMAP(buttons, item => ({ name: item.name, perms: item.perms1  }) ) }"
  }
},
```

- 字典

```json
{
  "name": "status",
  "label": "用户状态",
  "type": "mapping",
  // "map": {
  //   "0": "禁用",
  //   "1": "启用"
  // },
  "source": "${ dictMaps['bool'] }",
  "source": "/api/sys_dict/getItemsByCode/bool", // 也可以用接口
  "searchable": {
    "type": "select",
    "searchable": true,
    "clearable": true,
    // "options": [
    //   { "label": "禁用", "value": "0" },
    //   { "label": "启用", "value": "1" }
    // ],
    "source": "${ dicts['bool'] }"
  }

},
```

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
