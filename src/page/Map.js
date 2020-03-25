import React from 'react'
import ReactECharts from 'echarts-for-react'
// 地图需要的json文件 
import 'echarts/map/js/province/heilongjiang';
import 'echarts/map/js/china'
import  renderMap from '../utils/rendermap'
function Map() {
	return (
		<div>
			 这是地图组件 
			 <ReactECharts option={renderMap()} />
		</div>
	)
}

export default Map
