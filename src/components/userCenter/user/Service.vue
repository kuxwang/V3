<template>
  <div class="page">
    <mt-header title="联系客服" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">

    </div>

  </div>
</template>

<script>
  import { Topics } from '../../../api/api';
  export default {
    data(){
      return {

      }
    },
    methods:{
      init(){
        let params={
          data:{
            identification:'aboutUs'
          }
        }
        Topics(params,(res)=>{
          console.log(res);
        })
      }
    },
    created(){
      this.init()
    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
  }
  .container {
    width: 100%;
    height: 100%;
    margin-top: .45rem;
  }

</style>




