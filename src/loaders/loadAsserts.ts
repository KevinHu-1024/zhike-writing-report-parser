import SlotChildren from '../interfaces/SlotChildren'
// 在mark上面挂载id和index endFix
export default function preRender(...marks: SlotChildren[]): SlotChildren[] {
  // var marks = Array.from(arguments);
  var self = this;
  marks.map(function(mark, index) {
    mark.id = self._config.errorPrefix + '_' + self._config.basePrefix + '_' + mark.start;
    mark.index = index;
    mark.endFix = mark.isPositive ? '' : '批改建议';
    mark.link = mark.type === '近义词' ? true : false;

    return mark;
  });
  return marks;
}
