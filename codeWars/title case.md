
- **title Case**
- 编写一个函数，接受一个或者两个字符串参数, 字符串首字母大写， 如果存在第二个参数，匹配和第一个参数相同的值，如果存在相同的值，则不大写处理
- titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
- titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
- titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'



		我的：function titleCase(title, minorWords) {
			  minorWords = minorWords ?  minorWords.toLowerCase().split(' ') : [];
			  title = title.toLowerCase().trim().split(' ');
			  if(title[0] === "") {
			    return '';
			  }
			  if(title.length === 1) {
			    return handleStr(title[0]);
			  } else {
			    return title.reduce(function(a, b) {
			      return handleStr(a) + ' ' + ( minorWords.indexOf(b) === -1 ? handleStr(b) : b);
			    });
			  }
			}
			
			function handleStr(str) {
			   return str.toString()[0].toUpperCase() + str.toString().slice(1);
			}

		2.
			String.prototype.capitalize = function() {
			    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
			}
			
			function titleCase(title, minorWords) {  
			  var titleAr = title.toLowerCase().split(' '),
			      minorWordsAr = minorWords ? minorWords.toLowerCase().split(' ') : [];
			    
			  return titleAr.map(function(e, i){return minorWordsAr.indexOf(e) === -1 || i === 0 ? e.capitalize() : e })
			                .join(' ');
			}
