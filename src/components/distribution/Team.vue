<!--团队列表-->
<template>
  <div class="page">
    <mt-header title="店铺管理" fixed>
      <router-link to="/vipCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <team-header :info="member"></team-header>
      <team-list :list="list" @change="getList"></team-list>
    </div>
  </div>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import {teamsLists} from '../../api/api'
  import TeamHeader from './TeamHeader.vue'
  import TeamList from './TeamList.vue'
  import defaultAvatar from '@/assets/images/defaultlogo.png'
  export default {
    data(){
      return {
        list:[
          {
            avatar:defaultAvatar,
            id:'11122',
            nickname:'哈哈哈',
          },
          {
            avatar:defaultAvatar,
            id:'112122',
            nickname:'哈哈哈',
          },
          {
            avatar:defaultAvatar,
            id:'1123123',
            nickname:'哈哈哈',
          },
          {
            avatar:defaultAvatar,
            id:'1',
            nickname:'哈哈哈',
          }

        ],
        member:{
          avatar:defaultAvatar,
          id:'11122',
          nickname:'用户名',
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
//      this.init()
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
    .page-view(10);
    .container {
      width: 100%;
      height: 100%;
      margin-top: .45rem;
    }
  }
</style>

