##	Node.js 


1. __filename 表示正在执行的脚本文件名 输出文件所在位置的绝对路径
2. __dirname 表示当前执行脚本所在的路径
3. setTimeout(cb, ms), clearTimeout(), setInterval()


### Node中的三个脚本全局对象 exports, require and module
2
- exports 表示模块公开的接口, 是当前模块的导出对象，用于导出模块公有方法和属性 -- 公有方法和属性都是要接this 类似于构造函数
- require 用于从外部取一个模块的接口，即传入一个模块名，返回一个模块导出对象
- moudle  通过module对象可以访问到当前模块的一些信息，最多的用途是替换当前模块的导出对象
		
		module.exports = function() {
			console.log('Hello world');
		};    // 可以把模块导出对象默认的一个对象，改成一个函数

- 相对模块 / 绝对模块 
> 相对模块是nodejs中加载相对文件， 一般通过`var config = require(./config);`  
> 绝对模块是通过npm下载 或者 安装在 node_modules里面的文件模块

### nodeJs中的事件触发与监听

> events模块 主要包括addListener, removeListener, removeAllListener, on, once, emit事件

	// node.js 内置事件模块， events模块来处理事件的绑定与监听
	var events = require('events');

	// 创建eventEmitter对象
	var eventEmitter = new events.EventEmitter();

	// 监听data-received事件，如果事件发生了，就去回调on里面的回调函数
	eventEmitter.emit('data-received');      // 触发该事件
	eventEmitter.on('data-received', callback);

### npm 脚本操作

- npm -h 查看npm的命令行帮助文档
- npm init 初始化安装 package.json(配置模块的常用信息如作者，版本，说明， 依赖)
- npm install/uninstall 
		
>  安装模块包 一般使用三个参数(-global, -save, -save-dev)
>  >-global 全局安装  -save 的作用是在package.json的 dependencies字段增加或者修改一个安装包和版本号名值对,  -save-dev则是修改devDependencies， 就可以不用安装了某个包之后手动修改Package.json

> **生产模式用dependencies , 开发模式用devDependencies**


- npm publish 我们可以自己发布的包， 只需要写npm login进行登录就可以了  npm包的版本号一般都是x.y.z的形式. 其中x表示主要版本号(重大改变或者达到里程碑时才改变), y表示次要版本，在保证主体功能基本不变的情况下，如果适当增加了新功能; z表示尾版本号，一些小范围的修修补补就可以跟新补丁号
- npm dedupe 可以重新计算依赖关系，删除重复的模块 

[npm基本认识](http://www.alloyteam.com/2016/03/master-npm/ "npm基本认识")



###　Express 文件夹结构

- 快速安装一个Express应用， `express myapp`  
- 然后下载json里面依赖的模块 `npm install`

1. app.js中定义并导出了整个应用；
2. /bin/www导入并执行了app.js中定义的应用，它是一个入口；
3. node_modules则是我们npm install安装的依赖所在目录；
4. package.json定义了我们的应用，应用也是一个npm包，有着一系列的依赖；
5. public下存放的是静态文件，这些文件一旦客户端请求，我们会原样地返回（例如客户端javascript、css）；
6. routes则是项目最核心的部分，路由文件，它拿到HTTP请求并返回HTTP响应。它最终被app.js引入；
7. views则是视图模板，就是HTML的模板，用来产生动态页面。至于什么是模板，现在可以不去管它。


-------
### Router是一个express中的一个特殊对象。

> 你可以将一个Router当做一个简单的应用，这个简单的应用只承担中间件和路由的的功能。每一个Express应用其实都有一个内置的Router，我们之前使用的app.get()其实就是向内置的Router注册一个路由。


- app.get() 根据请求路径来处理客户端发出的请求
- app.all()  接收匹配所有http请求
- app.use([path], function(req, res, next))  调用中间件

> 中间件(middleware)就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录、分析数据、以及其他在需要最终将数据发送给用户之前完成的任务。 它最大的特点就是，一个中间件处理完，可以把相应数据再传递给下一个中间件。如果next(); 则表示调用下一个正常的回调函数， 如果next(参数); 调用错误处理函数 


### app.use()

- 使用中间件
	`app.use(express.static(path.join(__dirname, '/');`

- 连续调用两个中间件

		var express = require('express');
		var app = express();
		
		app.use(function(req, res, next) {
			console.log('method' + req.method + '===' + 'url: ' + req.url);
			next();
		});

		app.use(function(req, res) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.end('调用结束.');
		});

		app.listen(80);

