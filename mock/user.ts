import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

const allMenus = [
  {
    id: '2',
    name: '系统管理',
    menuType: '0',
    url: '/system',
    children: [
      {
        parentId: '2',
        id: '2-1',
        menuType: '1',
        name: '用户管理',
        url: '/system/amis/SystemUser',
        component: 'AmisPage',
      },
      {
        parentId: '2',
        id: '2-2',
        menuType: '1',
        name: '菜单管理',
        url: '/system/amis/SystemPermission',
        component: 'AmisPage',
      },
    ],
  },
  {
    id: '3',
    menuType: '0',
    name: 'amis',
    url: '/amis/SystemPermission',
    component: 'AmisPage',
  },
  {
    id: '4',
    menuType: '0',
    name: 'amis编辑器',
    url: '/amis-editor',
    component: 'AmisEditPage',
  },
];

function createPermissions(parentId: string, tableName: string) {
  const commons = [
    {
      name: '查询列表',
      perms: 'page',
    },
    {
      name: '查询详情',
      perms: 'get',
    },
    {
      name: '新增',
      perms: 'create',
    },
    {
      name: '编辑',
      perms: 'update',
    },
    {
      name: '删除',
      perms: 'remove',
    },
    {
      name: '导出excel',
      perms: 'export_excel',
    },
  ];
  return commons.map((v) => {
    return {
      ...v,
      parentId,
      perms: tableName + ':' + v.perms,
      id: parentId + ':p:' + v.perms,
    };
  });
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/sys_user/getCurrentUserInfo': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        tenantId: '001',
        id: 'admin',
        usename: 'admin',
      },
    });
  },
  'POST /api/sys_user/loginByPassword': {
    success: true,
    data: {
      token: 'admin',
    },
  },
  'GET /api/sys_permission/page': {
    success: true,
    data: allMenus,
  },
  'POST /api/sys_permission/getCurrentUserPermissions': (req: Request, res: Response) => {
    const data: any[] = [];
    function loop(tree: any[]) {
      tree.forEach((item) => {
        if (item.menuType !== '2') {
          data.push({ ...item });
        }
        if (item.children) {
          loop(item.children);
        }
      });
    }
    loop(allMenus);
    data.push(...createPermissions('2-1', 'sys_user'));
    data.push(...createPermissions('2-2', 'sys_permission'));
    res.send({
      success: true,
      data,
    });
  },
  'GET /api/sys_user/page': {
    success: true,
    data: [
      {
        id: '1',
        username: '哈哈',
        status: '0',
      },
      {
        id: '2',
        username: '233',
        status: '1',
      },
    ],
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,

  'GET /api/system/createImageCode': {
    success: true,
    status: 0,
    msg: '成功',
    data: {
      imageCode: '533BM',
      imageCodeId: '04f9fa19cab745b29fad2406c251e73f',
      imageUrl:
        'data:image/bmp;base64,Qk0WLwAAegAAADYAAAAoAAAAZAAAACgAAAABABgAAAAAAOAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qvH8qvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlLVrlLVrlLVrlLVrlLVrlLVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLT9wLT9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLTAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRr9dRr9dRrAAAAAAAA9dRrAAAAAAAA9dRr9dRr9dRr9dRr9dRr9dRrAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAvH8qvH8qvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAALVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQdnzQdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlLVrlLVrlLVrlLVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAA9dRrAAAAAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qvH8qvH8qvH8qvH8qvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvH8qvH8qvH8qvH8qvH8qvH8qvH8qvH8qAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRr9dRrAAAAAAAA9dRrAAAAAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAALVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAA9dRr9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLTAAAAAAAAAAAA9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALVrlLVrlLVrlLVrlLVrlLVrlLVrlLVrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9wLT9wLT9wLT9wLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdnzQdnzQdnzQdnzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAA9dRrAAAA9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRr9dRr9dRrAAAAAAAAAAAAAAAAAAAAAAAA9dRr9dRr9dRr9dRr9dRrAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfJnvAAAAfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvfJnvAAAA',
    },
  },
};
