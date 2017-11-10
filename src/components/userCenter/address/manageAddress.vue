<template>
  <div class="page">
    <mt-header fixed title="管理收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
      <ul class="user__list">
        <li class="user" v-for="(v,i) in addressLists" >
          <div class="info" @click.prevent="getMyAddress(v,i)">
            <span class="name">{{v.realname}}</span>
            <span class="tel">{{v.mobile}}</span>
          </div>
          <div class="area" @click.prevent="getMyAddress(v,i)">
            {{v.province}}{{v.city}}{{v.area}}{{v.address}}
          </div>
          <div class="set">
            <div :class="['default',{'blue':isChecked==i}]" @click="isDefault(v,i)">
              <span :class="['iconfont',{'checked':isChecked==i} ]">&#xe69a;</span>
              <span :class="['title',{'blue':isChecked==i}]">默认地址</span>
              <!--<input type="checkbox" :value="i" v-model="isChecked" />-->
            </div>
            <div class="right">
              <span @click.stop="edit(v)"><span class="iconfont edit">&#xe64e;</span>编辑</span>
              <span @click="deleteAddress(v.id)"><span class="iconfont tranch">&#xe6db;</span>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer>
      <div class="add" @click="addaddr">
        <span class="iconfont">&#xe6cd;</span>
        添加新地址
      </div>
    </footer>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import {addresses_get, addresses_delete,addresses_put} from '../../../api/api';
  import {MessageBox} from 'mint-ui';

  export default {
    data() {
      return {
        onActives: '',
        addressLists: [],
        isChecked: ''
      }
    },
    methods: {
      goBack() {
        if(!this.addressLists.length){
          this.$route.query.n=1
        }


        this.$router.go(-1);
      },
      init(){
        let _this = this
        let params={
          data:{

          }
        }
        addresses_get(params, res => {
          if (res.statusCode == 1) {
            _this.getaddressnum(res.data.list.length)
            _this.addressLists = res.data.list
            console.log('列表')
            console.log(res.data)

            for(let i=0;i<_this.addressLists.length;i++){
              if(_this.addressLists[i].isdefault ==1){
                console.log('尽快拉上建档立卡')
                console.log(i)
                this.isChecked=i;
                console.log(this.isChecked)
              }
            }
          } else {
            console.log('获取收货地址接口异常')
          }
        })
      },
      edit(value) {
        this.seteditAddresses(value)
        let params = {
          province: value.province,
          city: value.city,
          area: value.area
        }
        this.oldaddress(params)
        console.log('修改')
        if(this.$route.name=='manageAddress'){
          this.$router.push({name: 'editAddress', query: {id: value.id}})
        }else if(this.$route.name=='address'){
          this.$router.push({name: 'useredit', query: {id: value.id}})
        }
      },
      addaddr(){
        console.log('添加')
        if(this.$route.name=='manageAddress'){
          this.$router.push({name: 'addaddress'})
        }else if(this.$route.name=='address'){
          this.$router.push({name: 'useradd'})
        }
      },
      deleteAddress(value) {
        let params = {
          data: {
            addressid: value
          }
        }
        addresses_delete(params, res => {
          if (res.statusCode == 1) {
            MessageBox({
              title: '提示',
              message: '是否删除该地址',
              showCancelButton: true
            }).then(res => {
              if (res == 'confirm') {
                for (let i = 0; i < this.addressLists.length; i++) {
                  if (this.addressLists[i].id === value) {
                    this.addressLists.splice(i, 1);
                    break;
                  }
                }
              }
            })

          } else {
            console.log('删除失败')
          }
        })

      },
      getMyAddress(v, i){
        if(this.addtype==0){
          console.log('addtype是从订单进来的')
          this.isnull(false)
//          this.onActives = i;
          this.getUserAddress(v);
          this.$route.query.b=1

          this.$router.go(-1)

//          this.getOnActive(i);
        }
      },
      isDefault(v,i){
        let params={
          data:{
            addressid:v.id,
            realname:v.realname,
            mobile:v.mobile,
            province:v.province,
            city:v.city,
            area:v.area,
            address:v.address,
            isdefault :1
          }
        }
        addresses_put(params,(res)=>{
          if(res.statusCode===1){
            this.isChecked=i;
            console.log('成功了')
          }
        })


        console.log(this.isChecked)
      },
      ...mapMutations({
        'getUserAddress': 'GET_USERADDRESS',
        'getOnActive': 'GET_ONACTIVE',
        'getaddressnum': 'ADDRESSLISTNUM',
        'seteditAddresses': 'SETEDITADDRESS',
        'oldaddress': 'OLDADDRESS',
        'isnull': "ISNULL",
      })
    },
    computed: {
      ...mapGetters([
        "onActive",
        'addtype'
      ]),
      ...mapState([
        'addressListNum'
      ])
    },
//    watch: {
//      isChecked(a,b){
//        if(a>=0){
//          this.$set(this.addressLists[a],'isdefault','1')
//        }
//        console.log(this.addressLists)
//        if(Number(b)>=0 ){
//          this.$set(this.addressLists[b],'isdefault','0')
//          console.log(this.addressLists)
//        }
//      },
//    },
    beforeRouteUpdate(to, from, next){
      if(from.name=='addaddress' || from.name=='editAddress' ||from.name=='useradd'||from.name=='useredit'){
        console.log('来自')
        console.log(from)
        this.init()
      }
      next()
    },

    mounted() {
      console.log(this.$route.name)
      this.init()
    },

    created() {

    }
  }
</script>


<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';
  .page {
    .page-view(2);
  }
  .container {
    margin-top: .45rem;
    margin-bottom: .5rem;
    padding-bottom: 1rem;
    .scroll-view(100%);
    .user__list {
      width: 100%;
      /*padding-bottom: .5rem;*/
      .user {
        height: 1.2rem;
        border-bottom: 1px solid #dadada;
        text-align: left;
        .info {
          display: flex;
          padding: 0 .22rem;
          padding-top: .1rem;
          line-height: .22rem;
          margin-bottom: .04rem;

          .name {
            flex: 1;
            font-size: .12rem;
          }
          .tel {
            text-align: right;
            flex: 1;
            font-size: .1rem;
          }
        }
        .area {
          font-size: .12rem;
          padding: 0 .22rem;
          line-height: .2rem;
          height: .45rem;
          border-bottom: 1px solid #eee;
          .text-overflow(2);
          padding-bottom: .04rem;
        }
        .set {
          display: flex;
          padding: 0 .22rem;
          line-height: .38rem;
          .default {
            font-size: .11rem;
            flex: 1;
            /*color: #0076ff;*/
            color: #000;
            .iconfont {
              color: #fff;
              border: 1px solid #000;
              border-radius: 50%;
              font-size: .15rem;
            }
            .checked {
              color: #0076ff;
              border: none;
              font-size: .15rem;
            };
            .title {
              color: #000;
              font-size: .11rem;
              display: inline-block;
              margin-left: .02rem;
            }
            .blue {
              color: #0076ff;
            }
          }



          .right {
            flex: 1;
            text-align: right;
            span {
              font-size: .11rem;
              color: #666;
              .tranch {
                font-size: .22rem;
                position: relative;
                top:.025rem;

              }
              .edit {
                font-size: .16rem;
                margin-right: .03rem;
                position: relative;
                top:.01rem;
              }
            }
          }
        }
      }
    }
  }
  footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    height: .5rem;
    background-color: #fff;
    .add {
      display: inline-block;
      line-height: .5rem;
      color: #0076ff;
      border-top: 1px solid #eee;
      .iconfont {

      }
    }
  }



</style>
