# React 疫情地图项目
1. 创建项目
2. 需要安装的包 使用 npm 或者 yarn

```js
 yarn add axios //请求用
 yarn add echarts // 百度的echars 
 yarn add echarts-for-react  //react的echars插件
 yarn add  http-proxy-middleware  //配置跨域请求
 yarn add antd // 阿里的react组件库 
```

3. 配置跨域

- 在src文件夹下面建立setupProxy.js 
- 代码如下  

```js
 const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  // proxy第一个参数为要代理的路由
  // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
  app.use(
    createProxyMiddleware('/txapi/ncov', {
      target: 'http://api.tianapi.com',
      changeOrigin: true
    })
  )
}
```
4. 文件目录
`
- src 
  - page //页面组件 
  - utils //工具项 
  - api  // 请求
  - hooks //钩子函数 
`
5. 地图组件Map 
  ReactECharts的参数
  1. options 决定图像是什么样子
  
