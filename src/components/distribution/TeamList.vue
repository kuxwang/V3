<!--团队列表-->
<template>
  <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <team-cell :info="i" v-for="(i,index) in list" @change="change" :key="index"></team-cell>
  </ul>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import {Toast, Indicator} from 'mint-ui';
  import TeamCell from './TeamCell.vue'
  export default {
    data(){
      return {
        loading:true
      }
    },
    props:{
      list:{
        list: Array,
        required: true
      },
    },
    methods:{
      change(a){
        this.$emit('change',a)
      },
      loadMore(){
        this.$emit('loadMore')
      }
    },
    components:{
      TeamCell
    },
    mounted(){
      console.log('ui内容')
      console.log(this.list)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';

  .list {
    width: 100%;
    /*overflow: hidden;
    overflow-y: scroll;*/
    /*height: 100%;*/
    /*margin-top: 1.1rem;*/
    padding-bottom: .6rem;


  }
</style>

