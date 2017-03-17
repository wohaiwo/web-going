## Counting Change Combinations
#### 给定一定数额的金钱money和一个包含一个数量额度零钱数组coins, 求出找开零钱有几个解决方法

  countChange(4, [1,2]) // => 3
  countChange(10, [5,2,3]) // => 4
  countChange(11, [5,7]) //  => 0
  
  
    var countChange(money, coins) {
      if(money < 0 || coins.length === 0) {
        return 0;
      }
      if(money === 0) {
        return 1;
      }
      return countChange(money - coins[0], coins) + countChange(money, coins.slice(1));
    }
