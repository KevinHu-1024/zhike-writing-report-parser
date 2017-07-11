import Report from './interfaces/Report';
import Options from './interfaces/Options';
import Slot from './interfaces/Slot';
import MarksIndex from './interfaces/MarksIndex';
import Loader from './interfaces/Loader';
import loaders from './loaders';

import {
  mergeOptions,
} from './utils';

const presetLoaders: Loader[] = [
  loaders.processCompress,
  loaders.slotGen,
  loaders.processCover,
  loaders.insertMarks,
  loaders.loadAsserts,
  loaders.markInSentence,
  loaders.indexObjGen,
  loaders.sortKeyGen,
];

const defaultOptions: Options = {
  errorPrefix: 'error',
  idPrefix: new Date().getTime().toString(36),
  compress: {
    enable: true,
    needToCompressIdentifier: ['缺少空格', '多余空格'],
  },
  logs: {
    enable: true,
  },
  presetLoaders: {
    enable: true,
    loaders: presetLoaders,
  },
  customLoaders: {
    enable: false,
    loaders: null,
  },
};

class WRP {
  readonly article: string;
  readonly reportJSON: Report;
  readonly _config: Options;
  readonly _temp: any;
  readonly _data: any;

  private slots: Slot[];
  private marksIndex: MarksIndex;
  private renderData: any;
  private sentences: any;
  
  constructor(
    article: string,
    reportJSON: Report,
    options: Options
  ) {
    this.article = article;
    this.reportJSON = JSON.parse(JSON.stringify(reportJSON));
    this._temp = {
      lastEndIndex: 0,
      compressMarks: [],
    };
    this._data = {
      slots: [],
    };

    this._config = mergeOptions(defaultOptions, options);
    // console.log(this._config);
    // console.log(loaders)
    let loaders: Loader[] = [];
    if (this._config.presetLoaders.enable) {
      loaders = loaders.concat(this._config.presetLoaders.loaders);
    }
    if (this._config.customLoaders.enable) {
      loaders = loaders.concat(this._config.customLoaders.loaders);
    }

    var result = this.runLoaders(...loaders);
    this.slots = this._data.slots;
    this.sentences = this._data.sentences;
    this.marksIndex = this._data.indexObj;
    this.renderData = this.genRenderData(result);
  }

  getSlots() {
    return this.slots;
  }

  getRenderData() {
    return this.renderData;
  }

  getSentences() {
    return this.sentences;
  }

  genRenderData(marks: any) {
    for (let i = 0; i < marks.length; i++) {
      const mark = marks[i];
      const lastMark = i >= 1 ? marks[i - 1] : undefined;
      const nextMark = marks[i + 1];

      if (mark) {
        if (lastMark === undefined && nextMark === undefined) {
          mark.startText = this.article.substring(0, mark.start);
          mark.endText = this.article.substring(mark.end);
        } else if (lastMark === undefined) {
          // 首个mark
          // console.log('0',mark);
          mark.startText = this.article.substring(0, mark.start);
          mark.endText = '';
        } else if (nextMark === undefined) {
          // 最后一个mark
          // console.log('last', mark);
          mark.startText = this.article.substring(lastMark.end, mark.start);
          mark.endText = this.article.substring(mark.end);
        } else {
          // 中间的普通mark
          // console.log('middle', mark);
          mark.startText = this.article.substring(lastMark.end, mark.start);
          mark.endText = '';
        }
      }
    }

    return marks;
  }

  getMarksIndex() {
    return this.marksIndex;
  }

  private runLoaders(...loaders: Loader[]): any {
    var marks = this.reportJSON.marks;
    var result = marks;
    loaders.forEach((loader) => {
      result = loader.apply(this, result)
    });
    return result;
  }
}

module.exports = WRP;
