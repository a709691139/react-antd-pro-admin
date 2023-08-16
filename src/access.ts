let tempPermissionKeys: any = {};
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; permissions: API.Permission[] } | undefined,
) {
  const { currentUser, permissions } = initialState ?? {};
  // TODO
  const data: { [key: string]: boolean } = {
    canAdmin: currentUser?.access === 'admin',
  };
  if (permissions) {
    permissions.forEach((item) => {
      if (item.perms) {
        data[item.perms] = true;
      } else if (item.url) {
        data[item.url] = true;
      }
    });
  }
  tempPermissionKeys = data;
  console.log('trans access', data);
  return data;
}

function checkPermission(p: string) {
  return !!tempPermissionKeys[p];
}
window.checkPermission = checkPermission;
