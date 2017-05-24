import SlotChildren from '../interfaces/SlotChildren'
// 接受marks，按一定规律在_data.slots中push SlotChildren
// 自扩展的mark插槽，children是插槽中包含的marks
export default function slotGen(...marks: SlotChildren[]): SlotChildren[] {
  const preSlots = [];

  // 按照一个mark一个slot，return一个预生成的slot数组
  for(var j = 0; j < marks.length; j ++) {
    var aMark = marks[j];
    var preSlot = { start: aMark.start, end: aMark.end, children: [], };
    preSlots.push(preSlot);
  }

  // 从这个预生成的slot数组中合并，扩展成slot结果数组
  for(var i = 0; i < marks.length; i ++) {
    var mark = marks[i];
    // console.log(i, mark.processed, '循环初始判断');
    // 如果mark在之前被处理过，就进行下一轮循环，被处理过表示mark已经被放入到某个slot中了
    if(mark.processed) { continue; }

    // 由于有上一行的判断，所以后面是的mark都是未被处理过的mark，作为最终slot.children中的第一个成员
    // 这个mark的下一个mark
    var markNext = marks[i + 1] ? marks[i + 1] : undefined;

    // 当前mark是未被处理过的，所以按照索引去preSlots中取出它的slot，作为最终slots中一个slot的基础slot，在它基础上进行自扩展
    var curSlot = Object.assign({}, preSlots[i]);

    // 插入这个slot到最终slots中
    this._data.slots.push(curSlot);
    // 把这个mark最为这个slot.children中的第一个成员
    curSlot.children.push(mark);
    // 标记这个mark被处理过了，被处理过表示mark已经被放入到某个slot中了
    mark.processed = true;
    // console.log(i, '标记true');

    // slot 增加新元素 和 自扩展
    // console.log(i);

    // 一个child找完了继续找下一个
    var limit = 15;
    var count = 0;
    var j = i + 1;
    while (count <= limit && ((markNext && markNext.start < mark.end && mark.start != mark.end) || (markNext && markNext.start === mark.start && markNext.end === mark.end) || (markNext && markNext.start <= mark.start && markNext.end >= mark.end))) {
      // console.log('!');
      // console.log(i, '新增元素', mark, markNext);

      // 新增元素
      curSlot.children.push(markNext);
      // console.log(i + 1, 'next标记true ')
      markNext.processed = true;

      // 自扩展
      if(markNext.end > mark.end) {
        // console.log(i, '自扩展');
        curSlot.end = markNext.end;
      }

      markNext = marks[j + 1] ? marks[j + 1] : undefined;

      // console.log(i, j, count);

      count ++;
      j ++;

      // console.log('while一次循环完的next', mark, markNext);
      // console.log(markNext && markNext.start < mark.end && mark.start != mark.end, markNext && markNext.start === mark.start && markNext.end === mark.end, markNext && markNext.start <= mark.start && markNext.end >= mark.end);
    }

    // 防止 i 在所有mark处理完了之后继续循环。因为循环的是marks长度，marks循环完了，i还没循环完
    if(!markNext || mark.start > markNext.start) { console.log('break', mark, markNext);break; }
  }
  return marks;
}
