import { Select } from "antd";
import { ComponentProps, FC } from "react";
import { Raw } from "types";

type SelectProps = ComponentProps<typeof Select>;
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
// 如果组件没有暴露出对应的接口 利用React.ComponentProps
/**
 *  value 可以传入多中类型的值
 * onChange 只会回调 number | undefined 类型
 * 当isNaN (Number(value))为true的时候,代表选择默认类型
 * 当选择默认类型的时候 onchange会回调undefined
 */
export const IdSelect: FC<IdSelectProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
