<template>
  <div class="main">
    <section>
      <mt-header title="提现">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="container">
    <div class="title">
      <span class="up">可提现金额（元）</span>
      <span class="down">{{ok}}</span>
    </div>
    <h5>收入</h5>
    <ul class="view">
       <li class="cell">
         <span>今日收益</span>
         <span class="right">{{today}}元</span>
       </li>
      <li class="cell">
        <span>本月收益</span>
        <!--<span class="iconfont">&#xe61b;</span>-->
        <span class="right">{{month}}元</span>
      </li>
      <li class="cell">
        <span>累计收益</span>
        <span class="right">{{total}}元</span>
      </li>
    </ul>
    <h5>支出</h5>
    <ul class="view">
      <!--<li class="cell">-->
      <router-link class="cell" :to="{name: 'moneylist'}" tag="li">
        <span>
          已提现金额
        </span>

        <span class="right">{{pay}}元<span class="iconfont">&#xe61b;</span></span>
      </router-link>
      <!--</li>-->
    </ul>

      <p class="tips">{{text}}</p>
    </div>
    <div class="btn" @click="go1">提现</div>

    <router-view></router-view>
  </div>
</template>
<script>

  import {withdrawals_get, withdrawals_post, recordStatistics_get,withdrawalStatus} from '../../api/api.js';
  import {Toast} from 'mint-ui';

  export default{
    data(){
      return {
        ok: '',
        pay: '',
        manage: '',
        defaults: '',
        today:'',
        month:'',
        total:'',
        cantake:false,
        text:''
      }
    },
    created(){
    },
    mounted(){
      this.init();
    },
    methods: {
      go1(){
        console.log('run');
        console.log(this.ok);
        let _this=this;
        if(_this.cantake===false){
          Toast({
            message: '抱歉，没有满足提现条件',
            position: 'middle',
            duration: 2000
          });
        }else {
          if(_this.ok > 0){
            _this.$router.push({name: 'outmoney'})
          }else{
            Toast({
              message: '抱歉，暂无可提现的金额',
              position: 'middle',
              duration: 2000
            });
          }
        }
      },
      init(){
        let params = {
          data: {
//          type:'all',
          }
        }
        recordStatistics_get(params, (res) => {
          if (res.statusCode === 1) {
            this.takeStatus();
            console.log(res)
            this.ok = res.data.ok.c_money_sum;
            this.pay = res.data.pay.c_money_sum;
            this.defaults = res.data.default.c_money_sum;
            this.manage = res.data.manage.c_money_sum;
            this.today = res.data.today.c_money_sum;
            this.month = res.data.month.c_money_sum;
            this.total = res.data.total.c_money_sum;


          } else {
            console.log('请求失败')
          }
        })
      },
      takeStatus(){
        withdrawalStatus({data:{}},(res)=>{
          if(res.statusCode===1){
            console.log('是否可以提现数据')
            console.log(res.data)
            this.cantake=true;
            console.log('可以提现')
          }else{
            this.text=res.data;
            console.log('无法提现')
          }
        })
      }
    },
    beforeRouteUpdate(to, from, next){
      console.log('路由变化')
      this.init()
      next()
    },

  }

</script>


<style scoped>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: hidden;
    z-index: 20;
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0rem 0 0.1rem 0;
    /*margin: .5rem 0 0.1rem 0;*/
    width: 100%;
    text-align: center;
    height: 2rem;
    background-color: #333;
    /*margin-bottom: 0.1rem;*/

  }

  .title span {
    display: block;
    color: #fff;
  }

  .up {
    font-size: .18rem;
    position: relative;
    top: .6rem;
  }

  .down {
    font-size: .28rem;
    position: relative;
    top: .75rem;
  }

  h5 {
    text-align: left;
    font-size: .14rem;
    color: #000;
    border-width: 800;
    line-height: 2.5;
    /*margin-bottom: .05rem;*/
    background-color: #fff;
    padding: 0 0.1rem;

  }

  .view {
    background-color: #fff;
    margin-bottom: .05rem;
    border-top: 1px solid #efefef;
    padding: 0 0.1rem 0 0.12rem;
    color: #666;
  }

  .cell {
    border-bottom: 1px #eee solid;
    text-align: left;
    line-height: 2.5;
    padding: 0 0.1rem;
    font-size: .14rem;
    display: flex;
    justify-content: space-between;

  }

  .cell span {
    /*float: right;
    height: .36rem;*/
  }

  .btn {
    display: block;
    width: 100%;
    margin: 0 auto;
    height: .5rem;
    background-color: #333;
    color: #fff;
    line-height: .5rem;
    /*z-index: ;*/
    font-size: .2rem;
    z-index: 20 !important;
    position: fixed;
    bottom: 0;
  }

  .mint-header {
    z-index: 3;
  }

  .mint-header .mint-button {
    line-height: .41rem;
  }
  .container {
    width: 100%;
    overflow: hidden;
    /*overflow-y: scroll;*/
    -webkit-overflow-scrolling: touch;
    background-color: #ececec;
    /*overflow-y: scroll;*/
    flex: 1;
    /*margin-top: .45rem;*/
  }
  section {
    /*position: fixed;*/
    width: 100%;

  }
  .tips {
    font-size: .12rem;
    text-align: left;
    padding: .1rem;
  }

</style>