> 如果连续调用两个use()方法， 第一个函数中next()会将请求数据传递到下一个中间件
但是第二个中间件没有调用next()方法， 就不会去传递

- 可以根据不同url，返回不同的网页内容

		app.use(function(req, res, next) {
			if(req.url == '/') {
				res.send('welcome to the homepage.');
			} else {
				next();
			}
		});
	
		app.use(function(req, res, next) {
			if(req.url == '/about') {
				res.send('welcome to about page.');
			} else {
				next();
			}
		});
		app.use('/about', function(req, res, next) {});
		app.listen();

### send()方法用法
> res.send(body);

1. 当参数是一个Sting， Content-Type默认为'text/html'

		res.send('hi, hello');			// hi, hello
2. 当参数为Array或Object时， Express返回一个JSON

		res.send(user: 'hello');		// {"user": "hello"}
		res.send([1, 2, 3]);			// [1, 2, 3]
3. 当参数为一个Number时，而且只包含数字时， Express会帮你设置一个响应

		res.send(200);			// OK 
		res.send(404);			// Not Found

-------


- app.use() 来加载express.static中间件来实现静态文件托管

		// 设置静态文本路径
		app.use(express.static(path.join(__dirname + 'public');

		// 也可以设置一个虚拟的文件目录(不存在的目录) 来指定一个挂载路径
		app.use('/static', express.static('public');


- app.get() 里面可以接受一个正则表达式的参数和一个回调函数
		
		// 可以匹配/abbcd , /abcd的请求
		app.get('/ab+cd', function(req, res) {
			// do something
			});

### 响应对象的方法
- res.download()   提示下载文件
- res.end()			终结响应处理流程
- res.json()		发送一个json格式的响应
- res.jsonp()		发送一个JSONP的json格式的响应
- res.redirect()	重定向请求
- res.render()		渲染视图模板
- res.send()		发送各种类型的响应
- res.sendFile		以八位字节流的形式发送文件
- res.sendStatus	设置响应状态代码

### Express 中间件  


- 应用级中间件

		var express = require('express');  
		var app = express();


- 路由级中间件

		 var express = require('express');  
		 var router = express.Router();

- 错误处理中间件
> 错误处理中间件必须有4个参数， 即使不使用next对象，也是需要添加参数上去的,否则会识别为普通中间件，不会去处理错误

		app.use(function(err, req, res, next) {  
			console.log(err.stack);
			res.status(500).send('something broke!');
		});

- 内置中间件

		app.use(express.static('public'));
	

- 第三方中间件

		var express = require('express');
		var app = express();
		var cookieParser = requier('cookie-parser');
		app.use(cookieParser());


### app.listen()

		app.listen(port, [hostname], [backlog], [callback]);
		eg:  app.listen(8080, 127.0.0.1);

### app.path() 返回当前路径




-   req.cookies.name  可以换取到cookie里面的属性
> req.cookies是一个cookies的对象  但是需要加载`cookie-parser`中间件


-  req.hostname   获取主机的主机名
-  req.ip  			ip名



### mongoose模块使用方法

	// mongod --dbpath D:\Mongodb\data  启动mongod数据库
	// 首先引入 mongoose 这个模块
	var mongoose = require('mongoose');
	// 然后连接对应的数据库：mongodb://localhost/test
	// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址
	// 端口号省略则默认连接 27017；test 是数据库的名称
	// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
	mongoose.connect('mongodb://localhost/test');
	
	// 上面说了，我推荐在同一个 collection 中使用固定的数据形式。
	// 在这里，我们创建了一个名为 Cat 的 model，它在数据库中的名字根据传给 mongoose.model 的第一个参数决定，mongoose 会将名词变为复数，在这里，collection 的名字会是 `cats`。
	// 这个 model 的定义是，有一个 String 类型的 name，String 数组类型的 friends，Number 类型的 age。
	// mongodb 中大多数的数据类型都可以用 js 的原生类型来表示。至于说 String 的长度是多少，Number 的精度是多少。String 的最大限度是 16MB，Number 的整型是 64-bit，浮点数的话，js 中 `0.1 + 0.2` 的结果都是乱来的。。就不指望什么了。。
	var Cat = mongoose.model('Cat', {
	  name: String,
	  friends: [String],
	  age: Number,
	});
	
	// new 一个新对象，名叫 kitty
	// 接着为 kitty 的属性们赋值
	var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
	kitty.age = 3;
	
	// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
	kitty.save(function (err) {
	  if (err) // ...
	  console.log('meow');
	});




### MongoDB 基本操作

- use name   创建一个集合到当前数据库
- show dbs   查询所有数据库
- show collections  查询当前数据库下所有集合
- db.dropDatabase()  删除当前使用的数据库
- db.getName()  查看当前使用的数据库
- db.repairDatabase()  修复当前数据库
- db.cloneDatabase('127.0.0.1')  将指定机器上的数据库的数据克隆到当前数据库
- db.getMongo()    查看当前db的链接机器的地址


- Model.find(function(err, docs) {} );  查询所有的集合
- Model.find({}, ['first', 'last'], callback);  docs包含文档的部分建值
- Model.findOne({age: 5}, callback);	  docs表示查询到的单个值
- Model.findById(obj._id, callback);    接收的文档的ID或者是bjectId为参数
- Model.count(conditions, callback);    返回符合条件的文档
- Model.remove(conditions, callback);	删除符合条件的文档
- Model.distinct(field, conditions, callback);    查询符合条件的文档并返回根据键分组的结果
- Model.where          当查询比价复杂时，用where
		Model
			.where('age').get(23)
			.where('tags').in(['movie', 'music', 'art'])
			.limit(10)
			.run(callback);


- Model.$where  有时我们需要在 mongodb 中使用 javascript 表达式进行查询，这时可以用 find({$where : javascript}) 方式，$where 是一种快捷方式，并支持链式调用查询。
		Model.$where('this.firstname === this.lastname').exec(callback);

- Model.update



### 处理响应请求
- req.query  处理get请求，获取get请求参数
- req.body   处理post请求，获取post请求体  **需要加载`bodyParser`中间件**
- req.params 处理/:xxx形式的get或post请求,获取参数
- req.param()  处理get,post请求，但是查找优先级 `req.params > req.body > req.query`


### node 内置 http模块
	
	var http = require('http');
	http.createServer(function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'},
		res.write('Hello world.');
		res.end();
	}).listen(80);


### 闭包 词法作用域
 
> 函数执行时候查找变量过程， 从函数里面找，如果没有找到，就会一直找到最外面的函数； 
> 如果内层函数没有定义的变量在外层找到， 就可以叫作闭包了  



### Array.prototype.slice功能

	Array.prototype.slice = function(start, end) {
		var result = new Array();
		start = start || 0;
		end = end || this.length;
		for(var i = start; i < end; i++) ｛
			result.push(this[i]);
		}
		return result
	}

- Array.form()  可以将类数组对象转化为数组  -- 但是传入参数必须要有 length属性
- Array.of()   将一组值，转化为数组，主要是为了代替Array()中存在参数不同而导致的重载
	Array()   // []
	Array(3)  // [undefined]
	Array(3, 11, 19)  // [3, 11, 19]




### 创建一个简单的node服务器

	// http.createServer内置里`request`事件监听
	var http = require('http');
	http.createServer(function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('hello world');
		res.end();
	}).listen(80);
	
	// 另外一种事件监听方法
	var http = require('http');
	var server = new http.server();
	server.on('request', function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('hello world');
		res.end();
	});
	server.listen(80, 127.0.0.1);


