module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    hot: true,
    port: 3000
  },
  lintOnSave: false
}
