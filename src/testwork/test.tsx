import { useEffect, useState } from "react";

const test = () => {
  let num = 0;
  // debugger
  function effect() {
    num += 1; // 把上父级num加1 赋值到自己身上 //1
    const mes = ` num value in mes: ${num}`;
    console.log("effect", mes);
    return function () {
      num += 2;
      console.log(mes);
      console.log("最后一次的num", num);
    };
  }
  return effect;
};
const effect = test();
// debugger
const mes = effect(); // 执行一次 num +1
effect();
effect();
effect();

mes();

// effect()
// effect()

//react hook 与闭包 hook与闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => {
    return setNum(num + 1);
  };
  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);
    return () => {
      console.log("卸载时", num);
      clearInterval(id);
    };
  }, [num]);
  return (
    <>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </>
  );
};
