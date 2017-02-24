
- **Equal Sides Of An Array**
- You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. 
If there is no index that would make this happen, return -1.
- 输入一个数组， 看看数组中是否存在一个数字，导致左边的数组和右边的数组相等，如果有就返回index值，如果不存在，则返回-1
- Test.assertEquals(findEvenIndex([1,2,3,4,3,2,1]),3, "The array was: [1,2,3,4,3,2,1] \n");
- Test.assertEquals(findEvenIndex([1,100,50,-51,1,1]),1, "The array was: [1,100,50,-51,1,1] \n");
- Test.assertEquals(findEvenIndex([1,2,3,4,5,6]),-1, "The array was: [1,2,3,4,5,6] \n");
- Test.assertEquals(findEvenIndex([20,10,30,10,10,15,35]),3, "The array was: [20,10,30,10,10,15,35] \n");



		我的:function findEvenIndex(arr)
		{ 
		  let len = arr.length;
		  //Code goes here!
		  if(len >0 && len < 1000) {
		    for(let i = 0; i < len; i++) {
		      let x = sum(arr.slice(0, i));
		      let y = sum(arr.slice(i + 1));
		      if(x === y) {
		        return i
		        }
		    }
		    return -1;
		  } else {
		    return -1;
		  }
		}
		
		function sum(arr) {
		  return arr.reduce((a, b) => a + b, 0);
		}

		
		2.function findEvenIndex(arr)
		{
		  for(var i=1; i<arr.length-1; i++) {
		    if(arr.slice(0, i).reduce((a, b) =>  a+b) === arr.slice(i+1).reduce((a, b) =>  a+b)) {
		      return i;
		    }
		  }
		  return -1;
		}
