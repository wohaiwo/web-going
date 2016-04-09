


## DOM -- 文档对象模型

> 希望通过对象中属性和方法的方法来加深对DOM以及JS的认识

### node 节点

#### 属性

- nodeType  表明节点类型 
	1. element == 1		元素节点
	2. attribute == 2	属性节点
	3. text == 3	 	文本节点
	4. comment == 8  	注释节点
	5. document == 9	
	6. document-fragment == 11 文档片段节点
- nodeValue 节点信息
- nodeName  元素的标签名  `<ul></ul>`它的`nodeName == UL`
- tagName   等价于  `nodeName`
- childNodes  保存着`NodeList`对象--类数组对象对象--基于DOM结构动态变化的查询结果
- parentNode
- previousSibling, nextSibling
- firstChild, lastChild
- ownerDocument   指向文档节点 == document

#### 方法

- appendChild()  在`childNodes`末尾添加一个节点
- insertBefore() 插入一个节点 `parentNode.insertBefore(a, b);`  a插入节点 b参照节点 
- replaceChild() 替换节点 `parentNode.replaceChild(a,b);` a插入节点 b替换节点
- removeChild()  移除节点  **移除或者替换的节点仍然为文档所有，只不过在文档中已经没有了位置了**
- cloneNode(true)  深复制，复制节点及整个子节点树
- cloneNode(false) 欠复制， 复制节点本身   **注意在低版本的IE上 复制节点会将节点本身的事件复制过来**
- normalize()      处理文档树种的文本节点，（可以把没有包含文本的文本节点去除，或者相邻的文本节点会合并成一个节点


### document对象 
> 是window对象的一个属性，表示整个HTML页面

#### 属性

- documentElement  指向html元素
- body 			   body元素
- URL
- domin 		   页面的域名
- title            
- anchors 			所有带name属性的a标签
- links				所有带href属性的a标签
- activeElement     引用当前获得焦点的元素
- forms, images

#### 方法

- write(), writeIn(), open(), close()
- getElementById(), getElementsByTagName(), getElementsByClassName()
- querySelector(), querySelectorAll()
- createElement()
- createTextNode() 		创建新的文本节点
- createDocumentFragment() 		创建临时文档节点


### Element 元素对象

#### 属性

- id, title
- className    元素中class属性，没有命名为`class`，是因为`class`是ECMAScript中的保留字(ps: ES6中已经定义class为实现一个类)
- dir        语言的方向(`ltr, rtl`)
- attributes    可以获取到某个元素中包含的所有属性
- innerText     插入或者输出  当前元素的文本节点包括子文档树中文本
- outerText     跟outerHTML作用差不多
- classsList   返回该元素中class属性
	1. add()    	将给定的字符串添加到列表中，如果存在，则不添加
	2. contains()	是否包含某个字符串， 返回 true, false
	3. remove()		从列表删除给定字符串
	4. toggle()		列表中如果存在该字符， 删除； 不存在， 添加
- innerHTML    
- outerHTML


		HTML: 
			<div id="test">
				<p>hello world!</p>
				<ul>
					<li>item-1</li>
					<li>item-2</li>
					<li>item-3</li>
				</ul>
			</div>
		Js:
			console.log(div.innerHTML);		// 返回的是div里面的所有子节点
			console.log(div.outerHTML);		// 返回的是包括div的所有节点
			div.innerHTML = "<p>Hello world</p>";	// 会替换掉div里面所有的子节点
			div.outerHTML = "<p>Hello world</p>";	// 会替换掉包括div以及里面的子节点
			
		outerHTML操作相对于
			var p = document.createElement('p');
			p.innerHTML = 'Hello world';
			div.parentNode.replaceChild(p, div);


#### 方法

- getAttribute()      **如果这里需要获取css属性，需要getAttribute('css'); 才能获取**
- setAttribute()
- removeAttribute()