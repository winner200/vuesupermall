## Vuex详解

#### Vuex是做什么的？

##### 官方解释：Vuex是一个专为vue.js应用程序开发的 ”状态管理模式“。

> - 它采用 ”集中式储存管理“ 应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
> - Vuex也集成到Vue的官方调试工具 ”devtools extension“ ，提供了诸如零配置的time-tarvel调试、状态快照导入导出等高级调试功能。

状态管理到底是什么？

> - "状态管理模式"，”集中式存储管理“，这些名词听起来就非常高大上，让人琢磨不透。
> - 其实，你可以简单的将其看成把把需要多个组件共享的变量全部存储在一个对象里面。
> - 然后，将这个对象挡在顶层的Vue实例中，让其他组件可以使用。
> - 那么，多个组件是不是就可以共享这个对象中的所有变量属性了呢？

等等，如果是这样的话，为什么官方还要专门出一个插件Vuex呢？难道我们不能自己封装一个对象来管理吗？

> - 当然可以，只是我们要先想想VueJS带给我们最大的便利是什么呢？没错，响应式。
> - 如果你自己封装实现一个对象能不能保证他里面的所有的属性做到响应式呢？当然也可以，只是自己封装可能稍微麻烦一些。
> - 不用怀疑，Vuex就是为了提供这样一个在多个组件中共享状态的插件，用它就可以了。

#### 管理什么状态呢？

但是，有什么状态时需要我们在多个组件之间共享呢？

> - 如果你做过大型项目开发，你一定遇到过多个状态，在多个页面间共享的问题。

> - 比如用户登录状态（token）、用户名称、头像、地理位置信息等等。
> - 比如商城的收藏、购物车中的物品等等。
> - 这些状态信息，我们都可以放在统一的地方对他们进行保存和管理，而且他们还是响应式的。

#### 多页面状态管理

Vue已经帮我们做好了单个界面的状态管理，但是如果是多个界面呢？

> - 多个视图都依赖同一个状态，（一个状态改了，多个页面都需要进行更新）
> - 不同界面的Actions都想修改同一个状态（Home.vue需要修改，Profile.vue也需要修改这个状态）

也就是说对于某些状态（状态1/状态2/状态3）来说，只属于我们某一个视图，但是也有一些状态（状态a/状态b/状态c）属于多个视图共同想要维护的。

> - 状态1/状态2/状态3你放在自己的房间中，你自己管理自己用，没问题。
> - 但是状态a/状态b/状态c我们希望交给一个大管家来统一帮助我们管理！！！
> - 没错，Vuex就是为我们提供这个大管家的工具。

全局单例模式（大管家）

> - 我们现在要做的就是将共享的状态抽取出来，交给我们的大管家，统一进行管理。
> - 之后，你们每个视图，按照规定好的规定，进行访问和修改等操作。
> - 这就是Vuex背后的基本思想。

### 简单的案例：

##### 1. 创建Vuex的对象：

> - 我们这里实现一下简单的案例：加，减

首先，我们需要在某个地方存放我们的Vuex代码：

> - 这里，我们先创建一个文件夹store，并且在其中创建一个index.js文件，在index.js文件中代码如下：

```
import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

// 2.创建对象
const store = new Vuex.Store({
	state: {
		counter: 1000
	},
	mutations: {
		// 方法
		increment(state) {
			state.counter++
		},
		decrement(state) {
			state.counter--
		}
	},
	actions: {},
	getters: {},
})

export default store
```

##### 2. 挂载到Vue实例中：

我们可以让所有的Vue组件都可以使用这个store对象

> - 打开 main.js文件，导入store对象，并且放在new Vue中，这样在其他Vue组件中，我们就可以通过this.$store的方式，获取到store对象了。

```
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  render: h => h(App)
})

```

##### 使用Vuex的counter

我们对使用步骤，做一个简答的小结：

> 1. 提取出一个公共的store对象，用于保存在多个组件中共享的状态。
> 2. 将store对象放置在new Vue对象中，这样可以保证在所有的组件中都可以使用到。

在其他组件中使用store对象中保存的状态即可：

> - 通过this.$store.state.属性的方式来访问状态。
> - 通过this.$store.cmooit('mutation中的方法')来修改状态。

