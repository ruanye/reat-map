import React from 'react'
import {Table} from 'antd'
//表格展开显示 expandedRowRender 

// 表头数据   
 const columns = [
      { title: '地区', dataIndex: 'name', key: 'name' },
      { title: '确诊', dataIndex: 'confirmedCount', key: 'confirmedCount' },
      { title: '死亡', dataIndex: 'deadCount', key: 'deadCount' },
      { title: '治愈', dataIndex: 'curedCount', key: 'curedCount' }
    ]

function expandedRowRender(item){
   console.log(item)
	 if(!item.cities)return 
	 let  data =   item.cities.map(item=>{
		 return {
			 name:item.cityName,
		 }
	 })
	return data
}
function TabList(props){
	let data = props.data
   return (
		 <Table
		 columns={columns}
		 pagination ={false}
		 dataSource = {data}
		 expandedRowRender={(item) => expandedRowRender(item)}
		 rowKey={(record) => record.name}
		 ></Table>
	 ) 
}
 export default  TabList

 

