import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 安装路由插件
Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//获取原型对象上的replace函数
const originalReplace = VueRouter.prototype.replace
//修改原型对象中的push方法
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')


// 2.创建router
const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/category',
		name: 'Category',
		component: Category
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: Detail
  }
]
const router = new VueRouter({
	routes,
	mode: 'history'
})
// 3.导出router
export default router