注意事项：

> - 我们通过mutation的方式，而非直接改变store.state.counter。
> - 这是因为Vuex可以更明确的追踪状态的变化，所以不要直接改变store.state.counter的值。

代码如下：

```
<template>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="addition">＋</button>
    <button @click="subtraction">－</button>
  </div>
</template>
<script>
import HelloVuex from './components/HelloVuex'
export default {
  name: 'App',
	components: {
		HelloVuex
	},
	data() {
		return {
			message: '我是APP组件库',
			counter: 0
		}
	},
	methods: {
		addition() {
			this.$store.commit('increment')
		},
		subtraction() {
			this.$store.commit('decrement')
		}
	}
}
</script>

<style>
</style>
```

### Vuex核心概念

Vuex 有几个比较核心概念：

> - State
> - Getters
> - Mutation
> - Action
> - Module

#### 1. State单一状态树：

Vuex提出使用单一状态树，什么是单一状态树呢？

> - 英文名称是Single Source of Truth，也可以翻译成单一数据源。

但是他是什么呢？我们来看一下生活中的例子：

> - 我们知道，在国内我们很多信息都需要被记录，比如上学时的个人档案，工作后的社保记录，公积金记录，结婚后的婚姻信息，以及其他相关的户口、医疗、文凭、房产记录等等（还有很多信息）。
> - 这些信息被分散在很多地方进行管理，有一天你去办理某个业务时（比如入户某个城市），你会发现你需要到各个对应的工作地点去打印、盖章各种资料信息，最后到一个地方提交你的信息证明无误。
> - 这种保存信息的方案，不仅仅效率低，而且还不方便管理，以及日常维护也是一个庞大的工作(需要大量的各个部门的人力来维护，当然国家目前已经在完善我们的这个系统了)。

这个和我们应用开发中比较类似：

> - 如果你的状态信息是保存到多个Store对象中，那么之后的管理和维护等等都会变得特别困难。
> - 所以Vuex也使用单一状态树来管理应用层级的全部状态。
> - 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便的管理和维护。

#### Getters基本使用

> - 相当于计算属性。computed

有时候我们需要从store中获取一些store变异后的状态，比如下面的Store中：

> - 获取学生年龄大于20岁的这个数。我们可以在Store中定义getters。

```
const store = new Vuex.Store({
	state: {
		counter: 1000,
		students: [
			{
				id: '111',
				name: 'winner',
				age: '21'
			},
			{
				id: '112',
				name: 'winner1',
				age: '20'
			},
			{
				id: '113',
				name: 'winner2',
				age: '24'
			},
		]
	},
	getters: {
		powerCounter(state) {
			return state.counter * state.counter
		},
		more20stu(state) {
			return state.students.filter(s => s.age > 20)
		}
	}
})
```

在模板中中使用：

```
<h2>{{$store.getters.more20stu}}</h2>
```

##### Getters作为参数和传递参数

如果我们已经有了一个获取所有年龄大于20岁学生列表的getters，那么代码可以这样来写：

```
getters: {
	more20stu(state) {
		return state.students.filter(s => s.age > 20)
	},
	more20stuLength(state, getters) {
		return getters.more20stu.length
	}
}
```

##### getters传递参数

>- 默认是不能传递参数的，如果希望传递参数，那么只能让getters本身返回另一个函数。

> - 比如上面的案例，我们希望age是用户决定显示多少岁的，而不是在这里写死的

```
getters: {
	moreAgeStu(state) {
		return function(age) {
		return state.students.filter(s => s.age > age)
	}
		
		// 在对象里面不推荐箭头函数写法
		//return age => {
			//return state.students.filter(s => s.age > age)
		//}
	}
}
```

模板中使用：

```
<h2>{{$store.getters.moreAgeStu(15)}}</h2>
```

#### Mutitaon状态更新

> - Vuex的store状态的更新唯一方式：提交Mutation

Mutation主要包括两部分：

> - 字符串的**事件类型（type）**
> - 一个 **回调函数（handler）**，该回调函数的第一个参数就是state。

Mutation的定义方式：

```
mutations: {
    // 方法
    increment(state) {
    state.counter++
    }
},

```

通过Mutation更新：

```
addition() {
	this.$store.commit('increment')
}
```

