<!--团队列表-->
<template>
  <div class="page">
      <!--<team-header :info="member"></team-header>-->
    <team-list :list="list" @change="getList"></team-list>
  </div>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import {teamsLists} from '../../api/api'
  import TeamHeader from './TeamHeader.vue'
  import TeamList from './TeamList.vue'
  export default {
    data(){
      return {
        list:[],
        member:{
          "id":16,
          "uniacid":"1",
          "uid":"0",
          "openid":"",
          "groupid":"1",
          "recommendid":"7",
          "position":"3",
          "downline1":"0",
          "downline2":"0",
          "downline3":"0",
          "commission_total":"0.00",
          "commission_balance":"0.00",
          "commission_received":"0.00",
          "order_total":"0",
          "status":"0",
          "bind_member_groupid":"0",
          "fields":"a:0:{}",
          "createtime":"1511591091",
          "updatetime":"0",
          "extend":null,
          "mobile":null,
          "member":{
            "createtime":"1970-01-01 08:00:00"
          },
          "order_price":0
        },
      }
    },
    props:{

    },
    methods:{
      init(){
        let params={
          data:{
            type: 'all',
            page: 1,
            psize: 10
          }
        }
        teamsLists(params,(res)=>{
          if(res.statusCode===1){
            console.log('团队列表')
            console.log(res.data)
            this.list=res.data.lists;
            console.log(this.list)
          }
        })
      },
      getList(){

      }
    },
    mounted(){
//      console.log(this.list)
      this.init()
    },
    components:{
      TeamList,
      TeamHeader
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .page {
    .page-view(10)
  }
</style>

