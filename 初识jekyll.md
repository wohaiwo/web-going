

## 初识jekyll

> jekyll 是一个简单的静态博客生成工具 

文档结构基本包括

- _includes 重复利用的文件
- _layouts  模板文件
- _posts    文章内容
- _drafts   文章草稿
- public    公共的资源（css, js, img）
- _config.yml   配置文件


### jekyll 包含三大全局变量

#### site（全站变量)

- pages 所有pages的清单
- posts 事件倒叙的posts清单
- time  当前时间
- url   当前文件地址

#### page（页面变量)

- content 页面内容
- title   页面标题
- excerpt 摘要的源码
- url     相对路径(以'/'开头)
- date    帖子的日期
- categories  分类

####　paginator (分页信息)
> 需要在_config.yml 中paginate配置才能生效

- per-page 每一页posts的数量
- posts 可用的文章数量
- page  当前页号
- previous_page 前一页的页号
- previous_page_path 前一页地址
- next_page  下一页的页号
- next_page_path  下一页地址


### 简单的例子

#### 高亮显示代码

	{% highlight html %}
		<div>
			<p><span></span></p>
		</div>
	{% endhighlight %}

#### 分页显示下一页信息

	<ul>	
		{% for post in site.posts %}
		<li>
			<a href="{{post.url}}">{{post.title}}</a>
			<!-- 文章开头部分 自动提取 -->
			{{post.excerpt}}
		</li>
		{% end for %}
	</ul>