#### Mutation传递参数

在通过mutation更新数据的时候，有可能我们希望携带一些额外参数

> - 参数被称为是mutation的载荷（payload）

Mutation中的代码：

```
incrementCount(state, count) {
	state.counter += count
}

App.vue代码如下：
addCount(count) {
	// payload：负载
	this.$store.commit('incrementCount',count)
}

// 从payload对象中取出数据
addCount1(payload) {
	// payload：负载
	this.$store.commit('incrementCount',payload.count)
}
```

但是如果参数不是一个呢？

> - 比如我们有很多个参数需要传递，这个时候我们通常会以对象的形式传递，也就是payload是一个对象。
> - 这个时候可以再从对象中取出相关的信息

代码如下：

```
mutation代码如下：

addStudent(state, stus) {
	state.students.push(stus)
}

App.vue代码如下：
addStudent() {
	let stus = {
		id: '114',
		name: 'zhangsan',
		age: '29'
	}
	this.$store.commit('addStudent', stus)
}
```

##### Mutation提交风格

> - 上面通过commit进行提交是一种普通的方式

Vue还提供了另一种风格，它是一个包含type属性的对象：

App.vue

```
addCount(count) {
	// payload：负载
	// this.$store.commit('incrementCount',count)
	
	// 特殊的提交方式
	this.$store.commit({
		type: 'incrementCount',
		count:count
	})
}
```

Mutation中的处理方式是将整个commit的对象作为payload使用，所以代码没有改变，依然如下：

store/index.js

```
incrementCount(state, payload) {
	console.log('打印count', payload.count)
	state.counter += payload.count
}
```

#### Mutation

> - Vuex的store中的state是响应式的，当state中的数据发生改变时，Vue组件会自动更新。

要想做到响应式，要求我们必须要遵守一些Vuex的规则：

> - 提前在store中初始化好所需要的属性。

当给state中的对象添加新属性时，使用下面的方法，即可做到响应式：

> - 使用Vue.set(obj, 'newProp', 123)
> - 用新对象给旧对象赋值

```
mutations: {
    updateInfo(state, paylad) {
      //state.info.name = paylad,
      //state.info.address = '王者峡谷' //这样修改不是响应式的，数据是不会被渲染到页面上的
      //Vue.set(state.info, 'address', '王者峡谷')
      //state.info = {...state.info, 'height', payload.height}

      //xdelete state.age // delete删除对象中的属性，可以删除，但不是响应式的，页面不会刷新
      Vue.delete(state.info, 'age')
    }
}
```

#### Mutation常量类型 - 概念

我们来考虑下面的问题：

> - 在mutation中，我们定义了很多的事件类型（也就是其中的方法名称）
> - 当我们项目增大时，Vuex管理的状态越来越多，需要更新状态的情况越来越多，那么意味着Mutation中的方法越来越多。
> - 方法过多，使用者需要花大量的经历去记住这些方法，甚至是多个文件间来回切换，查看方法名称，甚至如果是复制的时候，可能还会出现写错的情况。

mutation中使用常量：

```javascript
import {
  INCREMENT
} from './mutations-types.js'

mutations: {
  // 方法
  // increment(state) {
  // 	state.counter++
  // },
  [INCREMENT](state) {
    state.counter ++
  },
}
```

App.vue中使用

```javascript
import {
  INCREMENT
} from './store/mutations-types'

methods: {
  addition() {
    // this.$store.commit('increment')
    this.$store.commit(INCREMENT)
  },
}
```

### Mutation同步函数

> - 通常情况下，Vuex要求Mutation方法必须是同步方法。
> - 主要原因是当我们使用devtools时，可以devtools可以帮助我们捕捉mutation的快照。
> - 但是如果是异步操作，那么devtools将不能很好的追踪这个操作什么时候会被完成。

代码如下：

> - setTimeout是异步操作，虽然过一秒后页面更新被渲染了，但是devtools中并没有更新。

```javascript
mutations: {
  // 错误代码：不能这里进行异步操作
  updateInfo(state, paylad) {
    setTimeout(() => {
      state.info.name = '亚瑟'
    }, 1000)
  }
}
```

##### Mutation的同步函数 -- actions

