<template>
  <div class="main">
    <div class="container">
        <div slot="top" class="mint-loadmore-top">
          <span class="iconfont" v-show="topStatus !== 'loading'"
                :class="{ 'rotate': topStatus === 'drop' }">&#xe732;下拉刷新</span>
          <span class="loading" v-show="topStatus === 'loading'">加载中</span>
        </div>

        <section class="avatar">
          <router-link class="iconfont option" :to="{name:'userInfo'}">
            &#xe63b;
          </router-link>
          <router-link class="icon" :to="{name:'userInfo'}">
            <img :src="memberInfo.avatar" alt="">
          </router-link>
          <div class="message">
            <div>
              <span class="hello">{{memberInfo.nickname}}</span>
              <span class="id">ID:{{memberInfo.id}}</span>
              <!--<span class="level">{{memberInfo.id}}</span>-->
              <!--<span class="level">{{memberInfo.leveldetail.levelname}}</span>-->
            </div>
            <!--<router-link class="mymoney" :to="{name: 'takemoney'}" tag="div">
              <p>
                {{memberInfo.credit2}} 元
              </p>
              <p>
                我的余额
              </p>
            </router-link>-->
          </div>
        </section>

        <section class="content">
          <router-link class="mfriend" :to="{path:'order',query:{stab:1}}" tag="div">
            <span class="iconfont order-icon">&#xe62e;</span>
            <span class="mint-cell-text">我的订单</span>
            <i class="iconfont right">&#xe649;</i>
          </router-link>
          <ul class="order-list">
            <!--<li class="li1" @click="ordertab(1)">-->
            <router-link class="li1" :to="{path:'order',query:{stab:1}}" tag="li">
              <div class="iconfont listicon">&#xe658;</div>
              <div class="title">全部</div>
            </router-link>
            <!--</li>-->
            <router-link class="li1" :to="{path:'order',query:{stab:2}}" tag="li">
              <div class="iconfont listicon">&#xe642;</div>
              <div class="title">待付款</div>

            </router-link>
            <!--</li>-->
            <router-link class="li1" :to="{path:'order',query:{stab:3}}" tag="li">
              <div class="iconfont listicon">&#xe635;</div>
              <div class="title">待发货</div>
            </router-link>
            <router-link class="li1" :to="{path:'order',query:{stab:4}}" tag="li">
              <!--<li class="li3" @click="ordertab(4)">-->
              <div class="iconfont listicon">&#xe63a;</div>
              <div class="title">待收货</div>
            </router-link>
            <router-link class="li1" :to="{path:'order',query:{stab:5}}" tag="li">
              <div class="iconfont listicon">&#xe62f;</div>
              <div class="title">已完成</div>
            </router-link>
          </ul>
          <!--<router-link class="advs" v-if="adv"  tag="div" :to="{name:'applys'}">-->
            <div class="advs" v-if="adv" @click="goapply">
              <img class="adv" :src="adv" alt="广告图">
            </div>
          <!--</router-link>-->
          <ul class="center-list">
            <router-link class="center-cell" v-if="member.isagent==0 || member.status==0" :to="{name:'applys'}" tag="li" style="margin-bottom: .1rem;">
              <div class="iconfont icon-grey">&#xe62d;</div>
              <div class="title-list"  v-if="member.isagent==0 || member.status==0">我要开店</div>
              <!--<div class="title-list" v-if="member.isagent==1 && member.status==1">店铺管理</div>-->
              <div class="title-list" v-else >店铺管理</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>
            <router-link class="center-cell" v-else :to="{name:'vipCenter'}" tag="li" style="margin-bottom: .1rem;">
            <!--<router-link class="center-cell" v-else :to="{name:'applys'}" tag="li" style="margin-bottom: .1rem;">-->
              <div class="iconfont icon-grey">&#xe62d;</div>
              <div class="title-list" >店铺管理</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>

            <li class="center-cell" @click="share" style="margin-bottom: .1rem;">
              <div class="iconfont icon-grey">&#xe633;</div>
              <div class="title-list">邀请好友</div>
              <i class="iconfont right">&#xe649;</i>
            </li>

            <router-link class="center-cell" :to="{name:'coupon',query:{money:memberInfo.credit1}}" tag="li">
              <div class="iconfont icon-grey">&#xe699;</div>
              <div class="title-list">现金券</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>

            <li class="center-cell" @click="getAddr">
              <div class="iconfont icon-grey">&#xe643;</div>
              <div class="title-list">地址管理</div>
              <i class="iconfont right">&#xe649;</i>
            </li>
            <router-link class="center-cell" :to="{name:'collect'}" tag="li">
              <div class="iconfont icon-grey">&#xe615;</div>
              <div class="title-list">我的收藏</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>

            <router-link class="center-cell" :to="{name:'opinion'}" tag="li">
              <div class="iconfont icon-grey">&#xe672;</div>
              <div class="title-list">意见反馈</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>

            <router-link class="center-cell" :to="{name:'service'}" tag="li">
              <div class="iconfont icon-grey">&#xe67c;</div>
              <div class="title-list">联系客服</div>
              <i class="iconfont right">&#xe649;</i>
            </router-link>


            <!--<router-link class="center-cell" :to="{name:'footprint'}" tag="li">-->
            <!--<div class="iconfont icon4">&#xe617;</div>-->
            <!--<div class="title-list">我的足迹</div>-->
            <!--<i class="iconfont right">&#xe649;</i>-->
            <!--</router-link>-->
          </ul>
          <button class="outLogin" @click="outLogin">退出登录</button>
          <div class="edition">
            {{version}}
          </div>
        </section>
      <!--</mt-loadmore>-->
      <!--<router-view></router-view>-->
    </div>
    <v-tabbar></v-tabbar>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import vTabbar from '../components/mode/Tabbar.vue'
  import {memberInfo, LOGINOUT,Adv,Share,BuyLevel} from '../api/api'
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import {_webapp,_env} from '../config/hook.js';
  import {MessageBox, Toast} from 'mint-ui';
