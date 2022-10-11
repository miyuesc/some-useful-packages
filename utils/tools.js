/**
 * 返回数据原始类型
 * @param value
 * @return { string } type
 */
export function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
