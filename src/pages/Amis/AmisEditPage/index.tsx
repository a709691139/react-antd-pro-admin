import '@/components/amis/components';
import '@/components/amis/components/plugin';
import config from '@/components/amis/config';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMount, useReactive } from 'ahooks';
import { Editor } from 'amis-editor';
import { Button, Form, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { FC } from 'react';
import './style.css';

let host = `${window.location.protocol}//${window.location.host}`;
const schemaUrl = `${host}/schema.json`;
let iframeUrl = '/editor.html';

/** AmisEditPage */
const AmisEditPage: FC<any> = () => {
  const state = useReactive({
    theme: config.theme,
    preview: false,
    isMobile: false,
    schema: {
      type: 'page',
      title: 'Hello world',
      body: [],
    } as any,
  });
  const { initialState } = useModel('@@initialState');
  const permissionKeys = initialState?.permissionKeys || {};

  useMount(() => {});

  return (
    <PageContainer header={{ title: '' }}>
      <Form layout="inline">
        <Form.Item label="预览">
          <Switch checked={state.preview} onChange={(v) => (state.preview = v)}></Switch>
        </Form.Item>
        <Form.Item label="手机todo">
          <Switch checked={state.isMobile} onChange={(v) => (state.isMobile = v)}></Switch>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            console.log(state.schema);
            copy(JSON.stringify(state.schema));
            message.success('复制成功');
          }}
        >
          导出并复制
        </Button>
      </Form>
      <Editor
        theme={state.theme}
        preview={state.preview}
        isMobile={state.isMobile}
        value={state.schema}
        onChange={(v) => (state.schema = v)}
        onPreview={(v) => {
          state.preview = v;
        }}
        onSave={() => {
          console.log(state.schema);
        }}
        //className="is-fixed"
        $schemaUrl={schemaUrl}
        iframeUrl={iframeUrl}
        showCustomRenderersPanel={true}
        amisEnv={config.env}
        data={{
          permissionKeys,
        }}
      />
    </PageContainer>
  );
};

export default AmisEditPage;
