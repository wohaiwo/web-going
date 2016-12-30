
## 根据 [http://community.languagetool.org/ruleEditor2/index?lang=en](http://community.languagetool.org/ruleEditor2/index?lang=en "英语词法分词") 需求开发

----------


- **1.0** 使用原生JS 来实现复杂的DOM操作，绑定事件调用后台接口  
- **1.1** 对1.0版本进行功能上的添加，增加接口来实现动态加载error-pattern的数据模型 对mian.js中的代码进行review， 尽量实现接口的可用性，封装函数
- **2.0** 使用vue2.0进行代码重构，利用VM来实现减少对原生DOM的操作，实现对后台数据的解析来动态操作DOM结构（为玩待续)