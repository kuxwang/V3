<template>
  <div class="page">
    <mt-header :title="title" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container special" v-html="content">
      <!--{{content}}
      <div ></div>-->
    </div>
  </div>
</template>

<script>
  import { Topics } from '@/api/api';
  export default {
    data(){
      return {
        content:'',
        title:''
      }
    },
    methods:{
      init(){
        let res = this.$route.meta.post
        this.content=res.content;
        this.title=res.title;

      }
    },
    beforeRouteEnter (to, from, next) {
      let _this=this;
      let params={
        data:{
          identification:to.query.key
        }
      }
      Topics(params,(res)=>{
        if(res.statusCode===1){
          to.meta.post = res.data
          next()
        }
      })
    },
    created(){
      this.init()
    }

  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
  }
  .container {
    width: 100%;
    height: 100%;
    margin-top: .45rem;
    .scroll-view(100%)
  }

</style>




