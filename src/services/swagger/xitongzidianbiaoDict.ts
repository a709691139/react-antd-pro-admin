// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/sys_dict/create */
export async function DictControllerCreate(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.Dict }>('/api/sys_dict/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/sys_dict/get */
export async function DictControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Dict }>('/api/sys_dict/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取全部系统字典 GET /api/sys_dict/getAllDict */
export async function DictControllerGetAllDict(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.Dict[] }>('/api/sys_dict/getAllDict', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/sys_dict/getItemsByCode/${param0} */
export async function DictControllerGetItemsByCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerGetItemsByCodeParams,
  options?: { [key: string]: any },
) {
  const { code: param0, ...queryParams } = params;
  return request<API.ResponseWrap & { data?: API.ItemDto[] }>(
    `/api/sys_dict/getItemsByCode/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 分页查询 分页查询 GET /api/sys_dict/page */
export async function DictControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Pagination & { data?: API.Dict[] } }>(
    '/api/sys_dict/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/sys_dict/remove/${param0} */
export async function DictControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/sys_dict/remove/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_dict/update */
export async function DictControllerUpdate(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.Dict }>('/api/sys_dict/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_dict/updateItems */
export async function DictControllerUpdateItems(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.ResponseWrap>('/api/sys_dict/updateItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
