import { useMount } from 'ahooks';
import React, { FC, useRef, useState } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { Link } from '@umijs/max';
import { render as renderAmis, Schema, IScopedContext, ToastComponent, AlertComponent } from 'amis';
import config from '@/components/amis/config';
import '@/components/amis/components';
import { PageContainer } from '@ant-design/pro-components';

/** AmisPage */
const AmisPage: FC<any> = () => {
  const [list, setList] = useState<any[]>([]);
  const amisScopedRef = useRef<IScopedContext>();

  useMount(() => {
    console.log('amisScopedRef', amisScopedRef);
  });

  const schema: Schema = {
    // 这里是 amis 的 Json 配置。
    type: 'page',
    title: '简单页面',
    body: {
      type: 'form',
      api: '/amis/api/mock2/form/saveForm',
      body: [
        {
          type: 'my-renderer',
          tip: '233',
        },
        {
          type: 'input-text',
          name: 'name',
          label: '姓名：',
        },
        {
          type: 'input-text',
          name: 'age',
          label: '年龄：',
        },
        {
          type: 'static-tpl',
          tpl: '生成的id为：${id}',
        },
      ],
    },
  };

  return (
    <PageContainer content="欢迎使用 ProLayout 组件">
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
    </PageContainer>
  );
};

export default AmisPage;
