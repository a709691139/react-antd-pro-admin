// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 生成图片验证码 GET /api/system/createImageCode */
export async function SystemControllerCreateImageCode(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.CreateImageCodeResponse }>(
    '/api/system/createImageCode',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
