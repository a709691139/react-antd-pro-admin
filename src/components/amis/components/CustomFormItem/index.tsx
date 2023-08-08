import * as React from "react";
import { FormItem } from "amis";
import { RendererProps } from "amis";

export type CustomFormItemProps = RendererProps

@FormItem({
  type: "custom-form-item",
  name: "custom-form-item",
})
class CustomFormItem extends React.Component<CustomFormItemProps> {
  static defaultProps = {};

  render() {
    const { value, onChange } = this.props;

    return (
      <div>
        <p>这个是个自定义组件</p>
        <p>当前值：{value}</p>
        <a className="btn btn-default" onClick={() => onChange(Math.round(Math.random() * 10000))}>
          随机修改
        </a>
      </div>
    );
  }
}
export default CustomFormItem;
