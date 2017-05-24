import SlotChildren from '../interfaces/SlotChildren'
// 从插槽的children中，按一定规律取出要展示的mark
export default function processCover(...marks: SlotChildren[]): SlotChildren[] {
  // var marks = Array.from(arguments);
  // console.log(marks);
  var result = [];
  for(var i = 0; i < this._data.slots.length; i ++) {
    var curSlot = this._data.slots[i];

    if(curSlot.children.length > 1) {
      var maxLevel = Math.max.apply(null, curSlot.children.map(function(child) {
        return child.level;
      }));
      var child = curSlot.children.filter(function(child) {
        return child.level === maxLevel;
      });

      if(child.length > 1) {
        child = child[0];
      } else {
        child = child[0];
      }

      result.push(child);
    } else {
      result.push(curSlot.children[0]);
    }
  }
  // console.log(result);
  return result;
}
