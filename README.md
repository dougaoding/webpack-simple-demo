
# webpack-simple-demo

一个自己写的webpack单入口demo，支持开发模式和生产模式两种方式。

### 开发模式

```js
npm start: 打包;
npm run server: 服务器打开，支持 inline hot 热加载，默认端口在8088。

```

在开发模式中，支持将css,js全都打包成bundle.js文件，最后通过脚本形式引入index.html。提供babel将es6语法转换为es5,支持less编写样式。

### 生产模式

```javascript
npm run build : 打包
```

生产模式中，css和js将被压缩并分开打包先后引入index.html中，css相关样式会自动添加前缀，以满足不同浏览器的兼容需要，每次打包时会生成带有hash值的文件，防止浏览器缓存。

> 注意：此demo全部抄袭，没有原创！欢迎一起讨论与webpack相关的任何事情。

