

function toArr(el) {
	return Array.prototype.slice.call(el);
}

/* 全局变量 */
var selectAdvancedBox = null;	// 表示用户点击触发弹出层的a.add-item.show-box的标签

var wordLine = '<p>' +
					'<label class="item-line">Word:&nbsp;&nbsp;<input type="text" placeholder="word"></label>' +
					'<label><input type="checkbox" value="wordRegExp">RgeExp</label>' +
					'<label><input type="checkbox" value="wordBaseForm">Base form</label>' +
					'<label><input type="checkbox" value="wordNegate">Negate</label>' +
			    '</p>';

var minorIndex = 0;			// input-radio 次版本号
var majorIndex = 0;			// input-radio 主版本号


/* 监听用户是否input-text 来进行显示上的交互 */
var textInput = document.querySelectorAll('input.text-input');
var descriptionLine = document.querySelector('.description-line');
var exampleButton = document.querySelector('.example-sentences .btn');
for(var i = 0, len = textInput.length; i < len; i++) {
	var k = 0;
	(function(j) {
		textInput[j].addEventListener('change', function(e) {
			var el = e.target.closest('p').querySelector('.show-analysis').classList;	// 标签 => Show analysis
			if(e.target.value.length >= 1) {
				// 防止用户重复更改input的值
				if(!el.contains('show-tip')) {
					el.add('show-tip');
					k++;
				}
			} else {
				el.remove('show-tip');
				k--;
			}
			if(k == 2) {
				descriptionLine.classList.add('show-tip');
				exampleButton.classList.remove('disabled');
			} else {
				descriptionLine.classList.remove('show-tip');
				exampleButton.classList.add('disabled');
			}
		}, false);
	})(i);
}

//用户点击 'create initial error pattern' 按钮时， 出现后面的item-box模块
var exampleSentence = document.querySelector('.example-sentences');
exampleSentence.addEventListener('click', function(e) {
	if(e.target.classList.contains('btn')) {
		toArr(document.querySelectorAll('.item-box')).forEach(function(item) {
			if(item.classList.contains('is-show')) {
				item.classList.remove('is-show');
			}
		});

		// 调用第一次加载token-word的显示的word接口
		/*
		var option = {
           url: '../rule/tokenWordList',   
           type: 'POST',  
           async: true, //是否异步
           data: getTokenWordList(),
           dataType: 'json', 
           success: function (data) {
        	    document.querySelector('.error-pattern .item-content > .sort-table').innerHTML = ' ';
           		if(data.tokenWordList.length >= 1) {
					$('.error-pattern .item-content > .sort-table').append(addSortList(data.tokenWordList));
				} else {
					$('.error-pattern .item-content > .sort-table').append(addSortList(['']));
				}
           }
        }; 
		$.ajax(option);
		*/

		/*
		// 规则大类接口
		var option = {
        	url: '../rule/ruleClassList',
        	type: 'POST',
        	async: true,
        	data: {},
        	dataType: 'json',
        	success: function (data) {
        		// 初始化大类-selectOption
        		document.querySelector('.big-class').innerHTML = ' ';
           		handleMainClassData(1, data.mainClassList);
			}
        }; 
		$.ajax(option);  
		*/
	
	// 本地测试环境
	// 每次重置 set the error pattern 里面的内容
	document.querySelector('.error-pattern .item-content > .sort-table').innerHTML = ' ';
	var data = ['hello', 'world'];
	if(data.length >= 1) {
		$('.error-pattern .item-content > .sort-table').append(addSortList(data));
	} else {
		$('.error-pattern .item-content > .sort-table').append(addSortList(['']));
	}
	}
}, false);

/**
 * 
 * @param index 0 表示 小类 1 表示 大类
 * @param data ajax回调的数据
 */
