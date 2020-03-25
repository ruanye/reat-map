// 跨域设置  
const {createProxyMiddleware}  = require("http-proxy-middleware")
module.exports =(app)=>{
	// 第一个参数跨域需要访问的路径
  //http://api.tianapi.com/txapi/ncovcity/index 
	app.use(
		createProxyMiddleware('/txapi/ncovcity',{
			 target:'http://api.tianapi.com', //需要跨域的地址 
			 changeOrigin:true //是否改变域名到当前域名 
		})
	)
}
// changeOrigin的作用  
// http://api.tianapi.com/txapi/ncovcity/index   =>
// http://localhost:3000/txapi/ncovcity/index