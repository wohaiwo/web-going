- **Product of consecutive Fib numbers**
- 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
- Test.assertSimilar(productFib(4895), [55, 89, true])
- Test.assertSimilar(productFib(5895), [89, 144, false])
- Test.assertSimilar(productFib(447577), [610, 987, false])
- Test.assertSimilar(productFib(602070), [610, 987, true])
- 输入一个数n，判断当前数字是否为两个数相乘，
    	
		productFib(714) # should return [21, 34, true], 
          # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

		productFib(800) # should return [34, 55, false], 
         # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55

------

		我的:function productFib(prod){
		  let midian = Math.ceil(Math.sqrt(prod));
		  for(let i = 2; i < midian; i++) {
		    if(fib(i) <= midian && fib(i+1) >= midian) {
		      if(tmp[i] * tmp[i+1] > prod) {
		        return [tmp[i], tmp[i+1], false];
		      } else if (tmp[i] * tmp[i+1] < prod && tmp[i+1] * fib(i+2) > prod) {
		         return [tmp[i+1], tmp[i+2], false];
		      } else {
		        return [tmp[i], tmp[i+1], true];
		      }
		    }
		  }
		}
		
		let tmp = [0, 1];
		function fib(n) {
		  let result = tmp[n];
		  if(typeof result != 'number') {
		    result = fib(n-2) + fib(n-1);
		    tmp[n] = result;
		  }
		  return result;
		}	

		2.function productFib(prod){
		  let tmp = [0, 1];
		  while(tmp[0] * tmp[1] < prod) {
		    tmp[1] = tmp[0] + tmp[1];
		    tmp[0] = tmp[1] - tmp[0];
		    }
		    return [tmp[0], tmp[1], tmp[0] * tmp[1] == prod];
		}
