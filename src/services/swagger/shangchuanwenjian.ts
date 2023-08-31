// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文件到服务器本地 POST /api/upload/localFile */
export async function UploadControllerUploadFile(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.UploadResponse }>('/api/upload/localFile', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 上传到oss TODO POST /api/upload/oss */
export async function UploadControllerUploadOss(options?: { [key: string]: any }) {
  return request<API.ResponseWrap & { data?: API.UploadResponse }>('/api/upload/oss', {
    method: 'POST',
    ...(options || {}),
  });
}
