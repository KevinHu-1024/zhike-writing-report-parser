import Report from './interfaces/Report';
import Options from './interfaces/Options';
import Slot from './interfaces/Slot';
import MarksIndex from './interfaces/MarksIndex';

class WRP {
  readonly article: string;
  readonly reportJSON: Report;

  private slots: Slot[];
  private marksIndex: MarksIndex;
  
  constructor(
    article: string,
    reportJSON: Report,
    options: Options
  ) {
    this.article = article;
    this.reportJSON = reportJSON;
  }

  getSlots() {
    return this.slots;
  }

  getMarksIndex() {
    return this.marksIndex;
  }
}

module.exports = WRP;