function handleMainClassData(index, data) {
	var optionLine = ''
	var smallClassBox = document.querySelector('.small-class');
		if(smallClassBox) {
			smallClassBox.parentNode.removeChild(smallClassBox);
		}
	data.forEach(function(item){
		var bigClassOptionLine = '<option data-optionid='+ item.id +'>' + item.name + '</option>';
		optionLine += bigClassOptionLine;
	});
	
	if(index === 0) {
		var selectBox = '<select class="small-class">'+ optionLine +'</select>';
		$('.big-class').after(selectBox);
	} else {
		$('.big-class').append(optionLine);
	}
}

/**	
 * 获取大类，小类中optionId
 * @param index (0 => 小类, 1=> 大类)
 * @return 返回optionValue
 */
function getOptionName(index) {
	if(index === 0) {
		var selectBox = document.querySelector('.small-class');
		return selectBox.value;
	} else {
		var selectBox = document.querySelector('.big-class');
		return selectBox.value;
	}
}

// 点击大类select来动态选择小类数据
document.querySelector('.big-class').addEventListener('click', function(el) {
	// 规则小类接口
	var option = {
        	url: '../rule/ruleSmallList',
        	type: 'POST',
        	async: true,
        	data: {mainClassId: el.target.options[el.target.selectedIndex].dataset.optionid},
        	dataType: 'json',
        	success: function (data) {
        		handleMainClassData(0, data.smallClassList);
			}
        }; 
		$.ajax(option);
}, false);

//循环遍历 Set Example Sentences 中 wrong-correct的错误正确的例句
function getTokenWordList() {

	//规则例句
	var ruleExample = {
		wrongSentences: null,			// wrong 错误例句
		correctSentences: null			// corrected 纠正例句
	};
	var dataSentenceBox = document.querySelectorAll('.sentence-box input');		// 需要重新加载input元素
	toArr(dataSentenceBox).forEach(function(el, index) {
		// 只需要传入前二个sentence例句
		(index == 0) && (ruleExample.wrongSentences = el.value);
		(index == 1) && (ruleExample.correctSentences = el.value);
	});
	return ruleExample;
}

/**
 * 动态显示set the error pattern 中 sort-list的选项
 * @param {[array]} inputArr [传入的一个有input-value的值组成的数组]
 */
function addSortList(inputArr) {
	// 初始化版本号
	minorIndex = 0;			// input-radio 次版本号
	majorIndex = 0;			// input-radio 主版本号
	var lineArr = '';
	// 单个sort-list的html模板
	function inputList(item) {
		majorIndex++;
		var maxNodeType = 'token' + '-' + majorIndex;
		var patternLine = '<li class="sort-list">' +
						'<p><span class="drag-icon">&#8597;&nbsp;Token #'+ majorIndex  +'</span><a class="delete">&#10006;</a></p>' +
						'<p>' +
							'<label><input type="radio" data-select="W" name="'+ maxNodeType +'" checked>Word</label>' +
							'<label><input type="radio" data-select="P" name="'+ maxNodeType +'">Part-of-speech</label>' +
							'<label><input type="radio" data-select="WP" name="'+ maxNodeType +'">Word + Part-of-speech</label>' +
							'<label><input type="radio" data-select="All" name="'+ maxNodeType +'">Any word</label>' +
						'</p>' +
						'<div class="word-box">' + 
							'<p>' +
								'<label class="item-line">Word:&nbsp;&nbsp;<input type="text" placeholder="word" value="' + item +'"></label>' +
								'<label><input type="checkbox" value="wordRegExp">RgeExp</label>' +
								'<label><input type="checkbox" value="wordBaseForm">Base form</label>' +
								'<label><input type="checkbox" value="wordNegate">Negate</label>' +
						    '</p>' +
						'</div>' +
						'<ul class="sort-table"></ul>' +
						'<p>' +
							'<a class="add-item add-exception">Add exception</a>' +
							'<a class="add-item show-box">Edit Advanced Attributes (<span>0</span>)</a>' +
						'</p>' +
					'</li>';
		return patternLine;
	}

	inputArr.forEach(function(el) {
		lineArr += inputList(el);
	});
	return lineArr;
}

