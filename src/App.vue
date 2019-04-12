<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'App',
  created(){

  },
  methods:{
    //   initAxios(){
    //         const token = sessionStorage['token']
    //         axios.defaults.baseURL = 'http://47.100.161.132:8181';
    //         if(token) {
    //             axios.defaults.headers.common['authorization'] = "Bearer "+ token
    //         }
    //         axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //   }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-table-header{
    .thead{
        th{
            background: red !important;
            // color: #fff;
        }
    }
    .ivu-table th{
        background: red !important;
    }
}
// .ivu-table th{
//  background: #fff !important;
//  color:#fff;
// }
</style>
