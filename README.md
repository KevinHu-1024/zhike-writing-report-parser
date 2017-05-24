# 写作批改解析工具

##  引入

ES6

```javascript
import WRP from 'zhike-writing-report-parser';
```

UMD

```html
<script src="path/to/zhike-writing-report-parser/dist/wrp.js"></script>
```

## 使用

```javascript
var wrp = new WRP(article, reportJson, options);
wrp.getSlots();
wrp.getMarksIndex();
```
