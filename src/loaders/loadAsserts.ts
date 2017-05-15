// 在mark上面挂载id和index endFix
export default function preRender() {
  var marks = Array.from(arguments);
  var self = this;
  marks.map(function(mark, index) {
    mark.id = self._config.errorPrefix + '_' + self._config.basePrefix + '_' + mark.start;
    mark.index = index;
    mark.endFix = mark.isPositive ? '' : '批改建议';
    // mark.link = mark.type === '近义词' ? mark.text + "<a class=\"search\" href=\"" + self._config.beikaodiApi.replace("{{word}}", mark.text.toLowerCase()) + "\" target=\"_blank\">" + "<i class=\"fa fa-search\" aria-hidden=\"true\"></i>" + "</a>" : mark.text;

    return mark;
  });
  return marks;
}