/**
* [ Error Pattern 模板加载函数]
* @parem {[boolean]} boolean [true 主版本号 / false 次版本号]
*/
function addPattern(boolean) {
	if(boolean) {
		majorIndex++;
		var maxNodeType = 'token' + '-' + majorIndex;
		// 主版本html模板
		var patternLine = '<li class="sort-list">' +
							'<p><span class="drag-icon">&#8597;&nbsp;Token #'+ majorIndex  +'</span><a class="delete">&#10006;</a></p>' +
							'<p>' +
								'<label><input type="radio" data-select="W" name="'+ maxNodeType +'" checked>Word</label>' +
								'<label><input type="radio" data-select="P" name="'+ maxNodeType +'">Part-of-speech</label>' +
								'<label><input type="radio" data-select="WP" name="'+ maxNodeType +'">Word + Part-of-speech</label>' +
								'<label><input type="radio" data-select="All" name="'+ maxNodeType +'">Any word</label>' +
							'</p>' +
							'<div class="word-box">' + wordLine + '</div>' +
							'<ul class="sort-table"></ul>' +
							'<p>' +
								'<a class="add-item add-exception">Add exception</a>' +
								'<a class="add-item show-box">Edit Advanced Attributes (<span>0</span>)</a>' +
							'</p>' +
						'</li>';
		return patternLine;
	} else {
		minorIndex++;
		var minNodeType = 'subToken' + '-' + minorIndex;
		// 次版本html模板
		var exceptionLine = '<li class="sort-list">' +
							'<p><a class="delete">&#10006;</a></p>' +
							'<p>except:&nbsp;&nbsp;' +
								'<label><input type="radio" data-select="W" name="'+ minNodeType +'"checked>Word</label>' +
								'<label><input type="radio" data-select="P" name="'+ minNodeType +'">Part-of-speech</label>' +
								'<label><input type="radio" data-select="WP" name="'+ minNodeType +'">Word + Part-of-speech</label>' +
							'</p>' +
							'<div class="word-box">' + wordLine + '</div>' +
							'<p>' +
								'<a class="add-item show-box"> Edit Advanced Attributes (<span>0</span>)</a>' +
							'</p>' +
						'</li>';
		return exceptionLine;
	}
}


var sortTableBox = document.querySelectorAll('.sort-table');
var showBox = document.querySelectorAll('.show-box');
var advancedBox = document.querySelector('.advanced-box');

for(var i = 0; i < sortTableBox.length; i++) {
	(function(j){
		// 更改input需要替换的HTML的模板
		var speechLine = '<p>' +
							'<label class="item-line">Part-of-speech:&nbsp;&nbsp;<input type="text" placeholder="part-of-speech tag"></label>' +
							'<label><input type="checkbox" value="posRegExp">RgeExp</label>' +
							'<label><input type="checkbox" value="posNegate">Negate</label>' +
						'</p>';
		var wordSpeechLine = wordLine + speechLine;

		// 事件委托监听
		sortTableBox[j].addEventListener('click', function(e) {
			e.stopPropagation();
			/* 页面上删除按钮的交互 */
			if(e.target && e.target.classList.contains('delete')) {
				// 删除delete按钮最近的祖先li.sort-list元素
				var el = e.target.closest('.sort-list');
				el.parentNode.removeChild(el);
				// 如果删除按钮是marker-start || marker-end
				if(e.target.classList.contains('marker-tab')) {
					if(el.classList.contains('marker-start')) {
						$('.marker-end').remove();
						$('.add-error-pattern').show();
					} else {
						$('.marker-start').remove();
						$('.add-error-pattern').show();
					}
				}
			} else if(e.target.classList.contains('show-box')) {
				// 显示adanced-box 弹出层
				advancedBox.style.display = 'block';
				// 通过一个变量来保存当前用户选中的点击元素，并将选中里面的数据绑定上去
				// 需要注时刻重置这个变量
				selectAdvancedBox = e.target;

			} else if(e.target.classList.contains('add-exception')) {
				// 动态添加add-exception条目
				++minorIndex;	// 次版本号加一
				$(e.target).closest('li.sort-list').find('.sort-table').append(addPattern(false));

			} else if(e.target.type === 'radio') {
				// 判断用户选择的token类型
				var wordBox = e.target.closest('p').nextElementSibling;    // 待替换文本
				switch(e.target.dataset.select) {
					case 'W':
						wordBox.innerHTML = wordLine;
						break;
					case 'P':
						wordBox.innerHTML = speechLine;
						break;
					case 'WP':
						wordBox.innerHTML = wordSpeechLine;
						// 需要添加右对齐
						wordBox.querySelector('p:first-child > .item-line input').classList.add('margin-left');
						break;
					default:
						wordBox.innerHTML = "";		// 默认初始化加载word模板
				}
			} else {
				return false;
			}
		}, false);
	})(i);
}


