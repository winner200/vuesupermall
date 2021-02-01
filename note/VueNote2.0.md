### 表单绑定 v-model

> - Vue中使用v-model指令来实现表单元素和数据的双向绑定，在表单输入内容实现实时改变。
> - input、textarea能输入内容的都可以实现双向绑定。
> - input的radio单选也可以使用双向绑定。

##### v-model使用

```
<body>
	<div id="app">
		<input type="text" v-model="message">
		{{message}}
	</div>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el:'#app',
			data:{
				message:'你好呀'
			}
		})
	</script>
</body>

```

v-model：radio

> - 当存在多个单选框时

```
<body>
	<div id="app">
		<label for="male">
			<input type="radio" id="male" value="男" v-model="sex" />男
		</label>
		<label for="female">
			<input type="radio" id="female" value="女" v-model="sex" />女
		</label>
		<h3>您的性别是：{{sex}}</h3>
		<button type="button" @click="getInput">获取input内容</button>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el: '#app',
			data: {
				sex:'男'
			},
			methods:{
				getInput(){
					// console.log('获取input内容',app.sex)
					console.log('获取input内容',this.sex)
				}
			}
		})
		console.log(app.sex);
	</script>
</body>
```

v-model：checkbox

```
<body>
	<!-- checkbox单选操作 -->
	<!--
	<div id="app">
		<label for="agree">
			<input type="checkbox" id="agree" v-model="agree">同意协议
		</label>
		<button type="button" :disabled="!agree">下一步</button>
		<h2>请同意协议：{{agree}}</h2>
	</div> -->
	
	<!-- checkbox多选操作 -->
	<!-- 如果要是label里面的for一样，就会冲突选择 -->
	<div id="app">
		<label for="agree1">
			<input type="checkbox" id="agree1" value="篮球" v-model="hobbies">篮球
		</label>
		<label for="agree2">
			<input type="checkbox" id="agree2" value="足球" v-model="hobbies">足球
		</label>
		<label for="agree3">
			<input type="checkbox" id="agree3" value="乒乓球" v-model="hobbies">乒乓球
		</label>
		<label for="agree4">
			<input type="checkbox" id="agree4" value="羽毛球" v-model="hobbies">羽毛球
		</label>
		<h2>您的爱好是：{{hobbies}}</h2>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el:'#app',
			data:{
				agree:false,//单选框
				hobbies:[]//多选框
			}
		})
	</script>
</body>
```

v-select 单选、多选

```
<body>
	<div id="app">
		<!-- 单选 -->
		<select name="fruit" v-model="fruit">
			<option value ="苹果">苹果</option>
			<option value ="香蕉">香蕉</option>
			<option value ="葡萄">葡萄</option>
		</select>
		<h2>您选择的水果是：{{fruit}}</h2>
		<!-- 多选 -->
		<select name="fruits" v-model="fruits" multiple>
			<option value ="苹果">苹果</option>
			<option value ="香蕉">香蕉</option>
			<option value ="葡萄">葡萄</option>
		</select>
		<h2>您选择的水果是：{{fruits}}</h2>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el:'#app',
			data:{
				fruit:'香蕉',//默认选择,单选
				fruits:[]//默认选择，多选
			}
		})
	</script>
</body>
```

#### 值绑定

动态input的value赋值。

> - 我们以前在使用input的时候value都是在设置input的时候在里面定义的，不是请求回来的。但是在实际开发中，value的值是从网络获取或者是定义在data里面的。

```js
<body>
	<div id="app">
		<!-- 值绑定 -->
		<label v-for="item in hobbyGather" :for="item">
			<input type="checkbox" :id="item" :value="item" v-model="hobbies">{{item}}
		</label>
		<h2>您的爱好是：{{hobbies}}</h2>
     </div>
     <script src="../js/vue.js"></script>
	<script>
      const app = new Vue({
        el:'#app',
        data:{
         hobbies:[],//多选框
         hobbyGather:['篮球', '足球', '乒乓球', '羽毛球', '台球']
        }
      })
	</script>
</body>
```

#### v-model修饰符

lazy修饰符：

> - 默认情况下，v-model是在input事件中同步输入框数据的。一旦有数据发生改变对应的数据就会自动发生改变。
> - lazy修饰符可以让数据在失去焦点或者回车时才会更新。

number修饰符：

> - 默认情况下，在输入框无论我们输入的数字还是字母，都会被当做字符串类型进行处理。
> - number修饰符可以让在输入框输入的内筒自动转成数字类型。

trim修饰符：

> - 如果输入的内容首尾有很多空格，我们希望自动去掉，trim修饰符进行过滤内容左右两边的空格。

##### 代码示例

```
<body>
	<div id="app">
		<!-- lazy修饰符使用 -->
		<input type="text" v-model.lazy="message" />
		<h2>{{message}}</h2>
		
		<!-- number修饰符使用 -->
		<input type="text" v-model.number="age" />
		<h2>{{age}}----{{typeof age}}</h2>
		
		<!-- trim修饰符使用 -->
		<input type="text" v-model.trim="name">
		<h2>您输入的名字是：{{name}}</h2>
		
		<!-- v-model修饰符组合使用 -->
		<input type="text" v-model.lazy.number="age1">
		<h2>{{age1}}</h2>
	</div>
	<script src="../js/vue.js"></script>
	<script type="text/javascript">
		const app = new Vue({
			el:'#app',
			data:{
				message:'',
				age:0,
				name:'',
				age1:0
			}
		})
	</script>
</body>
```

---

## 组件化开发

#### 什么是组件化

如果我们将一个页面所有的处理逻辑全部放在一起，处理起来就会变得非常复杂。而且不利于后续的管理及扩展。但是如果我们将一个页面拆分成一个个小的功能块，每个功能块完成属于自己这部分的独立功能。那么之后整个页面的管理和维护就变得非常容易了。

> - 他提供了一种抽象，让我们开发一个个独立可复用的小组件来构造我们的页面。
> - 任何应用都会被抽象成一颗组件树。

##### 组件化思想的应用

> - 有了组件化的思想，我们在之后的开发中就要充分的利用他。
> - 尽可能的将页面拆分成一个个小的、可复用的组件。
> - 这样让我们的代码更加方便组织和管理，并且扩展性也更强。

##### 组件使用分3个步骤

1，创建组件构造器

> - 调用Vue.extend()方法、创建组件构造器

2，注册组件

> - 调用Vue.component()方法，注册组件
> - 语法：Vue.component('注册组件的标签名','组件构造器')

3，使用组件

> - 在Vue实例的作用范围内使用组件

##### 代码示例

