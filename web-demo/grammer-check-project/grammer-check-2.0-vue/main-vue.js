var demo = new Vue({
	el: '.main-content',
	data: {
		isShow: true,
		isShowRuleExample: {
			isShowExampleButton: true,
			isShowDescriptionLine: false,
			k: 0				// 计数器，当k为2时 显示 DescriptionLine标签
		},
		ruleExampleList: [
			{exampleSentence: '', exampleType: 'w', isShowAnalysis: true},
			{exampleSentence: '', exampleType: 'c', isShowAnalysis: true},
		],
		caseSensitive: true,				// 是否大小写,
		ruleName: '',						// 规则名称
		message: '', 					// 匹配规则命中反馈信息
		shortMessage: '', 				// 信息短语(非必填)
		url: '',							// 命中规则返回详情参考url
		ruleTokenList: [					//Token规则数组List
			{
				tokenType: 'W',
				word: '',
				partOfSpeech: '',
				isAddAdvancedBox: false,		// 是否显示弹出层
				posRegExp: false,
				posNegate: false,
				wordRegExp: false,
				wordBaseForm: false,
				wordNegate: false,
				advancedArr: [],
				wordBoxType: '0',
				exceptList: []
			}
		]											
	},
	methods: {
		// 根据用户输入情况来显示标签
		showAnalysis: function(index, e) {
				// 如果有删除按钮，则不显示show-analysis标签
				if(this.ruleExampleList[index].isDeleteBox) {
					return false;
				}
				// 判断用户是否显示show-analysis标签 
				if(e.target.value.length >= 1) {
					// 防止用户重复更改input的值
					if(this.ruleExampleList[index].isShowAnalysis) {
						this.ruleExampleList[index].isShowAnalysis = false;
						this.isShowRuleExample.k++;
					}
				} else {
					this.ruleExampleList[index].isShowAnalysis = true;
					this.isShowRuleExample.k--;
				}
				// 当用户两个input全部填写时，显示添加&&确认下一步按钮
				if(this.isShowRuleExample.k == 2) {
					this.isShowRuleExample.isShowExampleButton = false;
					this.isShowRuleExample.isShowDescriptionLine = true;
				} else {
					this.isShowRuleExample.isShowExampleButton = true;
					this.isShowRuleExample.isShowDescriptionLine = false;
				}
		},
		addOtherExample: function(item) {
			if(item === 'w') {
				this.ruleExampleList.push({exampleSentence: '', exampleType: 'w', isDeleteBox: true, isShowAnalysis: true});
			} else {
				this.ruleExampleList.push({exampleSentence: '', exampleType: 'c', isDeleteBox: true, isShowAnalysis: true});
			}
		},
		// 当点击create initial	error pattern按钮，显示隐藏的item-box并且调用ajax接口
		showErrorPattern: function() {
			this.isShow = false;
			// 这里需要添加compontent组件，动态加载Error-pattern模板
		},
		// 删除item-box按钮
		removeItem: function(index) {
			this.ruleExampleList.splice(index, 1);
		},
		// 添加token节点
		addTokenPattern: function() {
			var token = {
				tokenType: 'W',
				word: '',
				partOfSpeech: '',
				posRegExp: false,
				posNegate: false,
				wordRegExp: false,
				wordBaseForm: false,
				wordNegate: false,
				isAddAdvancedBox: false,		// 是否显示弹出层
				advancedArr: [],
				wordBoxType: '0',
				exceptList: []
			}
			this.ruleTokenList.push(token);
		},
		// 添加token-list子类节点
		addSubToken: function(index) {
			var subToken = {
				tokenType: 'W',
				word: '',
				partOfSpeech: '',
				isAddAdvancedBox: false,		// 是否显示弹出层
				posRegExp: false,
				posNegate: false,
				wordRegExp: false,
				wordBaseForm: false,
				wordNegate: false,
				wordBoxType: '0',
				advancedArr: []
			}
			// 动态添加Token子类的list列表
			this.ruleTokenList[index].exceptList.push(subToken);
		},
		// 删除当前选中的token
		removeTokenItem: function(index) {
			this.ruleTokenList.splice(index, 1);
		},
		/**
		 * [removeSubTokenItem 删除当前选中的子类SubToken]
		 * @param  {[number]} index [当前选中的token的位置]
		 * @param  {[number]} j     [当前选中的subToken的位置]
		 * @return {[null]}       [不返回数据]
		 */
		removeSubTokenItem: function(index, j) {
			this.ruleTokenList[index].exceptList.splice(j, 1);
		},
		/**
		 * [利用事件委托来动态更改word-box内容]
		 * @param  {[event]} el [鼠标点击冒泡上去的事件对象]
		 * @return {[null]}    [description]
		 */
		changeWordBox: function(el, item) {
			// input label 会触发两次P标签，只需要监听一次事件即可。可以设置 
			if(el.target.nodeName === 'INPUT') {
				switch(el.target.value) {
					case 'W':
						item.wordBoxType = '0';
						break;
					case 'PP':
						item.wordBoxType = '1';
						break;
					case 'WP':
						item.wordBoxType = '2';
						break;
					case 'All':
						item.wordBoxType = '3';
						break;
				}
			}
		},
		showAdvancedBox: function(item) {
			item.isAddAdvancedBox  = true;
		},
		closeAdvancedBox: function(item) {
			item.isAddAdvancedBox = false;
		},
		// 遍历advanceArr中的数组，防止有空值提交
		advancedConfirm: function(item) {
			var selectedResult = item.advancedArr.every(function(item, index, array) {
					return !!item.inputText && !!item.selected;
				});
			if(selectedResult) {
				item.isAddAdvancedBox = false;
			}
		},
		/**
		 * [移除弹出框选中的item]
		 * @param  {[type]} item     [存放选中项的数组]
		 * @param  {[type]} selected [当前选中的元素的位置]
		 * @return {[type]}          [null]
		 */
		removeOptionItem: function(item, selected) {
			item.advancedArr.splice(selected, 1);
		},
		addOptionItem: function(item) {
			var optionItem = {selected: '', inputText: ''};
			item.advancedArr.push(optionItem);
		},
		addErrorPattern: function() {

		}
	}
});
