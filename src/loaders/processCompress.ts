import SlotChildren from '../interfaces/SlotChildren'

// 处理压缩配置中的mark
export default function processCompress(): SlotChildren[] {
  var marks = Array.from(arguments);
  for(var i = 0; i < marks.length; i ++) {
    var mark = marks[i];
    if(this._config.compress.needToCompressIdentifier.indexOf(mark.type) != -1) {
      // console.log('compress', mark);
      this._temp.compressMarks.push(mark);
      marks.splice(i, 1);
      i --;
    }
  }
  return marks;
}
