> js 基本都是由对象构成  而对象都是有 属性 和 方法 来 构成的,  所以就让我们从对象的角度来重新认识JavaScript 

## 事件对象 

> js中当用户与网页进行交互的时候,是会触发事件的, 而触发事件时 event就来传递着信息

### event  基本属性

#### 属性
- type 					事件的类型
- bubbles 				是否冒泡       (Boolean类型)
- cancelabel       			是否取消事件的默认行为
- target					事件的目标( 当前谁触发了它,  比如鼠标点到了谁)
- currentTarget  			当前正在处理事件的元素 (在事件处理程序中 `this`始终指向`currentTarget`)
- detail					与事件相关的细节
- eventPhase			调用事件处理程序的阶段 (1. 捕获 2. 处于目标  3. 冒泡)
- trusted				true表示事件是浏览器生成的, false表示是js创建的
- defaultPrevented		是否已经调用了`preventDefault() `
- clientX, clientY			离视口(浏览器能左上角的距离, 也可以理解为当设置`position: absolute; left: 0; top:0;`的位置)的距离
- pageX, pageY			鼠标发生事件离视口的距离,这时是包括滚动距离的,`event.pageY = event.clientY + document.documentElement.scrollTop(标准模式) + document.body.scrollTop(混杂模式);` 
- screenX, screenY 		离你的电脑屏幕最左上角的距离
- shifkey, ctrkey, altkey, metakey		检测相应键是否被按下`Boolean

- **IE兼容**
- cancelBubble			与`stopPropagation()` 作用相同 (Boolean)
- returnValue			与`preventDefault()`作用相同  (Boolean)
- srcElement				与`target`作用相同
- toElement				IE中在`mouseout`时触发  (事件的主目标失去光标,而相关元素获得光标
- fromElement			IE中在`mouseover`时触发


#### 方法
- preventDefault	()		取消事件默认行为
- stopPropagation() 		取消事件捕获或者冒泡

-----

### 事件的类型

####  UI事件

- load					页面完成加载是触发
- unload				页面被关掉(应用场景:  清楚引用, 以避免内存泄露
- abort					
- error
- select
- resize					当窗口或者框架(`iframe`)大小方式变化的时候(浏览器会在变化了1px时就触发`resize`事件, 而firefox会在用户停止调整大小触发
- scroll					当用户滚动带滚动条的元素的内容时
- blur					在元素失去焦点的时候触发,  **该事件不会冒泡**
- focusin, focusout		在元素失去或者获取焦点时触发,(键盘的Tab键可以触发事件)

#### 鼠标事件

- click	
- dbclick
- mouseenter			**该事件不冒泡,而且在光标移动到后代元素不会触发**
- mouseleave			
- mousemove			当鼠标在元素内部反复移动时触发
- mouseout
- mouseover			它与`mouseenter`不同就是在子元素移动时也会触发
- mousedown			**不能通过键盘触发**
- mouseup				一次click事件必须要`mousedown` 和`mouseup`才会触发
- mousewheel			鼠标滚轮事件

- **属性**
- relatedTarget			只在`mouseover`和`mouseout`才会包含相应元素的信息
- button				只在`mousedown`和`mouseup`,才会用button属性,用来保存鼠标按下了哪个键
-  wheelDelta			记录鼠标滚轮的信息


####  键盘以及文本事件

- keydown	
- keypress				当用户按下键盘的字符键才会触发
- keyup
- textInput				firefox不支持 chrome支持

- **属性**

- data					在textInput事件时存在,保存用户输入的字符(非字符编码)
- charCode				只发送在`keypress`事件才会有属性
> 获取的都是ASCII码, 可以使用`string.fromCharCode()`来转换实际的字符


#### 触摸事件

- touchstart
- touchmove
- touchend
- touchcancel

- **属性**
- touches 				表示当前跟踪的触摸操作的Touch对象的数组
- targetTouches			事件目标的Touch对象数组

#### 手势事件

- gesturestart			需要在一个手指触摸的情况下, 第二根手机也需要触摸
- gesturechange			event对象会产生`rotation`和`scale`  
- gestureend			一个是旋转了多少角度  一个是放大或者缩小

#### H5事件

- contextmenu			更改上下文菜单(鼠标右键)
- beforeunload			在用户刷新或者关闭页面触发该事件
- DOMContentLoaded	页面DOM树加载完成后触发, 不用等待img等待外部资源就可以触发
- readystatechange		提供文档或者元素加载状态的信息
- hashchange			在URL参数列表发生变化是触发


### 事件的性能

#### 事件委托

> 事件其实就是在DOM树上绑定相应的事件处理函数, 但是如何一个页面存在过多的事件的话, 会影响性能,   由于事件都是冒泡的,    所以可以实现 **事件委托**的解决方案    可以在一个DOM树上层级比较高的元素上绑定一个`事件处理程序`   利用事件冒泡的机制,  使用`event.target`来判断是谁在触发事件

	<ul id="test0">
		<li class="test1">111</li>
		<li class="test2">222</li>
		<li class="test3">333</li>
	</ul>
	<script>
	var document = document.getElementById('test0');
	document.addEventListener('click', function(event) {
		target = event.target || event.srcElement;

		switch(target.className) {
			case 'test1':
				// do something
				break;
			case 'test2':
				// do something
				 break;
			case 'test3':
				target.innerHTML = "fasfa"+ target.id;
				break;
		}
	}, false);
	</script>



####  unload移出事件
> 在页面卸载之前, 移出所以事件处理程序,  也可以结合**事件委托**来做