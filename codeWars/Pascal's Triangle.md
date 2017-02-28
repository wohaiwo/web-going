- **Pascal's Triangle #2**
- 输入正整数n, 输出杨辉三角 
- pascal(5) // should return [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]


		function pascal(depth) {
		  //code here
		  let pascalArr = [[1], [1,1]];
		  if(depth < 2) return [pascalArr[depth-1]];  
		  for(let i = 2; i < depth; i++) {   
		    let arr = [];
		    for(let j = 0; j <= i; j++) {
		      let a = pascalArr[i-1][j-1] ? pascalArr[i-1][j-1] : 0;
		      let b = pascalArr[i-1][j] ? pascalArr[i-1][j] : 0;
		      arr.push(a+b);
		    }
		    pascalArr.push(arr);
		  }
		  return pascalArr;
		}
		
		
		function pascal(depth) {
		  var result = []
		  for (var i = 1; i <= depth; ++i) {
		    var row = []
		    for (var j = 0; j < i; ++j) {
		      row.push(j == 0 || j == i - 1 ? 1 : result[i-2][j-1] + result[i-2][j])
		    }
		    result.push(row)
		  }
		  return result
		}