### HTTP 与 Session

Http是无状态的，一次连接之后，不会保存什么东西； 而Session会话能存在多个网页连接请求中，它能在请求中保留
着一些记录信息，可以在用户在多处登录时可以保留状态； 而http为了实现类似Session功能，便会产生cookie.用来记录用户的状态.


### 文件操作

> Stream有四种流类型 

1. Readable  Writable   (读写操作）
2. Duplex				(可读可写）
3. Transform			(操作被写入数据，然后读出结果)

> stream对象都是EventEmitter的实例，常用的事件

1. data 	当有数据可读是触发
2. end 		没有更多数据可读是触发
3. error	在接收和写入过程中发生错误触发的 
4. finish   数据已经被写入到底层系统时被触发

		var fs = require('fs');
		// 将数据写入到指定文件中去
		var data = 'hello world';
		var writeStream = fs.createWriteStream('output.txt');
		writeStream.write(data,'utf8');
		
		
		// 处理流事件 data, end and error
		writeStream.on('finish', function() {
			// 创建可读流
			var readerStream = fs.createReadStream('output.txt');
			// 设置编码为UTF-8
			readerStream.setEncoding('UTF8');
			readerStream.on('data', function() {});
			readerStream.on('end', function() {});
			readerStream.on('error', function(err) { console.log(err.stack); };
		});
		
		fs.readFile('output.txt', function(err, data) {});
		fs.open('output.txt', 'r+', function(err, data) {});
			

### 网络操作
	
> req.query中取出我们的q参数，如果是post传来的body数据，则在req.body里面，但是express是默认不操作post请求，所以我们需要加载中间件`body-parser`

	var express = require('express');
	var app = express();
	// 请求格式: 127.0.0.1:/?q=111
	app.get('/', function(req, res) {
		var q = req.query.q;    // -> q = 111
	});

### 小技巧 
- process 全局对象 
	- stdin   	标准输入
	- stdout		标准输出
	- stderr 		标准错误
	
	- version node	 版本号
	- installPrefix	 安装目录
	- platform 		 正在运行平台的名称
	- uptime() 		 当前node程序运行了多少秒
	- pid			 正在运行进程ID（`PID`)

--------
		process.stdin.resume()；			// 监听用户输入
		process.stdin.setEncoding('utf8');	// 设置文字编码
		process.stdin.pipe(process.stdout);	// 通道 输入 输出 连接器

------------
	process.on('exit', function() {		// 结束事件循环
		setTimeout(function() { 		// 下面的代码不会执行
			console.log('1');
		}, 100);
		console.log('Bye');
	});


- process.argv的用法
> process是一个全局变量，可通过process.argv获得命令行参数.
 由于argv[0]等于NodeJS执行程序的绝对路径，argv[1]等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。


	// 创建一个main.js
	var fibonacci = function(n) {
		if(n === 0) {
			return 0;
		}
		if(n === 1) {
			return 1;
		}
		return fibonacci(n-1) + fibonacci(n-2);
	};
	// 如果是直接执行命令行 node main.js 10 ， 则会输出结果
	// 如果main.js被其他文件require， 则此处不会执行
	if(require.main === module) {
		var n = Number(process.argv[2]);
		console.log('fibonacci(' + n + ')is', fibonacci);
	}


- node.js -- 单进程单线程程序
- 异步操作的函数将回调函数作为最后一个参数，错误对象为第一个参数 `app.use(function(err, req, res, next) {} );`


### Buffer 缓存区

> 全局函数 存放/操作二进制数据的缓存区

	buf = new Buffer(256);  // 创建一个256字节的缓存区
	
	// 缓存区合并
	var buffer1 = new Buffer('zhan');
	var buffer2 = new Buffer('hang');
	var buffer3 = Buffer.concat([buffer1, buffer2]);   // zhanhang


- buf.write(string, offset, length, encoding);   
	1. string 写入缓存区的字符串
	2. offset 缓存区开始写入的索引值
	3. length 写入的字节数
	4. encoding 使用的编码

- buf.toString('encoding', start, end);
	1. encoding 使用的编码
	2. start	开始索引的位置
	3. end      结束位置

- buf.toJson()     // 将BUffer转换为Json对象



#### URL 匹配规则
		// URL: 	'post/hello-world'
		app.get('/post/:name', function() {
			req.params.name = 'hello world';     // 可匹配
		});
		
		// ?表示匹配URL为可选
		app.get('/post/:name?', function() {
		});

#### 如何读取文件

	var stream = require('fs').createReadStream('image.png');
	var data = null;
	stream.on('data', function(strunk) {
		data += strunk;
	};
	stream.on('end', function(data) {
		res.write(data);
		res.end();
	}
	
	// 等价于
	require('fs').createReadStream('image.png').pipe(res); 

####  I/O 问题
> 按顺序的串行请求， 无序的并行请求


### URL模块
> 解析和处理URL字符串 	`parse` and  `format` and `resolve`
- parse 可以将url解析成固定的对象
	
	parse(url, boolean);		// true 使用querystring来解析query属性 false 则不用
	querystring模块          处理query字符串的简单辅助模块