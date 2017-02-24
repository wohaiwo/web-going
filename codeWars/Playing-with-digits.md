 - **Playing with digits**
 
 - digPow(89, 1) should return 1 since 8¹ + 9² = 89 = 89 * 1
 - digPow(92, 1) should return -1 since there is no k such as 9¹ + 2² equals 92 * k
 - digPow(695, 2) should return 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2
 - digPow(46288, 3) should return 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

		1.function digPow(n, p){
		  var ans = (''+n).split('')
		    .map(function(d,i){return Math.pow(+d,i+p) })
		    .reduce(function(s,v){return s+v}) / n
		  return ans%1 ? -1 : ans    
		}


		2.function digPow(n, p) {
		  var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
		  return x % n ? -1 : x / n
		}
	
