<!--团队列表-->
<template>
  <li class="cell" @click="getList(info.id)">
    <div class="logo">
      <img :src="info.avatar"/>
    </div>
    <div class="info">
      <h5>{{info.nickname}}</h5>
      <span>{{info.id}}</span>
      <span class="" @click="jumpTo(info.id)">查看详情</span>
    </div>
  </li>
</template>

<script>

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
        this.$router.push({name:'partner',query:{id:v}})
      },
      getList(i){
        this.$emit('change',i)
      }
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
    padding: .1rem .12rem;
    display: flex;
    .logo {
      width: .55rem;
      height: .55rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      text-align: left;
      margin-left: 0.1rem;
      position: relative;
      h5 {
        /*margin: 0.1rem 0rem 0.05rem 0rem;*/
        color: #27272f;
        font-size: 0.14rem;
      }
      span {
        font-size: 0.14rem;
        color: #666;
      }
      .usertime {
        width: 1.6rem;
        position: absolute;
        right: 0;
        bottom: 0.05rem;
        font-size: 0.12rem;
      }
    }
  }

</style>

