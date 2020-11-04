module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .rule('compile')
      .test(/\.svg$/)
      .include
        .add([__dirname + '/node_modules/bootstrap-icons/icons'])
        .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

      const filesRule = config.module.rule('files')
      filesRule
        .rule('compile')
        .test(/\.(svg)(\?.*)?$/)
        .exclude
          .add([__dirname + '/node_modules/bootstrap-icons/icons'])
          .end()
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'img/[name].[hash:8].[ext]'
        });
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    extract: false, // 解决 build 时 不加载样式的问题
    requireModuleExtension: true,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-ui/'
    : '/',
}