// 循环遍历advance弹出框数据，并插入到DOM中去
function getSelectOplArr() {
	var advancedArr = [];			// 存放advanced弹出层的数据
	var selectOplArr = advancedBox.querySelectorAll('.sort-list');
	toArr(selectOplArr).forEach(function(el) {
		var advancedObj = {};     // 临时存放sort-list数据的对象
		// 判断input是否为空
		if(el.querySelector('input').value) {
			var option = el.querySelector('select').value;
			var value = el.querySelector('input').value;
			advancedObj[option] = value;
			advancedArr.push(advancedObj);
		}
	});

	// 将数组转化为字符串存储在dataset中去 dataset无法存储复杂的Object数据
	var advancedArrStr = '';
	advancedArr.forEach(function(item) {
		advancedArrStr += JSON.stringify(item);
	});
	selectAdvancedBox.firstElementChild.innerHTML = advancedArr.length;
	selectAdvancedBox.dataset.advancedarr = advancedArrStr;
}

/* addanced-box 弹出层 动态加载 */
var attributesLine = '<li  class="sort-list">' +
						'<select>' +
							'<option value="min">min</option>' +
							'<option value="max">max</option>' +
							'<option value="skip">skip</option>' +
							'<option value="chunk">chunk</option>' +
							'<option value="spacebefore">spacebefore</option>' +
						'</select>' +
						'<span>&nbsp;=&nbsp;</span>' +
						'<input type="text" required>' +
						'<a class="delete">&#10006;</a>' + 
					'</li>';


/* 事件委托 advanced 弹出框 */
advancedBox.addEventListener('click', function(e) {
	e.stopPropagation();
	switch(e.target.className) {
		case 'add-attribute':
			// 添加attri-item选项
			$('.advanced-box .sort-table').append(attributesLine);
			break;
		case 'advanced-confirm':
			// 点击advance弹出层确认按钮，绑定数据到DOM中去
  			getSelectOplArr();
  			advancedBox.style.display = 'none';
  			break;
		case 'close-box':
			// 关闭advanced-box 弹出层
			advancedBox.style.display = 'none';
			break;
		case 'mask-box':
			// 点击弹出层外部结构可以关闭弹出层
			advancedBox.style.display = 'none';
			break;
	}
}, false);
	

/* 添加一个add-item条目 */

/* 添加add-item */
var addWrongLine = document.querySelector('.add-wrong');
addWrongLine.addEventListener('click', function() {
	var wrongSentence = '<p class="wrong-sentence sort-list"><label class="item-line"><span>wrong sentence:</span><input type="text" data-exampletype="w" placeholder="Sorry for my bed English"></label><a class="delete">&#10006;</a></p>';
	$('.sentence-box').append(wrongSentence);
}, false);

