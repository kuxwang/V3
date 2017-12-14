<template>
  <div class="main">
    <section>
      <mt-header title="提现明细" >
        <router-link to="/takemoney" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>

    <ul class="moneylists" v-if="moneylist.length"  v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="10">
      <li class="moneycell" v-for="(i ,index) in moneylist" :class="{'colorbor': comparefun(moneylist,index),'nomargin': index==0}" :key="index">
        <div class="left">
          <!--<div class="time">{{i.nickname}}</div>-->
          <img :src="i.avatar | dGoods"/>
        </div>
        <div class="mid">
          <div class="name">
            <span>{{i.nickname}}</span>
            <!--<span class="time">{{i.ofinishtime}}</span>-->
          </div>
          <!--<span class="ordersn">订单号：{{i.ordersn}}</span>-->
          <span class="ordersn">{{i.ofinishtime}}</span>
        </div>
        <div class="right">
          <span class="type" >{{i.c_money}}</span>
        </div>
      </li>
    </ul>
    <!--<div slot="bottom" class="mint-loadmore-bottom" style="text-align:center" v-show="allLoaded == false" v-if="">
      <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">继续滚动，可加载更多</span>
      <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
    </div>-->
    <div v-if="!moneylist.length" class="tips">
      <span class="iconfont">&#xe66f;</span>
      暂无记录<br>
    </div>
  </div>
</template>

<script>
  import {GetRecordBillDetail} from '@/api/api.js';
  import defaultAvatar from '@/assets/images/defaultlogo.png'

  import { Loadmore } from 'mint-ui';

  export default{
    data(){
      return {
        moneylist: [],
        myCurNo: 1,
        psizes: 10,
        bottomStatus: '',
        allLoaded: false,
        isTrue: false,
        onePage: false
      }
    },
    created(){

    },
    mounted(){
      let params= {
        data:{
          year:this.$route.query.y,
          month:this.$route.query.m,
          page:1
        }
      }
      GetRecordBillDetail(params, (res) => {
        this.moneylist = res.data;
        console.log('moneylist')
        console.log(res.data)
        console.log(this.moneylist)
      })
    },
    methods: {
      comparefun(obj,i){
        if( i == obj.length-1){
          return true
        }else {
          return false
        }
//        return true
      },
      getList(){
        let _this=this;
        let params= {
          data:{
            year:this.$route.query.y,
            month:this.$route.query.m,
            page:_this.myCurNo
          }
        }
        GetRecordBillDetail(params, (res) => {
          _this.moneylist = _this.moneylist.concat(res.data.all);
          if(res.data.length<_this.psize){
            _this.allLoaded = true;
          }
        })
      },
      loadMore(){
        this.myCurNo=this.myCurNo+1;
        this.getList();
      },

    },
    filters: {
      dGoods (value) {
        return value ? value : defaultAvatar
      }
    },

  }

</script>

<style scoped>
  .main {
    /*position: fixed;*/
    position: fixed;
    top: 0rem;
    width: 100%;
    height: 100%;
    background: #eee;
    z-index: 30;
    overflow: hidden;
  }

  ul {
    width: 100%;
    /*padding: 0.1rem;*/
    background: #fff;
    /*margin-top: .5rem;*/
    border: 1px solid #eee;
  }

  li {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    border-top: 1px solid rgba(0, 0, 0, .1) !important;
    margin-top: 0.1rem;
    height: 0.7rem;
    padding: .1rem;

  }
  li:last-child{
    /*border-bottom: 1px solid rgba(0, 0, 0, .1);*/
  }
  .left {
    position: relative;
    line-height: .3rem;
    width: .5rem;
  }
  .left img{
    border-radius: 50%;
    width: 80%;
    height: 80%;
    padding: .05rem;
  }


  .right {
    position: relative;
    text-align: right;
    height: 100%;
    width: .6rem;
    line-height: .5rem;
  }

  .time {
    font-size: .1rem;
    line-height: .21rem;
    color: #999;
  }
  .type {
    /*color: #46DC88;*/
    color: #000;
    font-weight: 800;
    line-height: .5rem;
  }
  .ordersn {
    font-size: .12rem;
    color: #999;
  }
  .mid {
    flex: 1;
    text-align: left;
    margin-left: .1rem;
    padding-top: .04rem
  }
  .mid .name {
    display: flex;
    justify-content: space-between;
  }
  .name span {
    display: block;
    color: #000;
  }
  .colorbor {
    border-bottom: none !important;
  }

  .tips {
    text-align: center;
    font-size: .14rem;
    color: #666;
    margin-top: 2rem;

  }

  .tips .iconfont {
    display: block;
    font-size: .8rem;
  }
  .nomargin {
    margin-top: 0;
  }
  .list-content {
    overflow: hidden;
    /*overflow-y: scroll;*/
    /*height: 4.75rem;*/
    /*position: absolute;*/
    /*top: 1.9rem;*/
    width: 100%;
  }

</style>