```
<body>
	<div id="app">
		<!-- 使用组件 -->
		<my-cpn></my-cpn>
		<my-cpn></my-cpn>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		//创建组件构造器对象
		const cpnC = Vue.extend({
			template:`
			<div>
				<h2>我是标题</h2>
				<p>我是内筒，哈哈哈哈</p>
				<p>我是内筒，呵呵呵呵</p>
			</div>`
		})
		//注册组件
		Vue.component('my-cpn',cpnC)
		const app = new Vue({
			el:'#app',
			data:{
				message:'你好呀'
			}
		})
	</script>
</body>
```

组件开发，模拟计算器加减

```
<body>
	<div id="app">
	<!-- 组件实例对象 -->
		<cpn></cpn>
		<cpn></cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>当前计数：{{counter}}</h2>
			<button @click="increment"> + </button>
			<button @click="decrement"> - </button>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		//定义一个组件对象obj
		const obj = {
			counter:0
		}
		//1.注册组件
		Vue.component('cpn', {
			template:'#cpn',//组件ID
			data(){
				return{
					counter:0
				}
			 // return obj 引起连锁反应，都会改变。因为都指向一个对象。
			},
			methods:{
				increment(){
					this.counter++
				},
				decrement(){
					this.counter--
				}
			}
		})
		const app = new Vue({
			el:'#app',
			data:{}
		})
	</script>
</body>
```



#### 全局组件 vs 局部组件

> - 全局组件可以在任意一个Vue实例中使用，局部组件只能在该实例下使用。
> - 在开发中一个Vue页面也就使用一个Vue实例，不会使用多个。组件也使用局部组件居多。

```
<body>
	<div id="app">
		<cpn></cpn>
	</div>
	<div id="app2">
		<cpn></cpn>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		//创建组件构造器
		const cpnC = Vue.extend({
			template:`
				<div>
					<h2>我是标题</h2>
					<p>我是内筒，哈哈哈哈</p>
					<p>我是内筒，呵呵呵呵</p>
				</div>`
		})
		
		//注册组件（全局组件、意味着可以在多个vue的实例下面使用）
		// Vue.component('cpn',cpnC)
		
		//创建Vue实例1
		const app = new Vue({
			el:'#app',
			data:{},
			//组件使用，把组件挂载到该实例
			components:{
				//cpn就是组件的标签名，cpnC就是构造器
				cpn:cpnC
			}
		})
		//创建Vue实例2
		const app2 = new Vue({
			el:'#app2',
			data:{},
			components:{
				cpn:cpnC
			}
		})
	</script>
</body>
```

#### 父组件子组件

```
<body>
	<div id="app">
		<cpn2></cpn2>
	</div>
	<script src="../js/vue.js"></script>
	<script type="text/javascript">
		// 创建第一个组件构造器（子组件）
		const cpnC1 = Vue.extend({
			template:`
				<div>
					<h2>我是标题子组件1</h2>
					<p>我是内筒子组件1</p>
				</div>`
		})
		
		//创建第二个组件构造器（父组件）
		const cpnC2 = Vue.extend({
			template:`
				<div>
					<h2>我是标题父组件2</h2>
					<p>我是内筒父组件2</p>
					<cpn1></cpn1>
				</div>`,
				//注册子组件
				components:{
					cpn1:cpnC1
				}
		})
		
		//可以看成是root组件，根组件。
		const app = new Vue({
			el:'#app',
			data:{},
			//注册组件
			components:{
				cpn2:cpnC2
			}
		})
	</script>
</body>
```

#### 语法糖注册全局组件和局部组件

> - Vue为了简化这个过程，提供了注册语法糖。主要是省去了调用Vue.extend()的步骤，而是可以直接使用一个对象来代替。

代码示例：

```
<body>
	<div id="app">
		<cpn2></cpn2>
		<cpn3></cpn3>
	</div>
	<script src="../js/vue.js"></script>
	<script>
		//语法糖注册组件的方法（全局注册）
		Vue.component('cpn2',{
			template:`
				<div>
					<h2>我是标题2</h2>
					<p>我是内容2</p>
				</div>
			`
		})
		//局部注册组件
		const app = new Vue({
			el:'#app',
			data:{},
			components:{
				'cpn3':{
					template:`
					<div>
						<h2>我是标题3</h2>
						<p>我是内容3</p>
					</div>
					`
				}
			}
		})
	</script>
</body>
```

#### 模板分离写法

Vue来提供两种方法来定义HTML模板内容

> - <script > 标签

> - <template>标签

代码示例：

```
<body>
	<div id="app">
		<cpn1></cpn1>
	</div>
	<!-- 模板分离写法：script标签，注意：类型必须是text/x-template -->
	<script type="text/x-template" id="cpn1">
		<div>
			<h2>我是标题</h2>
			<p>我是内容</p>
		</div>
	</script>
	
	<!-- 模板分离写法：template -->
	<template id="cpn2">
		<div>
			<h2>我是标题</h2>
			<p>我是内容</p>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		Vue.component('cpn1', {
			template:'#cpn2'
		})
		const app = new Vue({
			el:'#app',
			data:{}
		})
	</script>
</body>
```

#### 组件可以访问Vue实例的数据吗？

1，组件是一个单独功能模块的封装：

> - 这个模块有属于自己的HTML模板，也应该有属于自己的数据data。
>
> - 组件中是不能解析Vue实例中的data数据的。组件另有存储数据的地方。

##### 组件的数据存放在哪里呢？

> - 组件对象也有一个data属性（也可以有methods等属性）
> - data必须是一个函数，而且这个函数返回一个对象，对象内部保存着数据。如果要不是一个函数，组件调用多次的时候就会起连锁反应。（看以下示例代码）

示例代码：

```
<body>
	<div id="app">
	<!-- 组件实例对象 -->
		<cpn></cpn>
		<cpn></cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>当前计数：{{counter}}</h2>
			<button @click="increment"> + </button>
			<button @click="decrement"> - </button>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		//定义一个组件对象obj
		const obj = {
			counter:0
		}
		//1.注册组件
		Vue.component('cpn', {
			template:'#cpn',//组件ID
			data(){
				return{
					counter:0
				}
			 // return obj 引起连锁反应，都会改变。因为都指向一个对象。
			},
			methods:{
				increment(){
					this.counter++
				},
				decrement(){
					this.counter--
				}
			}
		})
		const app = new Vue({
			el:'#app',
			data:{}
		})
	</script>
</body>
```

#### 父子组件的通信

