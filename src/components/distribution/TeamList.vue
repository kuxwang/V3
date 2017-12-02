<!--团队列表-->
<template>
  <ul class="list">
    <team-cell info="i" v-for="(i,index) in list" @change="change"></team-cell>
  </ul>
</template>

<script>
  /* import ProductItem from '../../integralMall/product/view/ProductItem.vue'
   import ViewTitle from '../base/ViewTitle.vue'*/
  import TeamCell from './TeamCell.vue'
  export default {
    data(){
      return {

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
      }
    },
    components:{
      TeamCell
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';


</style>

