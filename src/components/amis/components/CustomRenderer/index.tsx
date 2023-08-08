import * as React from "react";
import { Renderer } from "amis";
import { RendererProps } from "amis";

export interface CustomRendererProps extends RendererProps {
  tip?: string;
}

@Renderer({
  type: "my-renderer",
  name: "my-renderer",
  autoVar: true, // amis 1.8 之后新增的功能，自动解析出参数里的变量
})
class CustomRenderer extends React.Component<CustomRendererProps> {
  static defaultProps = {
    tip: "",
  };

  render() {
    const { tip, body, render } = this.props;
    return (
      <div>
        <p>这是自定义组件：{tip}</p>
        {body ? (
          <div className="container">
            {render("body", body, {
              // 这里的信息会作为 props 传递给子组件，一般情况下都不需要这个
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
export default CustomRenderer;
