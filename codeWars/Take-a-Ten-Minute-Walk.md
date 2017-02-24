
- **Take a Ten Minute Walk**

- n w s e 表示东南西北， 一个人只能走10步， 走完十步则必须回到原位，输入一个数组 里面表示走的步数， 如果会到原位就返回true，否则返回false
- ['n','w','s','n','e','s','n','s'] => false


		1: function isValidWalk(walk) {
		  function count(val) {
		    return walk.filter(function(a){return a==val;}).length;
		  }
		  return walk.length==10 && count('n')==count('s') && count('w')==count('e');
		}

		2: function isValidWalk(walk) {
  			return walk.length == 10 && !walk.reduce(function(w,step){ return w + {"n":-1,"s":1,"e":99,"w":-99}[step]},0)
		}


		我的: function isValidWalk(walk) {
		  //insert brilliant code here
		  if(walk.length === 10 && walk.length % 2 === 0) {
		      let a = 0;
		      let b = 0;
		      walk.forEach(function(item, index, arr) {
		        switch(item) {
		          case 'n':
		            a += 1;
		            break;
		          case 'w':
		            b += 1;
		            break;
		          case 's':
		            a += -1;
		            break;
		          case 'e':
		            b += -1;
		            break;
		          }
		      });
		      if(a === 0 && b === 0) {
		        return true;
		      } else {
		        return false;
		      }
		    } else {
		      return false;
		    }
		}
