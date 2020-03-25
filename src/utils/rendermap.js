 
 const renderMap=(province='china',mapList=[])=>{
	 const option = {
      tooltip: { // 提示框
        show: true,
         //formatter: '省份: {b} <br/> 累计确诊：{c}', // a 系列名称 b name c value 
          formatter(params){
             return `省份${params.name}<br/> 累计确诊${params.value}`
					}
      },
      visualMap: {
        show: true,
        type: 'piecewise',
        min: 0,
        max: 2000,
        align: 'right',
        top: '2%',
        right: 0,
        left: 'center',
        inRange: {
          color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
        },
        pieces: [ // 分段定义视觉颜色  
          { min: 1000 },
          { min: 500, max: 999 },
          { min: 100, max: 499 },
          { min: 10, max: 99 },
          { min: 1, max: 9 }
        ],
        orient: 'horizontal',
        showLabel: true,
        padding: 5,
        text: ['高', '低'],
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 10
        }
      },
      series: [
        {
          left: 'center',
          type: 'map',  // 图表类型长什么样 饼图pie/地图map  
          name: '确诊人数',  //数据名称
          label: {  //显示图上的信息
            show: true,
            position: 'inside',
           fontSize: 12 
          },
          mapType: province, //图表显示类型  显示省的时候需要用中文  
          data: mapList, // 我们要显示的数据  是一个数据组
          zoom: 1,
          roam: false,
          showLegendSymbol: false,
          rippleEffect: {
            show: true,
            brushType: 'stroke',
            scale: 2.5,
            period: 4
          }
        }
      ]
    }
    return option
  
}
 export default renderMap