var addCorrentLine = document.querySelector('.add-corrent');
addCorrentLine.addEventListener('click', function() {
	var correntSentence = '<p class="correct-sentence sort-list"><label class="item-line"><span>correct sentence:</span><input type="text" data-exampletype="c" placeholder="Sorry for my dad English"></label><a class="delete">&#10006;</a></p>';
	$('.sentence-box').append(correntSentence);
}, false);

//文本词性分析调用
function analyzeText(textInput, el){
	$.ajax({
	    type: "POST",
	    url: "../analyze/analyzeText",
	    async: false, //是否异步
	    data:{text: textInput},
	    success: function (data) {
	       //返回页面组装
	       if(data.code == "success"){
		    	var tmp = document.querySelector("#tmp-1").innerHTML;
				var doTtmp = doT.template(tmp);
				el.nextElementSibling.innerHTML = doTtmp(handleDate(data.sentenceList));		// 处理接收过来的数据
	    	} else {
	    		alert("失败");
	    	}
	    },
	    error: function () {
	        alert(data.code);
	    }
	});
	return false;
}


/**
 * [处理接收过来的数据]
 * @param  {[oobject]} data [词法分析接收到的数据]
 * @return {array}      [返回处理好的数据]
 */
function handleDate(data) {
	var dataObj = [];
	for(var i = 0, len = data.length; i < len; i++) {
		var dataItemArr = [],
			dataToken = ['Token'],
			dataLemma = ['Lemma'],
			dataPos = ['Part-of-Speech'],
			dataChunk = ['chunk'];
		for(var j = 0; j < data[i].wordList.length; j++) {
			dataToken.push(data[i].wordList[j].word);
			dataLemma.push(data[i].wordList[j].lemma);
			dataPos.push(data[i].wordList[j].pos);
			dataChunk.push(data[i].wordList[j].chunk);
		}
		dataItemArr.push(dataToken, dataLemma, dataPos, dataChunk);
		dataObj.push(dataItemArr);
	}
	return dataObj;
}


/* 删除添加的add-item */
var sentenceBox = document.querySelector('.sentence-box');
sentenceBox.addEventListener('click', function(e) {

	if(e.target && e.target.className == 'delete') {
		e.currentTarget.removeChild(e.target.closest('p'));
	} else if(e.target.classList.contains('show-tip')) {
		// 替换文本
		var newStr = '<a class="add-item update-analysis">Update analysis(SF)</a><a class="add-item hide-analysis">Hide analysis</a>';
		var textInput = e.target.closest('p').querySelector('input').value;
		var parentNode = e.target.closest('p');			// 距离当前标签最近的P标签
		parentNode.lastElementChild.innerHTML = newStr;
		
		analyzeText(textInput, parentNode);         // 调用文本词性
	} else if(e.target.classList.contains('update-analysis')) {
		// 更新词性分析框
		var parentNode = e.target.closest('p');
		var textInput = parentNode.querySelector('input').value;
		analyzeText(textInput, parentNode);         // 更新文本词性
	} else if(e.target.classList.contains('hide-analysis')) {
		// 隐藏词性分析框
		var oldStr = '<a class="add-item show-analysis show-tip">Show analysis</a>';
		// 清除词法分析框
		e.target.closest('p').nextElementSibling.innerHTML = '';
		e.target.closest('p').lastElementChild.innerHTML = oldStr;
	} else {
		return false;
	}
}, false);


/* 添加pattern about toekn && error marker */
var addTokenPattern = document.querySelector('.add-token-pattern');
var addErrorPattern = document.querySelector('.add-error-pattern');
var sortBox = document.getElementById('sort-box');

// 拖拽事件 调用Sorttable.js框件
Sortable.create(sortBox, {
  animation: 150
});

addTokenPattern.addEventListener('click', function() {
	$('.error-pattern .item-content > .sort-table').append(addPattern(true));
}, false);

