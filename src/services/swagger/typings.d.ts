declare namespace API {
  type AddRoleDto = {
    /** 名称 */
    name: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
  };

  type CreateButtonsReq = {
    parentId: string;
    buttons: string[];
  };

  type DemoOne = {
    id?: string;
    /** 名称 */
    name?: string;
    age?: number | string;
    momeny?: number;
    date1?: string;
    datetime1?: string;
  };

  type DemoOneControllerFindOneParams = {
    id: string;
  };

  type DemoOneControllerPageParams = {
    page: number;
    perPage: number;
    id?: string;
    /** 名称 */
    name?: string;
    age?: string;
    momeny?: number;
    date1?: string;
    datetime1?: string;
  };

  type DemoOneControllerRemoveParams = {
    id: string;
  };

  type Dict = {
    id?: string;
    /** 名称 */
    name?: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
  };

  type DictControllerFindOneParams = {
    id: string;
  };

  type DictControllerGetItemsByCodeParams = {
    code: string;
  };

  type DictControllerPageParams = {
    page: number;
    perPage: number;
    id?: string;
    /** 名称 */
    name?: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
  };

  type DictControllerRemoveParams = {
    id: string;
  };

  type ItemDto = {
    id: string;
    text: string;
    label: string;
    value: string;
  };

  type LoginPasswordUserDto = {
    /** 账号名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type LoginSuccessResponseDto = {
    token: string;
    userId: string;
    userInfo: User;
    /** 个人权限code列表 */
    permissions: string[];
  };

  type Pagination = {
    data: string[];
    page: number;
    perPage: number;
    total: number;
  };

  type Permission = {
    id?: string;
    /** parentId */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 描述 */
    desc?: string;
    /** 路径 */
    url?: string;
    /** 前端组件名 */
    component?: string;
    /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
    menuType?: string;
    /** 菜单权限编码 */
    perms?: string;
    /** 菜单排序 */
    sortNo?: number;
    /** 菜单图标 */
    icon?: string;
    /** 是否缓存路由 */
    isKeepAlive?: string;
    /** 是否隐藏路由 */
    isHidden?: string;
    /** 跳转地址 */
    redirect?: string;
    children?: Permission[];
  };

  type PermissionControllerFindOneParams = {
    id: string;
  };

  type PermissionControllerPageParams = {
    id?: string;
    /** parentId */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 描述 */
    desc?: string;
    /** 路径 */
    url?: string;
    /** 前端组件名 */
    component?: string;
    /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
    menuType?: string;
    /** 菜单权限编码 */
    perms?: string;
    /** 菜单排序 */
    sortNo?: number;
    /** 菜单图标 */
    icon?: string;
    /** 是否缓存路由 */
    isKeepAlive?: string;
    /** 是否隐藏路由 */
    isHidden?: string;
    /** 跳转地址 */
    redirect?: string;
    id?: string;
    /** parentId */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 描述 */
    desc?: string;
    /** 路径 */
    url?: string;
    /** 前端组件名 */
    component?: string;
    /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
    menuType?: string;
    /** 菜单权限编码 */
    perms?: string;
    /** 菜单排序 */
    sortNo?: number;
    /** 菜单图标 */
    icon?: string;
    /** 是否缓存路由 */
    isKeepAlive?: string;
    /** 是否隐藏路由 */
    isHidden?: string;
    /** 跳转地址 */
    redirect?: string;
    children?: Permission[];
  };

  type PermissionControllerRemoveParams = {
    id: string;
  };

  type RegisUserDto = {
    /** 账号名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type ResetPasswordReqDto = {
    userId: string;
    password: string;
  };

  type ResetUserPasswordDto = {
    userId: string;
    password: string;
  };

  type ResponseWrap = {
    data: Record<string, any>;
    status: number;
    msg: string;
  };

  type Role = {
    id?: string;
    /** 名称 */
    name?: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
    /** 菜单权限列表 */
    permissions?: Permission[];
  };

  type RoleControllerFindOneParams = {
    id: string;
  };

  type RoleControllerPageParams = {
    page: number;
    perPage: number;
    id?: string;
    /** 名称 */
    name?: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
    id?: string;
    /** parentId */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 描述 */
    desc?: string;
    /** 路径 */
    url?: string;
    /** 前端组件名 */
    component?: string;
    /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
    menuType?: string;
    /** 菜单权限编码 */
    perms?: string;
    /** 菜单排序 */
    sortNo?: number;
    /** 菜单图标 */
    icon?: string;
    /** 是否缓存路由 */
    isKeepAlive?: string;
    /** 是否隐藏路由 */
    isHidden?: string;
    /** 跳转地址 */
    redirect?: string;
    children?: Permission[];
  };

  type RoleControllerRemoveParams = {
    id: string;
  };

  type UpdateMyInfoDto = {
    avatar: string;
    /** 别名 */
    alias: string;
    /** 性别 0：未知、1：男、2：女 */
    gender: string;
    /** 签名 */
    signature: string;
  };

  type UpdateMyPassowordDto = {
    oldPassoword: string;
    newPassword: string;
  };

  type UpdateRoleDto = {
    /** 角色id */
    id: string;
    /** 名称 */
    name: string;
    /** 编码 */
    code?: string;
    /** 描述 */
    desc?: string;
  };

  type UpdateRolePermissionDto = {
    /** 角色id */
    id: string;
    /** 权限ids */
    permissionIds: string[];
  };

  type UpdateRolesDto = {
    userId: string;
    roleIds: string[];
  };

  type UpdateStatusReqDto = {
    userId: string;
    /** 1:启用、0:冻结 */
    status: string;
  };

  type UploadResponse = {
    value: string;
  };

  type User = {
    id?: string;
    /** 账号名 */
    username?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    alias?: string;
    gender?: string;
    realName?: string;
    signature?: string;
    status?: string;
    departIds?: string;
    workNo?: string;
    /** 角色列表 */
    roles?: Role[];
  };

  type UserControllerFindOneParams = {
    id: string;
  };

  type UserControllerPageParams = {
    page: number;
    perPage: number;
    id?: string;
    /** 账号名 */
    username?: string;
    /** 邮箱地址 */
    email?: string;
    /** 手机 */
    phone?: string;
    /** 别名 */
    alias?: string;
    /** 性别 0：未知、1：男、2：女 */
    gender?: string;
    /** 真实姓名 */
    realName?: string;
    /** 用户状态: 0禁用 1启用 */
    status?: string;
    /** 负责部门id列表: 用,隔开 */
    departIds?: string;
    /** 工号 */
    workNo?: string;
    /** 角色id */
    roleId?: string;
    /** 创建时间 */
    createdAt?: string;
  };

  type UserControllerRemoveParams = {
    id: string;
  };
}
