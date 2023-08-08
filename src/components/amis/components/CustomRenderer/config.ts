import { BasePlugin } from 'amis-editor';
import { registerEditorPlugin } from 'amis-editor';

export default class MyPlugin extends BasePlugin {
  // 这里要跟对应的渲染器名字对应上
  // 注册渲染器的时候会要求指定渲染器名字
  rendererName = 'my-renderer';

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json';

  // 用来配置名称和描述
  name = '自定义渲染器';
  description = '这只是个示例';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['自定义'];

  // 图标
  icon = 'cloud';

  // 用来生成预览图的
  previewSchema = {
    type: 'my-renderer',
    tip: 'demo'
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'my-renderer',
    tip: 'demo'
  };

  // 拖入时先弹窗录入
  // scaffoldForm = {
  //   title: '标题',
  //   body: [
  //     {
  //       name: 'tip',
  //       label: 'tip',
  //       type: 'input-text'
  //     }
  //   ]
  // };

  // 右侧面板相关
  panelBody = [
    {
      type: 'tabs',
      tabsMode: 'line',
      className: 'm-t-n-xs',
      contentClassName: 'no-border p-l-none p-r-none',
      tabs: [
        {
          title: '常规',
          body: [
            {
              name: 'tip',
              label: 'tip',
              type: 'input-text'
            }
          ]
        },

        {
          title: '外观',
          body: []
        }
      ]
    }
  ];
}
registerEditorPlugin(MyPlugin);