//  import defaultAvatar from '../assets/images/defaultAvatar.png'
  import defaultAvatar from '../assets/images/defaultlogo.png'
  export default {
    data() {
      return {
        topStatus: '',
        disindex: 3,
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
        member:{},
        defaultAvatar: '',
        adv: '',
        sharedata:'',
        goods:false, // 显示用户是否可以升级店铺
        version:'v.3.1.8.1230'
      }
    },
    components: {
      vTabbar
    },
    watch: {
      $route(from) {
        if (from.name === 'vipCenter') {
          this.memberInfo.avatar = this.imgUrl
        }
      }
    },
    computed: {
      ...mapState([
        'imgUrl'
      ])
    },
    methods: {
      init() {
        let _this = this;
        //用户信息
        memberInfo({data: {}}, function (res) {
          if (res.statusCode == 1) {
            console.log(res.data)
            console.log('用户信息')
//            _this.getBuyLevel()
            _this.member=res.data
            _this.memberInfo.nickname = res.data.nickname
            _this.memberInfo.id = res.data.id
            _this.memberInfo.level = res.data.level
            _this.memberInfo.leveldetail = res.data.leveldetail
            _this.memberInfo.avatar = res.data.avatar || defaultAvatar
            _this.memberInfo.from = res.data.parent_name
            _this.memberInfo.mobile = res.data.mobile
            _this.memberInfo.credit2 = res.data.credit2
            _this.memberInfo.credit1 = res.data.credit1
            _this.sharedata = res.data.share;
            _this.setImgUrl(_this.memberInfo.avatar)
//            _this.$refs.loadmore.onTopLoaded();
            let params = {
              data: {
                'identification': 'userCenter'
              }
            };
            Adv(params,(res)=>{
              if(res.statusCode==1){
                _this.adv= res.data.thumb
               /* console.log('广告数据')
                console.log(res.data)*/
              }else {
                console.log(res)
              }
            })

          } else {
            console.log('会员接口数据异常')
//            _this.$refs.loadmore.onTopLoaded();
          }
        });
      },
      outLogin() {
        MessageBox({
          title: "确认退出当前账号?",
          message: "点击确认退出",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            _webapp.nativeLogin();
          } else if (action === "cancel") {
            //表示点击了取消
          }
        });
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        this.init()
      },
      msg() {
        Toast({
          message: '暂未开通',
          position: 'middle',
          duration: 1800
        });
      },
      getAddr(){
        this.addrtype(1)
        this.$router.push({name: 'address'});
      },
      share(){
        let _this=this;
        let params=_this.sharedata;
        Share( params,(res) => {
          console.log(1)
        })
      },
      versionupdate(){
        let _this=this;
        let params={
          data:{}
        }
        memberInfo(params,(res)=>{
          if(res.statusCode===1){
            if(_this.version!==res.data){
              MessageBox({title: '发现最新版本', message: '是否更新', showCancelButton: true,confirmButtonText:'去登陆'}).then(action => {
                if (action === 'confirm') {//表示点击了确定
                  if(_env.ios){

                  }else if(_env.android){

                  }
                } else if (action === 'cancel') {//表示点击了取消

                }
              })
            }
          }
        })
      },
      /*getBuyLevel(){
        let _this=this;
        let params={
          data:{}
        }
        BuyLevel(params,(res)=>{
          if(res.statusCode === 1){
            _this.goods = true;
            console.log('购买等级')
            console.log(res.data)
          }else if(res.statusCode == -1){

          }
        })
      },*/
      goapply(){
        if(this.goods==true){
          console.log('this.goods')
          console.log(this.goods)
          this.$router.push({name:'applys'})
        }else {
          console.log('this.goods')
          console.log(this.goods)
        }
      },
      ...mapMutations({
        tabselect: 'TABSELECT',
        setImgUrl: 'IMGURL',
        addrtype: 'ADDTYPE',
        updata: 'UPDATA'
      })
    },
    filter: {
      setdefault(value) {
        return value || 0
      }
    },
    activated() {
      this.init();
    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === 'userInfo') {
        this.init();
      }
      next()
    },

  }
