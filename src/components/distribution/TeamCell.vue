<!--团队列表-->
<template>
  <li class="cell" @click="getList(info.agentid)">
    <div class="logo">
      <!--<img :src="info.avatar || defaultAvatar"/>-->
      <img :src="info.avatar"/>
    </div>
    <div class="info">
      <h5>{{info.nickname}}</h5>
      <span>{{info.id}}</span>
      <span class="message" @click="jumpTo(info.id)">详情</span>
    </div>
  </li>
</template>

<script>
  import defaultAvatar from '@/assets/images/defaultlogo.png'
  export default {
    data(){
      return {

      }
    },
    props:{
      info:{
        type: Object,
        required: true
      },
    },
    methods:{
      jumpTo(v){
        this.$router.push({name:'partnerInfo',query:{openid: v}})
      },
      getList(i){
        this.$emit('change',i)
      },
    },
    components:{

    },
    mounted(){
      console.log('li内容')
      console.log(this.info)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .cell {
    width: 100%;
    /*margin-top: .09rem;*/
    /*padding: .1rem .12rem;*/
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.1rem 0.2rem;
    border-top: 1px solid #f6f5fa;
    border-bottom: 1px solid #f6f5fa;
    background-color: #fff;
    margin-top: 0.05rem;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .logo {
      width: .7rem;
      height: .7rem;
      img {
        /*width: 100%;
        height: 100%;*/

        width: 80%;
        height: 80%;
        border-radius: 50%;
        display: block;
        margin: 10% auto;
      }
    }
    .info {
      flex: 1;
      text-align: left;
      margin-left: 0.1rem;
      position: relative;
      height: .7rem;
      h5 {
        /*margin: 0.1rem 0rem 0.05rem 0rem;*/
        color: #27272f;
        font-size: 0.14rem;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
      }
      span {
        font-size: 0.13rem;
        color: #666;
        display: block;
      }
      .usertime {
        width: 1.6rem;
        position: absolute;
        right: 0;
        bottom: 0.05rem;
        font-size: 0.12rem;
      }
      .message {
        position: absolute;
        right: 0;
        top:.2rem;
        display: block;
        /*background-color: #F5751D;
        color: #fff;*/
        padding: .03rem .08rem;
        font-size: .1rem;
        border-radius: .05rem;
      }
    }
  }
</style>

