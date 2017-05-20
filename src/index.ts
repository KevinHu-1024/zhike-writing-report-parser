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
  loaders.indexObjGen,
  loaders.sortKeyGen
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
  
  constructor(
    article: string,
    reportJSON: Report,
    options: Options
  ) {
    this.article = article;
    this.reportJSON = reportJSON;
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
    let loaders: Loader[];
    this._config.presetLoaders.enable && loaders.concat(this._config.presetLoaders.loaders);
    this._config.customLoaders.enable && loaders.concat(this._config.customLoaders.loaders);

    this.runLoaders(...loaders);
    this.slots = this._data.slots;
    this.marksIndex = this._data.indexObj;
  }

  getSlots() {
    return this.slots;
  }

  getMarksIndex() {
    return this.marksIndex;
  }

  private runLoaders(...loaders: Loader[]): void {
    var marks = this.reportJSON.marks;

    var self = this;
    loaders.forEach(function (loader) {
      loader.apply(self, marks)
    });
  }
}

module.exports = WRP;
