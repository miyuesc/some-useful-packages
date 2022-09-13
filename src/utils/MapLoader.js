import AMapLoader from "@amap/amap-jsapi-loader";

/**
 * 高德地图 API 加载函数，默认不加载 plugin，key 秘钥 (推荐将秘钥保存在配置文件中)
 * @param [v] 地图版本
 * @param [uiOpts] AMapUI 配置
 * @param [locaV] loca 配置
 * @returns {Promise<void>}
 */
export default async function (v, uiOpts, locaV) {
    const key = '0d17e9413144a9e08e0f223c135979f5'
    const version = v || '2.0'
    const AMapUI = uiOpts || null
    const Loca = locaV ? { version: locaV } : null

    return await AMapLoader.load({
        key,
        version,
        AMapUI,
        Loca
    })
}