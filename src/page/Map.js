/* eslint-disable react-hooks/exhaustive-deps */
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
//获取单个省/直辖市的数据 
/**
 * @param {*} provincename  省的名称
 * @param {*} list 需要过滤的数据 
 */
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
//自定义本地存储的hooks 
function useLocal(){
  //设置本地存储
	const setLocal = (key,data)=>{
   localStorage.setItem(key,JSON.stringify(data))
	}
	//获取本地存储
	const getLocal=(key)=>{
	  return JSON.parse(localStorage.getItem(key))
	}
	return [setLocal,getLocal]
}
function Map() {
	let [setLocal,getLocal] = useLocal()

	//mapList 需要显示的数据
	let [mapList,setMaplist]= useState([])
	// province 地图怎么显示 
	let [province,setProvince]= useState('china')
	 //点击获取省市名称 
	const events={
    'click':(params)=>{
		  console.log(params.name)
			setProvince(params.name)
		}
	}
	useEffect(()=>{
		const fetchData=async()=>{
			// 如果本地存储有值 直接在本地存储里面取值  没有就请求数据 
			let result
			if(!getLocal('virusdata')){
          result = await getData()
					
					// 把结果存到本地存储里面
			   setLocal('virusdata',result)
			}else{
				result= getLocal('virusdata')
			}
			if(province!=='china'){
				 let List  =  getProvinceData(province,result.newslist)
				setMaplist(List)
			}else{
					let List = setChinaData(result.newslist)
			   setMaplist(List)
			}
		
		
		}
		fetchData()
	},[province])
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
