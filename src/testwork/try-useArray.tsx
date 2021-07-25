import { FC, ReactElement } from "react";
import { useMount, useArray } from "utils";

const Tstest: FC = (): ReactElement => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, add, removeIndex, clear } = useArray(persons);

  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "hohn", age: 15 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear{" "}
      </button>
      {value.map((item, index) => (
        <div key={index}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{item.name}</span>
          <span>{item.age}</span>
        </div>
      ))}
    </div>
  );
};

export default Tstest;
