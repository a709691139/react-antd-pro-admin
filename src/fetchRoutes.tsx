import type { MenuDataItem } from '@umijs/route-utils';
import { createRef } from 'react';
import { getSystemPermissions } from './services/ant-design-pro/api';

import Page404 from '@/pages/404';
import Test from '@/pages/Test';
import AmisPage from '@/pages/Amis/AmisPage';
import AmisEditPage from '@/pages/Amis/AmisEditPage';

const comps: any = {
  Test,
  Page404,
  AmisEditPage,
  AmisPage,
};
/** 动态的接口路由 */
const extraRoutes: API.Permission[] = [];

export const layoutActionRef = createRef<{ reload: () => void }>();

function transExtraRoutes(tree: API.Permission[]) {
  if (!tree?.length) {
    return [];
  }
  if (tree[0].id === '1') {
    return transExtraRoutes(tree[0].children || []);
  }
  return tree
    .filter((v) => v.menuType === '0' || v.menuType === '1')
    .sort((a, b) => a.sortNo - b.sortNo)
    .map((v) => {
      const route: any = {
        name: v.name,
        path: v.url,
        access: v.perms || v.url,
      };
      if (v.component) {
        const Comp: any = comps[v.component];
        if (Comp) {
          route.element = <Comp />;
        } else {
          route.element = <Page404 />;
        }
      }
      if (v.children && v.children.length > 0) {
        route.children = transExtraRoutes(v.children);
      }
      return route;
    });
}

export function patchClientRoutes({ routes }) {
  console.log('patchClientRoutes', routes);
  // 根据 extraRoutes 对 routes 做一些修改
  // TODO
  // routes.push({
  //   path: '/group',
  //   children: [{
  //     path: '/group/page',
  //     element: <Page />,
  //   }],
  // });
  routes.push(...transExtraRoutes(extraRoutes));
}

export function render(oldRender: any) {
  getSystemPermissions()
    .then((res) => {
      res.data.forEach((v) => {
        extraRoutes.push(v);
      });
      console.warn('render extraRoutes', extraRoutes);
      oldRender();
      layoutActionRef.current?.reload();
    })
    .catch((err) => {
      console.log(err);
      oldRender();
    });
}

export function transMenu(tree: API.Permission[]): MenuDataItem[] {
  if (tree[0].id === '1') {
    return transMenu(tree[0].children || []);
  }
  return tree
    .filter((v) => v.menuType === '0' || v.menuType === '1')
    .sort((a, b) => a.sortNo - b.sortNo)
    .map((v) => {
      const route: any = {
        key: v.id,
        name: v.name,
        path: v.url,
        redirect: v.redirect,
        menuRender: v.isHidden === '0',
        icon: v.icon,
      };
      route.children = undefined;
      if (!v.redirect && v.children && v.children.length > 0) {
        route.routes = transMenu(v.children);
      }
      return route;
    });
}
export function getMenuData(): MenuDataItem[] {
  return transMenu(extraRoutes);
}
