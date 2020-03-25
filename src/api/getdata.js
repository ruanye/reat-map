import axios from 'axios'
// 设置一个响应拦截器
axios.interceptors.response.use(res=>res.data,err=>Promise.reject(err))
const KEY = '64000257e473c650789293ce3b4c15df'
// 疫情数据 
const getData = ()=>{
   return axios.get(`http://api.tianapi.com/txapi/ncovcity/index?key=${KEY}`)
}
export {getData}
