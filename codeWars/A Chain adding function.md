## A Chain adding function

### We want to create a function that will add numbers together when called in succession.

- 
```
add(1)(2)(3); // 6
add(1)(2)(3)(4); // 10
add(1)(2)(3)(4)(5); // 15
```

### code 

```
function add(n) {
  let fn = function(x) {
    return add(n + x);
  };
  fn.valueOf = function() {
    return n;
  };
  return fn;
}
```
