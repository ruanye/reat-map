import React from 'react';
import 'echarts/map/js/china';  // 地图显示的json 
import 'echarts/map/js/world'//世界地图 
import Map from './page/Map'
import NavTab from './page/NavTab'

import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
         hello
        <NavTab/>
         <Map/>
        
    </div>
  );
}

export default App;
