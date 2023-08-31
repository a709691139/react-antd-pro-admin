// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/demoOne/create */
export async function DemoOneControllerCreate(body: API.DemoOne, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.DemoOne }>('/api/demoOne/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/demoOne/get */
export async function DemoOneControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DemoOneControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.DemoOne }>('/api/demoOne/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询 分页查询 GET /api/demoOne/page */
export async function DemoOneControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DemoOneControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Pagination & { data?: API.DemoOne[] } }>(
    '/api/demoOne/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/demoOne/remove/${param0} */
export async function DemoOneControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DemoOneControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/demoOne/remove/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/demoOne/update */
export async function DemoOneControllerUpdate(body: API.DemoOne, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.DemoOne }>('/api/demoOne/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
