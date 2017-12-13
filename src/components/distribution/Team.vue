<!--团队列表-->
<template>
  <div class="page">
    <mt-header title="团队管理" fixed>
      <router-link to="/vipCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <team-header :info="member"></team-header>
      <!--<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :autoFill="isTrue" :bottom-all-loaded="allLoaded"-->
                   <!--ref="loadmore">-->
      <team-list :list="list" @change="getList" @loadMore="loadMore" ref="loadmore"></team-list>
      <!--</mt-loadmore>-->
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import {teamsLists,TeamNext} from '../../api/api'
  import TeamHeader from './TeamHeader.vue'
  import TeamList from './TeamList.vue'
  import defaultAvatar from '@/assets/images/defaultlogo.png'
  import {Toast, Indicator} from 'mint-ui';
  export default {
    data(){
      return {
        list:[],
        member:{
          avatar:defaultAvatar,
          id:'',
          nickname:'',
        },
        allLoaded:true,
        page:1
      }
    },
    props:{

    },
    methods:{
      init(id='',page=1,s=10){
        let params={
          data:{
            agentid:id,
            page:page,
            psize:s
          }
        }
        TeamNext(params,(res)=>{
          if(res.statusCode===1){
            if(res.data.teamLists.length>=s){
              this.$refs.loadmore.loading=false
            }
            console.log(this.$refs.loadmore.loading)
            this.list=[...this.list,...res.data.teamLists];
            this.member=res.data.agentMember;
            this.id=id;
            this.page=this.page+1
            console.log('接口数据')
            console.log(res)
          }
        })
      },
      getList(s){
        if(s.isagent===1 && s.status===1){
          this.page=1;
          this.$refs.loadmore.loading=true;
          this.init(s.agentid,this.page)
        }else {
          Toast({
            message: '没有下级',
            position: 'middle',
            duration: 1800
          });
        }
      },
      loadBottom(){

      },
      loadMore(){
        console.log(7899869866)
        this.init(this.id,this.page)
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
    .page-view(10);
    background-color: #efeff4;
    .container {
      width: 100%;
      height: 100%;
      margin-top: .45rem;
    }
  }
</style>

