import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * index模块
 */
const app = r => require.ensure([], () => r(require('../App.vue')), 'app')

/*
 *
 * */
import Home from '../view/Home.vue'
const Category = r => require.ensure([], () => r(require('../view/Category.vue')), 'Category')
const MyOrder = r => require.ensure([], () => r(require('../components/userCenter/order/MyOrder.vue')), 'Order')
const ShoppingCart = r => require.ensure([], () => r(require('../view/ShoppingCart.vue')), 'ShoppingCart')
const UserCenter = r => require.ensure([], () => r(require('../view/UserCenter.vue')), 'UserCenter')
const Empty = r => require.ensure([], () => r(require('../view/Empty.vue')), 'Empty')
const Test = r => require.ensure([], () => r(require('../view/Empty.vue')), 'Empty')


/*
 * 个人中心
 * VipCenter 分销中心
 * Extension 推广订单
 * Partner 我的团队
 * partnerInfo 伙伴信息
 * Orderinfo 推广订单详情
 * UserInfo 用户信息
 * Takemoney 提现页面
 * Moneylist 提现列表
 *
 * */
const VipCenter = r => require.ensure([], () => r(require('../view/distributionCenter.vue')), 'UserCenter')
const Extension = r => require.ensure([], () => r(require('../components/distribution/extension.vue')), 'UserCenter')
const Partner = r => require.ensure([], () => r(require('../components/distribution/partner.vue')), 'UserCenter')
const PartnerInfo = r => require.ensure([], () => r(require('../components/distribution/partnerInfo.vue')), 'UserCenter')
const Orderinfo = r => require.ensure([], () => r(require('../components/distribution/orderinfo.vue')), 'UserCenter')
const UserInfo = r => require.ensure([], () => r(require('../components/userCenter/user/UserInfo.vue')), 'UserCenter')
const Takemoney = r => require.ensure([], () => r(require('../components/distribution/Takemoney.vue')), 'UserCenter')
const Moneylist = r => require.ensure([], () => r(require('../components/distribution/Moneylist.vue')), 'UserCenter')
// const Bill = r => require.ensure([], () => r(require('../components/distribution/Bill.vue')), 'UserCenter')
const Bill = r => require.ensure([], () => r(require('../components/distribution/BillList.vue')), 'UserCenter')
const Team = r => require.ensure([], () => r(require('../components/distribution/Team.vue')), 'UserCenter')


/*
 *  分类模块
 *  List 分类列表
 *  Details 详情
 * */
const List = r => require.ensure([], () => r(require('../components/category/List.vue')), 'Category')
const Details = r => require.ensure([], () => r(require('../components/category/goodsDetail.vue')), 'Category')
const Search = r => require.ensure([], () => r(require('../components/mode/search.vue')), 'Category')
const Special = r => require.ensure([], () => r(require('../components/category/special.vue')), 'Category')
// const Details = r => require.ensure([], () => r(require('../components/category/productDetail.vue')), 'Category')
// const payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')


const Payselect = r => require.ensure([], () => r(require('../components/common/payselect.vue')), 'goodsDetails')
const Outmoney = r => require.ensure([], () => r(require('../components/common/outmoney.vue')), 'goodsDetails')

/**
 * 确认订单页面
 */
const ConfirmOrder = r => require.ensure([], () => r(require('../components/userCenter/address/ConfirmOrder.vue')), 'submitOrder')
const AddAddress = r => require.ensure([], () => r(require('../components/userCenter/address/AddAddress.vue')), 'submitOrder')
const DeliveryMode = r => require.ensure([], () => r(require('../components/userCenter/address/DeliveryMode.vue')), 'submitOrder')
const ManageAddress = r => require.ensure([], () => r(require('../components/userCenter/address/manageAddress.vue')), 'submitOrder')
const EditAddress = r => require.ensure([], () => r(require('../components/userCenter/address/EditAddress.vue')), 'submitOrder')
/**
 * 订单详情
 */
const Orderd = r => require.ensure([], () => r(require('../components/userCenter/order/orderDetail.vue')), 'Orderd')
const Logistics = r => require.ensure([], () => r(require('../components/userCenter/order/logistics.vue')), 'Logistics')
const Drawback = r => require.ensure([], () => r(require('../components/userCenter/order/drawback.vue')), 'Drawback')
const DrawbackInfo = r => require.ensure([], () => r(require('../components/userCenter/order/drawbackInfo.vue')), 'DrawbackInfo')


const Applys = r => require.ensure([], () => r(require('../components/userCenter/user/Apply.vue')), 'UserCenter')
const Coupon = r => require.ensure([], () => r(require('../components/userCenter/user/Coupon.vue')), 'UserCenter')
const Opinion = r => require.ensure([], () => r(require('../components/userCenter/user/Opinion.vue')), 'UserCenter')
const Detailed = r => require.ensure([], () => r(require('../components/distribution/Detailed.vue')), 'UserCenter')


