- **Remove Zeros**
- 将一个数组中0, '0'的数移到数组的末尾 数组中存在null，false的字段 但是不需要移动
- `[7,2,3,0,13,0,78,0,0,19,14]` => `[7,2,3,13,78,19,14,0,0,0,0]`
- `[1,2,null,0,'0',false]` => `[1,2,null,false,0,'0']`

		function removeZeros(array) {
		  // Sort "array" so that all elements with the value of zero are moved to the
		  // end of the array, while the other elements maintain order.
		  // [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
		  // Zero elements also maintain order in which they occurred.
		  // [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]  
		  
		  // Do not use any temporary arrays or objects. Additionally, you're not able
		  // to use any Array or Object prototype methods such as .shift(), .push(), etc
		  
		  // the correctly sorted array should be returned.
	        let str = '';
	        let index = 0;
			    let len = array.length;
			    for(let i = 0; i < len; i++) {
	          if(array[i] === 0) {
	            str += 0;
	          } else if(array[i] === '0') {
	            str += 1;
	         } else {
	           array[index++] = array[i];
			     }
	       }
	       for(let i = 0; i < str.length; i++) {
	         str[i] ==  0 ? array[index++] = 0 : array[index++] = '0';
	        }
			  return array;
			}

------
      Best practice:
      function removeZeros(array) {
        var end = array.length;
        for (var i = 0; i < end; i++) {
            if (array[i] === 0 || array[i] === "0") {
                arrayShiftToEnd(array, i);
                i--;
                end--;
            }
        }
        return array;
    }

    function arrayShiftToEnd(array, n) {
        var end = array[n]
        for(var i = n; i <  array.length; i++) {
            array[i] = array[i + 1]
        }
        array[array.length - 1] = end;

        return array
    }
