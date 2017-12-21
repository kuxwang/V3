<template>
  <div class="page">
    <mt-header title="店铺管理" fixed>
      <!--<router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>-->
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
      <!--<div class="title">
        <h1>优源店主</h1>
        <div>六大特权 &nbsp荣耀惠赠</div>
      </div>
      <div class="adv">
        <img src="../../../assets/images/shop-bg.png"/>
      </div>-->
      <div class="content" v-html="goods.content"></div>

      <div class="bottom">
        <!--<div class="footer">
          已有<span>{{1000+count}}</span>人成为优源店主
        </div>-->
        <!--<div class="tip">
          <input id="agree" type="radio" value="1" v-model="isChecked" />
           <label for="agree">我已阅读并同意<span>优源店主服务协议</span></label>
        </div>-->
        <div class="btn" @click="apply">申请￥{{goods.marketprice}}/年{{goods.title}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import { BuyLevel } from '../../../api/api';
  import {mapMutations, mapState, mapGetters} from 'Vuex';

  export default {
    data(){
      return {
        isChecked:"",
        goods:'',
        count:''
      }
    },
    methods:{
      init(){
        let params={
          data:{}
        }
        BuyLevel(params,(res)=>{
          if(res.statusCode === 1){
            console.log(res)
            console.log('数据')
            this.goods = res.data.goods;
            this.count=res.data.count
          }
        })
      },
      apply(){
//        if(this.isChecked==1){
        if(true){
          console.log('111')
          let myOrders = {
//            goodsid:this.goodsId,
            goodsid: this.goods.id,
            optionid: '',
            cartids: '',
            total: 1
          }
          console.log(myOrders)
          this.getMyorders(myOrders);
          this.$router.push({name: 'confirmorder',query:{comedis:1}})
        }
      },
      goBack(){
        this.$router.go(-1)
      },
      ...mapMutations({
        getMyorders: 'GET_MYORDERS'
      })
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
    .page-view(10);
  }
  .container {
    .scroll-view(100%);
    .title {
      width: 100%;
      height: 1.56rem;
      background-color: #9e0028;
      margin-top: .45rem;
      padding-top: .48rem;
      color: #e5c558;
      h1 {
        font-family: RTWSYueRoudGoDemo;
        font-size: .36rem;

        /*margin-top: .48rem;*/
        margin-bottom: .05rem;

      }
    }
    .adv {
      margin-top: -.2rem;
      width: 100%;
      img {
        width: 94%;
        display: block;
        margin: 0 .1rem;
      }
    }
    .bottom {
      position: fixed;
      /*height: 1.395rem;*/
      bottom: 0;
      width: 100%;
      background-color: #fff;
      .footer {
        height: .435rem;
        background-color: #f6efe6;
        line-height: .435rem;
        font-size: .16rem;
        color: #000;
        margin-bottom: .085rem;
        span {
          font-weight: bold;
          color: #e1b051;
        }
      }
      .tip {

      }
      .btn {
        width: 96%;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background-color: #e1b051;
        height: .45rem;
        margin: .095rem 2% .135rem 2%;
        font-size: .16rem;
        color: #fff;
        line-height: .45rem;

      }

    }
    .content {
      margin-top: .45rem;
    }
  }

</style>

