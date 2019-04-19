<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
