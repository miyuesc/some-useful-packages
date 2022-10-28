module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    hot: true,
    host: "127.0.0.1",
    port: 3000
  },
  lintOnSave: false
};
