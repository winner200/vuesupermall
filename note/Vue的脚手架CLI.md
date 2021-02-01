## Vue的脚手架CLI

#### 什么是Vue CLI

> - 如果你只是简单写几个Vue的Demo程序，那么你不需要Vue CLI。

1，如果你在开发大型项目，那么你需要，并且必然需要使用Vue CLI

> - 使用Vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。
> - 如果每个项目都需要单独完成这些工作，那无疑效率比较低，所以通常我们会使用一些脚手架工具来帮助完成这些事情。

2，CLI是什么意思？

> - CLI是Command-Line Interface 翻译为命令行界面。但是俗称脚手架。
> - Vue CLI是一个官方发布vue.js项目脚手架。
> - 使用Vue-cli可以快速搭建Vue开发环境以及对应的webpack配置。

#### Vue CLI使用前提 - Node

> - 要想使用CLI脚手架就要先安装node.js，因为脚手架会生成webpack的配置，而webpack本身的话就是依赖于node的。

##### 安装NodeJS

1，可以在官网中下载安装

> - 网址：http://nodejs/download

2，检测安装的版本

> - 默认情况下自动安装Node和NPM，node环境要求8.9以上或者更高的版本。
> - node -v 
> - npm -v

3，什么是NPM呢？

> - NPM的全称是 Node Package Manager；
> - 是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。
> - 后续我们会经常使用NPM来安装一些开发过程中依赖包。

4，cnpm安装，由于国内直接使用npm的官方镜像是非常慢的，这里推荐使用淘宝NPM镜像。

> - npm install -g cnpm --registry=https://registry.npm.taobao.org

5，安装完成后就可以使用cnpm命令来安装模块了。

> - cnpm install [name]

##### Vue CLI使用前提 - Webpack

Vue.js官方脚手架工具就使用了webpack模板

> - 对所有的资源会压缩等优化操作。
> - 它在开发过程中提供了一套完整的功能，能够使我们开发过程中变得高效。

webpack的全局安装

> - npm install webpack -g

#### Vue CLI的使用

1，安装Vue脚手架

> - npm install -g @vue/cli
> - 注意：上面的安装方式是Vue CLI3的版本，如果需要想按照Vue CLI2的方式初始化项目是不可以的。
> - 查看脚手架版本：vue --version

2，拉取2.x版本（旧版本）

> - Vue CLI3和旧版本使用了相同的vue命令，所以Vue CLI2（vue-cli）被覆盖了，如果你仍然需要使用旧版本的 vue init功能，你可以全局安装一个桥接工具。
> - npm install -g @vue/cli-init

3，Vue CLI2初始化项目

> - vue init webpack my-project

4，Vue CLI3初始化项目

> - vue create my-project

vue全家桶

> - VueCore+vue-router+vuex

##### CLI2创建项目，安装需要配置的选项

```
G:\vue\代码\vue\CLIProject>vue init webpack vuecli2test

? Project name vuecli2test
? Project description test vue cli2
? Author winner200 <winner443@163.com>
? Vue build standalone
? Install vue-router? No
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "vuecli2test".


# Installing project dependencies ...
# ========================

npm WARN deprecated eslint-loader@1.9.0: This loader has been deprecated. Please use eslint-webpack-plugin
```

vue init webpack vuecli2test

> - vuecli2test 会根据这个名称创建一个文件夹，存放之后项目内容。该名称也会作为默认的项目名称，但是不能包含大写字母等。

Project name vuecli2test

> - vuecli2test -- 项目名称，不能包含大写

Project description test vue cli2

> - test vue cli2 -- 项目的描述。

Author winner200 < winner443@163.com >

> - winner200 < winner443@163.com >  作者的信息，默认会从git上面读取。

Vue build standalone

> - 选择vue的版本，后面会详细介绍。

Install vue-router? No

> - 是否安装路由，后面自己安装。

Use ESLint to lint your code? Yes

> - ESLint 检测代码规范，是否安装看自己实际情况

Pick an ESLint preset Standard

> - 要遵循的代码规范，我们这里选择标准的规范。

Set up unit tests No

> - 单元测试，某些公司要求强制写单元测试

Setup e2e tests with Nightwatch? No

> - e2e测试  end to end  端对端测试
> - 可以安装Nightwatch 是一个利用selenium或webdriver 或 phantomtomjs等进行自动化测试的框架。