> - 在开发过程中，往往一些数据确实需要从上层传递到下层。比如在一个页面中，我们从服务器请求到了很多的数据。其中一部分数据，并非是我们整个页面的大组件来展示的，而是需要下面的子组件来展示。
> - 这个时候并不会让子组件在发送一次网络请求，而是直接让大组件（父组件）将数据传递给小组件（子组件）

如何进行父子组件之间通信能？Vue官方提到

> - 通过props向子组件传递数据。
> - 通过事件（$event  Events）向父组件发送消息。

##### props数据验证

> - props选项不仅仅是一个数组，还可以是一个对象，数组不常用。当需要对props进行数据类型验证等验证时，就需要对象写法了。

props类型有哪些呢？

> - String、Number、Array、Boolean、Object、Date、Function、Symbol

代码示例如下：

```
<body>
	<div id="app">
		<cpn v-bind:cmovies="movies" :cmessage="message"></cpn>
		<!-- <cpn cmovies="movies" cmessage="message"></cpn> -->
	</div>
	<template id="cpn">
		<div>
			<h2>{{cmessage}}</h2>
			<ul>
				<li v-for="item in cmovies">{{item}}</li>
			</ul>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		//父传子：props
		const cpn = {
			template:'#cpn',
			// props:['cmessage','cmovies'],
			
			props:{
				//1.类型限制
				// cmessage:String,
				// cmovies:Array,
				
				//2.提供一些默认值，以及必传参数
				cmessage:{
					type:String,
					default:'默认值',
					required:true
				},
				//3.类型是对象或者数组时，默认值必须是一个函数
				cmovies:{
					type:Array,
					default(){
						return ['我是数组']
					}
				}
			},
			data(){
				return{}
			},
			methods:{
				
			},
		}
		const app = new Vue({
			el:'#app',
			data:{
				message:'你好呀',
				movies:['大话西游','我和我的家乡','星际穿越']
			},
			components:{
				cpn
			}
		})
	</script>
</body>
```

父传子驼峰式命名显示

> - props对象里面是cMessage，<cpn :c-message="message" :c-info="info"></cpn> 使用 “-” 来识别

示例代码如下：

```
<body>
	<div id="app">
		<cpn :c-message="message" :c-info="info"></cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>{{cMessage}}</h2>
			<p>{{cInfo}}</p>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		const cpn = {
			template:'#cpn',
			props:{
				cMessage:{
					type:String,
					default:'1212',
					request:true
				},
				cInfo:{
					type:Object,
					default(){
						return {}
					}
				}
			},
			data(){
				return {}
			},
			methods:{
				
			}
		}
		const app = new Vue({
			el:'#app',
			data:{
				message:'你好呀',
				info:{
					'age':23,
					'sex':'男',
					'name':'winner'
				}
			},
			components:{
				cpn
			}
		})
	</script>
</body>
```

#### 子级向父级传递参数

> - props用于父组件向子组件传递数据，还有一种比较常见的是子组件向父组件传递数据或事件到父组件中。
> - 我们需要使用自定义事件来完成。

什么时候需要自定义事件呢？

> - 当子组件需要向父组件传递数据的时，就用到自定义事件了。
> - 我们之前学习的v-on不仅仅可以用于监听DOM事件，也可以用于组件间的自定义事件。

自定义事件流程：

> - 在子组件中，通过$emit()来触发事件。
> - 在父组件中，通过v-on来监听子组件事件。

示例代码如下：

```
<body>
	<div id="app">
		<!-- <cpn @item-click="cpnClick"></cpn> -->
		<cpn v-on:item-click="cpnClick"></cpn>
	</div>
	<template id="cpn">
		<div>
			<button v-for="item in categories" @click="btnClick(item)">{{item.name}}</button>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		const cpn = {
			template:'#cpn',
			data(){
				return{
					categories:[
						{'id':'1', 'name':'热门推荐'},
						{'id':'2', 'name':'手机数码'},
						{'id':'3', 'name':'家用电器'},
						{'id':'4', 'name':'电脑办公'},
					]
				}
			},
			methods:{
				btnClick(item){
					//发射事件，自定义事件
					//注意不支持驼峰式命令 itemClick
					console.log('items我是子组件的内筒',item)
					// this.$emit('item-click',item.id)//单独传递ID
					this.$emit('item-click',item)//全部数据
				}
			}
		}
		const app = new Vue({
			el:'#app',
			data:{},
			methods:{
				cpnClick(item){
					console.log('我是子组件通过自定义事件传递的数据',item)
				}
			},
			components:{
				cpn
			}
		})
	</script>
</body>
```

#### 父子组件的访问方式：$children

1，有时候我们需要父组件直接访问组件，子组件直接访问父组件。或者是子组件访问根组件。

> - 父组件访问子组件：使用$children或$refs
> - 子组件访问父组件：使用$parent

this.$children是一个数组类型，它包含所有子组件对象。

> - 用的比较少，不灵活。直接拿到所有子组件的对象，只能通过数组指定一个子组件。

this.$refs对象类型 默认是一个空的对象

> - 必须在组件上面加一个属性 ref="aaa" aaa就是这个组件的对象，用的比较多。

代码示例图如下：

```
<body>
	<div id="app">
		<cpn></cpn>
		<cpn></cpn>
		<cpn ref="aaa"></cpn>
		<button @click="btnChick">按钮</button>
	</div>
	<template id="cpn">
		<div>
			<h5>我是子组件</h5>
			<h2>{{message}}</h2>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el:'#app',
			data:{},
			methods:{
				btnChick(){
					//1. $children在实际开发中用的比较少
					// console.log(this.$children)
					// console.log(this.$children[0].message)
					// this.$children[0].showMessage()
					/*
					for(let c of this.$children){
						console.log(c.message)
						c.showMessage()
					}
					*/
				 
				 //2. $refs =>对象类型 默认是一个空的对象，必须在组件上面加一个属性 ref="aaa" aaa就是这个组件的对象
				 console.log(this.$refs.aaa.message)
				}
			},
			components:{
				cpn:{
					template:'#cpn',
					data(){
						return{
							message:'我是子组件的你好呀'
						}
					},
					methods:{
						showMessage(){
							console.log('showMessage')
						}
					}
				}
			}
		})
	</script>
</body>
```

#### 组件插槽slot

slot翻译为插槽

> - 在生活中：比如电脑的USB插槽、USB插槽可以插入U盘、硬盘、手机、音响。

组件的插槽

> - 组件的插槽也是为了让我们封装的组件更加具有扩展性。
> - 让使用者可以决定组件内部的一些内筒到底展示什么。

栗子：移动网站中的导航栏

> - 移动开发中，几乎每个页面都有导航栏。
> - 导航栏我们必然会封装一个插槽，比如nav-bar组件。
> - 一旦有了这个组件，我们就可以多个页面复用了。

