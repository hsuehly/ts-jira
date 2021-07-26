import { useEffect, useRef, useState } from "react";
// 在一个函数里, 传入一个对象本身是不好的
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value || null || value || "";
export const cleanObject = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    // 以来项里加上 callback 会造成无限循环,这个和usecallback useMemo 有关系
    callback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化后,设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add(item: T) {
      return setValue([...value, item]);
    },
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
export const useDocumentTitle = (
  title: string,
  keepOnUnmont: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时 oldTitle = 旧'REACT APP'
  // 页面加载后 oldTItle = 新的title
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmont) {
        // 页面卸载时如果不指定依赖那么读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmont, oldTitle]);
};
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态, 如果还没挂载或者已经卸载,返回false  反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
