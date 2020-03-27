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
  2. 处理市级数据 
```js
 function getProvinceData(provincename,list){
     let mapList = [];
	   const provenList= list.filter(item=>item.provinceShortName===provincename)
		 	mapList = provenList[0].cities
	    mapList= mapList.map(item=>{
			console.log(item,'item')
			return {
			  name:`${item.cityName}市`,
			  value:item.confirmedCount,
				...item
			}
		})
   return mapList
}
```
6. tab切换组件
```js
import { Tabs } from 'antd';
const tabs = [{ title: '疫情地图' }, { title: '最新消息' }, { title: '辟谣信息' }, { title: '疫情趋势' }]
// tab  导航标题 TabPane 里面放需要显示 的内容  
function Navtap(){
   return (
     <Tabs defaultActiveKey="1" >
       {tabs.map((item,index)=>{
         return  <TabPane tab={`${item.title}`} key={index} >
            {item.title}
         </TabPane>
       })}
       </Tabs>
  )
}
```

6. tabble组件 
```js 
// columns 表头   pagination 是否显示分页按钮 dataSource  数据源  rowKey 数据怎么来显示   expandedRowRender 表格展开显示 是一个函数 能拿到数据的每一项 
import {Table } from 'antd';
 const columns = [
      { title: '地区', dataIndex: 'name', key: 'name' },
      { title: '确诊', dataIndex: 'confirmedCount', key: 'confirmedCount' },
      { title: '死亡', dataIndex: 'deadCount', key: 'deadCount' },
      { title: '治愈', dataIndex: 'curedCount', key: 'curedCount' }
    ]
   <Table
      columns={columns}
      pagination={false}
      expandedRowRender={(item) => expandedRowRender(item)}
      dataSource={data}
      rowKey={(record) => record.name}
     />
    //展开的表格显示的数据  
  function expandedRowRender(item){
  if(!item.cities)return 
  let data =  item.cities.map((item)=>{
    return {
      name:item.cityName,
      value:item.confirmedCount,
      ...item
    }
   })
  
   return ( <Table
          columns={columns}
          showHeader={false}
          rowKey={(record) => {
             console.log(record)
            return  record.cityName
            }}
          dataSource={data}
          pagination={false}
        />)
}
```