/* 添加marker start 和 marker end 标记 */
addErrorPattern.addEventListener('click', function(e) {
	var markerStar = '<li class="sort-list marker-start"><span class="drag-icon">&#8597;&nbsp;Marker start</span><a class="delete marker-tab">&#10006;</a></li>';
	var markerEnd = '<li class="sort-list marker-end"><span class="drag-icon">&#8597;&nbsp;Marker end</span><a class="delete marker-tab">&#10006;</a></li>';

	$('#sort-box').prepend(markerStar).append(markerEnd);
	addErrorPattern.style.display = 'none';
}, false);


// 确认提交按钮 提交Ajax数据后台
var confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', function() {
	// 判断用户是否勾选了大小写选项
	function isCaseSensitive() {
		var boolean = false;
		if(document.getElementById('isCaseSensitive').checked) {
			boolean = true;
		}
		return boolean;
	}
	function getRuleDetails() {
		var ruleName = null,
			message = null,
			shortMessage = null,
			url = null;
		ruleName = document.querySelector('.rule-name').value;
		message = document.querySelector('.message').value;
		shortMessage = document.querySelector('.short-message').value || null;
		url = document.querySelector('.url').value || null;
		mainClassName = getOptionName(1);
		smallClassName = getOptionName(0);
		return {
			ruleName: ruleName,
			message: message,
			shortMessage: shortMessage,
			url: url,
			mainClassName: mainClassName,
			smallClassName: smallClassName
		}
	}
	var ruleDetails = getRuleDetails();
	var errorPattern = getErrorPattern();
	// 判断标识token的值
   if(errorPattern.markerEnd < errorPattern.markerStart) {
   		alert('请重新选择MarkerStart和MarkerEnd.');
   } else {
		//规则参数
		var ruleParameter = { 
           ruleName: ruleDetails.ruleName,  				//规则名称(控制为英文)
           message: ruleDetails.message,  				//匹配规则命中反馈信息
           shortMessage: ruleDetails.shortMessage, 		//信息短语(非必填) 
           url: ruleDetails.url,  						//命中规则返回详情参考url
           caseSensitive: isCaseSensitive(),				//是否区分大小写
           ruleExampleList: getDataSentenceBox(),		//规则例句数组List
           ruleTokenList: errorPattern.ruleTokenList,		//Token规则数组List
           mainClass: ruleDetails.mainClassName,
           smallClass: ruleDetails.smallClassName,
           markerStart: errorPattern.markerStart,
           markerEnd: errorPattern.markerEnd
       };
       console.log(ruleParameter);
		var option = {
               url: '../rule/checkXml',  
               type: 'POST',  
               data: {"param":JSON.stringify(ruleParameter)},
               dataType: 'json', 
               success: function (data) {
            	    document.querySelector('.resulte-xml').style.display="block";
               		var resulteXML = document.querySelector('.resulte-xml > textarea');
               		resulteXML.innerHTML = data.result;			// 这里插入文档
               }
           }; 
		$.ajax(option);  
   }

}, false);

/**
 * [循环遍历 Set Example Sentences 的数据]
 * @return {[type]} [获取example sentence中的例句数据]
 */
function getDataSentenceBox() {
	var ruleExampleList = []; 		// 规则例句数组List(至少包含两个，一个错误例句，一个纠正例句)，可添加更多
	var dataSentenceBox = document.querySelectorAll('.sentence-box input');		// 需要重新加载input元素
	
	toArr(dataSentenceBox).forEach(function(el) {
		//规则例句
		var ruleExample = {
			exampleSentence: null,		//例句句子
			exampleType: null			//例句类型 (W:-wrong错误例句;C:-corrected纠正例句)
		};
		// 判断是否为空
		if(el.value) {
			ruleExample.exampleSentence = el.value;
			ruleExample.exampleType = el.dataset.exampletype;
			ruleExampleList.push(ruleExample);	
		}
	});
	return ruleExampleList;
}

/**
 * [循环遍历 Set the Error Pattern 的数据]
 * @return {[obj]} [返回ajax接口需要的参数]
 */
