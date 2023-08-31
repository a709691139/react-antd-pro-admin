// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/sys_role/create */
export async function RoleControllerCreate(body: API.AddRoleDto, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.Role }>('/api/sys_role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/sys_role/get */
export async function RoleControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Role }>('/api/sys_role/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询 分页查询 GET /api/sys_role/page */
export async function RoleControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Pagination & { data?: API.Role[] } }>(
    '/api/sys_role/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/sys_role/remove/${param0} */
export async function RoleControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/sys_role/remove/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_role/update */
export async function RoleControllerUpdate(
  body: API.UpdateRoleDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Role }>('/api/sys_role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_role/updateNeedPermissions */
export async function RoleControllerUpdateNeedPermissions(
  body: API.UpdateRolePermissionDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Role }>('/api/sys_role/updateNeedPermissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
