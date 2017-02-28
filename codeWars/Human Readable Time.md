
- **Human Readable Time**
- 时间格式化
- Test.assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
- Test.assertEquals(humanReadable(5), '00:00:05', 'humanReadable(5)');
- Test.assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
- Test.assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
- Test.assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');

		function humanReadable(seconds) {
		  if(seconds >= 359999) return '99:59:59';
		  let h = Math.floor(seconds / 3600);
		  let m = Math.floor((seconds - 3600 * h) / 60);
		  let s = seconds - h * 3600 - m * 60;
		  return handleNum(h) + ':' + handleNum(m) + ':' + handleNum(s);
		}
		
		function handleNum(n) {
		  return n > 9 ? n.toString() : '0' + n;
		