Should we run `npm install` for you after the project has been created? (recommended) npm

> - 选择npm进行项目构建。

项目的目录结构及说明

> - 见示例图 -- 图1

##### 关闭 Eslint 代码规范

> - 项目 -- config -- index.js --  useEslint: true改为false就好了



## 认识Vue CLI3

##### vue-cli3 与 2版本有很大的区别

> - vue-cli 3 是基于 webpack4 打造的，vue-cli2 还是 webpack 3
> - vue-cli 3 的设计原则是 “0配置” ，移除的配置文件根目录下的 build和config等目录
> - vue-cli 3 提供了vue ui 命令，提供了可视化配置，更加人性化
> - 移除了static文件夹，新增了public文件夹，并且index.html移动到public中

##### 配置文件去哪了？vue cli3 没有配置文件

UI方面的配置：

> - UI是图形化管理vue 与 webpack相关的配置。不需要在手动配置。

启动配置服务器：

> - vue ui
> - 启动成功后就会自动打开vue配置文件的页面。



## vue-router路由详解

#### 认识路由：

> - vue-router 基本使用
> - vue-router 嵌套路由
> - vue-router 参数传递
> - vue-router 导航守卫
> - keep - alive

路由是什么？

> - 路由是一个网络工程里面的一个术语；
> - 路由（routing）就是通过互联网的网络把信息从原地址传递到目的地址的活动 -- 维基百科

还是没明白什么是路由？

> - 在生活中我们有没有听说过路由的概念呢？安然了。路由器嘛
> - 路由器又是什么呢？有没有想过？路由器提供了两种机制：路由和传送
>   - 路由是决定数据包从来源到目的地的路径。
>   - 转送将输入端 的数据转移到合适的输入端。
> - 路由有一个非常重要的概念叫路由表。
>   - 路由表本质上就是一个映射表，决定了数据包的指向。

##### 前端渲染 VS 后端渲染

后端渲染：jsp/php

> - 在早期开发的时候只有 html + css 没有js。只能使用php或者jsp来渲染网页。
> - 后端渲染对SEO优化会有帮助。

##### 后端路由阶段

早期的网站开发整个HTML页面是由服务器来渲染的。

> - 服务器直接生成渲染好对应的HTML页面，返回给客户端进行显示。

但是一个网站这么多网页服务器怎么处理呢？

> - 一个页面有自己对应的网址，也就是URL
> - URL会发送到服务器，服务器会通过正则对该URL进行匹配，并且最后交给一个controller进行处理。
> - Controller进行各种处理，最终生成HTML或者数据，返回给前端。
> - 这就完成了一个IO 的操作。

上面这种情况就是后端路由：

> - 当我们页面中需要请求不同的路径内容时，交给服务器来进行处理，服务器渲染好整个页面，并且将页面返回给客户端。
> - 这种情况下渲染好的页面，不需要单独加载任何的js和css，可以直接交给浏览器显示，这样也有理由SEO的优化。

后端路由的缺点：

> - 一种情况是整个页面的模块由后端人员编写和维护的。
> - 另一种情况是前端开发人员如果要开发页面，需要通过PHP 和 Java等语言来编写页面代码。
> - 而且通常情况下HTML代码和数据以及对应的逻辑会混在一起，编写和维护都是非常糟糕的事情。

##### 前端路由阶段

前后端分离阶段：

> - 随着Ajax的出现，有了前后端分离的开发模式。
> - 后端只提供API来返回数据，前端通过Ajax获取数据，并且可以通过JavaScript将数据渲染到页面上。
> - 这样最大的优点就是前后端责任清晰，后端专注于数据上，前端专注于交互和可视化上。
> - 并且当移动端（iOS/Android）出现后，后端不需要进行任何处理，依然使用之前的一套API即可。
> - 目前有很多网站依然使用这种开发模式。

单页面富应用（SPA）阶段：

> - 其实SPA最主要的特点就是在前后端分离的基础上加了一层前端路由；
> - 也就是前端来维护一套路由规则。

前端路由的核心是什么呢？

> - 改变url，但是页面不进行整体刷新。一旦刷新就像服务器发送请求了。

#### URL 的hash

URL的hash值

