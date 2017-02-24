
 - **Persistent Bugger**
 - 输入一个整数n, 输出这个数字n能被区分成多少次
 
 - persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 - persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2

 - persistence(4) === 0 // because 4 is already a one-digit number
 
 
 		我的:
		function persistence(num) {
		  if(num < 10) return 0;
		  let j = 1;
		  let changeNum = handleNum(num);
		  while(changeNum >= 10) {
		    ++j;
		    changeNum = handleNum(changeNum);
		  }
		  return j;
		}
		
		function handleNum(x) {
		   return String(x).split('').reduce(function(a,b){ return (+a) * (+b); });
		}

		
		2.function persistence(num) {
		   var times = 0;
		   
		   num = num.toString();
		   
		   while (num.length > 1) {
		     times++;
		     num = num.split('').map(Number).reduce((a, b) => a * b).toString();
		   }
		   
		   return times;
		}
		
		3.const persistence = num => {
		  return `${num}`.length > 1 
		    ? 1 + persistence(`${num}`.split('').reduce((a, b) => a * +b)) 
		    : 0;
		}
