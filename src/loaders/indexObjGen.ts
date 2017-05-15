export default function indexObjGen() {
  var marks = Array.from(arguments);
  this._data.indexObj = {
    data: {},
  };
  for(var i = 0; i < marks.length; i ++) {
    var mark = marks[i];
    if (this._data.indexObj.data.hasOwnProperty(mark.type)) {
      if (mark.compressCount) {
        this._data.indexObj.data[mark.type].info.explain = mark.typeExplains.join('');
      }
      // 如果mark是需要压缩的，就再更新一遍解释，以更新count值
      this._data.indexObj.data[mark.type].marks.push(mark); // 如果markKind集合中有该类错误，就把它push入数组
    }
    else {
      this._data.indexObj.data[mark.type] = {};
      this._data.indexObj.data[mark.type].marks = [];
      this._data.indexObj.data[mark.type].info = {
        title: mark.isPositive ? "批改解释：" : "错误解释：",
        explain: mark.typeExplains.join(''),
        key: mark.type
      };
      this._data.indexObj.data[mark.type].marks.push(mark); // 否则就新建数组，再push
    }
  }

  return marks;
}
