/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo } from "react";
import type { PropsWithChildren } from "react";
import useKeep, { DESTROY_STATUS } from "./useKeep";

interface ViewProps extends PropsWithChildren {}

const KeepaliveContext = createContext({});

function KeepaliveScope(props: ViewProps) {
  const { children } = props;

  const keeper = useKeep();

  const { cacheDispatch, getElementStatus } = keeper;

  const contextValue = useMemo(() => {
    return {
      /* 增加缓存 item | 改变 keepalive 状态 | 清除 keepalive  */
      cacheDispatch: cacheDispatch.bind(keeper),
      /* 判断 keepalive 状态 */
      hasAliveStatus: getElementStatus.bind(keeper),
      /* 提供给 */
      cacheDestroy: (payload: any) =>
        cacheDispatch.call(keeper, { type: DESTROY_STATUS, payload }),
    };
  }, [keeper]);

  return (
    <KeepaliveContext.Provider value={contextValue}>
      {children}
    </KeepaliveContext.Provider>
  );
}

export default KeepaliveScope;
