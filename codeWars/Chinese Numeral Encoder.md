## Chinese Numeral Encoder

将 [-99999.999, 99999.999]范围内的数字转化为中文数字表示形式

```  
var numerals = {
    "-":"负",
    ".":"点",
    0:"零",
    1:"一",
    2:"二",
    3:"三",
    4:"四",
    5:"五",
    6:"六",
    7:"七",
    8:"八",
    9:"九",
    10:"十",
    100:"百",
    1000:"千",
    10000:"万"
  };
```
- test result
```
9 九
10 十
1.122 一点一二三
18 十八
21 二十一
-110 负一百一十
123 一百二十三
24681 二万四千六百八十一
```

### code
```
function toChineseNumeral(num){
  var numerals = {
    "-":"负",
    ".":"点",
    0:"零",
    1:"一",
    2:"二",
    3:"三",
    4:"四",
    5:"五",
    6:"六",
    7:"七",
    8:"八",
    9:"九",
    10:"十",
    100:"百",
    1000:"千",
    10000:"万"
  };
  
  let integer = [];    // 整数
  let decimal = [];    // 小数
  let arr = [];        // 临时存放整数和小数的数组
  
  if(num < 0) {
    integer.push(numerals['-']);
    num = Math.abs(num);
  }
  // 判断是否存在小数点
  if(/\./g.test(String(num))) {
    arr = String(num).split('.');
  } else {
    arr.push(String(num));
  }
  
  // 整数部分
  if(arr[0] <= 10) {
    integer.push(numerals[arr[0]]);
    integer = integer.join('')
  } else if(arr[0] > 10 && arr[0] <= 19) {
    // 解决10-19之间的'一十'的问题
    integer.push(numerals[10] + numerals[arr[0].slice(1)]);
    integer = integer.join('')
  } else {
    Array.from(arr[0]).reduce((prev, curr, currentIndex, array) => {
      if(curr == 0 || currentIndex == (array.length - 1) ) {
        integer.push(numerals[curr]);
      } else {
        integer.push(numerals[curr] + numerals[Math.pow(10, (array.length - currentIndex - 1))]);
      }
      return curr;
    }, 0);
    integer = integer.join('').replace(/零+$/g, '').replace(/零{2,}/g, '零');
  }
  
  // 小数部分
  if(arr[1]) {
    decimal.push(numerals['.']);
    Array.from(arr[1]).reduce((prev, curr) => {
      decimal.push(numerals[curr]);
    }, 0);
  }
  return integer + decimal.join('');
}
```
