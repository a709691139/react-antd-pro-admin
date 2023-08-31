// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/sys_user/create */
export async function UserControllerCreate(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.User }>('/api/sys_user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/sys_user/get */
export async function UserControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.User }>('/api/sys_user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取个人基础资料 GET /api/sys_user/getCurrentUserInfo */
export async function UserControllerGetCurrentUserInfo(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.User }>('/api/sys_user/getCurrentUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 密码登陆 POST /api/sys_user/loginByPassword */
export async function UserControllerLoginByPassword(
  body: API.LoginPasswordUserDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.LoginSuccessResponseDto }>(
    '/api/sys_user/loginByPassword',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 退出登陆 POST /api/sys_user/logout */
export async function UserControllerLogout(options?: { [key: string]: any }) {
  return request<API.ResponseWrap>('/api/sys_user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页查询 分页查询 GET /api/sys_user/page */
export async function UserControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.Pagination & { data?: API.User[] } }>(
    '/api/sys_user/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 注册用户名 POST /api/sys_user/regis */
export async function UserControllerRegis(
  body: API.RegisUserDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap & { data?: API.User }>('/api/sys_user/regis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_user/remove/${param0} */
export async function UserControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/sys_user/remove/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 重置密码 POST /api/sys_user/resetPassword */
export async function UserControllerResetPassword(
  body: API.ResetPasswordReqDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_user/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置用户密码 POST /api/sys_user/resetUserPassword */
export async function UserControllerResetUserPassword(
  body: API.ResetUserPasswordDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/sys_user/resetUserPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/sys_user/update */
export async function UserControllerUpdate(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseWrap>('/api/sys_user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新个人基础资料 POST /api/sys_user/updateCurrentUserInfo */
export async function UserControllerUpdateMyInfo(
  body: API.UpdateMyInfoDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_user/updateCurrentUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改个人密码 POST /api/sys_user/updateCurrentUserPassoword */
export async function UserControllerUpdateMyPassoword(
  body: API.UpdateMyPassowordDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_user/updateCurrentUserPassoword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分配角色 POST /api/sys_user/updateRoles */
export async function UserControllerUpdateRoles(
  body: API.UpdateRolesDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_user/updateRoles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 启用或冻结用户 POST /api/sys_user/updateStatus */
export async function UserControllerUpdateStatus(
  body: API.UpdateStatusReqDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseWrap>('/api/sys_user/updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
