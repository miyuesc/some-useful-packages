import { getRawType } from "./tools";

// 取消响应式
export function unObserver(val) {
  if (getRawType(val) === "object" || getRawType(val) === "array") {
    val.__v_skip = true;
    return val;
  }
  return val;
}
