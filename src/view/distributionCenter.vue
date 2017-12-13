<template>
  <div class="page">
    <div v-if="issale" class="container">
      <div class="user">
          <div class="user__logo">
            <img :src="memberInfo.avatar"/>
          </div>
          <div class="user__info">
            <h5>{{memberInfo.nickname}}</h5>

            <div class="user__info__id"><span>等级：</span>{{memberInfo.level}}</div>
            <div class="user__info__id"><span>ID：</span>{{memberInfo.id}}</div>
            <div class="user__info__id"><span>推荐人：</span>{{memberInfo.from}}</div>
          </div>
          <div class="user__qcode" @click="pop">
            <img :src="qrimg"/>
          </div>
        <router-link class="user__update" :to="{name:'disapply'}"  tag="a" v-if="goods">
          升级店铺
        </router-link>

      </div>
      <ul class="nagative">
        <!--<li class="nav__item">-->
          <router-link class="nav__item" :to="{path:'team',query:{}}"  tag="li">
          <div class="logo">
            <img src="../assets/images/panter.png"/>
          </div>
          <span>团队管理</span>
          </router-link>
        <!--</li>-->
        <!--<li class="nav__item">-->
          <router-link class="nav__item" :to="{path:'extension',query:{stab:1,type:'total',total:orderStatistics.total,lock:orderStatistics.lock,refund:orderStatistics.refund,ok:orderStatistics.ok}}"  tag="li">
          <div class="logo">
            <img src="../assets/images/order.png"/>
          </div>
          <span>订单管理</span>
          </router-link>
        <!--</li>-->
        <router-link class="nav__item" :to="{name:'takemoney'}"  tag="li">
        <!--<li class="nav__item">-->
          <div class="logo">
            <img src="../assets/images/money.png"/>
          </div>
          <span>收益管理</span>
        <!--</li>-->
        </router-link>
      </ul>
      <section>
        <div class="title">
          <div class="icon"></div>
          <div class="text">团队</div>
          <div class="right" @click="share">邀请加入<span class="iconfont">&#xe61b;</span></div>
        </div>
        <div class="info">
          <div class="info__item1">
            <div>{{teamsStatistics.all}}</div>
            直营店
          </div>
          <div class="info__item2">
            <div>{{teamsStatistics.month}}</div>
            团队店主
          </div>
          <div class="info__item2">
            <div>{{teamsStatistics.purchased}}</div>
            团队粉丝
          </div>
        </div>
      </section>
      <section class="bolck">
        <div class="title">
          <div class="icon"></div>
          <div class="text">收益</div>
          <div class="right" @click="clickDetailed">每月明细<span class="iconfont">&#xe61b;</span></div>
        </div>
        <div class="money">
          <div class="info__item3">
            <!--<span id="today" class="today">今日收益（元）</span>-->
            <div class="today">今日收益（元）</div>
            <div class="num">{{recordStatistics_get.today||0}}</div>
          </div>
          <p>本月收益<span>{{recordStatistics_get.month}}</span>元</p>
          <p>累计收益<span>{{recordStatistics_get.total}}</span>元</p>
        </div>
      </section>
    </div>
    <div class="tip" v-else>
      <span class="iconfont">&#xe64d;</span>
      <div class="text">抱歉！您还没有开店</div>
      <!--<router-link  class="btn">我要开店</router-link>-->
      <router-link class="btn" :to="{name:'disapply'}"  tag="div">
        我要开店
      </router-link>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <img class="sharelogo" :src="qrimg" @click="clickhavib"/>
    </mt-popup>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
  import {recordStatistics_get, teamsStatistics, orderStatistics, memberInfo,BuyLevel,Qrimg,Share,QrimgSave } from '../api/api'
  import {_webapp} from '../config/hook.js';
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {MessageBox} from 'mint-ui';
  import vTabbar from '../components/mode/Tabbar.vue'
  import defaultAvatar from '../assets/images/defaultlogo.png'

  export default {
    data(){
      return {
        img1: require('../assets/images/confirmorder-01.jpg'),
        memberInfo: {
          nickname: '',//昵称
          id: '',//会员id
          level: '',//会员等级
          avatar: '',
          leveldetail: {
            levelname: '默认等级',
          },
          mobile: '',
          from: '',  //推荐人
          credit1: '',
          credit2: '',
        },
        recordStatistics_get: {
          total:'',
          month:'',
          today:'',
        },
        teamsStatistics: {
          all: '0',  //总人数
          purchased: '0',  //已购买人数
          no_purchased: '0',  //未购买人数
          month: '0',  //未购买人数
        },
        orderStatistics: {
          total: '0',//全部
          lock: '0',//未结算
          refund: '0',//已退款
          ok: '0', //已结算
        },
        popupVisible: false,
        topStatus: '',
        disindex: 3,
        defaultAvatar: '',
        issale:true,
        goods:false,
        qrimg:'',
        webDebug : _webapp.debug
      }
    },
    methods: {
      init(){
        this.getMember();
      },
      getMember(){
        let _this=this
        memberInfo({data : {}}, function (res) {
          if (res.statusCode == 1) {
            console.log('会员数据')
            console.log(res.data)
            _this.memberInfo.nickname = res.data.nickname
            _this.memberInfo.id = res.data.id
            _this.memberInfo.level = res.data.level
            _this.memberInfo.leveldetail = res.data.leveldetail
            _this.memberInfo.avatar = res.data.avatar ||defaultAvatar
            _this.memberInfo.from = res.data.parent_name || '麦麦国际'
            _this.memberInfo.level = res.data.agentleveldetail.levelname
            _this.getBuyLevel();
            _this.getTeam();
            _this.getOrder();
            _this.getRecode();
            _this.getQrimg();
          } else {
            console.log('会员接口数据异常')
            _this.$router.push({name:'disapply'})
          }
        })
      },
      getTeam(){
        let _this=this
        teamsStatistics({data : {}}, function (res) {
          if (res.statusCode == 1) {
            _this.teamsStatistics.all = res.data.nextAgents || 0;
            _this.teamsStatistics.purchased = res.data.nextFans || 0;
            _this.teamsStatistics.no_purchased = res.data.no_purchased || 0;
            _this.teamsStatistics.month = res.data.allNextAgents || 0;
          } else {
            console.log('团队接口数据异常')
          }
        });
      },
      getOrder(){
        let _this=this;
        orderStatistics({data : {}}, function (res) {
          if (res.statusCode == 1 ) {
            _this.orderStatistics.total = res.data.total.order_count || 0
            _this.orderStatistics.lock = res.data.lock.order_count || 0
            _this.orderStatistics.refund = res.data.refund.order_count || 0
            _this.orderStatistics.ok = res.data.ok.order_count || 0
          } else {
            console.log('获取团队数量统计接口数据异常')
          }
        })
      },
      getBuyLevel(){
        let _this=this;
        let params={
          data:{}
        }
        BuyLevel(params,(res)=>{
          if(res.statusCode === 1){
            _this.goods = true
          }
        })
      },
      clickDetailed(){
        this.$router.push({name:'detailed'});
      },
      getRecode(){
        let _this=this;
        let params = {
          data: {}
        }
        recordStatistics_get(params, (res) => {
          if (res.statusCode === 1) {
      /*      console.log('金额')
            console.log(res.data)*/
          _this.recordStatistics_get.total=res.data.total.c_money_sum
          _this.recordStatistics_get.today=res.data.today.c_money_sum
          _this.recordStatistics_get.month=res.data.month.c_money_sum
          } else {
            console.log('请求失败')
          }
        })
      },
      getQrimg(){
        let _this = this;
        Qrimg({data :{}}, res => {
          if (res.statusCode == 1) {
            _this.qrimg = res.data
            console.log(res.data)
          }else {
            console.log(res.data)
          }
        })
      },
      share(){
        let url=''
        console.log(12)
        Share(url,(res) => {
          console.log(1)

        })
      },
      pop(){
        this.popupVisible=true;
      },
      clickhavib () {
        let _this = this;
        QrimgSave(_this.qrimg, (res) => {
          if (res.statusCode == 1) {
            console.log('ok')
          }
        })
      },
    },
    components: {
      vTabbar: vTabbar
    },
    created(){
      this.init()
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  @import '../assets/css/fonts/iconfont.css';
  .page {
    .page-view(1);
  }
  .container {
    font-size: .14rem;
    top: 0;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin-bottom: .45rem;
    padding-bottom: 1rem;
    height: 100%;
    .user {
      color: #fff;
      height: 1.47rem;
      width: 100%;
      background-color: @style2;
      display: flex;
      /*padding: .26rem .2rem;*/
      position: relative;
      padding: .5rem .2rem;
      justify-content: flex-start;
      .user__logo {
        width: .68rem;
        height: .68rem;
        background-color: #fff;
        border-radius: 50%;
        img {
          .imgfull(50%)
        }
      }
      .user__info {
        flex: 1;
        width: 100%;
        text-align: left;
        margin-left: .1rem;
        span {
          display: inline-block;
          /*width: .36rem;*/
          width: .6rem;
          text-align: left;
        }
        .user__info__id {
          font-size: .12rem;
          span {
            font-size: .12rem;
          }
        }
      }
      .user__qcode {
        width: .4rem;
        border-radius: 50%;
        height: .68rem;
        display: block;
        img {
          width: .4rem;
          height: .4rem;
          /*vertical-align: middle;*/
          /*margin-top: .14rem;*/
        }
      };
      .user__update {
        position: absolute;
        top: 1rem;
        right: .2rem;
        color: #fff;
        font-size: .12rem;
      }
    }
    .nagative {
      margin-top: .1rem;
      padding: .2rem 0;
      text-align: center;
      display: flex;
      border-bottom: 1px solid @border;
      .nav__item {
        flex: 1;
        display: block;
        .logo {
          width: .38rem;
          height: .38rem;
          margin: 0 auto;
          margin-bottom: .1rem;
          img {
            .imgfull(50%)
          }
        }
        span {
          font-size: .14rem;
          display: block;
          margin-bottom: .05rem;
        }
      }
    }
  }
  section {
    padding: 0 .1rem;
    margin-bottom: .1rem;
    .title {
      width: 100%;
      height: .42rem;
      line-height: .42rem;
      display: flex;
      text-align: left;
      .icon {
        width: 5px;
        background-color: @style2;
        height: .14rem;
        margin-top: .14rem;
        margin-right: .1rem;
      }
      .text {
        flex: 1;
        font-size: .14rem;
      }
      .right {
        font-weight: bold;
        color: @style2;
        width: .8rem;
        font-size: .11rem;
        text-align: right;
      }
    }
    .info {
      width: 100%;
      display: flex;
      .info__item1 {
        width: 1.16rem;
        font-size: .11rem;
        div {
          /*font-size: .22rem;*/
          font-size: .26rem;
          text-transform: uppercase;
          color: #007aff;
        }
      }
      .info__item2 {
          width: 1.16rem;
          font-size: .11rem;
          div {
            /*font-size: .22rem;*/
            font-size: .215rem;
            text-transform: uppercase;
            color: #333;
            line-height: .35rem;
          }
        }
      }
    .money {
      .info__item3 {
        height: 1rem;
        padding: .2rem 0 .26rem .15rem;
        text-align: left;
        font-size: .12em;
        color: #007aff;
        div.num {
          /*font-size: .22rem;*/
          font-size: .31rem;
          text-transform: uppercase;
          color: #333;
          margin-top: .08rem;
        }
        .today {
          font-size: .12rem !important;
        }
      }
      p {
        line-height: .48rem;
        border-top: 1px solid #ebecf1;
        font-size: .12rem;
        color: #333;
        text-align: left;
        padding-left: .15rem;
        span {
          color: #007aff;
        }
      }
    }
  }
  .tip {
    width: 100%;
    height: 100%;
    font-size: .16rem;
    .iconfont {
      display: block;
      width: 1.25rem;
      height: 1.15rem;
      font-size: 1.25rem;
      margin: 0 auto;
      margin-top: 1rem;
    }
    .text {
      font-size: .16rem;
      color: @style2;
      margin-top: .3rem;
      margin-bottom: .1rem;
    }
    .btn {
      width: 1.75rem;
      height: .48rem;
      font-size: .2rem;
      background-color: @style2;
      color: #fff;
      line-height: .48rem;
      border-radius: .05rem;
      margin: 0 auto;
    }

  }
  .sharelogo {
    width: 3rem;
    height: 3.5rem;
  }

</style>
