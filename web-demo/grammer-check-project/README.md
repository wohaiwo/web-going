
## 根据 [http://community.languagetool.org/ruleEditor2/index?lang=en](http://community.languagetool.org/ruleEditor2/index?lang=en "英语词法分词") 需求开发

----------


- **1.0** 使用原生JS 来实现复杂的DOM操作，绑定事件调用后台接口  
- **1.1** 对1.0版本进行功能上的添加，增加接口来实现动态加载error-pattern的数据模型 对mian.js中的代码进行review， 尽量实现接口的可用性，封装函数
- **2.0** 使用vue2.0进行代码重构，利用VM来实现减少对原生DOM的操作，实现对后台数据的解析来动态操作DOM结构（为玩待续)
- **2.0.1** 使用vue进行改版，基本完成了DOM操作。利用了vue来实现只需要对data数据进行操作，便可以实现复杂的页面逻辑数据绑定。
	- 待做
	- Sortable.js来实现页面拖拽效果，会触发弹出框事件，另其无法正常关闭
	- marker-start和marker-end不用实现其效果，考虑到数据结构的完整性，待实现
	- 调用ajax后台接口，对其结果数据的抽离