</script>
<style lang="less" scoped>
  @import '../assets/css/fonts/iconfont.css';
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';

  * {
    font-size: .16rem;
  }

  .mint-header {
    height: .45rem;
    background: #000 !important;
    color: #fff !important;
  }

  .mint-header-title {
    font-size: .18rem !important;
  }

  .main {
    .page-view(1);
  }

  .option {
    position: absolute;
    right: .16rem;
    top: .2rem;
    font-size: .2rem;
    font-weight: bold;
    color: #fff;
    z-index: 10
  }

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    height: 1.47rem;
    padding: .35rem .15rem .40rem .33rem;
    color: #fff;
    /*background: url('../assets/images/centertopbg.png') center center no-repeat;*/
    background-size: 100% 100%;
    background-color: #333;
  }

  .icon {
    width: .70rem;
    height: .70rem;
    background: grey;
    float: left;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .icon > img {
    width: .70rem;
    height: .70rem;
    /*background: url('../assets/images/userinfo-02.png') no-repeat 100% 100%;*/
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .adv {
    width: 100%;
  }
  .advs {
    margin-top: .1rem;
  }

  .message {
    width: 50%;
    height: .5rem;
    float: left;
  }

  .message > div {
    width: 100%;
    text-align: left;
    padding: 0 0 .18rem .24rem;
  }

  .message > div > .hello {
    display: block;
    height: 100%;
    font-size: .15rem;
    line-height: .23rem;
    text-align: left;
    /*padding-left: .24rem;*/
    font-weight: bold;
    margin-bottom: .15rem;
  }

  .message > div > .level {
    display: inline-block;
    height: 100%;
    font-size: .13rem;
    line-height: .13rem;
    text-align: left;
    font-weight: bold;
    padding: .01rem;
    border: 1px solid #fff;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    border-radius: .04rem;
  }

  .message > span {
    font-size: .14rem;
    float: left;
    display: block;
    padding: 0 0 0 10px;
  }

  .top {
    /*height: .55rem;*/
    height: .35rem;
    /*background: #fff;*/
    /*background: rgb(244, 127, 47);*/
    background: #333;
    -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
  }

  .top > div {
    position: relative;
    width: 50%;
    height: 100%;
    /*background: rgba(0, 0, 0, .2);*/
    background: #333;
    float: left;
    line-height: .5484rem;
    color: #fff;
    font-size: .25rem;
  }

  .top > div > span {
    line-height: .32rem;
    /*color: red;*/
    color: #fff;
  }

  .top .title {
    display: block;
    height: .25rem;
    font-size: .14rem;
    /*color: #666;*/
    color: #fff;
  }

  .yuan {
    color: red;
    font-size: .10rem;
  }

  .num {
    color: red;
    font-size: .14rem;
  }

  .top_1:after {
    content: '';
    position: absolute;
    right: 0;
    top: .1rem;
    width: 1px;
    height: 70%;
    background-color: #333;
  }

  .content {
    margin-bottom: .25rem;
    position: inherit !important;
    /*height: 5r em;*/
    /*height: 100%;*/
  }

  .content .mfriend {
    position: relative;
    height: .5rem;
    line-height: .34rem;
    /*margin-top: .05rem;*/
    text-align: left;
    /*color: rgba(0, 0, 0, .7);*/
    color: #333;
    background-color: #fff;
    padding: .08rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .mint-cell-text {
    font-size: 0.16rem;
    font-weight: 700;
  }

  .content ul.order-list {
    /*margin-top: .1rem;*/
    height: .90rem;
    /*-webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
    /*-moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
    /*box-shadow: 0 1px 2px rgba(138, 138, 138, .4);*/
  }

  .content .tuiguang {
    height: 1.8rem;
  }

  .content .order-list li {
    position: relative;
    display: block;
    width: 33.3%;
    height: .90rem;
    float: left;
    background-color: #fff;
    padding: .18rem .02rem;
  }

  .content .title {
    /*color: rgba(0, 0, 0, .5);*/
    color: #666;
    font-size: .10rem;
    line-height: .2rem;
    margin-top: .08rem;
  }

  .content .iconfont {
    margin-left: auto;
    margin-right: auto;
    font-size: .3rem;
    line-height: .3rem;
    color: #AAA;
    border-radius: 50%;
  }

  .content .order-icon {
    vertical-align: middle;
    font-size: .18rem;
  }

  .title-list {
    float: left;
    font-size: .13rem;
    font-weight: bold;
  }

  .details {
    margin-top: .1rem;
  }

  .details li {
    margin-top: .04rem;
  }

  .order-list {
    display: flex;
  }

  .order-list li {
    flex: 1;
  }

  .outLogin {
    display: block;
    margin-top: 0.05rem;
    height: .48rem;
    width: 100%;
    line-height: .48rem;
    background-color: #fff;
    border-bottom: 1px solid #efeff4;
    outline: none;
    font-size: 0.16rem;
    color: rgba(0, 0, 0, .5);

  }

  .topdiv-first:after {
    content: '';
    position: absolute;
    width: 1px;
    height: .40rem;
    top: .09rem;
    right: 0;
    background: rgba(255, 255, 255, .1);

  }

  .mint-cell-text-right {
    position: absolute;
    right: .4rem;
    top: .1rem;
    font-size: 0.14rem;
    /*font-weight: 700;*/
    color: rgba(0, 0, 0, .3);

  }

  .mint-cell-text-right:after {
    content: '>';
    position: absolute;
    top: -.01rem;
    width: .1rem;
    right: -.2rem;
    color: rgba(0, 0, 0, .3);
  }

  .text-right {
    position: absolute;
    width: 30%;
    height: 100%;
    top: 0;
    right: 0;
  }

  .mint-header.is-fixed {
    top: 0rem;
  }

  .mymoney {
    position: absolute;
    top: .5rem;
    width: 30% !important;
    right: 0.2rem;
  }

  .mymoney > p {
    text-align: right;
    font-weight: bold;
  }

  .nummoney {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .container {
    top: 0;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    /*overflow-y: scroll;*/
    padding:0 0 .6rem 0;
  }

  .nametype {
    display: inline-block;
    width: .6rem;
    text-align: right;
  }

  .mint-loadmore-top {
    margin-top: -51px;
    background: rgba(255, 255, 255, .7);
  }

  /*.mint-loadmore {*/
    /*height: 100%;*/
  /*}*/

  .loading {
    position: relative;
  }

  .loading:before {
    content: '';
    position: absolute;
    left: -0.35rem;
    top: -.08rem;
    width: .4rem;
    height: .4rem;
    display: block;
    /*background: url('../assets/images/Spinner.gif') no-repeat 100% 100%;*/
    background-size: 100% 100%;
  }

  .center-list {
    width: 100%;
    margin-top: .1rem;
    text-align: left;
    font-size: .1rem;
    /*color: rgba(0, 0, 0, .5);*/
    color: #333;
  }

  .center-cell {
    position: relative;
    height: .48rem;
    width: 100%;
    line-height: .48rem;
    background-color: #fff;
    border-bottom: 1px solid #efeff4;

  }

  .center-cell .iconfont {
    /*margin-right: -.1rem;*/
    margin-left: 0.1rem;
    padding: 0 .1rem;
    float: left;
    height: 100%;
    font-size: .23rem;
    line-height: .48rem;
    color: #AAAAAA;
  }

  .center-cell > .right {
    position: absolute;
    right: .1rem;
    font-size: .15rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .4);
  }

  .mfriend > .right {
    position: absolute;
    right: .15rem;
    font-size: .15rem;
    font-weight: bold;
    color: rgba(0, 0, 0, .4);
  }

  .icon1 {
    color: #6491f7 !important
  }

  .icon2 {
    color: #f99e4a !important
  }

  .icon3 {
    color: #fdcf30 !important
  }

  .icon4 {
    color: #ef6262 !important
  }

  .icon5 {
    color: #65b2fa !important
  }

  .icon6 {
    color: #ef6262 !important
  }

  .icon-grey {
    color: #aaaaaa !important
  }

  .postUserInfo {
    width: 100%;
    margin-top: 0.2rem;
  }

  .postUserInfo-item {
    width: 100%;
    height: 0.45rem;
    box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
    background: #F5751D;
    color: #fff;
    font-size: 0.16rem;
  }

  .edition{
    color:#B0B0B0;
    font-size: 0.12rem;
    margin-top: 0.2rem;
  }

</style>
