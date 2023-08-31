// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 简介 说明 GET /api */
export async function AppControllerGetHello(options?: { [key: string]: any }) {
  return request<any>('/api', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 简介 说明 GET /api/2 */
export async function AppControllerGetHello2(options?: { [key: string]: any }) {
  return request<any>('/api/2', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/redis/del */
export async function AppControllerRedisDel(options?: { [key: string]: any }) {
  return request<any>('/api/redis/del', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/redis/get */
export async function AppControllerRedisGet(options?: { [key: string]: any }) {
  return request<any>('/api/redis/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/redis/lock */
export async function AppControllerRedisLock(options?: { [key: string]: any }) {
  return request<any>('/api/redis/lock', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/redis/set */
export async function AppControllerRedisSet(options?: { [key: string]: any }) {
  return request<any>('/api/redis/set', {
    method: 'GET',
    ...(options || {}),
  });
}
