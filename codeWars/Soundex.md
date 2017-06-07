## Soundex

- Save the first letter. Remove all occurrences of h and w except first letter.
- Replace all consonants (include the first letter) with digits as follows:
    ```
        b, f, p, v = 1
        c, g, j, k, q, s, x, z = 2
        d, t = 3
        l = 4
        m, n = 5
        r = 6
     ```
 - Replace all adjacent same digits with one digit.
 - Remove all occurrences of a, e, i, o, u, y except first letter.
 - If first symbol is a digit replace it with letter saved on step 1.
 - Append 3 zeros if result contains less than 3 digits. Remove all except first letter and 3 digits after it

Soundex是一种语音算法，利用英文字的读音计算近似值，值由四个字符构成
[Soundex-wikipedia](https://en.wikipedia.org/wiki/Soundex)
### code
```
var soundex = function(names) {
 return names.split(' ').map(function(item, index, array) {
    let firstLetter = item.slice(0, 1).toUpperCase();
    let str = item.replace(/[hw]/gi, '')
                  .replace(/[bfpv]+/gi, 1)
                  .replace(/[cgjkqsxz]+/gi, 2)
                  .replace(/[dt]+/gi, 3)
                  .replace(/[l]+/gi, 4)
                  .replace(/[mn]+/gi, 5)
                  .replace(/[r]+/gi, 6)
                  .replace(/[aeiouy]/gi, '') + '000';
    return "AEIOUYHW".includes(firstLetter) ? ( firstLetter + str.slice(0, 3)) : (firstLetter + str.slice(1, 4));       
  }).join(' ');
}
```

### 扩展知识

字符串去重多余字符串
1. `str.replace(/(.).*\1/g, "$1")`
2. `str.replace(/(.)(\1)+/g, "$2)`