```javascript
store/index.js代码：

mutations: {
  updateInfo(state, paylad) {
    state.info.name = 'paylad'
  }
},
actions: {
    // context：上下文
    // aUpdateInfo(context, payload) {
    //   setTimeout(() => {
    //     context.commit('updateInfo')
    //     // console.log('我是：', payload)
    //     console.log(payload.message)
    //     console.log(payload.success)
    //   }, 1000)
    // }

    aUpdateInfo(context, payload) {
      return new Promise((resolve, reject) => {
       setTimeout(() => {
         context.commit('updateInfo')
         console.log('我是：', payload)
         resolve('123456')
       }, 1000)
      })
    }
 }

App.vue代码：
methods: {
  updateInfo() {
    // this.$store.commit('updateInfo', '亚瑟')
    // this.$store.dispatch('aUpdateInfo', '我是payload')

    // this.$store.dispatch('aUpdateInfo', () => {
    //   console.log('里面已经修改成功了');
    // })

    // this.$store.dispatch('aUpdateInfo', {
    //   message: '我是payload携带的信息',
    //   success: () => {
    //     console.log('里面已经修改成功了')
    //   }
    // })
    this.$store
      .dispatch('aUpdateInfo', '我是payload携带的信息')
      .then(res => {
      console.log(res)
    })
  }
}
```

### 认识Module

Module是模块的意思，为什么在Vuex中要使用模块呢？

> - Vue使用单一状态树，那么也意味着很多状态都交给Vuex来管理。
> - 当应用变得非常复杂时，store对象就有可能变得相当臃肿。
> - 为了解决这个问题，Vuex允许我们将store分割成模块（Module），而每个模块拥有自己的state、mutations、actions、gettters等。

Store/index.js代码

```javascript
const moduleA = {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    aUpdateName(context) {
      console.log(context)
      setTimeout(() => {
        context.commit('updateName','王五')
      }, 1000)
    }，
    // 伪代码：es6的对象解构写法，context是一个对象，可以使用这样的方式写
    incrementIfSum({state, commit, rootState}) {
      console.log(state.name);
      commit('updateName')
    }
  },
  getters: {
    fullname(state) {
      return state.name + '1111'
    },
    fullname1(state, getters) {
      return getters.fullname + '2222'
    },
    fullname2(state, getters, rootState) {
      return getters.fullname1 + rootState.counter
    }
  }
},
const store = new Vuex.Store({
	modules: {
    a: moduleA
  }
})
```

App.vue代码：

```javascript
<h2>-----------App内容：modules中的内容----------</h2>
<h2>{{$store.state.a.name}}</h2>
<button @click="updateName">修改modules模块中的名字</button>
<p>{{$store.getters.fullname}}</p>
<p>{{$store.getters.fullname1}}</p>
<p>{{$store.getters.fullname2}}</p>
<button @click="asycUpdateName">异步修改名字</button>
	
methods: {
    updateName() {
      this.$store.commit('updateName', 'lisi')
    },
    asycUpdateName() {
      this.$store.dispatch('aUpdateName')
    }
	}
}
```

##### Actions的写法：

> - actions写法，接受一个context参数对象。
> - 局部状态通过 context.state暴露出来，根节点状态则为context.rootState暴露出来

```javascript
actions: {
    aUpdateName(context) {
      console.log(context)
      setTimeout(() => {
        context.commit('updateName','王五')
      }, 1000)
    }，
    // 伪代码：es6的对象解构写法，context是一个对象，可以使用这样的方式写
    incrementIfSum({state, commit, rootState}) {
      console.log(state.name);
      commit('updateName')
    }
  }
```

如果getters中也需要使用全局状态，可以接受更多的参数

```javascript
getters: {
    fullname2(state, getters, rootState) {
      return getters.fullname1 + rootState.counter
    }
  }
```

## 网络模块封装 axios

#### axios请求方式

支持多种请求方式：

> - axios(config)
> - axios.request(config)
> - axios.get(url[, config])
> - axios.delete(url[, config])
> - axios.head(url[, config])
> - axios.post([, data[, config]])
> - axios.put([, data[, config]])
> - axios.patch([, data[, config]])

#### 发送get请求

在main.js中直接请求

