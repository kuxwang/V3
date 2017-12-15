<!--团队列表-->
<template>
  <div class="user">
    <div class="logo">
      <img :src="info.avatar| dGoods"/>
    </div>
    <div class="name">{{info.nickname}}</div>
    <div class="id">ID：{{info.id}}</div>
  </div>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import defaultAvatar from '@/assets/images/userinfo-02.png'
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

    },
    filters: {
      dGoods (value) {
        return value ? value : defaultAvatar
      }
    },
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .user {
    position: fixed;
    width: 100%;
    padding: .1rem 0;
    background-color: #fff;
    /*margin-top: .45rem;*/
    margin-bottom: .1rem;
    z-index: 1;
    .logo {
      display: flex;
      margin-bottom: .1rem;
      justify-content: center;
      img {
        width: .6rem;
        height: .6rem;
      }
    }
    .name {
      color: #000;
    }
    .id {
      font-size: .13rem;
    }
  }

</style>