function getErrorPattern() {
	var sortBoxList = document.querySelectorAll('#sort-box > li.sort-list');
	var ruleTokenList = [],
			markerStart = null,			// 标记token的起始值
 			markerEnd = null;			// 标记token的结束值
	toArr(sortBoxList).forEach(function(el, index, array) {
		var listSortTable = el.querySelectorAll('.sort-table>li');
		// 遍历子rule-item
		var ruleToken = {},
 			exceptList = [];
 
		toArr(listSortTable).forEach(function(el) {
			exceptList.push(getRuleTokendata(el));
		});

		if(el.classList.contains('marker-start')) {
			markerStart = index;
		} else if(el.classList.contains('marker-end')) {
			markerEnd = index - 1;
		} else {
			ruleToken = getRuleTokendata(el);
			ruleToken.exceptList = exceptList;
			ruleTokenList.push(ruleToken);
		}
	});
	return {
		ruleTokenList: ruleTokenList,
		markerStart: markerStart,
		markerEnd: markerEnd
	};
}

/**
 * [获取ruleToken的数据]
 * @param  {[li.sort-list]} el [设置Token规则里面的li元素]
 */
function getRuleTokendata(el) {

	//ExceptToken规则 需要排除的Token规则
	var exceptToken = {};
	toArr(el.querySelector('p:nth-of-type(2)').querySelectorAll('input[type="radio"]')).forEach(function(item) {
		if(item.checked) {
			var	wordBox = el.querySelector('.word-box');
			switch(item.dataset.select) {
				case 'W':
					exceptToken = tokenInputData(wordBox, 1);
					break;
				case 'P':
					exceptToken = tokenInputData(wordBox, 2);
					break;
				case 'WP':
					exceptToken = tokenInputData(wordBox, 3);
					break;
				default:
					exceptToken = tokenInputData(wordBox, 4);
			}
		}
	});
	// 将HTML取到dataset字符串转化为数组格式
	var advancedList = el.querySelector('.show-box').dataset.advancedarr;
	exceptToken.advancedArr = advancedList || null;
	return exceptToken;
}

/**
 * [获取用户输入input.text和多选框参数]
 * @param  {[DOM]} el    [遍历当前元素el节点-- div.word-box ]
 * @param  {[type]} index [约定好的参数 1: word类型 2: part-of-speech词性 3:: WP 4: All]
 * @return {[object]}    [返回一个对象 包含要绑定的值]
 */
function tokenInputData(el, index) {
	var obj = {}
	// 循环遍历并插入checkbox里面的值
	// 接受一个或者两个参数 参数固定为 word || partOfSpeech
	function eachData(i, j) {
		if(i && j) {
			obj[i] = el.firstElementChild.querySelector('input[type="text"]').value;
			toArr(el.firstElementChild.querySelectorAll('input[type="checkbox"]')).forEach(function(item) {
				if(item.checked) {
					obj[item.value] = true;
				}
			});
			obj[j] = el.lastElementChild.querySelector('input[type="text"]').value;
			toArr(el.lastElementChild.querySelectorAll('input[type="checkbox"]')).forEach(function(item) {
				if(item.checked) {
					obj[item.value] = true;
				}
			});
		} else {
			obj[i] = el.firstElementChild.querySelector('input[type="text"]').value;
			toArr(el.firstElementChild.querySelectorAll('input[type="checkbox"]')).forEach(function(item) {
				if(item.checked) {
					obj[item.value] = true;
				}
			});
		}
	}
	if(index === 1) {
		obj.tokenType = 'W';
		eachData('word');
	} else if(index === 2) {
		obj.tokenType = 'P';
		eachData('partOfSpeech');
	} else if(index === 3) {
		obj.tokenType = 'WP';
		eachData('word', 'partOfSpeech');
	} else {
		obj.tokenType = 'All';
		return obj;
	}
	return obj;
}

  		
