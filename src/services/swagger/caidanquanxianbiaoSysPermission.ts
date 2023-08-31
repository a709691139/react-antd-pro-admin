// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/sys_permission/create */
export async function PermissionControllerCreate(
  body: API.Permission,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Permission }>('/api/sys_permission/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建多个按钮权限 POST /api/sys_permission/createButtons */
export async function PermissionControllerCreateButtons(
  body: API.CreateButtonsReq,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_permission/createButtons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/sys_permission/get */
export async function PermissionControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Permission }>('/api/sys_permission/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取个人的权限菜单，需前端自己转化树和权限code POST /api/sys_permission/getCurrentUserPermissions */
export async function PermissionControllerGetMyPermissions(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.Permission[] }>(
    '/api/sys_permission/getCurrentUserPermissions',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 获取系统默认菜单列表 GET /api/sys_permission/page */
export async function PermissionControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Permission[] }>('/api/sys_permission/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_permission/remove/${param0} */
export async function PermissionControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/sys_permission/remove/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_permission/update */
export async function PermissionControllerUpdate(
  body: API.Permission,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Permission }>('/api/sys_permission/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
