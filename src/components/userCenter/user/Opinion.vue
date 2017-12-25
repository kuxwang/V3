<template>
  <div class="page">
    <mt-header title="意见反馈" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="submit" @click="submit">提交</div>
    <div class="container">
      <h3>问题和意见</h3>
      <div class="text">
        <textarea :maxlength="140" placeholder="请输入不少于10个字的描述" v-model="text"> </textarea>
        <span class="textleng">{{text.length}}/140</span>
      </div>

      <div class="pic-group">
        <p>请提供相关问题的截图或照片<span>{{list.length}}/4</span></p>
        <div class="pic-view">
        <div class="img-box" v-if="list" v-for="(i,index) in list">
          <img :src="i"/>
          <img class="del" :src="del" @click="delimg(index)"/>
        </div>
        <div class="img-box add" @click="uploadImg" v-if="list.length<4">
          <span class="iconfont">&#xe62b;</span>
          <div>相机/相册</div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {_webapp} from '../../../config/hook.js';
  import {Feedbacks} from '../../../api/api';
  import {Toast} from 'mint-ui';
  import delpic from '../../../assets/images/del.png'

  export default {
    data(){
      return {
        text:'',
        list:[],
        test:'../../../assets/images/confirmorder-01.png',
        del:require('../../../assets/images/del.png')
      }
    },
    methods:{
      uploadImg(){
        let that = this;
        _webapp.uploadImg(res => {
          let arr=that.list;
          let src=res.data;
          arr.push(src)
          that.list=arr;
        })
      },
      submit(){
        let _this=this;
        if(this.text){
          console.log(this.text)
          let len=_this.list.length
          let params={
            data:{
              reason:_this.text,
//              img:_this.list
            }
          }
          for(let i=0;i<len;i++){
            params.data[`img[${i}]`]=_this.list[i]
          }
//          let arr=[]
          console.log('参数')
          console.log(params)
          Feedbacks(params,(res)=>{
              if(res.statusCode===1){
                Toast({
                  message: '提交成功',
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.go(-1)
                }, 2000)
              }
          })
        }
      },
      delimg(i){
//        let arr=this.list.splice(i,1)
        if(this.list.length==1){
          this.list=[]
        }else {
          let arr=this.list.splice(i,1)
          this.list=arr
        }

//        console.log(arr)
        console.log(this.list)
      }
    },
    created(){

    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
    background: #F5F4F9;
    .submit{
      width:.7rem;
      text-align: right;
      padding-right:.15rem;
      position:fixed;
      font-size:.16rem;
      /*color:#fff;*/
      top:.11rem;
      right:0;
      z-index: 111;
    }
  }
  .container {
    margin-top: .45rem;
    text-align: left;
    h3 {
      padding: 0 .16rem;
      font-size: .14rem;
      color: #999;
      line-height: .4rem;
    }
    .text {
      position: relative;
      textarea {
        padding: .13rem .16rem;
        width: 100%;
        height: 1.6rem;
        /*margin-bottom: .22rem;*/
        background-color: #ffffff;
        outline:none;
        resize : none;
        border-bottom:1px solid #e5e5e5;
        font-size: .14rem;
        color: #999;
      }
      .textleng {
        position: absolute;
        right: .1rem;
        bottom: .1rem;
      }
    }

    .pic-group{
      background: #fff;
      width: 100%;
      margin-top: .2rem;
      padding: .14rem .16rem;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      p {
        /*display: flex;*/
        color: #000;
        font-size: .16rem;
        margin-bottom: .12rem;
        /*line-height: .44rem;*/
        span {
          float: right;
        }
      }
      .pic-view{
        display: flex;
        /*justify-content: space-around;*/
        .img-box {
          width: .76rem;
          height: .76rem;
          border: 1px solid #ccc;
          border-radius:.05rem;
          margin-right: 0.14rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .del {
            position: absolute;
            right: -0.05rem;
            top:-.05rem;
            width: .2rem;
            height: .2rem;
          }
        }
        .add {
          text-align: center;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .iconfont {
            font-size: .3rem;
            color:#ccc;
            font-weight: bold;
            display: block;
            padding-top: .1rem;
          }
          div {
            font-size: .13rem;
            color:#c3c3c3;
          }
        }
      }

    }

  }

</style>

