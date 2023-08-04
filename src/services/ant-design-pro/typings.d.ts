// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    tenantId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    avatar: string | null;
    alias: string | null;
    gender: string;
    realName: string | null;
    signature: string | null;
    status: string;
    departIds: string[] | null;
    workNo: string;
  };

  type Permission = {
    id: string;
    parentId: string;
    name: string;
    url: string;
    component: string;
    /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
    menuType: string;
    /** 菜单权限编码 */
    perms: string;
    icon: string;
    isKeepAlive: string;
    isHidden: string;
    sortNo: number;
    redirect: string;
    children?: Permission[];
  };

  type LoginResult = {
    status?: number;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
