- **Gap in Primes**
- 判断在这个[n,m]整数这间，是否存在两个素数间距相差为g,并且这两个中间没有其他的相同符合条件的素数，如果有，就输出来，否则，返回null

- gap(2, 5, 7) --> [5, 7] or (5, 7) or {5, 7}

- gap(2, 5, 5) --> nil or in C++ {0, 0}

- gap(4, 130, 200) --> [163, 167] or (163, 167) or {163, 167}
- gap(6, 100, 110) --> [103 109] [107 113]就不符合条件，则返回null

```
function gap(g, m, n) {
  var lastPrime = 0;
    for(var i = m; i <= n; i++) {
	if(isPrime(i)) {
	    if(i - lastPrime == g) return [lastPrime, i];
	    else lastPrime = i;
	}
    }
    return null;
}


function isPrime(x) {
  if( x < 2) return false;
  for(let i = 2; i < x / 2 + 1; i++) {
     if( x % i === 0) return false;
  }
  return true;
}
```
