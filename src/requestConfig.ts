import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { request as myRequest, Request } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  /** 0成功 1失败 */
  status: number;
  data: any;
  msg?: string;
  showType?: ErrorShowType;
  success: boolean;
}

type ApiResponse<T> = {
  data: T;
  success: boolean;
  msg: string;
  status: number;
};

export const request = <T>(url: string, opts: RequestOptions) => {
  return myRequest<ApiResponse<T>>(url, opts);
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  transformResponse: (resData) => {
    if (resData?.[0] === '{') {
      const data = JSON.parse(resData);
      if (data.success) return data;
      data.success = data.status === 0;
      return data;
    }
    return resData;
  },
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      console.log('errorThrower');
      const { success, data, status, msg, showType } = res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { status, msg, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('errorHandler');
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { msg, status } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(msg);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(msg);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: msg,
                message: status,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(msg);
          }
          if (status === 401) {
            // TODO 清空登陆状态，跳转登陆页
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url;
      const headers = {
        ...(config.headers || {}),
        token: localStorage.token,
        tenantId: TENANT_ID,
      };
      return { ...config, url, headers };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      console.log('responseInterceptors', response);
      // 拦截响应数据，进行个性化处理
      return response;
    },
  ],
};

console.log('process.env', process.env);
console.log('REACT_APP_ENV', REACT_APP_ENV);
console.log('TENANT_ID', TENANT_ID);