#### 如何封装这类组件呢？slot

他们有很多区别，但是也有很多共性。

> - 如果我们每一个功能模块单独去封装一个组件，显然不合适。比如每个页面都有返回，这部分内容我们就要重新去封装。但是，我们封装成一个，好像也不合理。有些左侧是菜单，有些是返回。有些中间是搜索，有些是文字，等等。

如何封装呢？抽取共性、保留不同。

> - 最好的封装方式就是将共性抽取到组件中，将不同暴露为插槽。
> - 一旦预留了插槽，就可以让使用者根据自己的需求，决定插槽中插入什么内容，是搜索框、还是文字、还是菜单由调用者自己决定。
> - 这就是为什么我们要学习组件中的插槽slot的原因。

插槽的使用：

```
<body>
	<!-- 
		1. 插槽的基本使用 <slot></slot>
		2. 插槽默认值
		3. 插槽的默认值，如果有多个值放入插槽，一起作为默认值的替换元素。
	 -->
	<div id="app">
		<cpn>
			<button>我是插槽的按钮</button>
		</cpn>
		<cpn></cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>我是组件</h2>
			<slot>
				<p>插槽的默认值</p>
			</slot>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script type="text/javascript">
		const app = new Vue({
			el:'#app',
			data:{},
			components:{
				cpn:{
					template:'#cpn'
				}
			}
		})
	</script>
</body>
```

#### 具名插槽

给插槽起个名字，具体示例代码如下

```
<body>
	<div id="app">
		<cpn>
			<span>替换默认插槽</span>
			<div slot="left">我是插槽</div>
		</cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>我是组件</h2>
			<slot name="left">左边</slot>
			<slot name="center">中间</slot>
			<slot name="right">右边</slot>
			<slot>默认插槽</slot>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script type="text/javascript">
		const app = new Vue({
			el:'#app',
			data:{},
			components:{
				cpn:{
					template:'#cpn'
				}
			}
		})
	</script>
</body>
```

#### 编译作用域

> - 组件模板跟vue实例模板的变量作用域。
> - 官方准则：父组件模板所有的东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。

```
<body>
	<div id="app">
		<cpn v-show="isShow"></cpn>
	</div>
	<template id="cpn">
		<div>
			<h2>我是组件</h2>
			<button v-show="isShow">按钮</button>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script type="text/javascript">
		const app = new Vue({
			el:'#app',
			data:{
				message:'你好呀',
				isShow: true
			},
			components:{
				cpn:{
					template:'#cpn',
					data(){
						return {
							isShow:false
						}
					}
				},
			}
		})
	</script>
</body>
```

#### 作用域插槽 ：准备

> 父组件替插槽的标签，但是内筒由子组件来提供。

##### 我们先提一个需求：

> - 子组件包含一组数据，比如：pLanguages:['JavaScript','c++','swift','Java','PHP']

需要在多个页面展示：

> - 某些界面是以水平方式展示的。
> - 某些界面是以列表形式展示的。
> - 某些界面直接展示一个数组。

内筒在子组件，希望父组件告诉我们如何展示，怎么办呢？

> - 利用slot作用域插槽就可以了。

在父组件使用我们的子组件时，从子组件中拿到数据：

> - 我们通过<tempalte slot-scope="slot">获得slot属性，在通过slot.data就可以获取到刚才在子组件定义的data了。

代码如下：子组件代码

```
<body>
	<div id="app">
		<cpn></cpn>
		<cpn>
			<!-- 目的是获取子组件的pLanguages -->
			<template slot-scope="slot">
				<div>
					<span v-for="item in slot.data">{{item}} - </span>
					<br>
					<span>{{slot.data.join(' - ')}}</span>
				</div>
			</template>
		</cpn>
		<cpn>
			<template slot-scope="slot1">
				<div>
					<br>
					<span>{{slot1.data.join(' * ')}}</span>
				</div>
			</template>
		</cpn>
	</div>
	<template id="cpn">
		<div>
			<slot :data="pLanguages">
				<ul>
					<li v-for="item in pLanguages">{{item}}</li>
				</ul>
			</slot>
		</div>
	</template>
	<script src="../js/vue.js"></script>
	<script>
		const app = new Vue({
			el:'#app',
			data:{},
			components:{
				cpn:{
					template:'#cpn',
					data(){
						return {
							pLanguages:['JavaScript','c++','swift','Java','PHP']
						}
					}
				}
			}
		})
	</script>
</body>
```

---

## 模块化开发

常见的模块化规范：

CommonJS、AMD、CMD、也有ES6的Modules

#### CommonJS（了解）

> - 模块化有两个核心：导出和导入

CommonJS的导出：

```
module.exports = {
	flag:true,
	test(a,b){
		return a + b;
	},
	demo(a,b){
		return a * b;
	}
}
```

CommonJS导入：

```
CommonJS模块：
let {flag, test, demo} = require('./aaa.js');

//等同于
let _MA = require('./aaa.js');
let test = _MA.test;
let demo = _MA.demo;
let flag = _MA.flag;

```

##### export基本使用

export指令用于导出变量，比如以下代码：

```
info.js
export var num1 = 1000;
export var height 1.88;
```

上面代码还有另一种写法：

```
let name = '小明'
let age = 18
let flag = true
export{
  name,age,flag
}

```

export还可以导出函数/类

```
//导出函数/类
export function mul(num1, num2){
	return num1 * num2;
}

export class Person{
	run(){
		console.log('在奔跑')
	}
}

第二种写法：
function mul(num1, num2){
	return num1 * num2;
}

class Person{
	run(){
		console.log('在奔跑')
	}
}
export{mul,Person}

使用导出的变量/函数
import {mul, Person} from './aaa.js';

console.log(mul(10*20));

const p = new Person;
p.run();
```

export default使用

> - 某些情况下，一个模块中包含某个功能，我们并不希望给这个功能命名，而且让导入者可以自己来命名。
> - export在同一个模块中不允许存在多个。

```
//函数是不需要起名字的。
export default function (){
	console.log('我是一个默认函数')
}

//导出变量
const address = '北京市';
export default address;

mmm.js中使用
import add from './aaa.js'
console.log(add)
```

#### import 导入

> - export指令是导出了模块中对外提供的接口，我们就可以通过import命令来加载对应的这个模块了

import用于导入模块中的内容

```
import {flag, num, height, Person} from './aaa.js';
console.log(flag);
```

import全部导模块中的内容

> - 通过 * 可以导入模块中所有的export变量，但是要给 * 起一个别名，方便后续使用

