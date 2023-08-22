// @ts-ignore
/* eslint-disable */
import { request } from '@/requestConfig';

/** 获取当前的用户 GET /api/sys_user/getCurrentUserInfo*/
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/sys_user/getCurrentUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/sys_permission/getCurrentUserPermissions */
export async function getCurrentUserPermissions(options?: { [key: string]: any }) {
  return request<API.Permission[]>('/api/sys_permission/getCurrentUserPermissions', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/sys_user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sys_user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口s */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<{
    token: string;
  }>('/api/sys_user/loginByPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取系统默认菜单列表 GET /api/sys_permission/page */
export async function getSystemPermissions(options?: { [key: string]: any }) {
  return request<API.Permission[]>('/api/sys_permission/page', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
