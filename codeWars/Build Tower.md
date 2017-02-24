
- ""Build Tower""
- 输出字符串宝塔

        [
          '  *  ', 
          ' *** ', 
          '*****'
        ]

        [
          '     *     ', 
          '    ***    ', 
          '   *****   ', 
          '  *******  ', 
          ' ********* ', 
          '***********'
        ]

- Test.assertEquals(JSON.stringify(towerBuilder(1)), JSON.stringify(["*"]));
- Test.assertEquals(JSON.stringify(towerBuilder(2)), JSON.stringify([" * ","***"]));
- Test.assertEquals(JSON.stringify(towerBuilder(3)), JSON.stringify(["  *  "," *** ","*****"]));


		我的:function towerBuilder(nFloors) {
		  // build here
		  let arr = [];
		  for(let i = 1; i <= nFloors; i++) {
		    var str = '';
		    str += (' ').repeat(nFloors - i);
		    str += ('*').repeat(2 * i - 1);
		    str += (' ').repeat(nFloors - i);
		    arr.push(str);
		  }
		  return arr;
		}
    	
		2.function towerBuilder(n) {
		  return Array.from({length: n}, function(v, k) {
		    const spaces = ' '.repeat(n - k - 1);
		    return spaces + '*'.repeat(k + k + 1) + spaces;
		  });
		}

