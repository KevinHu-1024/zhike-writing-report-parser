import SlotChildren from '../interfaces/SlotChildren'
// 将额外的mark（比如压缩后的结果）插入到插槽之间
export default function insertMarks(...marks: SlotChildren[]): SlotChildren[] {
  // var marks = Array.from(arguments);
  var self = this;

  // 找出文中不是slot的地方，这些算是freeSlots
  var freeSlots = [];
  for(var m = 0; m <= this._data.slots.length - 1; m ++) {
    var freeSlot = null;
    if(this._data.slots[m - 1] && this._data.slots[m + 1] && this._data.slots[m]) {
      freeSlot = {
        start: this._data.slots[m].end + 1,
        end: this._data.slots[m + 1].start - 1,
      };
    } else {
      if(!this._data.slots[m - 1]) {
        freeSlot = {
          start: 0,
          end: this._data.slots[m].start - 1,
        };
      }
      if(!this._data.slots[m + 1]) {
        freeSlot = {
          start: this._data.slots[m].end + 1,
          end: undefined,
        };
      }
    }
    freeSlots.push(freeSlot);
  }
  // console.log('freeSlots', freeSlots);

  // 从待压缩的集合中，按type进行错误分类
  var compressMarkInKind = {};
  this._config.compress.needToCompressIdentifier.forEach(function (identifier) {
    compressMarkInKind[identifier] = self._temp.compressMarks.filter(function (mark) {
      return mark.type === identifier;
    });
  });

  // console.log(compressMarkInKind);

  // 要插入slot中的slot集合，这个slot.children里面是压缩过的一个mark
  var log = [];

  // 在freeSlots中寻找可插入的位置
  for(var kind in compressMarkInKind) {
    if(compressMarkInKind.hasOwnProperty(kind)) {
      // 标志位，true表示该压缩错误已经插入到slots中了
      var flag = false;
      for(var i = 0; i <= compressMarkInKind[kind].length - 1; i ++) {
        if(!flag) {
          var curMarkInCurKind = compressMarkInKind[kind][i];

          for(var j = 0; j <= freeSlots.length - 1; j++) {
            var curSlot = freeSlots[j];

            // 符合插入条件
            if(curMarkInCurKind.start >= curSlot.start && curMarkInCurKind.end <= curSlot.end) {

              curMarkInCurKind.typeExplains ? null : curMarkInCurKind.typeExplains = [];
              if(compressMarkInKind[kind].length > 1) {
                curMarkInCurKind.typeExplains.push('  全文共有' + compressMarkInKind[kind].length + '处此类错误，请检查');
              }
              marks.push(curMarkInCurKind);
              log.push(Object.assign({children: [curMarkInCurKind]}, curSlot));

              flag = true;
              freeSlots.splice(j, 1);
              j --; // 这步多余，因为直接break了，算代码注释了
              break;
            }
          }
        }
      }
    }
  }
  // console.log('log', log);

  // log合并入slots
  this._data.slots = this._data.slots.concat(log);

  // 对slot和marks进行排序，因为压缩marks之前从marks中被提取出来了，再插入marks的时候，要进行按start排序
  this._data.slots.sort(function (a, b) {
    return a.start - b.start;
  });
  marks.sort(function (a, b) {
    if (a.start !== b.start) {
      return a.start - b.start;
    }

    return a.end - b.end;
  });

  return marks;
}
