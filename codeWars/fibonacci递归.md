- 优化下面的fib递归算法

	function fib(n) {
	  if(n === 0 || n === 1) {
	    return n;
	  }
	  return fib(n-1) + fib(n-2);
	}


- 递归算法优化

- 优化1:

		let tmp = [0, 1];
		function fib(n) {
		  let result = tmp[n];
		  if(result != 'number') {
		    result = fib(n-2) + fib(n-1);
			tmp[n] = result;
		  }
		return result;
		}
		
- 优化2:
		
		function fib(n) {
		  var tmp = [0, 1];
		if(n < 2) return n;
		for(let i = 2; i < n; i++) {
			let val = tmp[0] + tmp[1];
			tmp[0] = tmp[1];
			tmp[1] = val;
		  }
		  return tmp[0] + tmp[1];
		}

- 优化3:
		
	   	// 函数尾调用
       	function fib(n, total) {
 	      if(n === 1) return total;
		  return fib(n-1, n * total);
        }
        fib(5, 1)  // => 120
	
- 优化3.1:
		
		// 优化代码，让其代码符合正常的递归调用格式
		function fib(n, total) {
		  if(n === 1) return total;
          return fib(n-1, n * total);
		}
		function factorial(n) {
		  return fib(n, 1);	
		}
		factorial(5);	// 120
