<!--团队列表-->
<template>
  <div class="page">
    <mt-header fixed title="团队管理">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <!--<mt-header title="团队管理" fixed>-->
      <!--<router-link to="/vipCenter" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <div class="container">
      <team-header :info="member"></team-header>
      <div class="lists">
      <team-list :list="list" @change="getList" @loadMore="loadMore" ref="loadmore"></team-list>
      </div>
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
        page:1,
        superId : 0,
        preId : 0,
        nexId : 0
      }
    },
    props:{

    },
    methods:{
      init(id='',page=1,s=10){
        let _this=this
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

            _this.member=res.data.agentMember;
            console.log('新的用户')
            console.log(this.member)
            console.log(res.data.agentMember)

            if(_this.superId == 0){
              _this.superId = _this.member.id;
              _this.preId = _this.member.id;
            }else{
              _this.preId = _this.member.agentid;
              _this.nexId = _this.member.id;
            }

            console.log('teamNext id:');
            console.log(this.preId, this.nexId, this.superId);

            this.id=id;
            this.page=this.page+1
            console.log('接口数据')
            console.log(res)
          }
        })
      },
      getList(s){
        console.log('s:');
        console.log(s);
        if(s.isagent==1 && s.status==1){
          this.page=1;
          this.list=[];
          this.$refs.loadmore.loading=true;
          this.init(s.id,this.page)
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
      },
      goBack(){

        console.log('teamNext id:');
        console.log(this.preId, this.nexId, this.superId);

        if(this.nexId == this.superId || this.nexId == 0){
          // /vipCenter
          this.$router.push({path:'vipCenter'})
        }else{
          this.page=1;
          this.list=[];
          this.$refs.loadmore.loading=true;
          this.init(this.preId, this.page);
        }
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
      .lists {
        .scroll-view(100%);
        padding-top: 1.3rem;
      }
    }
  }
</style>

