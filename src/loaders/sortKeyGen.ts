import SlotChildren from '../interfaces/SlotChildren'
export default function sortKeyGen(...marks: SlotChildren[]): SlotChildren[] {
  // var marks = Array.from(arguments);
  var self = this;
  // for(var i = 0; i < marks.length; i ++) {
  var arr = this._data.indexObj.sortKeys = Object.keys(this._data.indexObj.data).sort(function (a, b) {
    return self._data.indexObj.data[b].marks.length - self._data.indexObj.data[a].marks.length;
  });
  var temp = [[], []];
  arr.forEach(function (key) {
    var isPositivity = self._data.indexObj.data[key].marks[0].isPositive;
    if (isPositivity) {
      temp[1].push(key);
    }
    else {
      temp[0].push(key);
    }
  });
  this._data.indexObj.sortKeys = temp[0].concat(temp[1]);
  temp = arr = null;
  // }
  return marks;
}
