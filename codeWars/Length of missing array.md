
- **Length of missing array**
- 一个二维数组里面的有多个数组组成， 而且数组里面的长度依次递增， 但是里面的数组会缺少一个个数， 输出这个缺少数组的长度

- If the array of arrays is null/nil or empty, the method should return 0.   
- When an array in the array is null or empty, the method should return 0 too!

- [[1, 2], [4, 5, 1, 1], [1], [5, 6, 7, 8, 9]] --> 3
- ([ [ null ], [ null, null, null ] ] ), 2);
- ([ ]), 0
		
		我的：function getLengthOfMissingArray(arrayOfArrays) {
		  let x = null;
		  let arr = [];
		  
		  if(!arrayOfArrays || arrayOfArrays.length === 0) {
		    return 0;
		  }
		  arrayOfArrays.forEach(function(item, index) {
		    if(!item || item.length === 0) {
		     x = 0;
		    } else {
		      arr.push(item.length);
		    }
		  });
		  if( x === 0 ) return 0;
		  
		  arr = arr.sort(function(a, b) { return a - b; });
		  arr.reduce(function(a, b) {
		    if((a + 1) !== b) {
		      x = a + 1;
		      }
		      return b;
		  });
		  return x;
		}

		1.function getLengthOfMissingArray(arr) {
		  return !arr||(ar = arr.map( (x,i) => x ? x.length : 0 ).sort( (a,b) => a-b ) ).indexOf(0) > -1
		         ? 0 : ar.filter( (x,i) => x != i + ar[0] ).concat([1])[0]-1
		}
