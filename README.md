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

// 获取未经过错误合并、覆盖处理的slots，包括全部的错误标注，每个slot表示一个有错误的区域，这个区域中包含至少一个错误，children中是该区域的错误数组
wrp.getSlots();

// 获取按错误类型分类的错误索引
wrp.getMarksIndex();

// 获取经过错误合并、覆盖处理的错误标注数组，可以直接用于渲染文章
wrp.getRenderData();
```
