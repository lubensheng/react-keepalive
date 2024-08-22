/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ReactNode, type Dispatch, useRef, useState } from "react";

// 创建状态
export const CREATE_STATUS = "create";
// 激活时状态
export const ACTIVE_STATUS = "active";
// 激活完成时状态
export const ACTIVATED_STATUS = "activated";
// 缓存休眠状态
export const UNACTIVE_STATUS = "unactive";
// 缓存休眠完成时状态
export const UNACTIVATED_STATUS = "unactivated";
// 销毁状态
export const DESTROY_STATUS = "destroy";
// 销毁完成状态
export const DESTROYED_STATUS = "destroyed";
// 清除缓存
export const CLEAR_STATUS = "clear";
// 更新组件
export const UPDATE_STATUS = "update";

const CACHE_MAX_DEFAULT_LIMIT = 200;

type Status =
  | "create"
  | "active"
  | "activated"
  | "unactive"
  | "unactivated"
  | "destroy"
  | "destroyed"
  | "clear"
  | "update";

interface CacheElement {
  cacheId: string | number;
  status: Status;
  children: ReactNode;
  load: unknown;
  updater: Record<string, unknown>
}



class Keepalive {

  public setState: Dispatch<CacheElement[]>

  public maxLimit: number;

  public cacheList: CacheElement[] = [];

  public constructor(setState: Dispatch<CacheElement[]>, maxLimit: number = CACHE_MAX_DEFAULT_LIMIT) {
    this.setState = setState;
    this.maxLimit = maxLimit;
  }

  // 根据id获取状态
  public getElementStatus(cacheId: string) {
    const current = this.cacheList.find(c => c.cacheId === cacheId);
    if (current) {
      return current.status;
    }
    return null;
  }

  public destroyItem(id: string) {
    const index = this.cacheList.findIndex(c => c.cacheId === id);
    if (index === -1) {
      return;
    }
    if (this.cacheList[index].status === UNACTIVATED_STATUS) {
      this.cacheList.splice(index, 1);
    }

  }


  public cacheDispatch(params: { type: Status, payload: any }) {
    const {
      type,
      payload
    } = params;

    this[type] && this[type](payload)
    type !== CLEAR_STATUS && this.setState([]);
  }
  [CREATE_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [CLEAR_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [ACTIVE_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [ACTIVATED_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [UPDATE_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [UNACTIVE_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [UNACTIVATED_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [DESTROY_STATUS] = (payload: any) => {
    console.log(payload);
  }

  [DESTROYED_STATUS] = (payload: any) => {
    console.log(payload);
  }
}


export default function useKeep() {
  const keeper = useRef<Keepalive>();
  const [, setKeepItems] = useState<CacheElement[]>([]);
  if (!keeper.current) {
    keeper.current = new Keepalive(setKeepItems);
  }
  return keeper.current;
}