const Collect = r => require.ensure([], () => r(require('../components/userCenter/user/Collect.vue')), 'UserCenter')
const Footprint = r => require.ensure([], () => r(require('../components/userCenter/user/Footprint.vue')), 'UserCenter')
const Service = r => require.ensure([], () => r(require('../components/userCenter/user/Service.vue')), 'UserCenter')





export default new Router({
  routes: [
    //首页
    {
      path: '',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/details',
          name: 'details',
          component: Details,
        },
        {
          path: '/list',
          name: 'list',
          component: List
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/special',
          name: 'special',
          component: Special
        }
      ]
    },
    /*分类*/
    {
      path: '/category',
      name: 'category',
      component: Category,
      children: [
        {
          path: '/category/list',
          name: 'clist',
          component: List,
          children: [
            {
              path: 'list/details',
              name: 'detail',
              component: Details,
            },
          ]
        }
      ]
    },
    //购物车
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart,
      children:[
        {
          path: '/shoppingCart/details',
          name: 'cartdetails',
          component: Details,
        }
      ]
    },
    //分销
    {
      path: '/vipCenter',
      name: 'vipCenter',
      component: VipCenter,
      children: [

        {
          path: '/extension',
          name: 'extension',
          component: Extension,
          children: [
            {
              path: '/orderinfo',
              name: 'orderinfo',
              component: Orderinfo
            },
          ]
        },
        {
          path: '/takemoney',
          name: 'takemoney',
          component: Takemoney,
          children: [
            {
              path: '/moneylist',
              name: 'moneylist',
              component: Moneylist
            },
            {
              path: '/outmoney',
              name: 'outmoney',
              component: Outmoney
            }
          ]
        },
        {
          path: '/detailed',
          name: 'detailed',
          component: Detailed,
          children:[
            {
              path:'/bill',
              name:'bill',
              component:Bill
            }
          ]
        },
        {
          path: '/vipCenter/apply',
          name: 'disapply',
          component: Applys
        },
        {
          path:'/team',
          name:'team',
          component:Team,
          children: [
            {
              path: '/partnerInfo',
              name: 'partnerInfo',
              component: PartnerInfo
            },
          ]
        }
      ]
    },
    //提交订单
    {
      path: '/confirmorder',
      name: 'confirmorder',
      component: ConfirmOrder,
      // meta: { nokeepAlive: true },
      children: [
        {
          path: '/confirmorder/details',
          name: 'confirmdetails',
          component: Details
        },
        {
          path: '/payselect',
          name: 'payselect',
          component: Payselect
        },
        {
          path: '/deliverymode',
          name: 'deliverymode',
          component: DeliveryMode
        },
        //地址
        {
          path: '/confirmorder/address',
          name: 'manageAddress',
          component: ManageAddress,
          // meta: { nokeepAlive: true },
          children: [
            {
              path: '/address/add',
              name: 'addaddress',
              component: AddAddress
            },
            {
              path: '/address/edit',
              name: 'editAddress',
              component: EditAddress
            },
          ]
        },
        {
          path: '/confirmorder/details',
          name: 'confirmorderdetails',
          component: Details,
        }
      ]
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
      children: [

        {
          path: '/userCenter/userInfo',
          name: 'userInfo',
          component: UserInfo,
        },
        {
          path: '/userCenter/apply',
          name: 'applys',
          component: Applys
        },
        {
          path: '/userCenter/coupon',
          name: 'coupon',
          component: Coupon
        },
        {
          path: '/userCenter/opinion',
          name: 'opinion',
          component: Opinion
        },
        {
          path: '/footprint',
          name: 'footprint',
          component: Footprint,
          children: [
            {
              path: '/footprint/details',
              name: 'fdetail',
              component: Details
            },
          ]
        },
        {
          path: '/collect',
          name: 'collect',
          component: Collect,
          children: [
            {
              path: '/collect/details',
              name: 'cdetails',
              component: Details
            },
          ]
        },
        {
          path: '/service',
          name: 'service',
          component: Service,
        },
        {
          path: '/address',
          name: 'address',
          component: ManageAddress,
          // meta: { nokeepAlive: true },
          children: [
            {
              path: '/address/add',
              name: 'useradd',
              component: AddAddress
            },
            {
              path: '/address/edit',
              name: 'useredit',
              component: EditAddress
            },
          ]
        },
      ]
    },


    {
      path: '/order',
      name: 'order',
      component: MyOrder,
      children: [
        {
          path: '/orderd',
          name: 'orderd',
          component: Orderd,
          children: [{
            path: '/orderd/details',
            name: 'orderddetails',
            component: Details,
          }]
        },
        {
          path: '/logistics',
          name: 'logistics',
          component: Logistics,
        },
        {
          path: '/drawback',
          name: 'drawback',
          component: Drawback,
        },
        {
          path: '/drawbackInfo',
          name: 'drawbackInfo',
          component: DrawbackInfo,
        },
        {
          path: '/order/pay',
          name: 'orderpay',
          component: Payselect,
        }
      ]
    },
//地址
    {
      path: '/test',
      name:'test',
      component: Test
    },
  ]
})
