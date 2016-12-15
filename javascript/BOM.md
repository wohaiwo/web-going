

## BOM 浏览器对象模型
> 对象是由属性和方法组成，今天就站在对象的角度来谈谈BOM
> BOM提供了很对对象，用于访问浏览器的功能


### window对象
> window对象表示浏览器的一个实例
> window对象既是浏览器窗口的一个接口，也是ECMAScript种的全局对象


#### 属性

- screenLeft, screenTop (screenX, screenY） 窗口相对于屏幕左边或者上边的距离（存在浏览器兼容性的问题 可以通过三元表达式来判断
- opener  保存打开它的原始窗口对象
- innerWidth, innerWidth     当前窗口的宽带和高度(不包括浏览器任务栏，用户界面元素)
- outerWidth, outerHeight   浏览器视口高宽(就是当前浏览器整个高度，宽带)
- location对象
- history对象


#### 方法

- moveTo(x, y)	移动到坐标(x,y)位置
- moveBy(x, y)	沿着(x,y)方向移动一定的距离  
- 上面两个方法可能会被浏览器禁用，不对iframe框架有用， 只对最外层的window对象使用
<pre>
	var myWindow = window.open('', '', 'width=100; height=100');
	myWindow.document.write('hello world');
	myWindow.moveTo(200, 200);
</pre>	
- open() 打开一个窗口或者跳转到一个URL中去
- close（） 关闭窗口
- setTimeout(), setInterval() 超时调用和间歇调用 --都会返回一个数值ID，用于标识
- clearTimeout(), clearInterval()   取消调用
<pre>
	var timeoutId = setTimeout(function() { // do something }, 1000);
	clearTimeout(timeoutId);		// 可以取消该调用 但是setTimeout里面不能是一个匿名函数 否则无法取消
</pre>
- alert(), confirm(), prompt()   系统对话框
- scrollIntoView() 　　　　　     类似a标签锚点作用


### location对象
> 提供了当前窗口中加载的文档有关信息，location对象是一个特别的对象 ，即是window对象的属性也是document对象的属性
> window.location 和 document.location引用的是同一个对象

#### 属性
- hash 		返回URL中的hash（#号后面跟的零或多个字符)
- host 		返回服务器名称和端口号(如何存在的话)   ps: `'www.baidu.com:8080'
- hostname  返回不带端口号的服务器名称
- href     	返回当前加载的URL 等价于 location.toString()方法
- pathname  返回URL中的目录和文件名
- prot      返回端口号
- protocol  返回使用的协议  ps: http:或https:
- search    返回URL查询的字符串   ps: '?name=cblog'
- 每一次修改location属性(除了hash),页面都会以新的URL加载

#### 方法
- assign()  可以立即打开一个新的URL并且在历史记录中生成一条记录  `location.assign(http://www.baidu.com);` 等价于 	`location.href= 'http://www.taobao.com';`
- replace() 重定向，会导致浏览器位置发生改变，但是不会再历史记录中生成新的记录（无法实现浏览器的后退按钮了）
- reload()  重新加载一个页面


### history对象
- length     保存历史记录的数量
- go() 		 接收一个参数 `history.go(-2); history,go(2);`  
- back() 	 后退一页
- forward()  前进一页