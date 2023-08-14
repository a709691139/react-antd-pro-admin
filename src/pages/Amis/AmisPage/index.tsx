import '@/components/amis/components';
import config from '@/components/amis/config';
import { Link, useLocation } from '@umijs/max';
import { useMount } from 'ahooks';
import { AlertComponent, IScopedContext, render as renderAmis, Schema, ToastComponent } from 'amis';
import { Breadcrumb, Button, Layout } from 'antd';
import { FC, useRef, useState } from 'react';
import * as schemaData from './Data';

/** AmisPage */
const AmisPage: FC<any> = () => {
  const [list, setList] = useState<any[]>([]);
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
    <Layout className="page AmisPage">
      <Breadcrumb className="pageBreadCrumb" items={[{}]}>
        <Breadcrumb.Item>
          <Button
            style={{ marginRight: '20px' }}
            onClick={() => window.history.back()}
            size="small"
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>AmisPage</Breadcrumb.Item>
      </Breadcrumb>

      <Layout.Content>
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
              // props...
              // locale: 'en-US' // 请参考「多语言」的文档
              scopeRef: (ref: any) => (amisScopedRef.current = ref), // 功能和前面 SDK 的 amisScoped 一样
            },
            config.env,
          )}
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default AmisPage;
