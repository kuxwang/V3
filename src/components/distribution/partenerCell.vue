<!--团队列表-->
<template>
  <div class="cell">
    <div class="logo">
      <img :src="info.avatar"/>
    </div>
    <div class="info">
      <h5>{{info.nickname}}</h5>
      <span>{{info.id}}</span>
      <span class="usertime">{{info.createtime}}关注</span>
    </div>
  </div>
</template>

<script>
 /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
  import ViewTitle from '../base/ViewTitle.vue'*/
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

    },
    components:{

    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .cell {
    width: 100%;
    margin-top: .09rem;
    padding: .15rem .12rem;
    display: flex;
    .logo {
      width: .5rem;
      height: .5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      text-align: left;
      margin-left: 0.2rem;
      position: relative;
      h5 {
        margin: 0.1rem 0rem 0.05rem 0rem;
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