> - URL的hash也就是锚点(#)，本质上是改变windows.location的href属性，我们可以通过直接赋值location.hash来改变href，但是页面不发生刷新。

```
location.hash = 'foo'
"foo"
// http://localhost:8080/#/foo

location.hash = 'bar'
"bar"
// http://localhost:8080/#/bar 
```

#### html5 的 history 模式：pushState

> - history接口是HTML5新增的，他有五种模式改变URL而不刷新页面。
> - history.pushState() 可以做返回操作

```
history.pushState({}, '', 'about')
undefined
//http://localhost:8080/about

history.pushState({}, '', 'home')
undefined
// http://localhost:8080/home
```

#### html5 的 history 模式：replaceState

> - history.replaceState() 不能返回上一个页面

```
history.replaceState({}, '', 'about')
undefined

history.replaceState({}, '', 'home')
undefined
```

#### html5 的 history 模式：go

history.go

> - 因为 history.back() 等价于 history.go(-1)
> - 因为 history.forward() 等价于 history.go(1)
>
> 这些操作都等同于浏览器界面的前进后退；

## 认识vue-router

目前前端流行的三大框架，都有自己的路由实现：

> - Angular的ngRouter
> - React的ReactRouter
> - Vue的vue-router
<<<<<<< HEAD

vue-router是什么：

> - vue-router是Vue.js官网的路由插件，他和vue.js是深度集成的，适合用于构建单页面的应用。

Vue-router是基于路由和组件的：

> - 路由用于设定访问路径，将路径和组件映射起来。
> - 在vue-router的单页面应用中，页面的路径的改变就是组件的切换。

#### 安装和使用vue-router

> -  因为我们学习了webpack，后续开发中我们主要是通过工程化的方式进行开发的。所以在后续，我们直接使用npm来安装路由即可。

步骤一：安装vue-router

> - npm install vue-router --save (因为程序运行在客户端的时候还需要这个路由，所以是 --save)

步骤二：在模块化工程中使用它（因为是一个插件，所以可以通过Vue.use()来安装路由功能）

> 1. 导入路由对象，并且调用Vue.use(VueRouter)
> 2. 创建路由实例，并且传入路由映射规则
> 3. 在Vue实例中挂载创建路由实例

```
//配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from '../components/Home'
import About from '../components/About'

// 1. 通过vue.use(插件)，安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }

]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes
})

// 3. 将router对象传入到Vue实例

export default router
```

##### 使用vue-router的步骤：

> - 第一步：创建路由组件。
>
> - 第二步：配置路由映射，组件和路径之间的关系。
>
> - 第三步：使用路由，通过<router-link>和 <router-view>

router-link：

> - 该标签是一个vue-router中已经内置的组件，他会被渲染成一个a标签。

router-view：

> - 该标签会根据当前的路径，动态渲染出不同的组件。

注意：

> - 网页的其他内容，比如顶部的标题/导航或者底部的一些版权信息等会和<router-view>处于同一个等级。在路由切换时，切换的是<router-view>挂载的组件，其他内容不会发生改变。

App.vue代码如下：

```
<template>
  <div id="app">
  	<h1>我是网站标题</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
    <h2>我是APP中一些底部的版权信息</h2>
  </div>
</template>
```

#### 路由的默认路径

> - 默认情况下，进入网站首页，我们希望<router-view> 渲染首页的内容。但是我们实现中，默认没有显示首页的组件，必须让用户点击才可以。

如何可以让路径默认跳转到首页，并且 <router-view> 渲染首页组件呢？

> - 非常简单，我们只需要多配置一个映射就可以了。

配置解析如下：
=======

vue-router是什么：

> - vue-router是Vue.js官网的路由插件，他和vue.js是深度集成的，适合用于构建单页面的应用。

Vue-router是基于路由和组件的：

> - 路由用于设定访问路径，将路径和组件映射起来。
> - 在vue-router的单页面应用中，页面的路径的改变就是组件的切换。

#### 安装和使用vue-router

> -  因为我们学习了webpack，后续开发中我们主要是通过工程化的方式进行开发的。所以在后续，我们直接使用npm来安装路由即可。

步骤一：安装vue-router

> - npm install vue-router --save (因为程序运行在客户端的时候还需要这个路由，所以是 --save)

步骤二：在模块化工程中使用它（因为是一个插件，所以可以通过Vue.use()来安装路由功能）

> 1. 导入路由对象，并且调用Vue.use(VueRouter)
> 2. 创建路由实例，并且传入路由映射规则
> 3. 在Vue实例中挂载创建路由实例

```
//配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from '../components/Home'
import About from '../components/About'

// 1. 通过vue.use(插件)，安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }

]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes
})

// 3. 将router对象传入到Vue实例

export default router
```

##### 使用vue-router的步骤：

> - 第一步：创建路由组件。
>
> - 第二步：配置路由映射，组件和路径之间的关系。
>
> - 第三步：使用路由，通过<router-link>和 <router-view>

router-link：

> - 该标签是一个vue-router中已经内置的组件，他会被渲染成一个a标签。

router-view：

> - 该标签会根据当前的路径，动态渲染出不同的组件。

注意：

> - 网页的其他内容，比如顶部的标题/导航或者底部的一些版权信息等会和<router-view>处于同一个等级。在路由切换时，切换的是<router-view>挂载的组件，其他内容不会发生改变。

App.vue代码如下：

```
<template>
  <div id="app">
  	<h1>我是网站标题</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
    <h2>我是APP中一些底部的版权信息</h2>
  </div>
</template>
```

#### 路由的默认路径

> - 默认情况下，进入网站首页，我们希望<router-view> 渲染首页的内容。但是我们实现中，默认没有显示首页的组件，必须让用户点击才可以。

如何可以让路径默认跳转到首页，并且 <router-view> 渲染首页组件呢？

> - 非常简单，我们只需要多配置一个映射就可以了。

配置解析如下：

> - 我们在routers中又配置了一个映射。
> - path配置的是根路径：/
> - redirect是重定向，也就是我们将根路径重定向到/home的路径下，这样就可以得到我们想要的结果了。

```
const routes = [
  {
    path: '/', //默认为首页
    component: Home //网站打开默认为首页
  },
  {
    path: '/home',
    component: Home
  }
]
```

##### 改变路径的两种方式：

> - URL的hash。
> - HTML5的history。
> - 默认情况下，路径的改变使用的URL的hash

如果希望希望使用HTML5的history，配置如下：

```
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history'
})
```
>>>>>>> e2a5f4a6ed0184ff1195d0996cef460f1e10bd57

> - 我们在routers中又配置了一个映射。
> - path配置的是根路径：/
> - redirect是重定向，也就是我们将根路径重定向到/home的路径下，这样就可以得到我们想要的结果了。

```
const routes = [
  {
    path: '', //默认为首页
    redirect: '/home' //网站打开默认为首页
  },
  {
    path: '/home',
    component: Home
  }
]
```

##### 改变路径的两种方式：

> - URL的hash。
> - HTML5的history。
> - 默认情况下，路径的改变使用的URL的hash

如果希望希望使用HTML5的history，配置如下：

```
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history'
})
```

#### route-link属性补充

<route-link> 还有一些其他属性：

>- tag： tag可以指定<route-link>可以渲染成什么组件，比如下面的代码会被渲染成li元素，而不是a标签	

```
<router-link to='/home' tag='li'>
```

> - replace：replace不会留下history记录，所以指定replace的情况下，不能进行后退跟返回。

active-class： 

> - 当<router-link>，对应的路由匹配成功时，会自动给当前元素设置一个router-link-active的class，设置active-class可以修改默认名称。
> - 在进行高亮显示导航菜单或者底部tabbar时，会用到该类。
> - 但是通常不会修改类的属性，会直接使用默认的router-link-active即可。

```
<template>
  <div id="app">
  	<h1>我是网站标题</h1>
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link> -->

	<!-- 设置router-link渲染 button组件 && 修改class名称 -->
	<!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
	<router-link to="/about" tag="button" replace active-class="active">关于</router-link> -->

  <!-- 利用路由统一修改class名称，就不需要在router-link组件中修改了 -->
  <router-link to="/home" tag="button" replace>首页</router-link>
  <router-link to="/about" tag="button" replace>关于</router-link>
    <h2>我是APP中一些底部的版权信息</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 /* .router-link-active {
    color: #f00;
  } */
  .active {
    color: #f00;
  }
</style>

```

通过路由统一对<router-link> 的class名称重命名

```
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history',
  linkActiveClass: 'active' //统一修改class样式
})
```

### 路由代码如何跳转

> - 有时候页面的跳转可能需要执行对应的js代码，这个时候就可以使用以下的跳转方式。通过点击事件来实现，代码如下：

```
<template>
  <div id="app">
  	<h1>我是网站标题22</h1>
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">个人中心</button>
    <h2>我是APP中一些底部的版权信息</h2>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    // 通过代码方式修改里路由 vue-router
    // push => pushState
    homeClick() {
      console.log('我说首页')
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    aboutClick() {
      console.log('我是个人中心')
      // this.$router.push('/about')
      this.$router.replace('/about')
    }
  }
}
</script>

```

#### 动态路由

在某些情况下，一个页面path的路径可能是不确定的，比如我们进入用户界面时，希望是如下的路径：

> - /user/aaa 或者 /user/bbb
> - 除了有前面的user之外，还有可能跟上用户的ID , /user/userId
> - 这种path和Components的匹配关系，我们称之为动态路由（也是路由传递数据的一种方式）

路由index.js

```
{
	path: '/user/:userId',
	component: User
}
```

模板User.vue

```
<template>
  <div>
    <h2>我是用户</h2>
    <p>我是用户的相关信息，嘿嘿嘿</p>
    <h2>{{userId}}</h2>
    <h2>{{$route.params.userId}}</h2>
  </div>
</template>
<script>
  export default {
    name: 'User',
    computed: {
      userId() {
        return this.$route.params.userId
      }
    }
  }
</script>
```

首页显示App.vue

```
<template>
  <div id="app">
  	<h1>我是网站标题22</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">个人中心</router-link>
    <router-link :to="'/user/'+userId">用户</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'lisi'
    }
  }
}
</script>
```

### 路由懒加载

##### 官方给出了解释：

> - 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
> - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件，这样就更高效了。

##### 官方在说什么？

> - 首先知道，路由通常会定义很多不同的页面。
> - 这个页面最后被打包在哪里呢？一般会放在一个js文件中。但是页面这么多，放在一个js文件中，必然会造成这个页面非常大。
> - 如果我们一次性从服务器请求下来这个页面，可能需要花费一定的时间，甚至用户电脑还会出现短暂空白的情况。
> - 如何避免这种情况呢？使用路由懒加载就可以了。用到时在加载。

路由懒加载做了什么呢？

> - 路由懒加载的主要作用就是将路由对应的组件打包成一个个小的js代码块。只有在这个路由被访问到的时候，才加载对应的组件，也就是加载对应的这个js文件。
> - 在打包的过程中，一个懒加载对应一个js文件。

##### 懒加载的方式

方式1：结合Vue的异步组件和Webpack的代码分析：

> - const Home = resolve => {require.ensure(['../components/Home.vue'], () => {resolve(require('../components/Home.vue')) })}；

方式2：AMD写法：

> - const About = resolve => require(['../components/Home.vue'], resolve)

方式3：在ES6中我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割：推荐写法

> - const Home = () => import('../components/Home.vue')

配置路由index.js代码如下：

```
// 使用路由懒加载
const Home = () => import('../components/Home')
const About = () => import('../components/About')

// 1. 通过vue.use(插件)，安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
  {
    path: '/', //默认为首页
    component: Home //网站打开默认为首页
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history',
  linkActiveClass: 'active' //统一修改class样式
})
// 3. 将router对象传入到Vue实例

export default router
```

### 认识嵌套路由

嵌套路由是一个很常见的功能：

> - 比如在home页面中，我们希望通过home/news和home/message访问一些内容；
> - 一个路径映射一个组件，访问这两个路径也会分别渲染两个组件。

路径和组件的关系如下：

> - /home -- Home
>   - /home/news -- News
>   - /home/Message -- Message
> - /about -- About

实现嵌套路由有两个步骤：

> - 创建对应的子组件，并且在路由映射中配置对应的子路由；
> - 在组件中内部使用 <router-view> 标签。

嵌套路由index.js代码如下：

```
// 使用路由懒加载
const Home = () => import('../components/Home')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')
const About = () => import('../components/About')
const User = () => import('../components/User')

// 1. 通过vue.use(插件)，安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
  {
    path: '', //默认为首页
    redirect: '/home' //网站打开默认为首页
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: '', // 进入到首页中，默认显示新闻列表
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  }
]
```

首页home.vue代码配置如下：

```
<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>
```

### 路由传递参数的方式

> - 传递参数主要有两种类型：params和query

#### params的类型：

##### 配置路由格式：

> - /router/:id

路由的index.js

```
{
   path: '/user/:userId',
   component: User
}
```

##### 传递的方式

> - 在path后面跟上对应的值，:to="'/user/'+userId

Home.vue

```
<router-link :to="'/user/'+userId">用户</router-link>
```

##### 传递后形成的路径：

> - /router/123，/router/id

#### query的类型：

> - 配置路由格式：/router，也就是普通配置
> - 传递方式：对象中使用query的key作为传递方式
> - 传递后形成的路径：/router?id=1，/router?id=2
>   - http://localhost:8080/profile?name=%E5%BC%A0%E4%B8%89&age=20

路由index.js

```
  {
    path: '/profile',
    component: Profile
  }
```

profiile.vue

```
<template>
  <div>
    <h2>我是用户档案</h2>
    <!-- 取出全部信息 -->
    <p>{{$route.query}}</p>
    <p>{{$route.query.name}}</p>
    <p>{{$route.query.age}}</p>
    <p>{{$route.query.height}}</p>
  </div>
</template>
```

App.vue

```
<template>
  <div id="app">
  	<h1>我是网站标题22</h1>
  	<router-link :to="'/user/'+userId">用户1</router-link>
  	<router-link :to="{path:'/profile', query: {name: 'winner', age: '20', height: '1.70'}}">档案1</router-link>

		<button @click="userClick">用户</button>
		<button @click="profileClick">档案</button>
		<h2>我是APP中一些底部的版权信息</h2>
		<router-view></router-view>
 </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'lisi'
    }
  },
  methods: {
    // 通过代码方式修改里路由 vue-router
    // push => pushState
    homeClick() {
      console.log('我说首页')
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    aboutClick() {
      console.log('我是个人中心')
      // this.$router.push('/about')
      this.$router.replace('/about')
    },
    userClick() {
      this.$router.push('/user/' + this.userId)
    },
    profileClick() {
      this.$router.push({
        path: '/profile',
        query: {
          name: '张三',
          age: 20
        }
      })
    }
  }
}
</script>
```

### 导航守卫

##### 为什么使用导航守卫

> - 在组件互相跳转的时候做一些监听，在跳转的过程中做一些事情。

我们考虑一个需求，在一个SPA应用中，如何改变网页的标题呢？

> - 网页标题是通过title显示的，但是SPA只有一个固定的HTML，切换不同页面时，标题并不会改变。
> - 但是我们可以通过JavaScript来修改<title> 的内容，window.document.title = '新的标题'。
> - 那么在Vue项目中，在哪里修改，什么时候修改比较合适呢？

##### 利用beforeEach来完成标题的修改

> - 首先，我们可以在钩子当中定义一些标题，可以利用meta来定义。
> - 其次利用导航守卫修改我们的标题。

导航钩子的三个参数解析：

> - to：即将要进入的目标路由对象；
> - form：当前导航即将要离开的路由对象。
> - next：调用该方法后，才能进入下一个钩子。

Index.js 路由

```
// 创建VueRouter对象
const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children:[
      {
        path: '', // 进入到首页中，默认显示新闻列表
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  }
]

router.beforeEach((to, from, next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title
  console.log('导航首页路由index', to)
  next()
})
```

#### 导航守卫补充

> - 补充一：如果是后置钩子，也就是afterEach，不需要主动调用next() 函数。
> - 补充二：上面我们使用的导航守卫，被称之为全局守卫。

更多导航守卫：

> - 路由独享的守卫；
> - 组件内的守卫；

vue的导航守卫官网：

> https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB

### keep-alive 遇见 vue-router

keep-alive 是Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。他有两个非常重要的属性

> - include - 字符串或正则表达式，只有匹配的组件会被缓存。
> - exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存。

> router-view 也是一个组件，是vue-router的组件，如果直接被包在keep-alive里面，所有路径被匹配到的视图组件都会被缓存。

```
<keep-alive>
	<!-- 所有路径匹配到的视图组件都会被缓存 -->
	<router-view/>
</keep-alive>

<keep-alive exclude="User">
	<!-- 除User外的组件都会被缓存 -->
	<router-view/>
</keep-alive>
```

