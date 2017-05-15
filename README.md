# 写作批改解析工具

##  引入

ES6

```javascript
import WRP from 'wrp';
```

UMD

```html
<script src="path/to/wrp.js"></script>
```

## 使用

```javascript
var wrp = new WRP(article, reportJson, options);
wrp.getSlots();
wrp.getMarksIndex();
```

## 选项 `options`

### options.errorPrefix
### options.idPrefix
### options.compress
#### compress.enable
#### compress.needToCompressIdentifier
### option.logs
#### logs.enable
### options.loaders
