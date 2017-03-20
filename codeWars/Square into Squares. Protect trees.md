
- Square into Squares. Protect trees!

- description:  

      decompose(11) must return [1,2,4,10]. 
      Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² 
      but don't return [2,6,9], since 9 is smaller than 10.

      For decompose(50) don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49] since [1, 1, 4, 9, 49]
      doesn't form a strictly increasing sequence.
      
      
 - code:
      
      
        function decompose(n) {
            // your code
            let res = [];
            let flag = 0;
            function dfs(start, path, n, nsquare)
            {
              if (nsquare === 0)
              {
                flag = 1;
                res = path;
                return;
              }
              if (start === 0)
                return;
              for (let i = 0; i < 2; i ++)
              {
                if (i === 0)
                {
                  if (start >= path[path.length-1])
                    return;
                  let new_n = Math.floor(Math.sqrt(nsquare - start * start));
                  let new_nsquare = nsquare - start * start;
                  if (new_n >= 0)
                  {
                    let temp = path.slice();
                    temp.push(start);
                    dfs(new_n, temp, new_n, new_nsquare);
                  }
                }
                else
                  return dfs(start - 1, path, n, nsquare);
                if (flag == 1)
                  return;
              }
            }
            dfs(n-1, [], n, Math.pow(n, 2));
            return res.length === 0 ? null : res.reverse();
        }
   
------
   
      function decompose(n) {
        return loop(n - 1, n * n, []);
        function loop(k, rest, path) {
          if(rest === 0) {
            return path;
          } else if( rest < 0 || k === 0 ) {
            return null;
          } else {
            return loop(k - 1, rest - k * k, [k].concat(path)) || loop(k - 1, rest, path);
          }
        }
      }
