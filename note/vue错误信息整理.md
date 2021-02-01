#### 缺少逗号的错误信息

错误信息如下：原因是程序中缺少了一个逗号

```
Uncaught SyntaxError: Unexpected identifier
```

##### 子组件传父组件自定义事件驼峰式命名问题

```
vue.js:640 [Vue tip]: Event "num1change" is emitted in component <Cpn> but the handler is registered for "num1Change". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "num1-change" instead of "num1Change".
```

代码示例如下：

```
this.$emit('num1-change',this.dnumber1) 正确
this.$emit('num1Change',this.dnumber1) 错误
```

##### 子组件不能直接修改父组件的值

> - 详细代码请见示例代码：组件化开发》组件之间通信案例

```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "cnumber1"
```

##### 在定义template的时候必须添加一个div

```
[Vue warn]: Error compiling template:

Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.

1  |  
2  |  		<h5>{{message}}</h5>
3  |  		<button @click="btnClick">按钮</button>
   |    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4  |  		<h3>{{names}}</h3>
   |  ^^^^^^^^^^^^^^^^^^^^
5  |  	
   |  ^
```

错误代码如下：

> - 在定义template的时候缺少一个跟，也就是缺少div

```
new Vue({
	el:'#app',
	template:`
		<h2>{{message}}</h2>
		<button @click="btnClick">按钮</button>
		<h3>{{name}}</h3>
	`,
	data:{
		message:'hello Vue',
		name:'winner'
	},
	methods:{
		btnClick(){
			
		}
	}
})
```

正确代码如下：

```
new Vue({
	el:'#app',
	template:`
	<div>
		<h2>{{message}}</h2>
		<button @click="btnClick">按钮</button>
		<h3>{{name}}</h3>
	</div>
	`,
	data:{
		message:'hello Vue',
		name:'winner'
	},
	methods:{
		btnClick(){
			
		}
	}
})
```

##### 安装的webpack插件与webpack版本不兼容的错误问题

> - 遇到以下错误就是安装webpack的插件版本有问题，在package.json中修改版本重新npm install即可。

```
TypeError: Cannot read property 'make' of undefined
    at PersistentChildCompilerSingletonPlugin.apply (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\html-webpack-plugin\lib\cached-child-compiler.js:182:20)
    at new CachedChildCompilation (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\html-webpack-plugin\lib\cached-child-compiler.js:68:44)
    at HtmlWebpackPlugin.apply (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\html-webpack-plugin\index.js:95:33)
    at Compiler.apply (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\tapable\lib\Tapable.js:375:16)
    at webpack (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\webpack\lib\webpack.js:33:19)
    at processOptions (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\webpack\bin\webpack.js:329:15)
    at G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\webpack\bin\webpack.js:387:2
    at Object.Yargs.self.parse (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\yargs\yargs.js:533:18)
    at Object.<anonymous> (G:\vue\代码\vue\webpack的使用\05-webpack配置vue\node_modules\webpack\bin\webpack.js:152:7)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! webpackconfig@1.0.0 build: `webpack`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the webpackconfig@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2020-11-03T12_58_33_578Z-debug.log
```

##### 安装完npm install webpack-merge，在进行合并打包的报错信息如下：

> - 看到at Object.<anonymous>基本就是安装的插件版本与webpack版本不符，修改安装完后的插件版本。重新在执行npm install。先排查插件版本问题，在去验证代码错误。

```
TypeError: webpackMerge is not a function
    at Object.<anonymous> (G:\vue\代码\vue\webpack的使用\06-webpack配置文件抽离\build\dev.config.js:3:18)
    at Module._compile (internal/modules/cjs/loader.js:1015:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1035:10)
    at Module.load (internal/modules/cjs/loader.js:879:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! webpackconfig@1.0.0 dev: `webpack-dev-server --open --config ./build/dev.config.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the webpackconfig@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2020-10-28T14_20_25_567Z-debug.log
```

