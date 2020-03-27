import React,{useEffect} from 'react'
import { Table } from 'antd';
const columns = [
      { title: '地区', dataIndex: 'name', key: 'name' },
      { title: '确诊', dataIndex: 'confirmedCount', key: 'confirmedCount' },
      { title: '死亡', dataIndex: 'deadCount', key: 'deadCount' },
      { title: '治愈', dataIndex: 'curedCount', key: 'curedCount' }
    ]
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
	
function List(props) {
    let data = props.data
	  return ( 
	      <Table
          columns={columns}
          showHeader={false}
          dataSource={data}
				  expandedRowRender={(item) => expandedRowRender(item)}
					 rowKey={(record) => record.name}
          pagination={false}
     />)
}

export default List


 