````
import * as info from './aaa.js';
console.log(info.flag)
````

---

## WebPack

##### 什么是webpack

> - 从本质上讲，webpack是一个现代JavaScript应用的静态“模块打包”工具。意思就是 模块 跟 打包

#### 前端模块化

> - 在es6之前，我们想要进行模块化开发，就必须借助于其他的工具，让我们可以进行模块化开发。
> - 而webpack其中一个核心就是可以让我们模块化开发，还能处理模块化之间的一些依赖关系，并且将其进行整合打包。打包完成后部署到服务器。
> - 而且不仅仅是JavaScript文件，我们的css、图片、json文件、等等在webpack中都可以被当做模块来使用，这就是webpack中模块化的概念。

#### 打包如何理解呢？

> - 理解了webpack可以帮助我们进行模块化，并且处理模块间的各种复杂关系后，打包的概念就非常好理解了。
> - 就是将webpack中各种资源模块进行打包合并成一个或者多个包（Bundle）。
> - 并且在打包过程中，还可以对资源进行处理。比如：压缩图片、将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作。

打包过程中跟grunt/gulp也可以帮助我们完成，他们有什么不同吗？

##### webpack和grunt/gulp的对比

1，grunt/gulp的核心是Task

> - 我们可以配置一系列的task（任务）并且定义task要处理的事务（例如：ES6转ES5，ts转化、图片压缩、scss转css）。
> - 之后让grunt/gulp来依次执行这些task，而且让整个流程自动化，所以grunt/gulp也被称之为前端自动化任务管理工具。

2，我们来看一个gulp的task

> - 下面的task就是将src下面的所有js文件转成ES5的语法，并且最终输出到dist文件夹中。

```
const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('js',()=> 
	gulp.src('src/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gukp.dest('dist'))
)
```

3，什么是grunt/gulp呢？

> - 如果你的工程木块以来非常简单，甚至是没有用到模块化的概念。只需要进行简单的合并、压缩、就是用grunt/gulp即可。
> - 但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了。

4，所以，grunt/gulp和webpack有什么不同呢？

> - grunt/gulp更加强调的是前端流程的自动化，模块化不是他的核心。
> - webpack更加强调模块化开发管理，而文件压缩、合并、预处理等功能，是他附带的功能。

#### webpack安装

> - webpack模块化打包，webpack为了可以正常运行，必须依赖node环境。node环境为了可以正常的执行很多代码，必须其中包含各种依赖的包。npm工具（node ，packages，manager）

1，安装webpack首先要安装node.js，node.js自带了软件包管理工具npm

> - 查看自己的node版本：node -v

2，全局安装webpack（这里我先指定版本号3.6.0，因为vue cli依赖该版本）

> - npm install webpack@3.6.0 -g

3，局部安装（后续才需要）

> - --save-dev`是开发时的依赖，项目打包后不需要继续使用的。

```
cd 对应目录
npm install webpack@3.6.0 --dev
```

4，为什么全局安装后，还需要局部安装呢？

> - 在终端直接执行webpack命令，使用全局的安装的webpack。
> - 当在package.json中定义了scripts时，其中包含webpack命令，那么使用的是局部webpack。

##### webpack使用

我们创建如下文件夹：文件夹和文件解析

> - dist文件夹：用于存放之后打包的文件。
> - src文件夹：用于存放我们写的源文件（逻辑代码）
>   - main.js：项目的入口文件，具体内筒查看下面详情。
>   - mathUtils.js：定义了一些数学工具函数，可以在其他地方引用，并且使用。具体内容查看下面详情

> - index.html：浏览器打开展示的首页html
> - package.json：通过npm init 生成的，npm包管理的文件（暂时没有用上，后面才会用）

main.js中的代码：

```\
//1. 使用commonJs的模块化规范
const {add, mul} = require('./mathUtils.js')

console.log(add(10,20));
console.log(mul(10,30));

//2. 使用ES6的模块化规范
import {name, age, height} from './dist/info.js';

console.log(name);
console.log(age);
console.log(height);
```

mathUtils中的代码：

```
function add(num1, num2){
	return num1 + num2
}

function mul(num1, num2){
	return num1 * num2
}

module.exports = {
	add,
	mul
}
```

##### js文件打包：

现在的js文件中使用了模块化的方式进行开发，他们可以直接引用使用吗？不可以。

> - 因为直接在index.html中引入这两个js文件，浏览器并不识别其中的模块化的代码。
> - 另外，在真实项目中当有许多这样的js文件时，我们一个个引用非常麻烦，并且后期非常不方便对他们进行管理。

我们应该怎么做呢？使用webpack工具，对多个配置文件进行打包。

> - 我们知道 webpack就是一个模块化的打包工具，所以它支持代码中写模块化，可以对模块化的代码进行处理。
> - 使用webpack处理完所有模块之间的关系后，将多个js打包到一个js文件中，引用时就变得非常方便了。

如何使用webpack指令进行打包：

> - webpack ./src/main.js  ./dist/bundle.js

```
G:\vue\代码\vue\webpack的使用\01-webpack的起步>webpack ./src/main.js  ./dist/bundle.js
Hash: 1f921e65937b1d3e1955
Version: webpack 3.6.0
Time: 69ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.71 kB       0  [emitted]  main
   [0] ./src/main.js 214 bytes {0} [built]
   [1] ./src/mathUtils.js 140 bytes {0} [built]
   [2] ./src/dist/info.js 95 bytes {0} [built]

```

使用打包后的文件：

> - 打包后会在dist文件中生成一个bundle.js文件
> - bundle.js文件，是webpack处理了项目文件依赖后生成的一个js文件，我们只需要将这个js文件在index.html中引入即可。

```
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script src="dist/bundle.js"></script>
	</body>
</html>
```

#### 入口和出口

1，我们考虑一下，如果每次使用webpack的命令都需要写上入口和出口作为参数，就非常麻烦。有没有一种方法可以将这两个参数写到配置中，在运行时直接读取呢？

> - 当然可以，就是在项目根目录创建一个webpack.config.js，注意名字是固定的。

2，webpack.config.js配置文件如下：

```
const path = require('path') 

