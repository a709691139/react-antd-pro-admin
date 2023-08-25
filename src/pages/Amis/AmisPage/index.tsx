import '@/components/amis/components';
import config from '@/components/amis/config';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation, useModel } from '@umijs/max';
import { useMount } from 'ahooks';
import { AlertComponent, IScopedContext, render as renderAmis, Schema, ToastComponent } from 'amis';
import { FC, useRef } from 'react';
import * as schemaData from './Data';

/** AmisPage */
const AmisPage: FC<any> = () => {
  const { initialState } = useModel('@@initialState');
  const permissionKeys = initialState?.permissionKeys || {};
  const amisScopedRef = useRef<IScopedContext>();

  const location = useLocation();
  const pathname = location.pathname;
  const compName = pathname.substring(pathname.lastIndexOf('/') + 1);
  pathname.split('/');

  const schema: Schema = schemaData[compName];

  useMount(() => {
    console.log('amisScopedRef', amisScopedRef);
  });

  return (
    <PageContainer header={{ title: '' }} key={compName}>
      <div>
        <ToastComponent
          theme={config.theme}
          key="toast"
          position={'top-right'}
          locale={config.locale}
        />
        <AlertComponent theme={config.theme} key="alert" locale={config.locale} />
        {renderAmis(
          schema,
          {
            data: {
              permissionKeys,
            },
            // props...
            // locale: 'en-US' // 请参考「多语言」的文档
            scopeRef: (ref: any) => (amisScopedRef.current = ref), // 功能和前面 SDK 的 amisScoped 一样
          },
          config.env,
        )}
      </div>
    </PageContainer>
  );
};

export default AmisPage;
