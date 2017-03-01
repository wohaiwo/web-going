
- **Sum of Intervals**
- 给定一个二维数组，判断所有数组的合集
- `[[1, 2], [6, 10], [11, 15]]` => return 9
- `[[1, 4], [7, 10], [3, 5]]` => return 7
- `[[1,5], [10,20],[1,6],[16,19],[5,11]]` => return 19


		function sumIntervals(intervals){
		  //TODO
		  let sum = [];
		  intervals.forEach(function(item, index, array) {
		    for(let i = item[0]; i < item[1]; i++) {
		      if(sum.indexOf(i) == -1) {
		        sum.push(i);
		      }
		    }
		  });
		  return sum.length;
		}
		
		function sumIntervals(intervals){
		  return Object.keys(intervals.reduce(function(hash, interval) {
		    for(var i = interval[0]; i < interval[1]; i++) hash[i] = 1;
		    return hash;
		  }, {})).length;
		}