module.exports = {
	//入口，可以是字符串/数组/对象，这里我们入口只有一个，所以写一个字符串即可
	entry: './src/main.js',
	//出口，通常是一个对象，里面至少包含两个重要属性，path 和 filename
	output: {
		path: path.resolve(__dirname, 'dist'), //注意：path通常是一个绝对路径
		filename: 'bundle.js'
	},
}
```

#### 局部安装webpack

目前，我们使用的webpack是全局安装的webpack，如果我们想使用局部的（项目中）来打包呢？

> - 因为一个项目往往依赖特定的webpack版本，全局的版本可能跟这个项目的webpack版本不一致，导致打包出现问题。
> - 所以通常一个项目，都有自己局部的webpack。

第一步，项目中需要安装自己局部的webpack。

> - 这里我们局部安装webpack3.6.0
> - Vue CLI3中已经升级到webpack4，但是他将配置文件隐藏起来了，所以查看起来不是很方便。

```
npm install webpack@3.6.0 --save--dev
```

第二步，通过node_modules/.bin/webpack启动webpack打包。这样命令很长不方便使用？我们可以在package.json中定义。见下面

#### package.json中定义启动

我们可以在package.json中的scripts中定义自己的执行脚本

> - package.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置。
> - 首先会寻找本地的node_modules/.bin路径中对应的命令，如果没有找到，就回去全局的环境变量寻找。

package.json配置代码如下:

```
{
  "name": "webpackconfig",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.6.0"
  }
}
```

如何执行我们的build命令呢？

> - npm run build

#### 什么是loader？

> - loader是webpack中一个非常核心的概念。

webpack用来做什么呢？

> - 在我们之前实例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关的依赖。
> - 但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片、也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将scss，less，转成css，将.jsx、.vue文件转换成js文件等等。
> - 对于webpack本身来能力来说，对于这些转换时不支持的。
> - 那怎么办呢？给webpack扩展对应的loader就可以啦。

loader使用过程：

> - 中文官网：https://www.webpackjs.com/

> 1. 通过npm安装需要使用的loader
> 2. 在webpack.config.js中的module对象关键词下面进行配置。

> PS：大部分loader我们都可以在webpack的官网中找到，并且学习对应的用法。

##### css文件处理 - 准备工作

项目开发中，我们必然添加很多样式，而样式我们往往会写到一个单独的文件中。

> - 在src目录中，创建一个css文件夹，创建一个normal.css文件。这个css文件就是一些简单的样式。
> - 我们重新组织一下文件的目录结构，将js、css都放在固定的文件夹里面。

但是这个时候normal会生效吗？

> - 当然不会，因为我们压根就没有引用它。
> - webpack也不可能找到它，因为我们只有一个入口，webpack 会从入口开始查找其他依赖的文件。

在main.js入口中引用css

```
//1. 使用commonJs的模块化规范
const {add, mul} = require('./js/mathUtils.js')

console.log(add(10,20));
console.log(mul(10,30));

//2. 使用ES6的模块化规范
import {name, age, height} from './js/info.js';

console.log(name);
console.log(age);
console.log(height);

//依赖css文件
require('./css/normal.css')
```

依赖完成css样式文件进行打包：npm run build，会发现报以下错误

```
ERROR in ./src/css/normal.css
Module parse failed: G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\src\css\normal.css Unexpected token (1:4)
You may need an appropriate loader to handle this file type.
| body{
|       background-color: #FF0000;
| }
 @ ./src/main.js 15:0-27
```

> - 这个错误告诉我们，要想成功加载normal.css文件，必须有对应的loader。

##### 1，css文件处理 - css-loader

1.1 安装css-loader

```
npm install --save-dev css-loader
```

> - 安装完成以后，重新打包项目，但是还是不能加载样式，此时我们需要操作安装第 2步，style-loader

##### 2，css文件处理 - style-loader

2.1 我们安装style-loader

```
npm install --save-dev style-loader
```

2.2 webpack.config.js配置如下：

```
const path = require('path')

module.exports = {
	//入口，可以是字符串/数组/对象，这里我们入口只有一个，所以写一个字符串即可
	entry: './src/main.js',
	//出口，通常是一个对象，里面至少包含两个重要属性，path 和 filename
	output: {
		path: path.resolve(__dirname, 'dist'), //注意：path通常是一个绝对路径
		filename: 'bundle.js'
	},
	module:{
		rules: [
			{
				test: /\.css$/,
				//css-loader只负责将css文件进行加载
				//style-loader 负责将样式添加到DOM中
				//使用多个loader时，是从右向左读取的。先加载css-loader，在加载style-loader，顺序不能乱。 
				use: [ 'style-loader', 'css-loader' ]
			
		]
	}
}
```

##### 3,在执行打包的时候会发现，打包失败。

> - 在安装webpack指定完版本后，使用loader的时候有些loader版本过高，而且在安装loader命令的时候还不能指定版本。那么就会导致webpack跟loader不兼容。错误信息如下。
> - 需要修改 css-loader 跟 style-loader版本即可。

```
G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试>npm run build

> webpackconfig@1.0.0 build G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试
> webpack

(node:20920) UnhandledPromiseRejectionWarning: TypeError: this.getResolve is not a function
    at Object.loader (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\css-loader\dist\index.js:62:27)
    at LOADER_EXECUTION (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\loader-runner\lib\LoaderRunner.js:119:14)
    at runSyncOrAsync (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\loader-runner\lib\LoaderRunner.js:120:4)
    at iterateNormalLoaders (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\loader-runner\lib\LoaderRunner.js:232:2)
    at Array.<anonymous> (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:40:15)
    at G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:77:9
    at G:\vue\代码\vue\webpack的使用\02-webpack的配置 - 测试\node_modules\graceful-fs\graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3)
(node:20920) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:20920) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

#### 4，style-loader & css-loader 的版本修改

> - 在安装webpack指定完版本后，使用loader的时候有些loader版本过高，而且在安装loader命令的时候还不能指定版本。那么就会导致webpack跟loader不兼容。会报错

安装完成后package.json文件如下：

```
"devDependencies": {
	"css-loader": "^5.0.0",
	"style-loader": "^2.0.0",
	"webpack": "^3.6.0"
}
```

> - 以上代码显示：css-loader 跟 style-loader都是很高的版本，webpack的版本是3.6.0的版本。所以我们要修改一下版本。

手动修改css-loader & style-loader版本

> - 修改的版本在教学中看的，具体css-loader跟webpack的版本多少兼容也不是很清楚，后期不会手动修改。

```
"devDependencies": {
	"css-loader": "^2.0.0",
	"style-loader": "^2.0.0",
	"webpack": "^0.23.1"
}
```

修改完成后，需要重新安装一下node

> - 执行命令：npm install

#### less文件处理 - 准备工作

如果我们希望在项目中使用less，scss，stylus来写样式，webpack是否可以帮我们处理呢？

> - 我们以less为例，其他的也是一样的。

1，创建一个less文件放在css文件夹中：

```
@fontSize:50px;
@fontColor:orange;

body{
	font-size: @fontSize;
	color: @fontColor;
}
```

