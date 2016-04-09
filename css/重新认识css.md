# 重新认识**css**
---------------------

+ **margin**
从一个最简单的**圣杯布局**开始 [起源](http://alistapart.com/article/holygrail)
# **圣杯布局**
### **HTML**

		<header id="hd">Header</header>  	 
		<div id="bd">  
			<div id="main">main</div>
			<div id="aside">aside</div>
		</div>
		<footer>footer</footer>  </pre>
### **CSS**

		#hd {
			padding-left: 210px;
		}
		#main {
			width: 100%;
			float: left;
		}
		#aside {
			width: 200px;
			float: left;
			margin-left: -100%;
			position: relative;
			left: -210px;
		}
		footer {
			background: #eee;
		}
	</pre>
效果图[demo](http://codepen.io/wohaiwo/pen/RPOXgW)

# **双飞翼布局** 
### **HTML**
DOM结构中主次内容分布合理，里面的内容显示就用css来解决

		<header id="hd">Header</header>  	 
		<div id="bd">  
			<div id="main-content">main-content</div>
		</div>
		<div id="aside-1"aside-1</div>
		<div id="aside-2">aside-2</div>
		<footer>footer</footer>  
### **CSS**
		#hd {
			width: 100%;
		}
		#bd {
			width: 100%;
			float: left;
		}
		#aside-1 {
			float: left;
			width: 200px;  // 指定一个固定宽度
			margin-left: -100%;
		}
		#aside-2 {
			float: left;
			width: 200px;
			margin-right: -200px;
		}
		#main-content {
			margin-left: 210px;
			margin-right: 210px;  // 设置一个10px的空白边距
		}

-------------

心灵鸡汤一碗 [说说css学习中的瓶颈](http://www.zhangxinxu.com/wordpress/2012/07/bottleneck-css-study/) 



> 通过上面的两个经典布局来拉开重新认识css的大门


# 来说说css各种不同类型的框
+ Containing block(包含块)
+ Block-level element(块级元素）
+ Block element(块元素）
+ Block-level box(块级框），Block container box(块容器框）
+ liline-level element(行内级元素）
+ Inline-level box(行内级框），Atomic inline-level box（原子行内级框）
+ Anonymous boxes(匿名框）


### 包含块 

一个元素，它的框的尺寸和位置会相对于一个特定的矩形框边缘来计算，这个特定的矩形框叫做`包含块`
### 块级元素 

块级元素是类似block，可以换行的元素。 官方定义是 块级元素是那些视觉上会被格式化成块级的元素
`display: block | table | list-item | flex | grid ;`都可以将元素设置成一个块级元素
### 块元素 

块元素是display属性设置成 block的元素，块元素是块级元素的一个子集
#### li 是一个块级元素，它不是块元素 
### 行内级元素 
行内级元素是那些不会为自身内容形成新的块，而让内容分布在多行的元素。`display: inline-block | inline-table | inline | inline-flex | inline-grid`都可以将一个元素设置成行内级元素
### 行内元素 
同上块元素， display的属性设置成inline的元素，行内元素也是行内级元素的子集
###  块级框 
块级元素会生成块级框， 这些框会去参与`BFC`。
###  块容器框 
一个块容器框要么只包含块级框，要么创建一个**IFC**而只包含行内级块框，但是不能同时包含块级框和行内级框。

### position: relative | absolute | fixed | static 
对于浏览器来说，渲染文本是从上到下， 左到右的顺序渲染各个模块，最终得到我们想要的html。但是声明position的时候就不同了，relative不会脱离文档流，但是它会相对自己来做对应的left，right，top，bottom。relative还是会占据原来的位置，但是可能视觉（我们的眼睛会感觉它已经偏离了原来的位置） 
> **we are family**
 
而position天生就是一个与众不同的人，它不服天王大帝的管教，它会脱离文档流 会离开父亲的怀抱 相对于父元素或者祖先元素声明的position不是static定位（比如说 它的父元素声明了`position: relative;`,它就会相对于父元素定位，反之就会相对于根元素定位）
总之: static是一个听爸爸话的儿子，它一般不会去外面瞎搞；relative正在叛逆期，它不会一味的听爸爸的话，它有自己思想，表面做一套，实地用去反对他，但是它终究是一个孩子，relative不敢逃出爸爸的约束；absolute是一个牛逼哄哄的孩子，不听爸爸的管教，敢做敢当，离家出走，跟其他几个兄弟也是更更不入，想要自立门户；fixed这个孩子就有点叼了，它比absolute更牛逼一点，它一点不听爸爸的话，只听爷爷或者应该是说只听祖先的话(body),而且极其听说，爷爷叫它站在哪里，它就死都不会移动（爸爸听见都快要哭了，感觉不是自己亲生的）。

添加一点： 当块级元素中声明了absolute，fiexd，而且都没有声明left top值 父级元素也没用显示声明relative，都是相对于最近的父元素定位的。但是一旦声明了left top的值 fiexd就会随着浏览器视口浮动 而absolute会随着父级元素浮动   
