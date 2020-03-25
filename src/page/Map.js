import React,{useState,useEffect} from 'react'
import ReactECharts from 'echarts-for-react'
// 地图需要的json文件 
import 'echarts/map/js/province/heilongjiang';
import 'echarts/map/js/province/xizang';
import 'echarts/map/js/china'
import echarts from 'echarts/lib/echarts'
import  renderMap from '../utils/rendermap'
import {getData} from '../api/getdata'
const setChinaData=(list)=>{
	//使用map转换需要的数据结束  provinceShortName =>name confirmedCount =>value  
 let mapList =  list.map(item=>{
		 return {
			 name:item.provinceShortName,
			 value:item.confirmedCount,
			 ...item
		 }
	})
	return mapList
}
function Map() {
	//点击获取省市名称 
	
	//mapList 需要显示的数据
	let [mapList,setMaplist]= useState([])
	// province 地图怎么显示 
	let [province,setProvince]= useState('china')
	// 点击进入省后者直辖是地图  
	const events={
    'click':(params)=>{
		  console.log(params.name)
			setProvince(params.name)
		}
	}
	useEffect(()=>{
		const fetchData=async()=>{
			let result = await getData()
		  let List = setChinaData(result.newslist)
			setMaplist(List)
		}
		fetchData()
	},[])
	return (
		<div>
			 这是地图组件 
			 <ReactECharts 
			  option={renderMap(province,mapList)} 
				echarts={echarts}
				notMerge={true}
        lazyUpdate={true}
				onEvents={events}
		/>
		</div>
	)
}

export default Map