2，安装less的loader

> - npm install --save-dev less-loader less

3，在webpack.config.js中配置less

```
module:{
	rules: [
		{
			test: /\.css$/,
			//css-loader只负责将css文件进行加载
			//style-loader 负责将样式添加到DOM中
			//使用多个loader时，是从右向左读取的。先加载css-loader，在加载style-loader，顺序不能乱。 
			use: ['style-loader', 'css-loader']
		},
		//固定写法，上面的style-loader只管加载.css文件，因为less最后也要转换成.css文件，所以也要重新配置style-loader
		{
			test: /\.less$/,
			use: [{
					loader: "style-loader" // creates style nodes from JS strings
			}, {
					loader: "css-loader" // translates CSS into CommonJS
			}, {
					loader: "less-loader" // compiles Less to CSS
			}]
		}
	]
}
```

#### 图片文件处理 - 资源准备阶段

1，首先在项目中加入两张图片：

> - 一张比较小的图片1.png(小于8kb)，一张比较大的图片2.png(大于8kb)

2，在css中引用其中一张图片

```
body{
	/* background-color: #FF0000; */
	background:url('../img/2.png')
}
```

3，如果直接打包，会出现以下问题：

> - 提示缺少对应的 url-loader

```
G:\vue\代码\vue\webpack的使用\03-webpack的loader>npm run build

> webpackconfig@1.0.0 build G:\vue\代码\vue\webpack的使用\03-webpack的loader
> webpack

Hash: c6c5c7761223260d846d
Version: webpack 3.6.0
Time: 550ms
    Asset     Size  Chunks             Chunk Names
bundle.js  23.5 kB       0  [emitted]  main
   [2] ./src/main.js 451 bytes {0} [built]
   [3] ./src/js/mathUtils.js 140 bytes {0} [built]
   [4] ./src/js/info.js 95 bytes {0} [built]
   [5] ./src/css/normal.css 1.1 kB {0} [built]
   [6] ./node_modules/css-loader/dist/cjs.js!./src/css/normal.css 407 bytes {0} [built]
   [9] ./src/css/special.less 1.23 kB {0} [built]
  [10] ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/css/special.less 191 bytes {0} [built]
    + 4 hidden modules

ERROR in ./node_modules/css-loader/dist/cjs.js!./src/css/normal.css
Module not found: Error: Can't resolve './img/1.png' in 'G:\vue\代码\vue\webpack的使用\03-webpack的loader\src\css'
 @ ./node_modules/css-loader/dist/cjs.js!./src/css/normal.css 4:41-63
 @ ./src/css/normal.css
 @ ./src/main.js
```

##### 图片文件处理 - url-loader

图片处理，我们是用url-loader处理，先安装url-loader

> - npm install --save-dev url-loader

修改webpack.config.js配置文件：

```
{
	test: /\.(png|jpg|gif|jpeg)$/,
	use: [
		{ 
			loader: 'url-loader',
			options: {
				// 当加载的图片，小于limit时，会将图片编译成base64字符串形式。
				// 当加载的图片，大于limit时，需要使用file-loader模块进行加载。
				limit: 8192
			}
		}
	]
}
```

再次打包，运行index.html，就会发现我们的背景图片出来了

> - 你会发现，background的路径是base64显示出来的，这也是limit属性的作用，当图片小于8kb时，对图片进行base64编码。

##### 图片文件处理 file-loader

错误信息如下：

```
ERROR in ./src/img/2.png
Module build failed: Error: Cannot find module 'file-loader'
Require stack:
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\url-loader\dist\index.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\url-loader\dist\cjs.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\loader-runner\lib\loadLoader.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\loader-runner\lib\LoaderRunner.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\webpack\lib\NormalModule.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\webpack\lib\NormalModuleFactory.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\webpack\lib\Compiler.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\webpack\lib\webpack.js
- G:\vue\代码\vue\webpack的使用\03-webpack的loader\node_modules\webpack\bin\webpack.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:831:15)
```

当图片大于8kb的时候，会使用file-loader来进行处理图片。安装file-loader

> - npm install --save-dev file-loader

再次打包，就会发现dist文件夹下面多了一张图片

> - 图片名称是经过hash加密的，防止名称图片重复。

##### 图片文件处理 - 修改文件夹名称

1，我们发现webpack自动帮助我们生成一个非常长的名字

> - 这是一个32位hash值，目的是防止名字重复。
> - 但是，真实开发中，我们可能对打包的图片名字有一定的要求。
> - 比如：将所有图片放在一个文件夹中，跟上图片原来的名字，同时也要防止重复img/name

2，所以，我们可以在options中添加如下选项：

> - img：文件要打包到文件夹。
> - name：获取图片原来的名字，放在该位置。
> - hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位。
> - ext：使用图片原来的扩展名

webpack.config.js配置文件：

```
{
	test: /\.(png|jpg|gif|jpeg)$/,
	use: [
		{ 
			loader: 'url-loader',
			options: {
				// 当加载的图片，小于limit时，会将图片编译成base64字符串形式。
				// 当加载的图片，大于limit时，需要使用file-loader模块进行加载。
				limit: 13000,
				name:'img/[name].[hash:8].[ext]'
			}
		}
	]
}
```

3，图片并没有显示出来，这是因为使用的图片路径不正确

> - 默认情况下，webpack会将生成的路径直接返回给使用者。
> - 但是我们整个程序是打包在dist文件夹下面的，所以我们需要在webpack.config.js下面配置下dist

webpack.config.js配置文件：

```
output: {
	path: path.resolve(__dirname, 'dist'), //注意：path通常是一个绝对路径
	filename: 'bundle.js',
	publicPath: 'dist/'
},
```

#### ES6语法处理

> - 如果仔细阅读webpack打包的js文件，发现写的es6语法并没有转成ES5语法，那么久意味着可能一些对ES6不支持的浏览器没有办法很好的运行我们的代码

在webpack中使用直接使用babel对应的loader就可以了。

> - npm install --save-dev babel-loader@7 babel-core babel-preset-es2015

配置webpack.config.js

```
{
	test:/\.js$/,
	exclude:/(node_modules|bower_components)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['es2015']
		}
	}
}
```

### 引入vue.js

webpack环境中集成vue，安装vuejs。

> - 注意：因为在实际项目跑起来中，也会使用vue，所以安装的时候并不是开发时依赖

```
npm install vue --save
```

在main.js中使用vue

```
const app = new Vue({
	el:'#app',
	data:{
		message:'hello Vue'
	}
})
```

index.html代码

````
<body>
	<div id="app">
		<h2>{{message}}</h2>
	</div>
	<script src="dist/bundle.js"></script>