```
import axios from 'axios'

axios({
	url: 'http://123.207.32.32:8000/home/multidata',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log('请求失败了')
})

axios({
  url: 'http://123.207.32.32:8000/home/data',
  // 专门针对get请求的参数拼接
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res)
})
```

在App.vue中请求

```
<script>
import axios from 'axios'
export default {
  name: 'App',
  created() {
    axios({
    	url: 'http://123.207.32.32:8000/home/multidata',
      method: 'get'
    }).then(res => {
      console.log(res)
    })
  }
}
</script>
```

#### 发送并发请求

> - 使用axios.all，可以放入多个请求的数组。
> - axios.all([])，返回的结果是一个数组，使用axios.spread 可将数组展开为res, res2 （不常用）

```
// 2.axios并发请求
axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata',
}), axios({
  url: 'http://123.207.32.32:8000/home/data',
  params: {
    type: 'pop',
    page: 1
  }
})]).then(results => {
  console.log('axios并发请求', results)
  console.log(results[0])
  console.log(results[1])
})

axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata',
}), axios({
  url: 'http://123.207.32.32:8000/home/data',
  params: {
    type: 'pop',
    page: 1
  }
})]).then(axios.spread((res1, res2)=> {
  console.log(res1)
  console.log(res2)
}))
```

### 全局配置

在上面的例子中，我们BaseURL是固定的

> - 事实上，在开发中可能很多参数都是固定的。
> - 这个时候我们可以进行一些抽取，也可以利用axios的全局配置

```
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'applocation/x-www-form-urlencoded'
```

##### 常见的配置选项

> - 请求地址：'url/user'
> - 请求类型：method： 'post'
> - 请求路径：baseUrl：'http://www.mt.com/api'
> - 请求前的数据处理：transformRequest:[function(data){}]
> - 请求后的数据处理：transformRequest:[function(data){}]
> - 自定义的请求头：headers:{'applocation/x-www-form-urlencoded'}
> - Url查询对象：params:{id:12}
> - 查询对象序列化函数：paramsSerializer:function(params){}
> - request body：data:{"key":"aaa"}
> - 超时设置s：timeout:1000
> - 跨域是否带Token：withCredentials:false
> - 自定义请求处理：adpter:function(resolve, reject, config) {}
> - 身份验证信息：auth:{uname:1, pwd:'12'}

响应的数据格式：json/ blob/ document/ arraybuffer/ text/ stream

> - responseType:'json'

#### axios实例

为什么要创建axios的实例呢？

> - 当我们从axios模块中导入对象时，使用的实例是默认的实例。
> - 当给该实例设置一些默认配置时，这些配置就被固定下来了。
> - 但是后续开发中某些配置可能会不太一样。
> - 比如某些请求需要特定的baseURL或者timeout或者content-Type等。
> - 这个时候我们就可以创建新的实例，并且传入属于该实例的配置信息。

```javascript
// 4. 创建对应的axios的实例
const instance1 = axios.create({
	baseURL: 'http://123.207.32.32:8000',
	tileout: 5000
})
instance1({
	url: '/home/data',
	params: {
		type: 'pop',
		page: 1
	}
}).then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
})
```

###  项目中笔记

##### 对于refresh非常频繁的问题，进行防抖动操作

防抖debounce/节流throttle（课下研究下）

> - 如果我们直接执行refresh，那么refresh函数会被执行30次。可将refresh函数传入到debounce函数中，生成一个新的函数。
> - 之后在调用非常频繁的时候，就使用新生成的函数。而新生成的函数并不会非常频繁的调用，如果下一次执行的非常快，那么会将上一次取消掉。

```javascript
debounce(func, delay) {
  let timer = null
  return function(...ages) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, ages)
    }, delay)
  }
},
  
// 调用refresh函数
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('goodsImageLoad', () => {
      // console.log('-------');
      // console.log(this.$refs.scroll.refresh())
      // this.$refs.scroll.refresh()
      refresh()
    })
  }
```

---

## Vue生命周期（函数钩子）补充

#### 什么是生命周期

> - 从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件统称为 **生命周期**
> - 生命周期钩子：就是生命周期事件的别名而已。

生命周期钩子：

> - 生命周期钩子 = 生命周期函数 = 生命周期事件

##### 主要的生命周期函数分类：

