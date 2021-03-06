var path = require('path');
var xdc = require('xdc');
var build = require('./build');
var isProd = process.env.NODE_ENV === 'production';

xdc.set({
  entry: build.entries(),
  dist: './dist',
  template: build.templates(),
  devServer: {<% if (devServer) { %>
    port: 8080,
    publicPath: '/'<% } else { %>
    enable: false,
    extractCSS: true<% } %>
  },
  clean: true,
  hash: true,
  sourceMap: true,
  chunk: true,
  postcss: [],
  publicPath: '/dist/',
  extractCSS: isProd ? 'static/[name].[contenthash:7].css' : true,
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue<%= vueVersion %>'<% if (js) { %>, '<%= js %>'<% } %>, 'lint'<% if (csstype) { %>, '<%= csstype %>'<% } %><% if (csstype != 'saladcss') { %>, 'autoprefixer'<% } %>],
  externals: build.externals()
});

isProd && xdc.add('output.filename', 'static/[name].[hash:7].js');

module.exports = xdc.resolve();