</body>
````

##### 打包项目 - 错误信息

修改完成后，重新打包，运行程序：

> - 打包过程中一切顺利，没有错误。因为只是多打包了一个vue的js文件而已。
> - 但是运行程序时，没有出现想要的结果，而是浏览器报错了

错误信息如下：

```
bundle.js:1470 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

> - 这个错误说的是我们使用是runtime-only版本的Vue，什么意思呢？
> - 这里只说解决方案，后续具体讲解runtime-only  跟  runtime-compiler。

只需要修改webpack.config.js文件即可

> - module.exports在这个下面添加以下代码，再次重新打包即可。

```
resolve:{
	//alias：别名
	alias:{
		'vue$': 'vue/dist/vue.esm.js'
	}
}
```

### el和template区别（一）

1，正常运行之后，我们来考虑另外一个问题：

> - 如果我们希望将data中的数据显示在界面中，就必须修改index.html。
> - 如果我们后面自定义了组件，也必须修改index.html来使用组件。
> - 但是html模板在之后的开发中，我并不希望手动的来频繁修改，是否可以做到呢？

2，定义template属性：

> - 在前面的Vue实例中，我们定义了el属性，用于和index.html中的#app进行绑定。让Vue实例之后可以管理它其中的内容。
> - 这里，我们可以将div元素中的{{message}}内容删掉，只保留一个基本的id为div的元素。

3，我们依然希望在其中显示{{message}}的内容，应该怎么处理呢？

> - 可以定义一个template属性，代码如下

```
new Vue({
	el:'#app',
	template:'<App/>',
	template:`
		<div>
			<h2>{{message}}</h2>
			<button @click="btnClick">按钮</button>
			<h3>{{name}}</h3>
		</div>
	`,
	data:{
		message:'Hello word'
	}
})
```

4，重新打包，运行程序，显示一样的结果和html代码结构。

> - npm run build

5，那么，el和template模板的关系是什么呢？

> - 在之前学习中，我们知道el用于指定Vue要管理的DOM，可以帮助我们解析其中的指令，事件监听等等。
> - 而Vue实例中指定了template，那么template模板的内容会替换掉挂载的对应el的模板。

6，这样做有什么好处呢？

> - 这样做之后我们就不需要在以后的开发中在次操作index.html，只需要在template中写入对应的标签即可。但是写template模块非常麻烦，js文件非常繁琐。

7，创建.vue文件，会分成3个部分。template、script、style。这样就非常清晰了

```
<template>
	<div>
		<h2 class="title">{{message}}</h2>
		<button @click="btnClick">按钮</button>
		<h3>{{name}}</h3>
	</div>
</template>
<script>
	export default {
		name:'App',
		data(){
			return{
				message:'hello Vue',
				name:'winner'
			}
		},
		methods:{
			btnClick(){
				
			}
		}
	}
</script>

<style scoped>
	.title{
		color: #0000FF;
	}
</style>
```



#### .vue文件封装处理

> - 默认情况下，webpack打包的时候是不认识.vue文件的，相当于不认识css，less一样，需要安装vue-loader以及vue-template-compiler

1，安装vue-loader以及vue-template-compiler

> - npm install vue-loader vue-template-compiler --save-dev

2，修改webpack.config.js文件

```js
module:{
rules: [
    {
        test:/\.vue$/,
        use:['vue-loader']
    }
  ]
}
```

### 认识plugin

plugin是什么？

> - plugin是插件的意思，通常是用于对某个现有的架构进行扩展；
> - webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。

loader和plugin区别：

> - loader主要用于转换某些类型的模块，他是一个转换器。
> - plugin是插件，他是对webpack本身的扩展，是一个扩展器。

plugin的使用过程：

> - 通过npm安装需要使用的plugins（某些webpack已经内置的插件不需要安装）
> - 在webpack.config.js中的plugins中配置插件。

#### 添加版权的plugin

1，我们先使用一个最简单的插件，为打包文件添加版权声明

> - 该插件的名字叫BannerPlugin，属于webpack自带的插件。

2，在webpack.config.js中配置plugin插件：

```
module.exports = {
	plugins: [
		new webpack.BannerPlugin('最终版权归winner所有')
	]
}
```

3，重新打包程序，查看dist/bundle.js文件头部，看到如下信息：

```
/*! 最终版权归winner所有 */
/******/ (function(modules) { /........
```

### 打包html的plugin

1，目前，我们的index.html文件是存放在项目的根目录下面的。

> - 我们知道，在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等文件也就没有意义了。
> - 所以我们需要将index.html文件打包到dist文件夹中，这个时候就可以使用HtmlWabpackPlugin插件。

2，HtmlWabpackPlugin插件可以为我们做的事情。

> - 自动生成一个index.html文件（可以指定模板来生成）。
> - 将打包的js文件，自动通过script标签插入到body中。

3，安装HtmlWabpackPlugin插件

> - npm install html-webpack-plugin --save-dev

4，使用插件，修改webpack.config.js文件中plugins部分的内容如下：

> - template表示根据什么模板来生成index.html。
> - 另外需要删除之前在output中添加的publicPath属性，否则插入的script标签中的src可能会有问题。

webpack.config.js代码如下：

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
	new webpack.BannerPlugin('最终版权归winner所有'),
	new HtmlWebpackPlugin({
		template: 'index.html'
	})	
]
```

#### js压缩的Plugin

1，在项目发布之前，我们必然需要对js等文件进行压缩处理

> - 使用一个第三方插件uglifyjs-webpack-plugin，并且版本号指定1.1.1，和CLI2保持一致。

2，安装uglifyjs-webpack-plugin

> - npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

3，修改webpack.config.js文件，使用插件。

```
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
plugins: [
	new webpack.BannerPlugin('最终版权归winner所有'),
	new HtmlWebpackPlugin({
		template: 'index.html'
	}),
	new UglifyjsPlugin()
]
```

4，此时查看dist下面的bundle.js就是一整行，进行丑化过的代码。

---

### 搭建本地服务器

> - webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。

1，单独的模块，在webpack中使用之前需要安装它

> - npm install --save-dev webpack-dev-server@2.9.1

2，devserver也是作为webpack中的一个选项，选项本身可以设置如下：

> - contentBase：为哪一个文件夹提供服务，默认是跟文件夹。我们这里要填写./dist
> - port：端口号
> - inline：页面实时刷新
> - historyApiFallback，在SPA页面中，依赖HTML的history模式。

3，webpack.config.js文件配置修改如下：

> - --open 参数表示直接打开浏览器。

````
npm install webpack-merge
````