创建期间生命周期函数

> - beforeCreate：Vue实例刚在内存中被创建出来，此时，还没有初始化好data和methods属性
> - created：实例已经在内存中创建OK，此时data和methods已经创建OK，此时还没有开始编译模板。
> - beforeMount：此时已经完成模板的编译，但是还没有挂载到页面上。
> - mounted：此时已经将编译好的模板，挂载到了页面指定的容器上显示。

运行期间生命周期函数

> - beforeUpadate：状态更新之前执行此函数，此时data中的状态值是最新的，但是页面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点。
> - updated：实例更新完毕之后调用此函数，此时data中的状态值 和 界面上显示的数据都已经完成了更新，界面已经被重新渲染好了。

销毁期间生命周期函数

> - beforeDestory：实例销毁之前调用，在这一步，实例仍然完全可以使用。
> - destroyed：Vue实例销毁后调用，调用后，Vue实例指示的所有东西都会被解绑定，所有的事件监听都会被移除，所有的子实例也会被销毁。

代码如下：

```
<body>
<div id="app">
  <input type="button" value="修改msg" @click="msg = 'No'">
  {{msg}}
  <div id="h3">{{msg}}</div>
</div>

<script src="./node_modules/vue/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data() {
      return {
        msg: 'ok'
      }
    },
    methods: {
      show() {
        console.log('执行了show方法')
      }
    },
    beforeCreate() {// 这是我们遇到的第一个生命周期函数，表示实例完全被创建出来执行。
      // console.log(this.msg);
      // this.show()
      // 注意：在beforeCreate 生命周期函数执行的时候，data 和 methods 中的数据都还没有被初始化。
    },

    created() { // 这是遇到的第二个生命周期函数.
      // console.log(this.msg);
      // console.log(this.show);
      // 在 created 中，data 和 methods 都已经被初始化好了。
      // 如果要调用 methods 中的方法或者操作data中的数据，最早只能在created 中操作。
    },

    beforeMount() { //这是遇到的第三个生命周期函数， 表示 模板已经在内存中已经编译完成了，但是尚未把模板渲染到页面中去。
      // console.log(document.getElementById('h3').innerText);

      // 在 beforeMount 执行的时候，页面中的元素，还没有被真正的渲染出来，只是之前写的一些模板字符串。
    },

    mounted() { // 这是遇到的第四个生命周期函数，表示内存中的模板已经真实的挂载到了页面中，用户已经可以看到了渲染好的页面了。
      // console.log(document.getElementById('h3').innerText);

      // 注意：mounted 是 实例创建期间最后一个生命周期函数，当执行完 mounted 就表示，Vue实例已经被完全创建好了，此时，如果没有其他操作的话。这个实例就躺在内存中一动不动。
      // 如果要通过某些插件操作页面上的DOM节点，最早要在mounted中进行。
      // 只要执行完了 mounted 就表示整个Vue实例已经初始化完毕了，此时Vue已经脱离了创建阶段，进入了运行阶段。
    },


    // 接下来是运行中的两个事件
    beforeUpdate() { // 这时候，表示，我们的界面还没有被更新 【数据被更新了吗？ 数据肯定被更新了】
      // console.log('页面上的元素内容',document.getElementById('h3').innerText);
      // console.log('data中的msg数据', this.msg)

      // 当执行 beforeUpdate 的时候，页面中显示的数据还是旧的，此时data数据是最新的，页面尚未和最新的数据保持同步。
    },
    updated() {
      console.log('页面上的元素内容',document.getElementById('h3').innerText);
      console.log('data中的msg数据', this.msg)

      // update 事件执行的时候，页面和data 数据已经保持同步了，都是最新的。
    },
    beforeDestroy() {
      // 当执行 beforeDestory钩子函数的时候，Vue实例就已经从运行阶段，进入到了销毁阶段；
      // 当执行 beforeDestroy 的时候，实例身上所有的data和所有的methods，以及过滤器，指令...都处于可用状态，此时还没有真正的执行销毁的过程。
    },
    destroyed() {
      // 当执行到destroyed 钩子函数的时候，组件已经被完全销毁了，此时，组件中的所有的数据、方法、指令、过滤器....都已经不可用了。
    }
  })
</script>
</body>
```

