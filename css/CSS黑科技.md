
## DOM appendTHML 实现

- 如何将HTML字符串转换为节点

	var div = document.createElement('div');
	div.innerTHML = htmll;  // html 表示字符串
	return div.childNodes;   // 返回节点

- 最后端异步加载html
   
		HTMLelement.prototype.appendHTML = function(html) {
			var divTemp = document.createElement('div'), nodes = null,
			// 文档片段, 一次性append, 提高性能
			fragment = document.createDocumentFragment();
			divTemp.innerHTML = html;
			nodes = divTemp.childNodes;
			for(var i = 0; len = nodes.length; i < length; i++) {
				fragment.appendChild(nodes[i].clone(true));
			}
			this.appendChild(fragment);
			nodes = null;
			fragment = null;
		}

- 前/头部端异步加载html

		HTMLelement.prototype.appendHTML = functino(el, html) {
			var divTemp = document.createElement('div'), nodes = null,
			// 文档片段, 一次性append, 提高性能
			fragment = document.createDocumentFragment();
			divTemp.innerHTML = html;
			nodes = divTemp.childNodes;
			for(var i = 0; len = nodes.length; i < length; i++) {
				fragment.inser(nodes[i].clone(true));
			}
			el.appendChild(fragment, el.firstchild);
			nodes = null;
			fragment = null;
		}

- insertAdjacentHTML方法

> element.insertAdjacentHTML(position, html);

- position 是相对于element元素的位置 **position是一个字符串**
- **html需要时一个字符串 '<li>hello world</li>'**

> node.outerHTML 来实现提取其元素

	beforebegin
	    在 element 元素的前面。
	afterbegin
	    在 element 元素的第一个子元素前面。
	beforeend
	    在 element 元素的最后一个子元素后面。
	afterend   
	    在 element 元素的后面。 
		
	[beforebegin, afterend] 是插入到元素外面的前后位置，会新添加一个文本节点
	[afterbegin, beforeend] 是插入到元素内部的前后位置

> insertAdjacentHTML 将指定的文本解析为HTML, 然后插入到DOM树指定位置中去
> 
> appendChild  将一个节点插入到指定的父节点的最末尾处
> eg: element.insertAdjacentHTML(beforeend, html);

outerHTML 属性可以获取该DOM元素及其后代节点所形成的序列化的HTML片段

innerHTML 属性可以用来获取,修改指定元素内的所有标签和内容(但是不包括自身DOM元素)


- a+b  直接相邻选择器  a元素相邻的同级元素b
- a ~ b 普通相邻选择器  a元素之后的同级元素b

- inline-block 的内容会被格式化为一个块盒,而该元素本身会被格式化一个原子内联级盒 

- CSS计数器

counter-reset / counter-increment / content :before :after 三个元素共同使用才能起作用

**content: counter支持两种写法**<br>
`content: counter(name, style);`
`content: counters(name, string);`

`counter-increment: jay -2;` // 每次以2递减<br/>
`content: counter(jay) '---' counter(jay);` // 支持一次加载多个计数器 连写<br/>
`content: counters(jay, '-')'.';` // 计数器 嵌套计数


	HTML: <p class="counter"></p>
	CSS: 
		.counter {
			counter-reset: jay 1;    // 计数器初始化 开始值
			counter-increment: jay;  // 表示计数器开始 自增
		}
		.counter:before {
			content: counter(jay);   // 显示
		}


// 支持多个计数器 
----------
	counter-reset: zhan 2 hang 4;
	counter-increment: zhan hang;
	
	:before {
		content: counter(zhan);   // -> 3;
	}
	:after {
		content: counter(hang) '-' counter(zhan);    // -> 5-4
	}

- you don't needs jquery

`var node = document.querySelector(selector) || []; 	//初始化默认值`
 
<code>
$('a[target=_blank');
-- 等价于 --
document.querySelectorAll('a[target=_blank]') || [];
</code>


- `div.style。width` & `element.getComputerStyle(el, null).width` 的区别

		div.style.width 获取的是当前HTML中的css样式
		而element.getComputed(el, null).width 获取的是应用到该元素上面的样式
	
		element.getComputed(el, ':before').content;  // 可以获取到伪元素


- role 与 aria-* 的区别

> role的作用是描述一个非标准tag的实际作用
`<div role="checkbox"></div>`  roleb可以描述当前div元素表示checkbox的用途

> aria-*的作用就是描述这个tag在可视化的情景中的具体信息
`<div role="checkbox" aria-checked="true"></div>`  表示这个div为checkbox,并且为选中状态