
- **Triple trouble**
- 接受两个数字a,b 来利用正则表达式来判断 a中是否存在一个3个相同的三位数 和 b中是否存在一个2个相同两位数 ， 并且这两个数字是否相等  相等就返回 1 ， 不相等返回 -1

- tripledouble(451999277, 41177722899) == 1 // num1 has straight triple 999s and 
                                          // num2 has straight double 99s
- tripledouble(1222345, 12345) == 0 // num1 has straight triple 2s but num2 has only a single 2
- tripledouble(12345, 12345) == 0
- tripledouble(666789, 12345667) == 1
		
    
    
		我的:function tripledouble(num1, num2) {
		  //code me
		  let a = ('' + num1).match(/0{3}|1{3}|2{3}|3{3}|4{3}|5{3}|6{3}|7{3}|8{3}|9{3}/g);
		  let b = ('' + num2).match(/0{2}|1{2}|2{2}|3{2}|4{2}|5{2}|6{2}|7{2}|8{2}|9{2}/g);
		  if( !a || !b) return 0;
		  for(let i = 0; i < a.length; i++) {
		    for(let j = 0; j < b.length; j++) {
		      if(a[i].indexOf(b[j]) !== -1) {
		        return 1;
		        break;
		      }
		    }
		  }
		  return 0;
		}

		2.function tripledouble(num1, num2) {
		  for (let i = 0; i < 10; i++) {
		    if (new RegExp(`${i}{3}`).test(num1) && new RegExp(`${i}{2}`).test(num2)) {
		      return 1;
		    }
		  }
		  return 0;
		}
